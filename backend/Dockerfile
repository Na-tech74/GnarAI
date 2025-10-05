FROM python:3.11-slim

WORKDIR /app

# Cài các thư viện cần thiết để build pyaudio
RUN apt-get update && apt-get install -y \
    gcc \
    portaudio19-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .

RUN pip install --no-cache-dir --default-timeout=100 --retries=20 -r requirements.txt

# Copy toàn bộ project (gồm app/, .env, v.v...)
COPY . .

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
