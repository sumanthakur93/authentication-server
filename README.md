# Authentication Server

This is a simple authentication server built with Node.js, Express, and MongoDB. It supports user registration, login, and token-based authentication using JWT.

## Table of Contents

1.  Features
2.  Prerequisites
3.  Project Structure
4.  Files Overview
5.  Setting Up the Environment
6.  Dependencies
7.  API Endpoints
8.  Contributing
9.  License
10. Author




## Features

1. User registration with validation
2. User login with JWT token generation
3. Token validation and protected routes
4. Secure password storage with bcrypt
5. Middleware for error handling and input validation
6. Basic security measures using Helmet and XSS-clean

## Prerequisites

1. Node.js
2. Express.js
3. MongoDB


## Project Structure

The project follows a standard Node.js project structure with the following main directories:

- **routes:** Contains route definitions for different API endpoints.
- **controllers:** Contains controller functions that handle the business logic for each route.
- **models:** Contains Mongoose models for MongoDB schema definitions.
- **server.js:** Entry point of the application.
- **.env:** Environment variables configuration file.
- **utils:** Defines the validation schemas for registration and login using Zod.
- **middleware:** Contains functions for verify user and catch error

## Files Overview

### `server.js`

- This file serves as the entry point for the application.
- It sets up the Express server, connects to the MongoDB database, configures routes, and starts the server.

### `routes` Directory

- **AuthRoutes.js:** Defines routes for user-related operations such as registration, login, and profile update.

### `controllers` Directory

- **AuthController.js:** Contains controller functions for user-related operations like registration, login, and profile update.

### `models` Directory

- **UserModel.js:** Defines the Mongoose schema and model for the User, including password hashing before saving.

### `middleware` Directory

- **CatchAsyncError.js:** Middleware to catch and handle errors in asynchronous functions.
- **error.js:** Global error handling middleware to manage different types of errors and provide appropriate responses.
- **VerifyUser.js:** Middleware to verify the JWT token in the request headers and authenticate the user.
- **AuthValidator.js:** Middleware for validating request bodies against defined schemas using Zod.

### `utils` Directory

- **ErrorHandler.js:** Defines a custom error handler class for generating error responses.
- **Auth-Validator.js:** Defines the validation schemas for registration and login using Zod.


## Setting Up the Environment

To run the application locally, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory and install dependencies using `npm install`.
3. Create a `.env` file and configure environment variables like `PORT`, `MONGO_URL`, and `JWT_KEY`.
4. Start the server using `npm start`.
5. Access the application through `http://localhost:<PORT>`.

## Dependencies

The project utilizes the following main dependencies:

- **Express.js:** A minimalist web framework for Node.js.
- **Mongoose:** An Object Data Modeling (ODM) library for MongoDB and Node.js.
- **bcrypt:** A library for hashing passwords.
- **jsonwebtoken:** A library for generating JSON Web Tokens (JWT) for user authentication.

## API Documentation

This section provides detailed documentation for the API endpoints available in the Microbus Quiz App.

### User Routes

#### Register User

- **URL:** `/api/v1/auth/register`
- **Method:** `POST`
- **Description:** Register a new user.
- **Request Body:**
  - `email`: User's email address.
  - `password`: User's password.
  - `username`: User's name.
- **Response:** Returns a success message .

#### Login User

- **URL:** `/api/auth/v1/login`
- **Method:** `POST`
- **Description:** Login an existing user.
- **Request Body:**
  - `email`: User's email address.
  - `password`: User's password.
- **Response:** Returns a JWT token upon successful login.

#### Get User Profile

- **URL:** `/api/v1/auth/token`
- **Method:** `GET`
- **Description:** fetch user details using token.
- **Response:** Returns a success message and user profile data.


## Note

- Ensure to include appropriate JWT tokens in the headers for authorized requests.
- Certain routes may require authentication to access. Use the provided JWT token upon successful login.
- Error responses will include relevant error messages for troubleshooting purposes.

This API documentation provides a comprehensive guide to the endpoints available in the Authentication App, facilitating usage and integration with other applications.

## Contributing

Contributions to the project are welcome. Feel free to submit bug reports, feature requests, or pull requests.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## Author

Suman Thakur