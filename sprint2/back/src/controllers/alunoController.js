let organizadores = [];
let nextId = 1; // auto incremento

module.exports = class organizadorController {
  static async createOrganizador(req, res) {
    const { nome, email, senha, telefone } = req.body;

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

    // Verificando se o email já existe
    const existingOrganizador = organizadores.find(
      (org) => org.email === email
    );
    if (existingOrganizador) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    // Cria novo organizador
    const newOrganizador = {
      id_organizador: nextId++,
      nome,
      email,
      senha,
      telefone,
    };

    organizadores.push(newOrganizador);

    return res.status(201).json({
      message: "Organizador criado com sucesso",
      organizador: newOrganizador,
    });
  }

  static async getAllOrganizadores(req, res) {
    return res.status(200).json({
      message: "Obtendo todos os organizadores",
      organizadores,
    });
  }

  static async updateOrganizador(req, res) {
    const { id_organizador, nome, email, senha, telefone } = req.body;

    // Validações
    if (!id_organizador || !nome || !email || !senha || !telefone) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    }

    const organizadorIndex = organizadores.findIndex(
      (org) => org.id_organizador === id_organizador
    );

    if (organizadorIndex === -1) {
      return res.status(404).json({ error: "Organizador não encontrado" });
    }

    // Verificando se o email já está em uso por outro organizador
    const emailExists = organizadores.some(
      (org) => org.email === email && org.id_organizador !== id_organizador
    );
    if (emailExists) {
      return res
        .status(400)
        .json({ error: "Email já cadastrado por outro organizador" });
    }

    organizadores[organizadorIndex] = {
      id_organizador,
      nome,
      email,
      senha,
      telefone,
    };

    return res.status(200).json({
      message: "Organizador atualizado com sucesso",
      organizador: organizadores[organizadorIndex],
    });
  }

  static async deleteOrganizador(req, res) {
    const organizadorId = parseInt(req.params.id);

    const organizadorIndex = organizadores.findIndex(
      (org) => org.id_organizador === organizadorId
    );

    if (organizadorIndex === -1) {
      return res.status(404).json({ error: "Organizador não encontrado" });
    }

    organizadores.splice(organizadorIndex, 1);

    return res
      .status(200)
      .json({ message: "Organizador excluído com sucesso" });
  }
};
