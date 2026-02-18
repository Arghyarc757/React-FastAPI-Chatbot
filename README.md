# React FastAPI Chatbot

A modern, responsive AI chat interface with integrated web search functionality. This chatbot provides a clean UI combining conversational AI with real-time search capabilities powered by Qwen2.5 and Tavily Search API

## ✨ Features

- **Real-time AI Responses** - Stream AI responses as they're generated
- **Integrated Web Search** - AI can search the web for up-to-date information
- **Conversation Memory** - Maintains context throughout your conversation
- **Search Process Transparency** - Visual indicators show searching, reading, and writing stages
- **Responsive Design** - Clean, modern UI that works across devices

## 🏗️ Architecture

This chatbot follows a client-server architecture:

### Client (React + Vite)
- Modern React application built with Vite
- Real-time streaming updates using Server-Sent Events (SSE)
- Components for message display, search status, and input handling

### Server (FastAPI + LangGraph)
- Python backend using FastAPI for API endpoints
- LangGraph implementation for conversation flow with LLM and tools
- Integration with Tavily Search API for web searching capabilities
- Server-Sent Events for real-time streaming of AI responses

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Python 3.10+
- Tavily API key
- Ollama installed (for Qwen2.5 model) or Google Generative AI API key (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd React_FastApi_Chatbot

2. **Set up the server**
   ```bash
   cd server
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt

3. **Configure environment variables**  
   Create a `.env` file in the server directory:
   ```
   TAVILY_API_KEY=your_tavily_api_key
   GOOGLE_API_KEY=your_google_generative_ai_key  # Optional, if using Gemini instead of Ollama
   ```

4. **Set up the client**
   ```bash
   cd client
   npm install
   ```

### Running the Application

1. **Start the server**
   ```bash
   cd server
   uvicorn app:app --reload

2. **Start the client**
   ```bash
   cd client
   npm run dev
   ```

3. **Open your browser** and go to **http://localhost:3000**. The client proxies API requests to the server (default `http://localhost:8000`).   

## 🔍 How It Works
Qwen2.5 (via Ollama) or Google Generative AI (Gemini)
1. **User sends a message** through the chat interface
2. **Server processes the message** using GPT-4o
3. **AI decides** whether to use search or respond directly
4. If search is needed:
   - Search query is sent to Tavily API
   - Results are processed and provided back to the AI
   - AI uses this information to formulate a response
5. **Response is streamed** back to the client in real-time
6. **Search stages are displayed** to the user (searching, reading, writing)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

##Built with [Vite](https://vitejs.dev/), [React](https://reactjs.org/), [FastAPI](https://fastapi.tiangolo.com/), and [LangGraph](https://github.com/langchain-ai/langgraph)
- Powered by [Qwen2.5](https://ollama.ai/) (via Ollama), [Google Generative AI](https://ai.google.dev/),xity.ai](https://www.perplexity.ai/)
- Built with [Vite](https://vitejs.dev/), [React](https://reactjs.org/), [FastAPI](https://fastapi.tiangolo.com/), and [LangGraph](https://github.com/langchain-ai/langgraph)
- Powered by [OpenAI GPT-4o](https://openai.com/) and [Tavily Search API](https://tavily.com/)
