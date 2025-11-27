const connect = require("../db/connect");

module.exports = class turmaController {

  static async createTurma(req, res) {
    const { nome_turma, curso } = req.body;

    if (!nome_turma || !curso) {
      return res.status(400).json({ error: "Todos os campos devem ser preenchidos" });
    }

    const query = `
      INSERT INTO turma (nome_turma, curso)
      VALUES (?, ?)
    `;
    const values = [nome_turma, curso];

    connect.query(query, values, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro interno do servidor" });
      }
      return res.status(201).json({ message: "Turma criada com sucesso" });
    });
  }


  static async readTurmas(req, res) {
    const query = `SELECT * FROM turma`;

    connect.query(query, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro interno do servidor" });
      }
      return res.status(200).json({ turmas: results });
    });
  }


  static async updateTurma(req, res) {
    const id_turma = req.params.id_turma;
    const { nome_turma, curso } = req.body;

    if (!nome_turma || !curso) {
      return res.status(400).json({ error: "Todos os campos devem ser preenchidos" });
    }

    const query = `
      UPDATE turma 
      SET nome_turma = ?, curso = ?
      WHERE id_turma = ?
    `;
    const values = [nome_turma, curso, id_turma];

    connect.query(query, values, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro interno do servidor" });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Turma não encontrada" });
      }
      return res.status(200).json({ message: "Turma atualizada" });
    });
  }


  static async deleteTurma(req, res) {
    const id_turma = req.params.id_turma;

    const query = `DELETE FROM turma WHERE id_turma = ?`;

    connect.query(query, [id_turma], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro interno do servidor" });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Turma não encontrada" });
      }
      return res.status(200).json({ message: "Turma excluída" });
    });
  }
};
