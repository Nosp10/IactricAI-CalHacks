import os
import json
import base64
import asyncio
from groq import Groq
import websockets
from fastapi import FastAPI, WebSocket, Request, WebSocketDisconnect
from fastapi.responses import HTMLResponse, JSONResponse, PlainTextResponse
from fastapi.websockets import WebSocketDisconnect
import asyncio
import tempfile
from presidio_analyzer import AnalyzerEngine
from presidio_anonymizer import AnonymizerEngine
import spacy
from typing import List
# from verify import ____
from opinion_query import get_doctors

nlp = spacy.load("en_core_web_sm")
from dotenv import load_dotenv

client = Groq(api_key=os.getenv("GROQ_KEY"))
TRANSCRIPTS=[]

app = FastAPI()

async def anonymize(text) -> str:
    analyzer = AnalyzerEngine()
    anonymizer = AnonymizerEngine()
    results = analyzer.analyze(text=text, language=['en', 'es', 'te'])
    anonymized_result = anonymizer.anonymize(text=text, analyzer_results=results)
    return anonymized_result



async def get_claims(transcript: str) -> List[str]:
    LINK_PHRASES = [
        "is a sign of", "is related to", "may indicate", "could suggest",
        "consistent with", "might be due to", "is due to", "is because of"
    ]   
    doc = nlp(transcript.lower())
    claims = []

    for sent in doc.sents:
        for phrase in LINK_PHRASES:
            if phrase in sent.text:
                claims.append(sent.text.strip())
                break

    return claims


async def find_doctors(transcripts: list):
    """Returns dict with doctors information - json?"""



async def transcribe_audio(audio_chunk: bytes) -> str:
    with tempfile.NamedTemporaryFile(suffix=".wav", delete=True) as temp_audio:
        temp_audio.write(audio_chunk)
        temp_audio.flush()

        with open(temp_audio.name, "rb") as f:
            translation = client.audio.translations.create(
                file=(temp_audio.name, f),
                model="whisper-large-v3",
                prompt="use clinical terminology and correct spelling for conditions, medications, and procedures in a medical context",
                response_format="json",
                temperature=0.0 
            )

        anonymized_text = anonymize(translation.text)
        print(anonymized_text)
        TRANSCRIPTS.append(anonymized_text)
        return anonymized_text

@app.websocket("/ws/audio")
async def audio_stream(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            audio_chunk = await websocket.receive_bytes()  
            transcription = await transcribe_audio(audio_chunk)
            claims = get_claims(transcription)
            # add func to take claims and output:

            # {
            #     "claim": "...",
            #     "sources": [],
            #     "validity": 1,
            #     "question" "...",
            # }

            # return dict to front end for output



    except WebSocketDisconnect:
        print("Client disconnected")
    except Exception as e:
        print("Error:", e)
        await websocket.close()
    finally:
        await find_doctors(TRANSCRIPTS)

