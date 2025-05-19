const express = require('express');
const router = express.Router();
const pool = require('../config/db');
console.log('users.js carregado');

const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING *',
      [email, hashedPassword, name]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao criar usuário:', err);
    res.status(500).send('Erro ao criar usuário');
  }
});

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao listar usuários:', err);
    res.status(500).send('Erro ao listar usuários');
  }
});

module.exports = router;
