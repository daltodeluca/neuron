const express = require('express');
const cors = require('cors');
require('dotenv').config();

console.log('>> server.js iniciou');

const pool = require('./config/db');
const usersRouter = require('./routes/users');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.send('AAAAAAAAAAAAAAAAAAAAANeuron API está funcionando');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
