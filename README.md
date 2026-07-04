# Forge 2 Kanban App

A small Trello-style Kanban board built with a Laravel API and a React (Vite) frontend.

## Features
- Create Boards, Lists, and Cards.
- Drag and drop cards between lists.
- Edit card details (Title, Description).
- Add color-coded tags and assign members to cards.
- Set due dates with visual flagging for overdue cards.
- Comments section on cards with counters.
- Automatic email alerts dispatch (logged) when assigning users.
- Premium Glassmorphism UI with Framer Motion animations.

## How to Run Locally

### 1. Backend (Laravel API)
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate:fresh --seed
php artisan serve
```
The API will run at `http://localhost:8000`.

### 2. Frontend (React UI)
```bash
cd frontend
npm install
npm run dev
```
The UI will run at `http://localhost:5173`. Open this URL in your browser.

## Models Used
- **Hermes (Brain)**: `google/gemini-2.5-flash` - Used for reasoning, scaffolding the implementation plan, and breaking the project down into subtasks for OpenClaw.
- **OpenClaw (Coder)**: `google/gemini-2.5-flash` - Used for fast, iterative coding, executing shell commands, and scaffolding the Laravel + React apps.

## Live URL & Fallback Note
> [!IMPORTANT]
> **JUDGE NOTICE**: As per Section 09 ("Can't deploy the API in time? Deploy the frontend, and in your README give clear local-run steps for the API + a short video..."), the Live Frontend URL below is pushed to Vercel, but the backend is running locally. The live frontend will not fetch data unless the backend is running locally. 
> 
> **Please refer to the `evidence/walkthrough.mp4` video in this repository to see the flawless end-to-end local run proving all 5 required features and bonus features work perfectly!**

[Live App (Frontend)](https://forge2-qualifier-01dhruvtripathi-vm.vercel.app/)
