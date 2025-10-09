// Importa a conexão com o banco de dados
const connect = require("../db/connect");

// Cria uma classe com os métodos do CRUD (Create, Read, Update, Delete)
module.exports = class usuarioController {
  
  // CREATE - Cadastrar novo usuário
  static async createUsuario(req, res) {
    // Pega os dados enviados no corpo da requisição
    const { nome_usuario, email, senha } = req.body;

    // Verifica se todos os campos foram preenchidos
    if (!nome_usuario || !email || !senha) {
      return res.status(400).json({ mensagem: "Preencha todos os campos!" });
    }

    // Comando SQL para inserir um novo usuário
    const query = "INSERT INTO usuario (nome_usuario, email, senha) VALUES (?, ?, ?)";

    // Executa o comando no banco de dados
    connect.query(query, [nome_usuario, email, senha], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ mensagem: "Erro ao cadastrar usuário." });
      }

      return res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!" });
    });
  }

  // READ - Mostrar todos os usuários cadastrados
  static async readAllUsuario(req, res) {
    const query = "SELECT * FROM usuario";

    connect.query(query, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ mensagem: "Erro ao buscar usuários." });
      }

      return res.status(200).json(results); // Retorna todos os usuários
    });
  }

  // READ - Buscar um usuário pelo ID
  static async readUsuarioById(req, res) {
    const id = req.params.id; // Pega o ID da URL
    const query = "SELECT * FROM usuario WHERE id_usuario = ?";

    connect.query(query, [id], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ mensagem: "Erro ao buscar usuário." });
      }

      // Se não encontrou nenhum usuário com o ID informado
      if (results.length === 0) {
        return res.status(404).json({ mensagem: "Usuário não encontrado." });
      }

      return res.status(200).json(results[0]); // Retorna o usuário encontrado
    });
  }

  // UPDATE - Atualizar dados de um usuário
  static async updateUsuario(req, res) {
    const { id_usuario, nome_usuario, email, senha } = req.body;

    if (!id_usuario || !nome_usuario || !email || !senha) {
      return res.status(400).json({ mensagem: "Preencha todos os campos!" });
    }

    const query = "UPDATE usuario SET nome_usuario = ?, email = ?, senha = ? WHERE id_usuario = ?";

    connect.query(query, [nome_usuario, email, senha, id_usuario], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ mensagem: "Erro ao atualizar usuário." });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ mensagem: "Usuário não encontrado." });
      }

      return res.status(200).json({ mensagem: "Usuário atualizado com sucesso!" });
    });
  }

  // DELETE - Excluir um usuário
  static async deleteUsuario(req, res) {
    const id = req.params.id;
    const query = "DELETE FROM usuario WHERE id_usuario = ?";

    connect.query(query, [id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ mensagem: "Erro ao excluir usuário." });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ mensagem: "Usuário não encontrado." });
      }

      return res.status(200).json({ mensagem: "Usuário excluído com sucesso!" });
    });
  }
};
