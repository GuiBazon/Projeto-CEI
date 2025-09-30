let alunos = [];
let nextId = 1; // auto incremento

module.exports = class alunoController {
  // Criar um novo aluno
  static async createAluno(req, res) {
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

    // Verifica se já existe um aluno com o mesmo email
    const existingAluno = alunos.find((alu) => alu.email === email);
    if (existingAluno) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    // Cria um novo objeto aluno
    const newAluno = {
      id_aluno: nextId++,
      nome,
      email,
      senha,
      telefone,
    };

    // Adiciona na "lista"
    alunos.push(newAluno);

    return res.status(201).json({
      message: "Aluno criado com sucesso",
      aluno: newAluno,
    });
  }

  // Listar todos os alunos
  static async getAllAluno(req, res) {
    return res.status(200).json({
      message: "Obtendo todos os alunos",
      alunos,
    });
  }

  // Buscar um aluno por ID
  static async getAlunoById(req, res) {
    const alunoId = parseInt(req.params.id);

    const aluno = alunos.find((alu) => alu.id_aluno === alunoId);

    if (!aluno) {
      return res.status(404).json({ error: "Aluno não encontrado" });
    }

    return res.status(200).json(aluno);
  }

  // Atualizar os dados de um aluno
  static async updateAluno(req, res) {
    const { id_aluno, nome, email, senha, telefone } = req.body;

    // Validações
    if (!id_aluno || !nome || !email || !senha || !telefone) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    }

    // Procura o índice do aluno no array
    const alunoIndex = alunos.findIndex((alu) => alu.id_aluno === id_aluno);

    if (alunoIndex === -1) {
      return res.status(404).json({ error: "Aluno não encontrado" });
    }

    // Verifica se o email já existe em outro aluno
    const emailExists = alunos.some(
      (alu) => alu.email === email && alu.id_aluno !== id_aluno
    );
    if (emailExists) {
      return res
        .status(400)
        .json({ error: "Email já cadastrado por outro aluno" });
    }

    // Atualiza os dados do aluno
    alunos[alunoIndex] = {
      id_aluno,
      nome,
      email,
      senha,
      telefone,
    };

    return res.status(200).json({
      message: "Aluno atualizado com sucesso",
      aluno: alunos[alunoIndex],
    });
  }

  // Deletar aluno pelo ID
  static async deleteAluno(req, res) {
    const alunoId = parseInt(req.params.id);

    const alunoIndex = alunos.findIndex((alu) => alu.id_aluno === alunoId);

    if (alunoIndex === -1) {
      return res.status(404).json({ error: "Aluno não encontrado" });
    }

    alunos.splice(alunoIndex, 1);

    return res.status(200).json({ message: "Aluno excluído com sucesso" });
  }
};
