// Importa a conexão com o banco
const connect = require("../db/connect");

module.exports = {
  // Criar usuário
  createUsuario: (req, res) => {
    const { nome_usuario, email, senha } = req.body;

    // Verifica se todos os campos foram enviados
    if (!nome_usuario || !email || !senha) {
      return res.status(400).json({ mensagem: "Preencha todos os campos!" });
    }

    // Valida se o email contém '@'
    if (!email.includes("@")) {
      return res.status(400).json({ mensagem: "Email inválido!" });
    }

    // Verifica se o email já está cadastrado
    const checkEmail = "SELECT * FROM usuario WHERE email = ?";
    connect.query(checkEmail, [email], (err, results) => {
      if (err) return res.status(500).json({ erro: "Erro no servidor" });

      if (results.length > 0) {
        return res.status(400).json({ mensagem: "Email já cadastrado!" });
      }

      // Se passou em todas as validações, faz o insert
      const insertQuery = "INSERT INTO usuario (nome_usuario, email, senha) VALUES (?, ?, ?)";
      connect.query(insertQuery, [nome_usuario, email, senha], (err) => {
        if (err) return res.status(500).json({ erro: "Erro ao cadastrar usuário" });
        return res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!" });
      });
    });
  },

  // Ler todos os usuários
  readAllUsuario: (req, res) => {
    const query = "SELECT * FROM usuario";
    connect.query(query, (err, results) => {
      if (err) return res.status(500).json({ erro: "Erro ao buscar usuários" });
      return res.status(200).json(results);
    });
  },

  // Ler um usuário por ID
  readUsuarioById: (req, res) => {
    const { id } = req.params;
    const query = "SELECT * FROM usuario WHERE id_usuario = ?";
    connect.query(query, [id], (err, results) => {
      if (err) return res.status(500).json({ erro: "Erro ao buscar usuário" });
      if (results.length === 0) return res.status(404).json({ mensagem: "Usuário não encontrado" });
      return res.status(200).json(results[0]);
    });
  },

  // Atualizar usuário
  updateUsuario: (req, res) => {
    const { id_usuario, nome_usuario, email, senha } = req.body;

    if (!id_usuario || !nome_usuario || !email || !senha) {
      return res.status(400).json({ mensagem: "Preencha todos os campos!" });
    }

    // Verifica se o email contém '@'
    if (!email.includes("@")) {
      return res.status(400).json({ mensagem: "Email inválido!" });
    }

    // Confere se o ID existe antes de atualizar
    const checkQuery = "SELECT * FROM usuario WHERE id_usuario = ?";
    connect.query(checkQuery, [id_usuario], (err, results) => {
      if (err) return res.status(500).json({ erro: "Erro no servidor" });
      if (results.length === 0) return res.status(404).json({ mensagem: "Usuário não encontrado" });

      // Atualiza os dados
      const updateQuery = "UPDATE usuario SET nome_usuario = ?, email = ?, senha = ? WHERE id_usuario = ?";
      connect.query(updateQuery, [nome_usuario, email, senha, id_usuario], (err) => {
        if (err) return res.status(500).json({ erro: "Erro ao atualizar usuário" });
        return res.status(200).json({ mensagem: "Usuário atualizado com sucesso!" });
      });
    });
  },

  // Deletar usuário
  deleteUsuario: (req, res) => {
    const { id } = req.params;

    const checkQuery = "SELECT * FROM usuario WHERE id_usuario = ?";
    connect.query(checkQuery, [id], (err, results) => {
      if (err) return res.status(500).json({ erro: "Erro no servidor" });
      if (results.length === 0) return res.status(404).json({ mensagem: "Usuário não encontrado" });

      const deleteQuery = "DELETE FROM usuario WHERE id_usuario = ?";
      connect.query(deleteQuery, [id], (err) => {
        if (err) return res.status(500).json({ erro: "Erro ao deletar usuário" });
        return res.status(200).json({ mensagem: "Usuário deletado com sucesso!" });
      });
    });
  },
};
