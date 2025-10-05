from pydantic import BaseModel # type: ignore
from typing import List

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    messages: List[ChatMessage] = []
    model: str = "mistral:7b-instruct"
