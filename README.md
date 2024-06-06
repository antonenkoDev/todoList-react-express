# Project Name
## TODO Test Project
### React + TailwindCSS + ExpressJs + MongoDB (mongoose) + PostgreSQL (Prisma) + SwaggerDocs

This guide will walk you through the setup and deployment of the project on your local machine. Follow these steps to get started:

## Prerequisites

Ensure you have the following installed on your machine:
- Node.js (>=14.x)
- npm (>=6.x) or yarn
- MongoDB (>=4.x)
- PostgreSQL (>=12.x)

# Installation

## Client Setup

### Environment Variables

Create a `.env` file in the `client` directory with the following content:
```
VITE_API_BASE_URL=http://localhost:5010/api
```
Edit /vite.config.ts to setup desired port:
```
export default defineConfig({
    plugins: [react()],
    server: {port: 3001},
});
```
### Setup Instructions

#### 1. Navigate to the Client Directory

```bash
cd client
```
#### 2. Install Dependencies
```
npm install
#or
yarn install
```

#### 4. Start the Development Server
```
 npm run dev
```
This will start the client development server at http://localhost:3001

## Server Setup
### Environment Variables
Copy a .env.sample to .env file in the server directory and edit:

```
PORT=5010
MONGO_URI=mongodb://localhost:27017
JWT_SECRET=jwtSecretToken
JWT_EXPIRATION=360000
CLIENT_ORIGIN=http://localhost:3001
DATABASE_URL=postgresql://user:password@localhost:5432/mydatabase
```

### Setup Instructions
#### 1. Navigate to the Server Directory
```bash
cd server
```

#### 2. Install Dependencies
```
npm install
#or
yarn install
```

#### 3. Setup and Migrate Databases
##### MongoDB
Ensure MongoDB is running and the connection URI is correctly specified in the .env file.

##### PostgreSQL
Ensure PostgreSQL is running and the connection URI is correctly specified in the .env file. Then, run the Prisma migrations:
```
npx prisma migrate dev --name init
```
#### 4. Generate Prisma Client
Generate the Prisma client for TypeScript:
```
npx prisma generate
```
#### 5. Start the Development Server

```
npm run dev
# or
yarn dev
```

This will start the server development server at http://localhost:5010

## SwaggerDocs
Are located at  http://localhost:5010/api-docs
## POSTman Collection
is located in /postman folder
