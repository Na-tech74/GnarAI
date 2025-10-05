Tải Ollama tại: 👉 https://ollama.com/download

Kiểm tra version:

ollama --version


Lần đầu tải model:

ollama pull mistral:7b-instruct


Chạy model:

ollama run mistral:7b-instruct

2️⃣ Run Back-end
Bước 1: Vào thư mục backend
cd BE

Bước 2: Tạo virtual environment

👉 Nếu đã có thư mục venv thì xóa đi trước:

rm -rf venv   # Linux/Mac
rd /s /q venv # Windows CMD


Tạo lại:

python -m venv venv

Bước 3: Kích hoạt venv

Linux/Mac:

source venv/bin/activate


Windows CMD:

venv\Scripts\activate.bat


Windows PowerShell:

venv\Scripts\Activate.ps1

Bước 4: Cài dependencies
pip install -r requirements.txt
pip install python-multipart

Bước 5: Khởi tạo database (nếu cần)
python app/init_db.py

Bước 6: Run FastAPI
uvicorn app.main:app --host 127.0.0.1 --port 8000 --workers 1

3️⃣ Run Front-end
Bước 1: Vào thư mục frontend
cd FE

Bước 2: Cài node modules
npm install

Bước 3: Run dev
npm run dev

4️⃣ Extra: Flask Speech Recognition API

File requirements-speech.txt:

flask==2.3.3
flask-cors==4.0.0
speechrecognition==3.10.0
pyaudio==0.2.11
pocketsphinx==5.0.0


Cài đặt:

pip install flask flask-cors speechrecognition pyaudio pocketsphinx


Trên Windows có thể cần:

pip install pipwin
=======
# GnarAI
Đồ án chuyên ngành CNTT
>>>>>>> 43ff44d077a74e1d6208d027ce57538d7cb5b6d8
