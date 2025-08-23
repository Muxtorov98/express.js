# 🚀 Express.js API Boilerplate

A robust and scalable **REST API** built with **Node.js** and **Express.js**, designed for rapid development with **MongoDB**, **JWT authentication**, **Role-Based Access Control (RBAC)**, **Swagger documentation**, and **Redis-based SMS queuing**. This boilerplate provides a production-ready backend with a modular architecture, Docker support, and background job processing for tasks like SMS notifications.

---

## ✨ Features

- ✅ **Express.js Framework**: Fast and lightweight web framework for Node.js.
- ✅ **MongoDB with Mongoose**: Seamless database integration for data modeling.
- ✅ **JWT Authentication**: Secure access and refresh token system.
- ✅ **Role-Based Access Control (RBAC)**: Granular permissions for roles like `admin` and `user`.
- ✅ **Swagger Documentation**: Auto-generated API docs with Swagger UI.
- ✅ **Redis Queue (BullMQ)**: Asynchronous job processing for SMS notifications.
- ✅ **Twilio Integration**: Send SMS notifications with validation using DTOs.
- ✅ **Global Error Handling**: Centralized middleware for consistent error responses.
- ✅ **Modular Architecture**: Organized into controllers, services, repositories, and routes.
- ✅ **Docker Compose**: Easy deployment with Node.js, MongoDB, Redis, and Mongo Express.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v24.6.0 or higher): `node --version`
- **Docker** and **Docker Compose**: `docker --version` and `docker-compose --version`
- **Git**: `git --version`
- **Redis** (optional for local setup): `redis-server --version`
- **Twilio Account** (for SMS): Obtain credentials from [Twilio Console](https://www.twilio.com/console)

---

## 📦 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/Muxtorov98/express.js.git
cd express.js
```

2. Set Up Environment Variables
Create a .env file in the backend directory with the following configuration:
```.env
PORT=3000
MONGO_URI=mongodb://mongo:27017/mydb
JWT_SECRET=supersecretkey
JWT_EXPIRES_IN=1d
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+1234567890
REDIS_HOST=localhost
REDIS_PORT=6379
```
4. ## Install Dependencies
```bash
npm install
```
5. ## Run Locally
- Start the development server:
```bash
npm run dev
```
6. ## Run with Docker
- Use Docker Compose to spin up the Node.js backend, MongoDB, and Mongo Express:
```bash
docker compose up -d --build
```

# This will start:

- Node.js Backend: http://localhost:3000
- MongoDB: localhost:27017
- Mongo Express (GUI): http://localhost:8081 (login: admin, password: admin123)


🛠 # API Endpoints
🔑 # Authentication

- `POST /api/v1/register` – Register a new user
- `POST /api/v1/login` – Log in and receive JWT tokens
- `POST /api/v1/refresh-token` – Refresh access token
- `GET /api/v1/me` – Get authenticated user details

👤 # Users (Requires Authentication)

- `GET /api/v1/users` – List all users (requires read:user permission)
- `GET /api/v1/users/:id` – Get user by ID (requires read:user permission)
- `POST /api/v1/users` – Create a new user (requires create:user permission)
- `PUT /api/v1/users/:id` – Update a user (requires update:user permission)
- `DELETE /api/v1/users/:id` – Delete a user (requires delete:user permission)

🛡 # Roles (Requires Authentication)

- `POST /api/v1/roles` – Create a new role (requires create:role permission)
- `PUT /api/v1/roles/:name` – Update role permissions (requires update:role permission)
- `DELETE /api/v1/roles/:name` – Delete a role (requires delete:role permission)
- `POST /api/v1/assign-role` – Assign roles to a user (requires assign:role permission)

📦 # Waybills (Requires Authentication)

- `POST /api/v1/waybills` – Create a new waybill (requires create:waybill permission)
- `GET /api/v1/waybills` – List all waybills (requires read:waybill permission)
- `GET /api/v1/waybills/:id` – Get waybill by ID (requires read:waybill permission)
- `PUT /api/v1/waybills/:id` – Update a waybill (requires update:waybill permission)
- `DELETE /api/v1/waybills/:id` – Delete a waybill (requires delete:waybill permission)

📦 # Products (Requires Authentication)

- `POST /api/v1/products` – Create a new product (requires create:product permission)
- `GET /api/v1/products` – List all products (requires read:product permission)
- `GET /api/v1/products/:id` – Get product by ID (requires read:product permission)
- `PUT /api/v1/products/:id` – Update a product (requires update:product permission)
- `DELETE /api/v1/products/:id` – Delete a product (requires delete:product permission)

📦 # Orders (Requires Authentication)

- `POST /api/v1/orders` – Create a new order (requires create:order permission)
- `GET /api/v1/orders` – List all orders (requires read:order permission)
- `GET /api/v1/orders/:id` – Get order by ID (requires read:order permission)
- `PUT /api/v1/orders/:id` – Update an order (requires update:order permission)
- `DELETE /api/v1/orders/:id` – Delete an order (requires delete:order permission)

📩 # SMS (Requires Authentication)

- `POST /api/v1/sms` – Queue an SMS notification (requires create:sms permission)


🔒 # Role-Based Access Control (RBAC)

- User Role: Limited to managing own data (e.g., read:user for own profile).
- Admin Role: Full access to all resources `(create:*, read:*, update:*, delete:* for user, product, order, waybill, role, sms)`.
- Permissions are enforced via the checkPermission middleware.


📖 # Swagger Documentation
- Access auto-generated API documentation at:👉 http://localhost:3000/api-docs
- Use the Authorize button in Swagger UI to input a Bearer token for authenticated endpoints.

📂 # Project Structure
```bash
express.js/
├── backend/
│   ├── config/              # Database and Swagger configurations
│   ├── controllers/         # Business logic for handling requests
│   ├── dtos/                # Data Transfer Objects for input validation
│   ├── middlewares/         # Authentication, RBAC, and error handling
│   ├── models/              # Mongoose schemas
│   ├── queues/              # Redis queue configurations (e.g., SMS jobs)
│   ├── repositories/        # Data access layer
│   ├── resources/           # Response formatting utilities
│   ├── routes/              # API route definitions
│   ├── scripts/             # Utility scripts (e.g., role initialization)
│   ├── services/            # Business logic layer
│   ├── utils/               # Helper functions (e.g., response formatting)
│   ├── app.js               # Express app setup
│   ├── server.js            # Server entry point
│   └── .env                 # Environment variables for backend
├── .env                     # Environment variables for Docker Compose
├── docker-compose.yml       # Docker configuration
├── package.json             # Project dependencies and scripts
└── README.md                # Project documentation
```

🐳 # Docker Compose Setup
- The docker-compose.yml file defines three services:

- node_backend: Express.js API `(port: 3000)`
- mongo: MongoDB database `(port: 27017)`
- mongo-express: MongoDB GUI `(port: 8081, credentials: admin/admin123)`

# To stop the services:
```bash
docker compose down
```

🔧 # Configuration
- Environment Variables

- PORT: `Server port (default: 3000)`
```.env
MONGO_URI: MongoDB connection string
JWT_SECRET: Secret for JWT signing
JWT_EXPIRES_IN: Access token expiration (e.g., 1d)
TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER: Twilio credentials for SMS
REDIS_HOST, REDIS_PORT: Redis connection details
```
# Role Initialization
- Initialize default roles (admin, user, etc.) with:
- node backend/scripts/initRoles.js

# Swagger UI
-- Test endpoints interactively via `http://localhost:3000/api-docs`.

📄 # License
- This project is licensed under the MIT License. See the LICENSE file for details.

🌟 # Acknowledgments

- `Express.js`
- `Mongoose`
- jsonwebtoken
- Swagger UI Express
- BullMQ
- Twilio

