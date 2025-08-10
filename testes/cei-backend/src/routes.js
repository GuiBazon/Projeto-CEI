const express = require('express');
const router = express.Router();
const db = require('./db');

// Listar alunos
router.get('/alunos', (req, res) => {
  db.query('SELECT * FROM alunos', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// Registrar ocorrência
router.post('/ocorrencias', (req, res) => {
  const { id_aluno, id_tipo, data_ocorrencia } = req.body;
  const sql = 'INSERT INTO ocorrencias (id_aluno, id_tipo, data_ocorrencia) VALUES (?, ?, ?)';
  
  db.query(sql, [id_aluno, id_tipo, data_ocorrencia], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Ocorrência registrada com sucesso!', id: result.insertId });
  });
});

module.exports = router;
