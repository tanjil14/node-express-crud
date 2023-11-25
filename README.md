# CRUD Project

## Overview

This project is a CRUD (Create, Read, Update, Delete,Add orders,Get Orders, And calculate total orders price) application built with Node.js, Express, and MongoDB. It includes features such as validation, CORS policy,Type Cheking and more.

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/tanjil14/node-express-crud
   ```

2. **Navigate to the project directory:**

   ```bash
   cd node-express-crud
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Create an `.env` file in the root directory and configure your environment variables:**

   ```env
   MONGODB_URI=your_mongodb_uri
   PORT=your_preferred_port
   BCRYPT_SALT_ROUNDS=your_preferred_round
   ```

### Running the Application Locally

#### Development Mode

Run the following command to start the application in development mode with automatic reloading:

```bash
npm run start:dev
```

### Production Mode

For a production build, run:

```
npm run build
npm run start:prod
```

## Additional Configuration

### Code Formatting

To format the code using Prettier, run:

```bash
npm run prettier
```

### Linting

To lint the code using ESLint, run:

```bash
npm run lint
```

To automatically fix linting issues, run:

```bash
npm run lint:fix
```

## Deployment

The application is currently deployed on Vercel. You can access it at:
https://ph-assignment-2-three.vercel.app
