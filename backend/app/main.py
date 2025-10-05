from fastapi import FastAPI # type: ignore
from fastapi.middleware.cors import CORSMiddleware # type: ignore

# Import routes
from app.routes import chat, voice, auth

import uvicorn # type: ignore
import logging

app = FastAPI(title="Chat API", description="FastAPI proxy for Ollama chat")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", 
                   "http://localhost:3000",
                    "https://unhypothecated-elanor-sanguivorous.ngrok-free.dev ", # thêm host ngrok ở đây
                   ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Logging middleware
@app.middleware("http")
async def log_requests(request, call_next):
    logging.info(f"{request.method} {request.url}")
    response = await call_next(request)
    logging.info(f"Response status: {response.status_code}")
    return response

# Root check
@app.get("/")
def root():
    return {"message": "Chat API is running", "status": "healthy"}

#  router including
app.include_router(chat.router, prefix="/chat", tags=["chat"])
app.include_router(voice.router, prefix="/voice", tags=["voice"])
app.include_router(auth.router, prefix="/auth", tags=["auth"])

# Khởi động dev
if __name__ == "__main__":
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, workers=1)