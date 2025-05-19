const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.connect()
  .then(() => console.log('Banco de dados conectado com sucesso.'))
  .catch((err) => console.error('Erro ao conectar no banco:', err));

module.exports = pool;
