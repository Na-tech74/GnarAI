import httpx # type: ignore
from fastapi import HTTPException # type: ignore
from typing import AsyncGenerator
from app.schemas.chat_schema import ChatRequest  

OLLAMA_BASE_URL = "http://localhost:11434"

async def get_available_models():
    try:
        async with httpx.AsyncClient() as client:
            res = await client.get(f"{OLLAMA_BASE_URL}/api/tags")
            if res.status_code == 200:
                return res.json()
            raise HTTPException(500, "Failed to fetch models")
    except httpx.RequestError:
        raise HTTPException(503, "Ollama service unavailable")

async def call_ollama_stream(chat_request: ChatRequest) -> AsyncGenerator[str, None]:
    payload = {
        "model": chat_request.model,
        "messages": [
            {"role": "system", "content": "Bạn là trợ lý AI nói tiếng Việt!"},
            *[msg.dict() for msg in chat_request.messages],
            {"role": "user", "content": chat_request.message}
        ],
        "stream": True
    }
    async with httpx.AsyncClient(timeout=None) as client:
        async with client.stream("POST", f"{OLLAMA_BASE_URL}/api/chat", json=payload) as response:
            if response.status_code != 200:
                raise HTTPException(response.status_code, f"Ollama API error: {response.text}")
            async for chunk in response.aiter_text():
                if chunk.strip():
                    yield chunk

async def call_ollama_once(chat_request: ChatRequest) -> str:
    payload = {
        "model": chat_request.model,
        "messages": [
            {"role": "system", "content": "Bạn là trợ lý AI nói tiếng Việt!"},
            *[msg.dict() for msg in chat_request.messages],
            {"role": "user", "content": chat_request.message}
        ],
        "stream": False
    }
    async with httpx.AsyncClient(timeout=120.0) as client:
        res = await client.post(f"{OLLAMA_BASE_URL}/api/chat", json=payload)
        if res.status_code != 200:
            raise HTTPException(res.status_code, f"Ollama API error: {res.text}")
        data = res.json()
        return data["message"]["content"]
