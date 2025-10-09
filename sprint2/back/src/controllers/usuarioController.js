const connect = require('../db/connect');

module.exports = class usuarioController {
  static async createUsuario(req, res) {
    const { nomeUsuario, email, senha } = req.body;

    if (!nomeUsuario || !email || !senha) {
      return res.status(400).json({ error: "Todos os campos devem ser preenchidos!" });
    }

    const query = `
      INSERT INTO usuario (nomeUsuario, email, senha)
      VALUES (?, ?, ?)
    `;
    const values = [nomeUsuario, email, senha];

    connect.query(query, values, function (err) {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ error: "Usuário já cadastrado" });
        }
        console.error(err);
        return res.status(500).json({ error: "Erro ao cadastrar usuário no banco" });
      }

      console.log("Usuário inserido no MySQL");
      return res.status(201).json({ message: "Usuário criado com sucesso!" });
    });
  }

  static async readUsuarios(req, res) {
    const query = `SELECT * FROM usuario`;

    connect.query(query, function (err, results) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro interno do servidor" });
      }
      return res.status(200).json({ message: "Obtendo usuários:", usuarios: results });
    });
  }

  static async updateUsuario(req, res) {
    const { id_usuario, nomeUsuario, email, senha } = req.body;

    if (!id_usuario || !nomeUsuario || !email || !senha) {
      return res.status(400).json({ error: "Todos os campos devem ser preenchidos!" });
    }

    const query = `
      UPDATE usuario
      SET nomeUsuario = ?, email = ?, senha = ?
      WHERE id_usuario = ?
    `;
    const values = [nomeUsuario, email, senha, id_usuario];

    connect.query(query, values, function (err, results) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro interno do servidor" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      return res.status(200).json({ message: `Usuário atualizado com ID: ${id_usuario}` });
    });
  }

  static async deleteUsuario(req, res) {
    const id = req.params.id_usuario;

    const query = `DELETE FROM usuario WHERE id_usuario = ?`;

    connect.query(query, [id], function (err, results) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro interno do servidor" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      return res.status(200).json({ message: `Usuário excluído: ${id}` });
    });
  }
};
