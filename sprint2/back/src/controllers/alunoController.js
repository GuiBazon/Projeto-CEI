const connect = require('../db/connect');

module.exports = class alunoController {
  static async createAluno(req, res) {
    const { id_turma, nome_aluno, cpf, data_nascimento } = req.body;

    if (!id_turma || !nome_aluno || !cpf || !data_nascimento) {
      return res.status(400).json({ error: "Todos os campos devem ser preenchidos!" });
    }

    const query = `
      INSERT INTO aluno (id_turma, nome_aluno, cpf, data_nascimento)
      VALUES (?, ?, ?, ?)
    `;
    const values = [id_turma, nome_aluno, cpf, data_nascimento];

    connect.query(query, values, function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao cadastrar aluno no banco" });
      }

      console.log("Aluno inserido no MySQL");
      return res.status(201).json({ message: "Aluno criado com sucesso!" });
    });
  }

  static async readAlunos(req, res) {
    const query = `
      SELECT a.*, t.nomeTurma, t.curso
      FROM aluno a
      LEFT JOIN turma t ON a.id_turma = t.id_turma
    `;

    connect.query(query, function (err, results) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro interno do servidor" });
      }

      return res.status(200).json({ message: "Obtendo alunos:", alunos: results });
    });
  }

  static async updateAluno(req, res) {
    const { id_aluno, id_turma, nome_aluno, cpf, data_nascimento } = req.body;

    if (!id_aluno || !id_turma || !nome_aluno || !cpf || !data_nascimento) {
      return res.status(400).json({ error: "Todos os campos devem ser preenchidos!" });
    }

    const query = `
      UPDATE aluno
      SET id_turma = ?, nome_aluno = ?, cpf = ?, data_nascimento = ?
      WHERE id_aluno = ?
    `;
    const values = [id_turma, nome_aluno, cpf, data_nascimento, id_aluno];

    connect.query(query, values, function (err, results) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro interno do servidor" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Aluno não encontrado" });
      }

      return res.status(200).json({ message: `Aluno atualizado com ID: ${id_aluno}` });
    });
  }

  static async deleteAluno(req, res) {
    const id = req.params.id_aluno;

    const query = `DELETE FROM aluno WHERE id_aluno = ?`;

    connect.query(query, [id], function (err, results) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro interno do servidor" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Aluno não encontrado" });
      }

      return res.status(200).json({ message: `Aluno excluído: ${id}` });
    });
  }
};
