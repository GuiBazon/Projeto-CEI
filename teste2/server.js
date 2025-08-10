const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // pasta do front

// configurar conexão
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'AS12as34@@',
  database: 'sprint2',
  waitForConnections: true,
  connectionLimit: 10
});

// rota de login
app.post('/api/login', async (req, res) => {
  try {
    const { usuario, senha } = req.body;
    if (!usuario || !senha) return res.status(400).json({ error: 'dados faltando' });

    const [rows] = await pool.query('SELECT id, usuario, nome, papel FROM usuarios WHERE usuario = ? AND senha = ?', [usuario, senha]);
    if (rows.length === 0) return res.status(401).json({ success: false, mensagem: 'Usuário ou senha inválidos' });

    // resposta simples: devolve id e nome (sem token pra simplificar)
    return res.json({ success: true, user: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'erro no servidor' });
  }
});

// rota pra listar alunos
app.get('/api/alunos', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM alunos');
  res.json(rows);
});

// rota pra listar ocorrencias (join)
app.get('/api/ocorrencias', async (req, res) => {
  const [rows] = await pool.query(`
    SELECT o.id, a.nome AS aluno, t.nome AS tipo, o.data_ocorrencia
    FROM ocorrencias o
    JOIN alunos a ON o.id_aluno = a.id
    JOIN tipos_ocorrencia t ON o.id_tipo = t.id
    ORDER BY o.data_ocorrencia DESC
  `);
  res.json(rows);
});

// rota pra criar ocorrencia (exemplo)
app.post('/api/ocorrencias', async (req, res) => {
  const { id_aluno, id_tipo, data_ocorrencia } = req.body;
  if (!id_aluno || !id_tipo || !data_ocorrencia) return res.status(400).json({ error: 'dados faltando' });
  const [result] = await pool.query('INSERT INTO ocorrencias (id_aluno, id_tipo, data_ocorrencia) VALUES (?, ?, ?)', [id_aluno, id_tipo, data_ocorrencia]);
  res.json({ success: true, insertId: result.insertId });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
