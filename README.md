# MERN by __**Kiril**__ **__Miletiev__**
 ![MERN](https://i.morioh.com/139b757e13.png)

 >Simple MERN Stack app - (React, Node, Express, MongoDB)
---
---
## Setup Node server
>First open /server dir in terminal and install all dependencies of node server
```bash
npm install
```
>After that you can run auto-updating server with: 
```bash
npm start
```
>In terminal you have to get something like this:

```bash
[nodemon] starting `node server.js`
Server is running on port: 5000
MongoDB database connection established successfully
```
>## Your "server" package.json shoud look like this:
```json
{
  "name": "server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "mongoose": "^5.7.12",
    "nodemon": "^2.0.1"
  }
}
```
---
---
## Install React app
> Open /mern folder in terminal and install all dependencies and run React app
```bash
npm install
npm start
```
>## Your "client" package.json shoud look like this:
```json
{
  "name": "mern",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "axios": "^0.19.0",
    "bootstrap": "^4.4.1",
    "react": "^16.12.0",
    "react-datepicker": "^2.10.1",
    "react-dom": "^16.12.0",
    "react-router-dom": "^5.1.2",
    "react-scripts": "3.2.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": "react-app"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}

```
---
---
>## Once server and react app is running, the only thing you need to do is add .env file and you are ready to go.
>![.env](https://i.stack.imgur.com/SsQug.png)