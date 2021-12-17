# Employee Management system

Employee management system backend project.

# Getting started

To get the application running locally:

- Clone this repo.
- Install and use node version 14.16.1.
- Change directory to the repo.
- `npm install` to install all required dependencies.
- Install MongoDB Community Edition ([instructions](https://docs.mongodb.com/manual/installation/#tutorials)).
- Start mongo server at `mongodb://127.0.0.1/`.
- Type `node app.js` to start and server the backend application.
- Open `http://localhost:8000/` to view swagger documentation.

## Application Structure

- `server.js` - This file is the entry point to the application. This file defines express server and connects it to MongoDB using mongoose.
- `app.js` - This file defines which requests are handled by the application endpoints.
- `config/` - This folder contains configurations.
- `middlewares/` - This folder contains validation middlewares.
- `controller/` - This folder contains APIs.
- `models/` - This folder contains the schema definitions for our Mongoose models.
- `services/` - This folder contains the business logic of the application.
- `data/` - This folder contains CRUD operation on entities.
- `utils` - This folder contains several utility programs.
