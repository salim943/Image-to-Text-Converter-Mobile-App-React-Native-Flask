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

### Backend (Flask)
```bash

# Install dependencies
pip install -r requirements.txt

# Run Flask server
flask run
```

### Frontend (React Native)
```bash

# Install dependencies
npm install

# Start Expo development server
npx expo start
```

## Download

- [Download APK](https://www.salimwireless.com/p/external-links.html#link12)

