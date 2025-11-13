// Importa a conexão com o banco de dados (arquivo connect.js dentro da pasta db)
const connect = require("../db/connect");

// Exporta as funções do controller
module.exports = {

  // ---------- CRIAR ALUNO ----------
  createAluno: (req, res) => {
    // Pega os dados enviados no corpo da requisição
    const { fk_id_turma, nome_aluno, cpf, data_nascimento } = req.body;

    // Verifica se todos os campos obrigatórios foram enviados
    if (!fk_id_turma || !nome_aluno || !cpf || !data_nascimento) {
      return res.status(400).json({ mensagem: "Preencha todos os campos!" });
    }

    // Expressão regular pra garantir que o CPF tenha exatamente 11 números
    if (!/^\d{11}$/.test(cpf)) {
      return res.status(400).json({ mensagem: "CPF deve conter exatamente 11 números!" });
    }

    // Verifica se o CPF já está cadastrado no banco
    const checkCpf = "SELECT * FROM aluno WHERE cpf = ?";
    connect.query(checkCpf, [cpf], (err, results) => {
      // Se der erro no banco/servidor
      if (err) return res.status(500).json({ erro: "Erro no servidor" });

      // Se o CPF já existir, bloqueia o cadastro
      if (results.length > 0) return res.status(400).json({ mensagem: "CPF já cadastrado!" });

      // Se passou nas validações, insere o aluno
      const insertQuery = "INSERT INTO aluno (fk_id_turma, nome_aluno, cpf, data_nascimento) VALUES (?, ?, ?, ?)";
      connect.query(insertQuery, [fk_id_turma, nome_aluno, cpf, data_nascimento], (err) => {
        if (err) return res.status(500).json({ erro: "Erro ao cadastrar aluno" });
        return res.status(201).json({ mensagem: "Aluno cadastrado com sucesso!" });
      });
    });
  },

  // ---------- LER TODOS OS ALUNOS ----------
  readAllAluno: (req, res) => {
    // SQL pra buscar todos os alunos cadastrados
    const query = "SELECT * FROM aluno";

    // Executa a query
    connect.query(query, (err, results) => {
      if (err) return res.status(500).json({ erro: "Erro ao buscar alunos" });
      // Retorna todos os registros encontrados
      return res.status(200).json(results);
    });
  },

  // ---------- LER ALUNO POR ID ----------
  readAlunobyId: (req, res) => {
    // Pega o ID enviado na URL (ex: /aluno/3)
    const { id } = req.params;

    // SQL pra buscar um aluno pelo ID
    const query = "SELECT * FROM aluno WHERE id_aluno = ?";

    // Executa a consulta
    connect.query(query, [id], (err, results) => {
      if (err) return res.status(500).json({ erro: "Erro ao buscar aluno" });

      // Se não encontrar nenhum aluno com o ID informado
      if (results.length === 0) return res.status(404).json({ mensagem: "Aluno não encontrado" });

      // Retorna o aluno encontrado
      return res.status(200).json(results[0]);
    });
  },

  // ---------- ATUALIZAR ALUNO ----------
  updateAluno: (req, res) => {
    // Pega os dados do corpo da requisição
    const { id_aluno, fk_id_turma, nome_aluno, cpf, data_nascimento } = req.body;

    // Verifica se todos os campos foram enviados
    if (!id_aluno || !fk_id_turma || !nome_aluno || !cpf || !data_nascimento) {
      return res.status(400).json({ mensagem: "Preencha todos os campos!" });
    }

    // Valida o formato do CPF (11 dígitos)
    if (!/^\d{11}$/.test(cpf)) {
      return res.status(400).json({ mensagem: "CPF deve conter exatamente 11 números!" });
    }

    // Verifica se o ID informado realmente existe no banco
    const checkQuery = "SELECT * FROM aluno WHERE id_aluno = ?";
    connect.query(checkQuery, [id_aluno], (err, results) => {
      if (err) return res.status(500).json({ erro: "Erro no servidor" });

      // Se o ID não existir, não tem o que atualizar
      if (results.length === 0) return res.status(404).json({ mensagem: "Aluno não encontrado" });

      // Atualiza o aluno com os novos dados
      const updateQuery = "UPDATE aluno SET fk_id_turma = ?, nome_aluno = ?, cpf = ?, data_nascimento = ? WHERE id_aluno = ?";
      connect.query(updateQuery, [fk_id_turma, nome_aluno, cpf, data_nascimento, id_aluno], (err) => {
        if (err) return res.status(500).json({ erro: "Erro ao atualizar aluno" });
        return res.status(200).json({ mensagem: "Aluno atualizado com sucesso!" });
      });
    });
  },

  // ---------- DELETAR ALUNO ----------
  deleteAluno: (req, res) => {
    // Pega o ID do aluno pela URL
    const { id } = req.params;

    // Confere se o ID existe antes de deletar
    const checkQuery = "SELECT * FROM aluno WHERE id_aluno = ?";
    connect.query(checkQuery, [id], (err, results) => {
      if (err) return res.status(500).json({ erro: "Erro no servidor" });

      // Se não encontrar, retorna erro 404
      if (results.length === 0) return res.status(404).json({ mensagem: "Aluno não encontrado" });

      // Se o aluno existir, deleta do banco
      const deleteQuery = "DELETE FROM aluno WHERE id_aluno = ?";
      connect.query(deleteQuery, [id], (err) => {
        if (err) return res.status(500).json({ erro: "Erro ao deletar aluno" });
        return res.status(200).json({ mensagem: "Aluno deletado com sucesso!" });
      });
    });
  },
};
