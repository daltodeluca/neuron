const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.post('/', async (req, res) => {
  const { title, user_id } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO pages (title, user_id) VALUES ($1, $2) RETURNING *',
      [title, user_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao criar página:', err);
    res.status(500).send('Erro ao criar página');
  }
});

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pages ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao listar páginas:', err);
    res.status(500).send('Erro ao listar páginas');
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM pages WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Página não encontrada');
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao buscar página:', err);
    res.status(500).send('Erro ao buscar página');
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  try {
    const result = await pool.query(
      'UPDATE pages SET title = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
      [title, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send('Página não encontrada');
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao atualizar página:', err);
    res.status(500).send('Erro ao atualizar página');
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM pages WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Página não encontrada');
    }
    res.sendStatus(204);
  } catch (err) {
    console.error('Erro ao deletar página:', err);
    res.status(500).send('Erro ao deletar página');
  }
});

module.exports = router;
