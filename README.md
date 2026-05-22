# Discord Clone

Real-time messaging app (simplified Discord) built for a technical training task.

## Tech Stack

- **Frontend:** React, Axios, Socket.io-client, Pure CSS
- **Backend:** Express, Socket.io, MongoDB (Mongoose), JWT

## Project Structure

```
discord-clone/
├── client/                 # React frontend
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── api/            # Axios config
│   │   ├── components/     # UI pieces (Loading, Avatar, etc.)
│   │   ├── context/        # Auth & Socket providers
│   │   ├── hooks/          # Shared hooks
│   │   ├── utils/          # Helpers (avatar, errors)
│   │   ├── pages/          # Login, Register, Chat
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/                 # Express backend
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Channel.js
│   │   └── Message.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── channels.js
│   ├── socket/             # Socket.io handlers
│   ├── utils/              # Auth & seed helpers
│   ├── config.js
│   ├── index.js
│   ├── .env.example
│   └── package.json
├── package.json            # Run both with: npm run dev
└── README.md
```

## Setup

### 1. MongoDB Atlas

Create a free cluster and copy your connection string into `server/.env` (see `server/.env.example`).

### 2. Environment

```bash
cd server
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret
```

### 3. Install & Run

```bash
# From project root
npm install
cd server && npm install && cd ..
cd client && npm install && cd ..

npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Features

- Register & login (JWT)
- Multiple channels (general, random, help)
- Real-time chat (Socket.io)
- Discord-inspired UI (Pure CSS)

## Skills Used

React, Express, Axios, Socket.io, MongoDB, Mongoose, JWT, bcrypt, Pure CSS, REST API, WebSockets, Git
