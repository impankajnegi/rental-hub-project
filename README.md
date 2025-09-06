# **Rental Hub (Codename)**

This project consists of a **Node.js + TypeScript backend** and a **React frontend**, both containerized using Docker and orchestrated with Docker Compose. It supports **Google OAuth authentication**, **session management**, **environment variable handling via `.env`**, and **live reload** for development.

---

## **📂 Project Structure**
```
/Rental_Hub_Codename
│
├── server/          # Backend service (Node.js + TypeScript)
│   ├── src/         # Source files (TypeScript)
│   ├── dist/        # Compiled JS output
│   ├── .env         # Backend environment variables
│   ├── package.json
│   └── tsconfig.json
│
├── ui-user/          # Frontend service (React)
│   ├── src/         # React source code
│   ├── public/
│   ├── .env         # Frontend environment variables
│   └── package.json
│
├── docker-compose.yml
├── Dockerfile       # (One for each service or combined as per setup)
└── README.md
```

---

## **🛠 Tech Stack**
- **Backend:** Node.js, TypeScript, Express, Passport (Google OAuth), dotenv, session management
- **Frontend:** React (Vite/CRA)
- **Authentication:** Google OAuth 2.0 via Passport
- **Environment Variables:** `.env` files
- **Docker:** Multi-container setup using Docker Compose
- **Dev Tools:** `nodemon`, `ts-node`

---

## **⚙️ Features**
✔ Google OAuth Authentication  
✔ Secure Session Handling (with `sameSite` and `secure` cookies)  
✔ CORS Configured for Frontend  
✔ TypeScript for Backend with Strict Type Checking  
✔ Live Reload in Docker (Development)  
✔ `.env` Support for Both Frontend & Backend  
✔ Dockerized Frontend and Backend with `docker-compose`  

---

## **📦 Environment Variables**
Create a `.env` file in the **server/** folder with:

```
PORT=3000
NODE_ENV=development
NX_SESSION_SECRET=your-session-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_OAUTH_REDIRECT_URI=http://localhost:3000/callback
WEBSITE_URL=http://localhost:5173
```

For **frontend/client/.env**:
```
VITE_API_URL=http://localhost:3000
```

---

## **▶️ Running Locally (Without Docker)**
### **Backend**
```bash
cd server
npm install
npm run dev
```

### **Frontend**
```bash
cd client
npm install
npm run dev
```

---

## **🐳 Running with Docker Compose**
Make sure you have **Docker** and **Docker Compose** installed.

### **Build and Start**
```bash
docker-compose up --build
```

### **Stop Containers**
```bash
docker-compose down
```

---

## **📜 Scripts**
### **Backend (`server/package.json`):**
- `npm run dev` → Start backend in dev mode with hot reload
- `npm run build` → Compile TypeScript
- `npm start` → Run compiled JavaScript from `dist`

---

## **🔥 Common Issues**
### **1. Unknown file extension ".ts"**
Use `ts-node` for development:
```json
"dev": "nodemon --watch \"src/**/*.ts\" --exec \"npx ts-node --esm\" src/server.ts"
```

### **2. esbuild platform mismatch in Docker**
Do **NOT copy node_modules** from host to container. Instead:
- Add `.dockerignore`:
```
node_modules
dist
```
- Use anonymous volume for node_modules in `docker-compose.yml`:
```yaml
volumes:
  - ./server:/app
  - /app/node_modules
```

---

## **✅ Best Practices Implemented**
✔ TypeScript strict mode  
✔ Session security for production  
✔ Dockerized setup for consistency  
✔ `.env` handling in containers using `env_file`  
✔ Hot reload with `nodemon` inside Docker  

---

## **🔗 API Endpoints**
- `GET /auth` → Initiates OAuth flow
- `GET /google` → Google authentication route
- `GET /callback` → Google OAuth callback
- `GET /login/success` → Get authenticated user info
- `GET /error` → Authentication error

---

## **📌 To-Do**
- ✅ Add persistent database (e.g., PostgreSQL / MongoDB)
- ✅ Add frontend integration for login flow
- ✅ Production-ready Docker setup with multi-stage build

---
