# from groq import Groq
# from dotenv import load_dotenv
# import os
# load_dotenv()
# client = Groq(api_key=os.getenv("GROQ_KEY"))

# with open("Rev.mp3", "rb") as f:
#     translation = client.audio.translations.create(
#         file=("Rev.mp3", f),
#         model="whisper-large-v3",
#         prompt="use clinical terminology and correct spelling for conditions, medications, and procedures in a medical context",
#         response_format="json",
#         temperature=0.0 
#     )

# print(translation.text)

import spacy
from typing import List

nlp = spacy.load("en_core_web_sm")

transcript = """
Your cough is a sign of bronchitis.
The patient has a fever and chills.
Your itchy throat is related to your cancer.
He reports general fatigue.
Headaches may indicate a neurological issue.
I'm feeling good right now
"""


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

print(claims)







# import asyncio
# import websockets
# import sounddevice as sd
# import numpy as np

# # Configuration
# SAMPLE_RATE = 16000
# CHUNK_DURATION = 0.5  # seconds
# CHUNK_SIZE = int(SAMPLE_RATE * CHUNK_DURATION)

# # Global asyncio queue to buffer audio chunks
# audio_queue = asyncio.Queue()

# # Callback for the audio stream
# def audio_callback(indata, frames, time, status):
#     if status:
#         print("Audio stream status:", status)
#     audio_bytes = indata.tobytes()
#     asyncio.run_coroutine_threadsafe(audio_queue.put(audio_bytes), asyncio.get_event_loop())

# async def send_and_receive_audio():
#     uri = "ws://localhost:8000/ws/audio"

#     async with websockets.connect(uri) as websocket:
#         print("🎙️  Mic streaming started. Press Ctrl+C to stop.\n")

#         # Start the audio stream
#         with sd.InputStream(samplerate=SAMPLE_RATE, channels=1, dtype='int16',
#                             blocksize=CHUNK_SIZE, callback=audio_callback):
#             try:
#                 while True:
#                     # Get audio from the queue and send to WebSocket
#                     if not audio_queue.empty():
#                         chunk = await audio_queue.get()
#                         await websocket.send(chunk)

#                     # Try to receive transcriptions (non-blocking)
#                     try:
#                         response = await asyncio.wait_for(websocket.recv(), timeout=0.1)
#                         if response.strip():
#                             print("📝 Transcription:", response)
#                     except asyncio.TimeoutError:
#                         pass  # No message received in this cycle
#             except asyncio.CancelledError:
#                 pass

# if __name__ == "__main__":
#     try:
#         asyncio.run(send_and_receive_audio())
#     except KeyboardInterrupt:
#         print("\n⏹️  Stopped mic streaming.")
