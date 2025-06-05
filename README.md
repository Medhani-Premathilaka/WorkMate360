# WorkMate360

WorkMate360 is a role-based employee management and task tracking web application.  
It features secure JWT authentication, responsive UI, and essential HR tools such as leave requests and to-do management.

---

## Features

- **Role-Based Authentication:** Admin and User dashboards with protected routes.
- **JWT Authentication:** Secure login and session management.
- **Responsive Design:** Mobile-friendly layouts using Tailwind CSS and Material UI.
- **Employee Management:** Admins can view employee counts and create new employee profiles.
- **Task Management:** Users can add, edit, and view their to-dos with calendar integration.
- **Leave Requests:** Users can request leave via email integration.
- **Logout Dialog:** Secure logout with confirmation dialog and session clearing.
- **Error Handling:** Custom login error page for unauthorized access.

---

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, Material UI, Axios
- **Backend:** Spring Boot (Java)
- **Database:** PostgreSQL

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Java 17+](https://www.oracle.com/java/technologies/downloads/)
- [PostgreSQL](https://www.postgresql.org/) (running locally or remotely)

---

### Backend Setup (Spring Boot + PostgreSQL)

1. **Configure PostgreSQL:**
   - Create a database (e.g., `workmate360`).
   - Note your DB username and password.

2. **Configure Spring Boot:**
   - In `src/main/resources/application.properties` (or `.yml`), set:
     ```
     spring.datasource.url=jdbc:postgresql://localhost:5432/workmate360
     spring.datasource.username=YOUR_DB_USERNAME
     spring.datasource.password=YOUR_DB_PASSWORD
     spring.jpa.hibernate.ddl-auto=update
     ```
   - Adjust other properties as needed.

3. **Run the backend:**
   ```bash
   ./mvnw spring-boot:run
   # or
   ./gradlew bootRun
   ```

---

### Frontend Setup (React)

1. **Install frontend dependencies:**
   ```bash
   cd WorkMate360_frontend/my-app
   npm install
   # or
   yarn install
   ```

2. **Start the frontend:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. **Access the app:**
   - Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Usage

- **Login** as an Admin or User.
- **Admins** can manage employees and view statistics.
- **Users** can manage their tasks and request leave.

---

## Project Structure

```
WorkMate360/
├── WorkMate360_frontend/
│   └── my-app/
│       ├── src/
│       │   ├── components/
│       │   ├── pages/
│       │   └── ...
│       └── ...
├── backend/
│   └── ... (Spring Boot API)
└── README.md
```

---

## Customization

- **API Endpoints:** Update API URLs in the frontend as needed.
- **UI:** Modify components in `src/components` and `src/pages` for custom features or branding.

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---



**Developed by [Medhani Premathilaka]**
