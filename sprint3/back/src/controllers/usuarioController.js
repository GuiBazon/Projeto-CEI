// Importa a conexão com o banco de dados (arquivo connect.js dentro da pasta db)
const connect = require("../db/connect");

// Exporta todas as funções do controller
module.exports = {

  // ---------- CRIAR USUÁRIO ----------
  createUsuario: (req, res) => {
    // Pega os dados enviados no corpo da requisição (nome, email, senha)
    const { nome_usuario, email, senha } = req.body;

    // Verifica se todos os campos obrigatórios foram enviados
    if (!nome_usuario || !email || !senha) {
      return res.status(400).json({ mensagem: "Preencha todos os campos!" });
    }

    // Verifica se o email contém '@' (validação simples)
    if (!email.includes("@")) {
      return res.status(400).json({ mensagem: "Email inválido!" });
    }

    // Monta o comando SQL pra checar se já existe um usuário com esse email
    const checkEmail = "SELECT * FROM usuario WHERE email = ?";

    // Executa a query de verificação
    connect.query(checkEmail, [email], (err, results) => {
      // Se der erro no servidor/banco
      if (err) return res.status(500).json({ erro: "Erro no servidor" });

      // Se o email já existir, não deixa cadastrar
      if (results.length > 0) {
        return res.status(400).json({ mensagem: "Email já cadastrado!" });
      }

      // Se passou nas validações, insere o novo usuário no banco
      const insertQuery = "INSERT INTO usuario (nome_usuario, email, senha) VALUES (?, ?, ?)";
      connect.query(insertQuery, [nome_usuario, email, senha], (err) => {
        if (err) return res.status(500).json({ erro: "Erro ao cadastrar usuário" });
        return res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!" });
      });
    });
  },

  // ---------- LER TODOS OS USUÁRIOS ----------
  readAllUsuario: (req, res) => {
    // SQL pra buscar todos os usuários
    const query = "SELECT * FROM usuario";

    // Executa a consulta
    connect.query(query, (err, results) => {
      if (err) return res.status(500).json({ erro: "Erro ao buscar usuários" });
      // Retorna todos os resultados encontrados
      return res.status(200).json(results);
    });
  },

  // ---------- LER USUÁRIO POR ID ----------
  readUsuarioById: (req, res) => {
    // Pega o ID da URL (ex: /usuario/5)
    const { id } = req.params;

    // SQL pra buscar o usuário pelo ID
    const query = "SELECT * FROM usuario WHERE id_usuario = ?";

    // Executa a consulta com o ID recebido
    connect.query(query, [id], (err, results) => {
      if (err) return res.status(500).json({ erro: "Erro ao buscar usuário" });

      // Se não encontrar ninguém com esse ID
      if (results.length === 0) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" });
      }

      // Retorna o usuário encontrado (results[0] = primeiro resultado)
      return res.status(200).json(results[0]);
    });
  },

  // ---------- ATUALIZAR USUÁRIO ----------
  updateUsuario: (req, res) => {
    // Pega os dados enviados no corpo da requisição
    const { id_usuario, nome_usuario, email, senha } = req.body;

    // Verifica se todos os campos foram enviados
    if (!id_usuario || !nome_usuario || !email || !senha) {
      return res.status(400).json({ mensagem: "Preencha todos os campos!" });
    }

    // Verifica se o email contém '@'
    if (!email.includes("@")) {
      return res.status(400).json({ mensagem: "Email inválido!" });
    }

    // Antes de atualizar, confere se o ID realmente existe no banco
    const checkQuery = "SELECT * FROM usuario WHERE id_usuario = ?";
    connect.query(checkQuery, [id_usuario], (err, results) => {
      if (err) return res.status(500).json({ erro: "Erro no servidor" });
      if (results.length === 0) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" });
      }

      // Atualiza o usuário com os novos dados
      const updateQuery = "UPDATE usuario SET nome_usuario = ?, email = ?, senha = ? WHERE id_usuario = ?";
      connect.query(updateQuery, [nome_usuario, email, senha, id_usuario], (err) => {
        if (err) return res.status(500).json({ erro: "Erro ao atualizar usuário" });
        return res.status(200).json({ mensagem: "Usuário atualizado com sucesso!" });
      });
    });
  },

  // ---------- DELETAR USUÁRIO ----------
  deleteUsuario: (req, res) => {
    // Pega o ID da URL
    const { id } = req.params;

    // Primeiro verifica se o ID existe no banco
    const checkQuery = "SELECT * FROM usuario WHERE id_usuario = ?";
    connect.query(checkQuery, [id], (err, results) => {
      if (err) return res.status(500).json({ erro: "Erro no servidor" });

      // Se não achar, retorna erro 404
      if (results.length === 0) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" });
      }

      // Se achou, deleta o registro
      const deleteQuery = "DELETE FROM usuario WHERE id_usuario = ?";
      connect.query(deleteQuery, [id], (err) => {
        if (err) return res.status(500).json({ erro: "Erro ao deletar usuário" });
        return res.status(200).json({ mensagem: "Usuário deletado com sucesso!" });
      });
    });
  },
};
