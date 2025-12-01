const connect = require("../db/connect");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

module.exports = class usuarioController {

  static async createUser(req, res) {
    const { nome_usuario, email, senha } = req.body;

    console.log("Valores Recebidos:", req.body);

    if (!nome_usuario || !email || !senha) {
      return res.status(400).json({ error: "Todos os campos devem ser preenchidos" });
    }

    if (!email.includes("@")) {
      return res.status(400).json({ error: "Email inválido" });
    }

    const hashedPassword = await bcrypt.hash(senha, SALT_ROUNDS);

    const query = `
      INSERT INTO usuario (nome_usuario, email, senha)
      VALUES (?, ?, ?)
    `;

    const values = [nome_usuario, email, hashedPassword];

    try {
      connect.query(query, values, (err) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res.status(400).json({ error: "Email já cadastrado" });
          }
          console.error(err);
          return res.status(500).json({ error: "Erro interno do servidor" });
        }

        return res.status(201).json({ message: "Usuário criado com sucesso" });
      });
    } catch (error) {
      console.error("Erro ao executar consulta:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }



  static async readUsers(req, res) {
    const query = `SELECT * FROM usuario`;

    try {
      connect.query(query, (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erro interno do servidor" });
        }

        return res.status(200).json({ message: "Usuários obtidos", usuarios: results });
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }



  static async readUserById(req, res) {
    const id_usuario = req.params.id_usuario;
    const query = `SELECT * FROM usuario WHERE id_usuario = ?`;

    try {
      connect.query(query, [id_usuario], (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erro interno" });
        }
        if (results.length === 0) {
          return res.status(404).json({ error: "Usuário não encontrado" });
        }
        return res.status(200).json(results[0]);
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro interno" });
    }
  }



  static async updateUser(req, res) {
    const id_usuario = req.params.id_usuario;
    const { nome_usuario, email, senha } = req.body;

    if (!nome_usuario || !email || !senha) {
      return res.status(400).json({ error: "Todos os campos devem ser preenchidos" });
    }

    const hashedPassword = await bcrypt.hash(senha, SALT_ROUNDS);

    const query = `
      UPDATE usuario
      SET nome_usuario = ?, email = ?, senha = ?
      WHERE id_usuario = ?
    `;

    const values = [nome_usuario, email, hashedPassword, id_usuario];

    try {
      connect.query(query, values, (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erro interno do servidor" });
        }

        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "Usuário não encontrado" });
        }

        return res.status(200).json({ message: "Usuário atualizado com sucesso" });
      });
    } catch (error) {
      console.error("Erro ao executar consulta:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }



  static async deleteUser(req, res) {
    const id_usuario = req.params.id_usuario;

    const query = `DELETE FROM usuario WHERE id_usuario = ?`;
    const values = [id_usuario];

    try {
      connect.query(query, values, (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Erro interno do servidor" });
        }

        if (results.affectedRows === 0) {
          return res.status(404).json({ error: "Usuário não encontrado" });
        }

        return res.status(200).json({ message: "Usuário excluído com sucesso" });
      });
    } catch (error) {
      console.error("Erro ao executar consulta:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }



  static async loginUser(req, res) {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ error: "Email e senha são obrigatórios" });
    }

    const query = `SELECT * FROM usuario WHERE email = ?`;

    try {
      connect.query(query, [email], async (err, results) => {
        if (err) {
          console.error("Erro ao executar consulta:", err);
          return res.status(500).json({ error: "Erro interno do servidor" });
        }

        if (results.length === 0) {
          return res.status(401).json({ error: "Usuário não cadastrado" });
        }

        const user = results[0];

        const senhaCorreta = await bcrypt.compare(senha, user.senha);

        if (!senhaCorreta) {
          return res.status(401).json({ error: "Senha incorreta" });
        }

        return res.status(200).json({ message: "Login bem-sucedido", user });
      });
    } catch (error) {
      console.error("Erro ao executar consulta:", error);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
};
