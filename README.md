# JanSahayak AI: Voice AI for Bharat 🇮🇳

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg) 
[![Murf Falcon](https://img.shields.io/badge/TTS-Murf%20Falcon-6366F1)](https://murf.ai/api/docs/text-to-speech/streaming) 
[![LiveKit](https://img.shields.io/badge/Transport-LiveKit-002cf2)](https://docs.livekit.io) 
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/) 
[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?logo=python&logoColor=white)](https://www.python.org/)

**JanSahayak AI** is a bilingual (Hindi-English) voice agent designed to help Indian citizens navigate government schemes. Built in 10 days using the Murf Falcon TTS and LiveKit Agents starter, it removes digital literacy barriers by providing a conversational interface over a standard phone call or web app.

[Read the full 10-Day Journey Blog Post](https://jansahayakaiblog.netlify.app/)  
[View the LinkedIn Post](https://www.linkedin.com/posts/gaurkrishna_voiceforbharat-murfai-murffalcon-activity-7494459479808200704-7Kc8?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEeXwqkBiwQexRMINPwZHnRyDz_LrsRgAag)

---

## 🌟 The Problem & The Solution
Millions of Indians are eligible for government welfare schemes (PM-KISAN, Ayushman Bharat, etc.) but miss out due to complex, English-heavy PDFs and portals. JanSahayak AI solves this by offering a voice-first interface where users can ask questions naturally in Hindi, English, or Hinglish.

### Key Features
- **Bilingual Conversations:** Seamlessly switches between Hindi, English, and Hinglish using Devanagari script recognition and a curated dictionary.
- **Voice-First Frontend (Stitch UI):** A completely custom-built, modern UI with clear interaction states (Ready, Connecting, Listening, Speaking), animated pulsing microphone visuals, and quick suggestion chips.
- **Real-Time Call Analytics:** Live dashboard tracking total sessions, success rates, failures, and escalated calls via SQLite integration.
- **Memory with Consent:** Remembers returning users safely using local SQLite storage, strictly adhering to privacy constraints (no PII stored).
- **Proactive Outbound Calls:** Reaches out to citizens regarding scheme deadlines using Twilio integration.
- **Human Escalation & Specialist Handoff:** Identifies complex scenarios and seamlessly routes calls to specialized agents or humans.

---

## 🏗️ Architecture

The system utilizes four core building blocks working seamlessly in real-time:

```mermaid
flowchart LR
    A[🎙️ User speaks] -->|audio| B[Deepgram Nova-3 STT]
    B -->|text| C[Google Gemini 3.5 Flash]
    C -->|response text| D[Murf Falcon TTS]
    D -->|audio| E[LiveKit Transport]
    E -->|stream| F[🔊 User hears]

    style A fill:#444441,stroke:#888780,color:#fff
    style B fill:#185FA5,stroke:#85B7EB,color:#fff
    style C fill:#534AB7,stroke:#AFA9EC,color:#fff
    style D fill:#0F6E56,stroke:#5DCAA5,color:#fff
    style E fill:#D85A30,stroke:#F0997B,color:#fff
    style F fill:#444441,stroke:#888780,color:#fff
```

**Tech Stack:** 
- **Transport:** LiveKit Agents
- **STT:** Deepgram Nova-3 (Multilingual)
- **LLM:** Google Gemini 3.5 Flash
- **TTS:** Murf Falcon (Anisha voice - hi-IN/en-IN)
- **Frontend:** Next.js + React + Tailwind CSS
- **Backend / Database:** Python, SQLite, Twilio

---

## 🚀 Quickstart

### Prerequisites
- **Python** 3.10+
- **uv** (fast Python package manager)
- **Node.js** 18+ and **pnpm**
- A **LiveKit Cloud** project
- Accounts/API keys for Deepgram, Google Gemini, Murf AI, and Twilio

### Step 1: Clone the repository
```bash
git clone https://github.com/murf-ai/murf-livekit-starter.git
cd murf-livekit-starter
```

### Step 2: Set up environment variables
Create `.env.local` in both `backend/` and `frontend/`. You will need:
- `LIVEKIT_URL`, `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET`
- `MURF_API_KEY`
- `DEEPGRAM_API_KEY`
- `GOOGLE_API_KEY`

### Step 3: Install dependencies
```bash
# Backend
cd backend
uv sync
uv run python src/agent.py download-files

# Frontend
cd ../frontend
pnpm install
```

### Step 4: Run the Application
**Option A - All-in-one (from repo root):**
```bash
# macOS/Linux
chmod +x start_app.sh
./start_app.sh

# Windows (PowerShell)
.\start_app.ps1
```

**Option B - Separate terminals:**
```bash
# Terminal 1 — LiveKit Server
livekit-server --dev

# Terminal 2 — Backend agent
cd backend && uv run python src/agent.py dev

# Terminal 3 — Frontend
cd frontend && pnpm dev
```
Open **http://localhost:3000** in your browser to experience the JanSahayak UI.

---

## 📊 The Custom Analytics Dashboard
JanSahayak AI includes a built-in Call Analytics Dashboard (accessible via the `Data` tab or `/dashboard`). It directly connects to the backend SQLite database (`caller_data.db`) to provide real-time metrics on:
- **Total Sessions** & **Success Rates**
- **Failed & Escalated Calls**
- **Call Volume Trends**
- **System Information** (Status, STT/TTS engine, LLM in use)
- **Live Call History logs**

---

## 🛠️ Extending the Project

- **Change the System Prompt:** Edit `SYSTEM_PROMPT` in `backend/src/agent.py` to modify the assistant's primary goals.
- **Add New Tools:** Simply add an async method decorated with `@function_tool` to the `Assistant` class in `agent.py`.
- **Change TTS Voice:** Modify the `tts=murf.TTS(...)` initialization in `agent.py`.

---

## 📜 Links & Resources
- [JanSahayak AI 10-Day Journey Blog](https://jansahayakaiblog.netlify.app/)
- [Murf API Docs](https://murf.ai/api/docs)
- [LiveKit Agents SDK](https://docs.livekit.io/agents)
- [Deepgram STT Docs](https://developers.deepgram.com)

*Built as part of 10 Days of Voice Agents — VoiceForBharat Edition by Murf AI, powered by Murf Falcon, the fastest Text-to-Speech API.*
