const express = require('express');
const app = express();
const PORT = 3003;
const cors = require('cors');
const { Pool } = require('pg');
const tspSolver = require('tspsolver');

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'admin',
  port: 5432,
});

app.get('/categorias', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categorias');
    res.json(result.rows);
  } catch (error) {
    console.error('Erro na consulta:', error);
    res.status(500).send('Erro interno no servidor');
  }
});


app.post('/categorias', async (req, res) => {
  const { codigo, titulo, descricao } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO categorias (codigo, titulo, descricao) VALUES ($1, $2, $3) RETURNING *',
      [codigo, titulo, descricao]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro no cadastro:', error);
    res.status(500).send('Erro interno no servidor');
  }
});

app.put('/categorias/:id', async (req, res) => {
  const { id } = req.params;
  const { titulo, descricao } = req.body;
  try {
    const result = await pool.query(
      'UPDATE categorias SET titulo = $1, descricao = $2 WHERE id = $3 RETURNING *',
      [titulo, descricao, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro na atualização:', error);
    res.status(500).send('Erro interno no servidor');
  }
});


app.delete('/categorias/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM categorias WHERE id = $1', [id]);
    res.send('Categoria excluída com sucesso');
  } catch (error) {
    console.error('Erro na exclusão:', error);
    res.status(500).send('Erro interno no servidor');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor Node.js rodando na porta ${PORT}`);
});
