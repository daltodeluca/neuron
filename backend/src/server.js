const express = require('express');
const cors = require('cors');
require('dotenv').config();

console.log('>> server.js iniciou');

const pool = require('./config/db');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', usersRouter);
app.use('/auth', authRouter);

app.get('/', (req, res) => {
  res.send('Neuron API está funcionando');
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
