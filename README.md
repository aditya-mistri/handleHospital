# 🏥 Healthcare Management 

A full-featured backend system for a healthcare management application, built with Node.js, Express.js, Sequelize, and PostgreSQL. It supports user registration, authentication, and management of doctors, patients, and their mappings.

---

## 🔧 Tech Stack

- **Node.js + Express** — Server framework
- **TypeScript** — Type safety
- **PostgreSQL** — Relational database
- **Sequelize** — ORM
- **JWT** — Authentication
- **dotenv** — Environment variables

| Method | Endpoint         | Description                | Auth Required |
| ------ | ---------------- | -------------------------- | ------------- |
| POST   | `/auth/register` | Register a new user        | ❌            |
| POST   | `/auth/login`    | Log in and receive a token | ❌            | 
| GET    | `/patients/:id`  | Get patient by ID          | ✅            |
| PUT    | `/patients/:id`  | Update patient info        | ✅            |
| DELETE | `/patients/:id`  | Delete a patient           | ✅            |
| ...    |                  | More endpoints...          | ✅            |



##  Project Structure

```
- client
  - .gitignore
  - eslint.config.js
  - index.html
  - package.json
  - pnpm-lock.yaml
  - public
    - vite.svg
  - README.md
  - src
    - api
      - axios.ts
    - App.css
    - App.tsx
    - components
      - AuthForm.tsx
      - DashboardCard.tsx
      - ProtectedRoutes.tsx
    - context
      - AuthContext.tsx
    - index.css
    - main.tsx
    - pages
      - Dashboard.tsx
      - Doctor.tsx
      - Login.tsx
      - Mappings.tsx
      - paitent.tsx
      - Register.tsx
    - types
      - Doctor.ts
      - Mappings.ts
      - Paitent.ts
    - vite-env.d.ts
  - tsconfig.app.json
  - tsconfig.json
  - tsconfig.node.json
  - vite.config.ts

- server
  - .env
  - .gitignore
  - config
    - config.json
  - migrations
  - nodemon.json
  - package-lock.json
  - package.json
  - pnpm-lock.yaml
  - seeders
  - server.ts
  - src
    - app.ts
    - config
      - db.ts
    - controllers
      - doctor.controller.ts
      - mapping.controller.ts
      - patient.controller.ts
      - user.controller.ts
    - middleware
      - auth.ts
    - models
      - associations.ts
      - doctor.model.ts
      - mapping.model.ts
      - patient.model.ts
      - user.model.ts
    - routes
      - doctor.route.ts
      - mapping.route.ts
      - patient.route.ts
      - user.route.ts
  - tsconfig.json

```


