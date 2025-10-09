let users = [];

module.exports = class userController {
  static async createUser(req, res) {
    const { cpf, email, password, name } = req.body;
    if (!cpf || !email || !password || !name) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    }
    const existingUser = users.find((user) => user.cpf === cpf); // Verifica se esse cpf ja está sendo usado
    if (existingUser) {
      return res.status(400).json({ error: "CPF já cadastrado" });
    }

    const newUser = { cpf, email, password, name };
    users.push(newUser);
    return res
      .status(201)
      .json({ message: "Usuario cadastrado", user: newUser });
  }

  static async readUsers(req, res) {
    return res
      .status(200)
      .json({ message: "aqui estao os usuarios", users: users });
  }

  static async updateUser(req, res) {
    const { cpf, email, password, name } = req.body;
    if (!cpf || !email || !password || !name) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    }

    // Procura o index do array que satisfaz a condição
    const userIndex = users.findIndex((user) => user.cpf === cpf);

    // retorna -1 quando nenhum index é encontrado
    if (userIndex === -1) {
      return res.status(404).json({ error: "usuario não encontrado" });
    }

    users[userIndex] = { cpf, name, password, email };

    return res.status(200).json({ message: "O usuario foi atualizado", user:users[userIndex]})
  }

  static async deleteUser(req, res){
    const identificadorUsuario = req.params.cpf

    // Procura o indice do usuário no array de 'users' pelo cpf
    const userIndex = users.findIndex(
      (user) => user.cpf === identificadorUsuario
    )

    if (userIndex === -1) {
      return res.status(404).json({error: "Usuario nao encontrado"})
    }

    // Remove o usuário do array 'users' usando a funcionalidade splice, que deleta o item encontrada
    users.splice(userIndex, 1);

    // Retorna 200, informando 
    return res.status(200).json({message: "Usuario excluido com sucesso"})
  }

};