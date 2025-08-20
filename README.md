# 📝 Todo App (Next.js + React Query + Redux Toolkit)

A full-featured demo Todo application showcasing a **modern React stack**:

## 🎥 App Demo

<p align="center">
  <img src="./demo/demo.gif" alt="App Demo"/>
</p>
<br/>

- ⚡ [Next.js 14 (App Router)](https://nextjs.org/) for frontend + backend (API routes)
- 🔄 [React Query](https://tanstack.com/query/latest) for server state management (fetching, caching, mutations)
- 🗂 [Redux Toolkit](https://redux-toolkit.js.org/) for client-only UI state (filter, auth, settings)
- 🗄 [Supabase](https://supabase.com/) for backend as a service, authentication & database (optional integration)
- 🎨 [Tailwind CSS](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/) for styling and UI components
- ⚡ [Vite](https://vitejs.dev/) for fast local development (when used outside Next.js context)

This project demonstrates **clean separation of concerns**:

- **React Query** → handles server state (todos API, mutations, cache invalidation).
- **Redux Toolkit** → handles local UI state (filter, auth session, settings).
- **Next.js API routes** → mock backend for todos, login, and testing.
- **Supabase** → can replace mock API with a real backend.
- **Tailwind + DaisyUI** → for scalable, consistent UI design.
- **Vite** → optional setup for building micro frontends or standalone tools.

---

## 🚀 Features

- ✅ **Todo CRUD**
  - Add, toggle, and delete todos
  - Filter by **All / Active / Completed**
  - Local mock API via Next.js routes
- 👤 **Authentication**
  - Mock login API (`/api/login`)
  - Protected routes via `AuthGuard`
  - Session stored in Redux + localStorage
- ⚙️ **Settings**
  - Light / Dark theme
  - Hide completed todos
  - Page size (limit todos displayed)
  - Persisted in localStorage
- 📖 **About Page**
  - Explains app architecture and stack
- 🧪 **Mock API**
  - `/api/mock` POST endpoint for testing JSON payloads
- 🛠 **Developer Tools**
  - React Query Devtools included

---

## ⚡ Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔐 Authentication Flow

1. User logs in via `/login` with demo credentials.
2. `/api/login` returns a fake token + user info.
3. Redux stores the session, persisted in `localStorage`.
4. `AuthGuard` protects routes (e.g., `/` Home).
5. Header nav shows **Login** or **Logout** dynamically.

---

## ⚙️ Settings

- Theme: Light / Dark (applied globally via `data-theme` on `<html>`).
- Hide completed todos.
- Page size (limit number of todos shown).
- Stored in Redux + persisted to localStorage.

---

## 🛠 Development Notes

- Error boundaries and toast notifications can be added for better UX.
- Replace inline styles with TailwindCSS or DaisyUI components.
- Replace mock login with [NextAuth.js](https://next-auth.js.org/) or JWT-based auth.
- Replace in-memory todos API with a real DB (e.g., Supabase, Prisma + SQLite/Postgres).
- Consider using Vite if extracting features into standalone micro frontends.

---

## 📜 License

MIT © 2025 [[Mohammed Ghabyen](https://github.com/mhmdgh92)]
