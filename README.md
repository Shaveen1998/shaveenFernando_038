# MERN Stack Application README

Welcome to the README for the MERN (MongoDB, Express.js, React.js, Node.js) stack application! This document will guide you through the setup process, technologies used, and other important details about the project.

## Table of Contents
- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Environment Variables](#environment-variables)
- [Setup Instructions](#setup-instructions)
- [Styling](#styling)

## Overview
This MERN stack application serves as a template for building full-stack web applications. It integrates MongoDB for the database, Express.js and Node.js for the server-side logic, and React.js for the client-side user interface.

## Technologies Used
- **MongoDB**: NoSQL database used for storing application data.
- **Express.js**: Web application framework for Node.js used for building the server-side logic.
- **React.js**: JavaScript library for building user interfaces.
- **Node.js**: JavaScript runtime environment for running server-side logic.
- **Tailwind CSS**: Utility-first CSS framework used for styling the application.

## Environment Variables
Before running the application, make sure to create a `.env` file in the root directory of the project. Specify the following environment variables in the `.env` file:

- `PORT`: Port number on which the server will run.
- `MONGO_URI`: URI for connecting to your MongoDB database.
- `SECRET`: Secret key used for encrypting and decrypting data (e.g., JWT tokens).

Example `.env` file:
- PORT=5000
- MONGO_URI=mongodb+srv://shaveenleousj:3p7pGAMm5d2lks9C@cluster0.k5rj4uw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
- SECRET=mysecretkey

## Setup Instructions
To set up the application locally, please follow these steps:

1. Clone the repository to your local machine: git clone <repository-url>

2. Navigate to the project directory: cd <project-directory>

3. Install dependencies for the server:
cd client
npm install

4. Install dependencies for the client:
cd frontend
npm install

5. Start the server:
node index.js
   
6. Start the client:
npm run dev

7. Visit `http://localhost:3000` in your browser to view the application.


## Styling
Styling for this application is done using Tailwind CSS, a utility-first CSS framework. Tailwind CSS classes are used directly in the React components to style the user interface.

For more information about Tailwind CSS, visit [Tailwind CSS Documentation](https://tailwindcss.com/docs).

That's it! You should now have the MERN stack application up and running locally on your machine. Happy coding! 🚀

