# Restaurant Menu Manager

- Live demo: https://restaurant-menu-manager-nine.vercel.app/
- API: https://restaurant-menu-api-65sw.onrender.com
- Code: https://github.com/abhijithr-1010/Restaurant-Menu-Manager

## Tech Stack
- MongoDB Atlas
- Express.js
- React (Vite) with Material UI
- Node.js

## Features
- Dashboard table with name, description, category, price and availability
- Add Dish and Edit Dish form with validation (edit form is pre-filled)
- Availability switch that saves to the database
- Delete with confirmation dialog
- Responsive layout

## Run Locally

### Backend
```
cd server
npm install
```
Copy `.env.example` to `.env` and set `MONGO_URI`, then:
```
npm run dev
```

### Frontend
```
cd client
npm install
```
Create `client/.env` with `VITE_API_URL=http://localhost:5000`, then:
```
npm run dev
```
Open http://localhost:5173

## API Routes
| Method | Route | Purpose |
|--------|-------|---------|
| GET | /api/dishes | List all dishes |
| GET | /api/dishes/:id | Get one dish |
| POST | /api/dishes | Add a dish |
| PUT | /api/dishes/:id | Update a dish |
| PATCH | /api/dishes/:id/availability | Change availability |
| DELETE | /api/dishes/:id | Delete a dish |