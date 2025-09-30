let usuarios = [];
let nextId = 1; // auto incremento

module.exports = class usuarioController {
  // Criar novo usuário
  static async createUser(req, res) {
    const { nome, email, senha, telefone } = req.body;

    // Validações básicas
    if (!nome || !email || !senha || !telefone) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    } else if (!email.includes("@")) {
      return res.status(400).json({ error: "Email inválido. Deve conter @" });
    } else if (telefone.length !== 11 || isNaN(telefone)) {
      return res.status(400).json({
        error: "Telefone inválido. Deve conter exatamente 11 dígitos numéricos",
      });
    }

    // Verifica se já existe um usuário com o mesmo email
    const existingUser = usuarios.find((usu) => usu.email === email);
    if (existingUser) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    // Cria um novo objeto usuário
    const newUser = {
      id_usuario: nextId++,
      nome,
      email,
      senha,
      telefone,
    };

    usuarios.push(newUser);

    return res.status(201).json({
      message: "Usuário criado com sucesso",
      usuario: newUser,
    });
  }

  // Listar todos os usuários
  static async readUsers(req, res) {
    return res.status(200).json({
      message: "Obtendo todos os usuários",
      usuarios,
    });
  }

  // Buscar usuário por ID
  static async getUserById(req, res) {
    const userId = parseInt(req.params.id);

    const usuario = usuarios.find((usu) => usu.id_usuario === userId);

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    return res.status(200).json(usuario);
  }

  // Atualizar usuário
  static async updateUser(req, res) {
    const { id_usuario, nome, email, senha, telefone } = req.body;

    if (!id_usuario || !nome || !email || !senha || !telefone) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    }

    const userIndex = usuarios.findIndex(
      (usu) => usu.id_usuario === id_usuario
    );

    if (userIndex === -1) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    // Verifica se o email já existe em outro usuário
    const emailExists = usuarios.some(
      (usu) => usu.email === email && usu.id_usuario !== id_usuario
    );
    if (emailExists) {
      return res
        .status(400)
        .json({ error: "Email já cadastrado por outro usuário" });
    }

    usuarios[userIndex] = {
      id_usuario,
      nome,
      email,
      senha,
      telefone,
    };

    return res.status(200).json({
      message: "Usuário atualizado com sucesso",
      usuario: usuarios[userIndex],
    });
  }

  // Deletar usuário pelo ID
  static async deleteUser(req, res) {
    const userId = parseInt(req.params.id);

    const userIndex = usuarios.findIndex((usu) => usu.id_usuario === userId);

    if (userIndex === -1) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    usuarios.splice(userIndex, 1);

    return res.status(200).json({ message: "Usuário excluído com sucesso" });
  }
};
