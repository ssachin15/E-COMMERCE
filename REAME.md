# E-Commerce REST API

A RESTful API for an e-commerce platform with user authentication, product management, and order handling built with Node.js, Express, and MongoDB.

## Tech Stack
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (JSON Web Tokens)
- Bcrypt.js

## Features
- User registration and login
- Password hashing with bcrypt
- JWT authentication
- Role-based access control (admin/user)
- Product CRUD (admin only for create/update/delete)
- Order placement and management

## Getting Started

### Installation
1. Clone the repo
   git clone https://github.com/ssachin15/E-COMMERCE.git

2. Install dependencies
   npm install

3. Create a .env file in the root
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret

4. Run the server
   npm run dev

## API Endpoints

### Auth Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Login and get token |

### Product Routes
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/products/all | Public | Get all products |
| GET | /api/products/:id | Public | Get single product |
| POST | /api/products/add | Admin | Add a product |
| PUT | /api/products/update/:id | Admin | Update a product |
| DELETE | /api/products/delete/:id | Admin | Delete a product |

### Order Routes
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | /api/orders/place | User | Place an order |
| GET | /api/orders/my | User | Get my orders |
| GET | /api/orders/all | Admin | Get all orders |
| PUT | /api/orders/status/:id | Admin | Update order status |

## Authentication
Protected routes require a JWT token in the header:
Authorization: Bearer your_token