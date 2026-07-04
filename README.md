# Forge 2 Kanban Board

A tiny Trello-style Kanban board built with **Laravel API (SQLite)** and **React (Vite)**.
This app was planned by Hermes and written by OpenClaw.

## Features (Working)
- **Boards → Lists → Cards**: Create a board, add lists (To-Do / Doing / Done), add cards to lists.
- **Card Details**: Title, description, editable.
- **Tags / Labels**: Add colored tags to cards.
- **Assign Member**: Assign users to a card.
- **Due Date**: Set due dates (visually flagged when overdue).

## Tech Stack
- Backend: Laravel 11, PHP 8.2+, SQLite.
- Frontend: React 18, Vite, Tailwind CSS v4, Lucide React icons.

## How to Run Locally

### 1. Backend (Laravel API)
Open a terminal in the `backend` folder:
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```
The API will run at `http://localhost:8000`.

### 2. Frontend (React UI)
Open another terminal in the `frontend` folder:
```bash
cd frontend
npm install
npm run dev
```
The UI will run at `http://localhost:5173`. Open this URL in your browser.

## Models Used
- **Hermes (Brain)**: `google/gemini-3.1-pro` - Used for deep reasoning, scaffolding the implementation plan, and breaking the project down into subtasks for OpenClaw.
- **OpenClaw (Coder)**: `google/gemini-2.5-flash` - Used for fast, iterative coding, executing shell commands, and scaffolding the Laravel + React apps.

## Live URL
[Live App (Frontend)](https://forge2-qualifier-01dhruvtripathi-vm.vercel.app/)
