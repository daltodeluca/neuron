const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.post('/', async (req, res) => {
  const { type, content, position, page_id } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO blocks (type, content, position, page_id)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [type, content, position, page_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao criar bloco:', err);
    res.status(500).send('Erro ao criar bloco');
  }
});

router.get('/:pageId', async (req, res) => {
  const { pageId } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM blocks WHERE page_id = $1 ORDER BY position ASC',
      [pageId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao buscar blocos:', err);
    res.status(500).send('Erro ao buscar blocos');
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { type, content, position } = req.body;
  try {
    const result = await pool.query(
      `UPDATE blocks
       SET type = $1,
           content = $2,
           position = $3,
           updated_at = NOW()
       WHERE id = $4
       RETURNING *`,
      [type, content, position, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao atualizar bloco:', err);
    res.status(500).send('Erro ao atualizar bloco');
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM blocks WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    console.error('Erro ao deletar bloco:', err);
    res.status(500).send('Erro ao deletar bloco');
  }
});

module.exports = router;
