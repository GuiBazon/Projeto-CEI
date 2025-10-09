// Importa a conexão com o banco de dados
const connect = require("../db/connect");

module.exports = class alunoController {

  // CREATE - Cadastrar novo aluno
  static async createAluno(req, res) {
    const { fk_id_turma, nome_aluno, cpf, data_nascimento } = req.body;

    // Verifica se todos os campos foram preenchidos
    if (!fk_id_turma || !nome_aluno || !cpf || !data_nascimento) {
      return res.status(400).json({ mensagem: "Preencha todos os campos!" });
    }

    // Comando SQL de inserção
    const query = "INSERT INTO aluno (fk_id_turma, nome_aluno, cpf, data_nascimento) VALUES (?, ?, ?, ?)";

    connect.query(query, [fk_id_turma, nome_aluno, cpf, data_nascimento], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ mensagem: "Erro ao cadastrar aluno." });
      }

      return res.status(201).json({ mensagem: "Aluno cadastrado com sucesso!" });
    });
  }

  // READ - Mostrar todos os alunos (com a turma)
  static async readAllAluno(req, res) {
    const query = `
      SELECT aluno.*, turma.nome_turma 
      FROM aluno
      INNER JOIN turma ON aluno.fk_id_turma = turma.id_turma
    `;

    connect.query(query, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ mensagem: "Erro ao buscar alunos." });
      }

      return res.status(200).json(results);
    });
  }

  // READ - Buscar aluno por ID
  static async readAlunobyId(req, res) {
    const id = req.params.id;
    const query = `
      SELECT aluno.*, turma.nome_turma 
      FROM aluno
      INNER JOIN turma ON aluno.fk_id_turma = turma.id_turma
      WHERE aluno.id_aluno = ?
    `;

    connect.query(query, [id], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ mensagem: "Erro ao buscar aluno." });
      }

      if (results.length === 0) {
        return res.status(404).json({ mensagem: "Aluno não encontrado." });
      }

      return res.status(200).json(results[0]);
    });
  }

  // UPDATE - Atualizar aluno
  static async updateAluno(req, res) {
    const { id_aluno, fk_id_turma, nome_aluno, cpf, data_nascimento } = req.body;

    if (!id_aluno || !fk_id_turma || !nome_aluno || !cpf || !data_nascimento) {
      return res.status(400).json({ mensagem: "Preencha todos os campos!" });
    }

    const query = `
      UPDATE aluno
      SET fk_id_turma = ?, nome_aluno = ?, cpf = ?, data_nascimento = ?
      WHERE id_aluno = ?
    `;

    connect.query(query, [fk_id_turma, nome_aluno, cpf, data_nascimento, id_aluno], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ mensagem: "Erro ao atualizar aluno." });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ mensagem: "Aluno não encontrado." });
      }

      return res.status(200).json({ mensagem: "Aluno atualizado com sucesso!" });
    });
  }

  // DELETE - Excluir aluno
  static async deleteAluno(req, res) {
    const id = req.params.id;
    const query = "DELETE FROM aluno WHERE id_aluno = ?";

    connect.query(query, [id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ mensagem: "Erro ao excluir aluno." });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ mensagem: "Aluno não encontrado." });
      }

      return res.status(200).json({ mensagem: "Aluno excluído com sucesso!" });
    });
  }
};
