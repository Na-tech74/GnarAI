from datetime import datetime
import speech_recognition as sr # type: ignore

def recognize_speech_from_audio(audio_data, language="vi-VN"):
    recognizer = sr.Recognizer()
    try:
        text = recognizer.recognize_google(audio_data, language=language)
        return {
            "success": True,
            "text": text,
            "confidence": 0.9,
            "language": language,
            "timestamp": datetime.now().isoformat()
        }
    except sr.UnknownValueError:
        return {"success": False, "error": "Không thể nhận diện giọng nói"}
    except sr.RequestError as e:
        try:
            text = recognizer.recognize_sphinx(audio_data)
            return {
                "success": True,
                "text": text,
                "confidence": 0.7,
                "language": "en-US",
                "timestamp": datetime.now().isoformat()
            }
        except:
            return {"success": False, "error": f"Lỗi dịch vụ nhận diện: {e}"}
    except Exception as e:
        return {"success": False, "error": f"Lỗi không xác định: {e}"}
