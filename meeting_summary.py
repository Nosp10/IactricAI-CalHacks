import os
from dotenv import load_dotenv
import anthropic

load_dotenv()

api_key = os.getenv("ANTHROPIC_API_KEY")

client = anthropic.Anthropic(api_key=api_key)

async def summarize_transcript(text: str) -> str:
    prompt = (
    "The following is a transcript of a conversation between a doctor and a patient.\n"
    "Please write a clear, concise summary of the key medical information discussed, using layman's terms where possible but without omitting important clinical details.\n\n"
    "Your summary should include:\n"
    "- The patient's main concern or symptoms\n"
    "- Any diagnosis or suspected condition the doctor mentioned\n"
    "- Any tests or procedures that were ordered or discussed\n"
    "- Treatment plans, prescriptions, or instructions given by the doctor\n"
    "- Follow-up recommendations (e.g., next visit, warning signs to watch for)\n\n"
    "Format the summary in 3 to 5 bullet points. Prioritize clarity and accuracy.\n\n"
    f"{text}\n\n"
    "Summary:"
)


    response = client.messages.create(
        model="claude-3-haiku-20240307",
        max_tokens=150,
        temperature=0.5,
        messages=[
            {"role": "user", "content": prompt}
        ]
    )

    return response.content[0].text.strip()
