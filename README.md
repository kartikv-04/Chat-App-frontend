# 💬 Chat App Frontend

This is the **Frontend** of the Chat App built using **React** and **Socket.IO**. It connects to the backend via REST APIs and WebSockets to offer real-time messaging, authentication, and chat features.

Live backend: [Chat App Backend Repo](https://github.com/kartikv-04/Chat-App-backend)

---

## ⚙️ Features

- 🔐 Signup/Login with JWT
- 💬 Real-time chat using Socket.IO
- 🧠 Global state with Context API
- 🪄 Clean UI with responsive design
- 🧼 Form validation + toast notifications
- 🌍 Environment-based config using `.env`

---

## 📁 Folder Structure

```
frontend/
└── src/
    ├── assets/
    ├── components/
    ├── pages/
    ├── context/
    ├── services/
    ├── utils/
    ├── hooks/
    └── main.jsx
```

---

## 🛠️ Tech Stack

- **React**
- **Socket.IO Client**
- **Axios**
- **React Router**
- **TailwindCSS**
- **React Toastify**
- **Context API + useReducer**

---

## 🚀 Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/kartikv-04/Chat-App-frontend.git
cd Chat-App-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env` File

```env
VITE_API_URL=https://your-backend-api.com
VITE_SOCKET_URL=https://your-backend-api.com
```

> These values must match your backend deployment.

### 4. Run the Dev Server

```bash
npm run dev
```

App will start at `http://localhost:5173`

---

## 🧩 Pages & Routes

| Route         | Page             | Description           |
| ------------- | ---------------- | --------------------- |
| `/`           | Home             | If authenticated      |
| `/login`      | LoginPage        | Login user            |
| `/signup`     | SignupPage       | Register user         |
| `/chat/:id`   | ChatPage         | DM with specific user |

---

## 🔌 Socket.IO Events (Frontend)

| Event         | Description                      |
| ------------- | -------------------------------- |
| `connect`     | Establishes socket connection    |
| `sendMessage` | Emit message to server           |
| `message`     | Listen for incoming messages     |
| `disconnect`  | Clean up when user logs out      |

---

## 🛡️ Auth Flow

- Auth token saved in HTTP-only cookie
- Auto redirect based on login state
- Protected routes with custom `<PrivateRoute />`
- Global state stored in context

---

## 🧪 Testing

- Manual via browser (or Postman for APIs)
- Add unit/UI testing with **Jest**, **React Testing Library** (optional)

---

## 🔧 Deployment

- Use **Vercel** or **Netlify**
- Make sure to update your `.env` with production backend URLs

---

## 👨‍💻 Author

Made with 🧠 + 🔥 by [Kartik Varia](https://github.com/kartikv-04)

---

## 📜 License

MIT — do your thing, just give credit 😄
