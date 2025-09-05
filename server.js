const express = require('express');
const connectedDB = require('./config/dbConnect');
const noteRouther = require('./routes/noteRouther');

const app = express();
const PORT = 4000;

connectedDB();

app.use(express.json());

app.use('/notes', noteRouther);

app.listen(
  PORT,
  console.log(`Server is running on the port : http://localhost:${PORT}`)
);
