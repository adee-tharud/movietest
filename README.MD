# Frontend – Movie Showcase Application

This is the frontend of the Movie Showcase application built using **React + Vite**.
It provides a responsive UI and communicates with a PHP backend API.
The reason for using 1560px as the max-width here is because it is provided that way in the Figma UI.

---
## 🛠 Tech Stack

- React (Vite)
- JavaScript (ES6+)
- CSS (Responsive, custom styles)
- Fetch API
- Environment variables (Vite)
- Vitest for testing

## 🛠 Tech Stack

### Frontend
- React (Vite)
- JavaScript (ES6+)
- CSS (Responsive)
- Fetch API

### Backend
- PHP (Built-in development server)
- JSON file storage
- Native PHP functions

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone <https://github.com/adee-tharud/movietest.git>
cd <movietest>

start backend setup
```
### 2️⃣ Setup Backend

- Navigate to the `backend` directory:
  ```bash
  cd backend
  ```

- Start the PHP built-in server:
  ```bash
    php -S localhost:8000
    ```
- The backend API will be accessible at `http://localhost:8000`.


### 3️⃣ Setup Frontend
- Navigate to the `frontend` directory:
  ```bash
  cd ../frontend
  ```
- Install dependencies:
  ```bash
    npm install
    ```
- Start the development server:
    ```bash
        npm run dev
        ```
- The frontend application will be accessible at `http://localhost:5173` (or another port if specified).
### 4️⃣ Configure Environment Variables
- Create a `.env` file in the `frontend` directory.
- Add the backend API URL to the `.env` file:
  ```env
  VITE_API_BASE_URL=http://localhost:8000
  VITE_SHOWS_API_URL=https://api.tvmaze.com
  ```
### 5 unit test results
![apitest](/frontend/movietest/public/testresult.png)



