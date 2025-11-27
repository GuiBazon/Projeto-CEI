const connect = require("../db/connect");

module.exports = class alunoController {

  static async createAluno(req, res) {
    const { fk_id_turma, nome_aluno, cpf, data_nascimento } = req.body;

    if (!fk_id_turma || !nome_aluno || !cpf || !data_nascimento) {
      return res.status(400).json({ error: "Todos os campos devem ser preenchidos" });
    }

    if (isNaN(cpf) || cpf.length !== 11) {
      return res.status(400).json({ error: "CPF inválido" });
    }

    const query = `
      INSERT INTO aluno (fk_id_turma, nome_aluno, cpf, data_nascimento)
      VALUES (?, ?, ?, ?)
    `;
    const values = [fk_id_turma, nome_aluno, cpf, data_nascimento];

    connect.query(query, values, (err) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ error: "CPF já cadastrado" });
        }
        console.error(err);
        return res.status(500).json({ error: "Erro interno do servidor" });
      }
      return res.status(201).json({ message: "Aluno criado com sucesso" });
    });
  }


  static async readAlunos(req, res) {
    const query = `
      SELECT a.*, t.nome_turma, t.curso
      FROM aluno a
      JOIN turma t ON a.fk_id_turma = t.id_turma
    `;

    connect.query(query, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro interno do servidor" });
      }
      return res.status(200).json({ alunos: results });
    });
  }


  static async updateAluno(req, res) {
    const id_aluno = req.params.id_aluno;
    const { fk_id_turma, nome_aluno, cpf, data_nascimento } = req.body;

    if (!fk_id_turma || !nome_aluno || !cpf || !data_nascimento) {
      return res.status(400).json({ error: "Todos os campos devem ser preenchidos" });
    }

    const query = `
      UPDATE aluno
      SET fk_id_turma = ?, nome_aluno = ?, cpf = ?, data_nascimento = ?
      WHERE id_aluno = ?
    `;
    const values = [fk_id_turma, nome_aluno, cpf, data_nascimento, id_aluno];

    connect.query(query, values, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro interno do servidor" });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Aluno não encontrado" });
      }

      return res.status(200).json({ message: "Aluno atualizado com sucesso" });
    });
  }


  static async deleteAluno(req, res) {
    const id_aluno = req.params.id_aluno;

    const query = "DELETE FROM aluno WHERE id_aluno = ?";

    connect.query(query, [id_aluno], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro interno do servidor" });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Aluno não encontrado" });
      }

      return res.status(200).json({ message: "Aluno excluído com sucesso" });
    });
  }
};
