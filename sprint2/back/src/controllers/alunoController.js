// Importa a conexão
const connect = require("../db/connect");

module.exports = {
  // Criar aluno
  createAluno: (req, res) => {
    const { fk_id_turma, nome_aluno, cpf, data_nascimento } = req.body;

    // Validação básica
    if (!fk_id_turma || !nome_aluno || !cpf || !data_nascimento) {
      return res.status(400).json({ mensagem: "Preencha todos os campos!" });
    }

    // CPF deve ter 11 dígitos numéricos
    if (!/^\d{11}$/.test(cpf)) {
      return res.status(400).json({ mensagem: "CPF deve conter exatamente 11 números!" });
    }

    // Verifica se CPF já existe
    const checkCpf = "SELECT * FROM aluno WHERE cpf = ?";
    connect.query(checkCpf, [cpf], (err, results) => {
      if (err) return res.status(500).json({ erro: "Erro no servidor" });
      if (results.length > 0) return res.status(400).json({ mensagem: "CPF já cadastrado!" });

      // Se tudo certo, insere o aluno
      const insertQuery = "INSERT INTO aluno (fk_id_turma, nome_aluno, cpf, data_nascimento) VALUES (?, ?, ?, ?)";
      connect.query(insertQuery, [fk_id_turma, nome_aluno, cpf, data_nascimento], (err) => {
        if (err) return res.status(500).json({ erro: "Erro ao cadastrar aluno" });
        return res.status(201).json({ mensagem: "Aluno cadastrado com sucesso!" });
      });
    });
  },

  // Ler todos os alunos
  readAllAluno: (req, res) => {
    const query = "SELECT * FROM aluno";
    connect.query(query, (err, results) => {
      if (err) return res.status(500).json({ erro: "Erro ao buscar alunos" });
      return res.status(200).json(results);
    });
  },

  // Ler aluno por ID
  readAlunobyId: (req, res) => {
    const { id } = req.params;
    const query = "SELECT * FROM aluno WHERE id_aluno = ?";
    connect.query(query, [id], (err, results) => {
      if (err) return res.status(500).json({ erro: "Erro ao buscar aluno" });
      if (results.length === 0) return res.status(404).json({ mensagem: "Aluno não encontrado" });
      return res.status(200).json(results[0]);
    });
  },

  // Atualizar aluno
  updateAluno: (req, res) => {
    const { id_aluno, fk_id_turma, nome_aluno, cpf, data_nascimento } = req.body;

    if (!id_aluno || !fk_id_turma || !nome_aluno || !cpf || !data_nascimento) {
      return res.status(400).json({ mensagem: "Preencha todos os campos!" });
    }

    if (!/^\d{11}$/.test(cpf)) {
      return res.status(400).json({ mensagem: "CPF deve conter exatamente 11 números!" });
    }

    const checkQuery = "SELECT * FROM aluno WHERE id_aluno = ?";
    connect.query(checkQuery, [id_aluno], (err, results) => {
      if (err) return res.status(500).json({ erro: "Erro no servidor" });
      if (results.length === 0) return res.status(404).json({ mensagem: "Aluno não encontrado" });

      const updateQuery = "UPDATE aluno SET fk_id_turma = ?, nome_aluno = ?, cpf = ?, data_nascimento = ? WHERE id_aluno = ?";
      connect.query(updateQuery, [fk_id_turma, nome_aluno, cpf, data_nascimento, id_aluno], (err) => {
        if (err) return res.status(500).json({ erro: "Erro ao atualizar aluno" });
        return res.status(200).json({ mensagem: "Aluno atualizado com sucesso!" });
      });
    });
  },

  // Deletar aluno
  deleteAluno: (req, res) => {
    const { id } = req.params;

    const checkQuery = "SELECT * FROM aluno WHERE id_aluno = ?";
    connect.query(checkQuery, [id], (err, results) => {
      if (err) return res.status(500).json({ erro: "Erro no servidor" });
      if (results.length === 0) return res.status(404).json({ mensagem: "Aluno não encontrado" });

      const deleteQuery = "DELETE FROM aluno WHERE id_aluno = ?";
      connect.query(deleteQuery, [id], (err) => {
        if (err) return res.status(500).json({ erro: "Erro ao deletar aluno" });
        return res.status(200).json({ mensagem: "Aluno deletado com sucesso!" });
      });
    });
  },
};
