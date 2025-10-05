from fastapi import APIRouter # type: ignore
from fastapi.responses import StreamingResponse # type: ignore
from app.schemas.chat_schema import ChatRequest
from app.services.ollama_service import call_ollama_stream, call_ollama_once, get_available_models

router = APIRouter()

@router.get("/models")
async def list_models():
    return await get_available_models()

@router.post("/stream")
async def chat(chat_request: ChatRequest, stream: bool = False):
    if stream:
        return StreamingResponse(call_ollama_stream(chat_request), media_type="text/event-stream")
    else:
        content = await call_ollama_once(chat_request)
        return {"response": content, "model": chat_request.model, "status": "success"}
