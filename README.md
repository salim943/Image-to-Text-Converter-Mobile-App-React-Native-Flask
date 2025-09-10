# Image-to-Text Converter (Mobie App)

This project is a cross-platform **Image-to-Text (OCR)** app built with **React Native (frontend)** and **Flask (backend)**.  
It allows users to upload or capture images/PDFs, process them using **Tesseract OCR**, and download the extracted text in multiple formats (Word or Text).

---

## Features
- Upload image or PDF files
- Capture image directly using device camera
- Extract text using **OCR (Tesseract)**
- Supports multiple languages (English, French, German, Arabic, Hindi, etc.)
- Download extracted text as `.docx` or `.txt`
- Mobile-friendly UI with **React Native**
- Flask backend with **Flask-CORS** support

---

## Tech Stack
**Frontend**: React Native, Expo, Axios  
**Backend**: Flask, Flask-CORS, Tesseract OCR, python-docx  
**Other**: ngrok (for tunneling backend in development)

---

## Installation & Setup

### 1. Backend (Flask)
```bash
# Clone repo
git clone https://github.com/your-username/image-to-text-ocr.git
cd image-to-text-ocr/backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # (Linux/Mac)
venv\Scripts\activate     # (Windows)

# Install dependencies
pip install -r requirements.txt

# Run Flask server
flask run


Frontend (React Native)

cd ../frontend

# Install dependencies
npm install

# Start Expo development server
npx expo start



