from fastapi import APIRouter, UploadFile, File, Form # type: ignore
import tempfile, os
import speech_recognition as sr # type: ignore
from app.services.speech_service import recognize_speech_from_audio

router = APIRouter()

@router.post("/record")
def record_voice(duration: int = 5, language: str = "vi-VN"):
    recognizer = sr.Recognizer()
    try:
        with sr.Microphone() as source:
            recognizer.adjust_for_ambient_noise(source)
            audio_data = recognizer.listen(source, timeout=1, phrase_time_limit=duration)
        return recognize_speech_from_audio(audio_data, language)
    except Exception as e:
        return {"success": False, "error": str(e)}

@router.post("/upload")
async def upload_voice(audio: UploadFile = File(...), language: str = Form("vi-VN")):
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as tmp:
            tmp.write(await audio.read())
            tmp_path = tmp.name

        recognizer = sr.Recognizer()
        with sr.AudioFile(tmp_path) as source:
            audio_data = recognizer.record(source)
        os.unlink(tmp_path)
        return recognize_speech_from_audio(audio_data, language)
    except Exception as e:
        return {"success": False, "error": str(e)}
