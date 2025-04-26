# DeepChat

A modern, responsive AI chat application powered by Google Gemini Flash.

## 🚀 Features

- **Real-time Chat**: Instant messaging with AI responses using Socket.io
- **Recent Messages**: Access to your most recent conversations
- **Responsive Design**: Works seamlessly across desktop and mobile
- **User Authentication**: Secure login and session management
- **Customizable AI Responses**: Adjust the AI's tone and response style

## 💻 Tech Stack

### Frontend
- **React**
- **TypeScript**
- **Zustand**: Lightweight state management
- **React Query**: Data fetching and caching
- **React Hook Form**: Efficient form handling

### Backend
- **Express**:
- **Socket.io**: Real-time bidirectional communication
- **PostgreSQL**: Relational database for data storage
- **Neon DB**: PostgreSQL hosting in the cloud

### APIs
- **Google Gemini Flash**: AI language model for intelligent responses

## 🛠️ Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/chatboi-ai.git
cd chatboi-ai
```

2. Install dependencies
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

3. Set up environment variables
Create `.env` files in both the client and server directories
- The backend requires
```md
GEMINI_KEY
PORT=8000
JWT_SECRET
SALT
DATABASE_URL
```
- The frontend requires
```
URL
```

5. Start the development servers
```bash
# Start backend server
cd server
npm run dev

# Start frontend server in another terminal
cd client
npm run dev
```

6. Visit `http://localhost:3000` in your browser

## 📝 Usage

1. Register a new account or login with existing credentials
2. Start chatting with DeepChat
3. Type your message and receive AI-powered responses
4. Your most recent messages will be available when you return

## 🔮 Future Plans

- Full conversation history and management
- Voice interaction capabilities
- Multi-language support
- Custom AI training for specialized domains
- Theme customization options

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👏 Acknowledgements

- [Google Gemini API](https://ai.google.dev/) for AI capabilities
- [Neon DB](https://neon.tech/) for PostgreSQL hosting
