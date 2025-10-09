const router = require("express").Router();
const userController = require("../controllers/usuarioController");
const alunoController = require("../controllers/alunoController");
const usuarioController = require("../controllers/usuarioController");

// Rotas de Usuário
router.post("/usuario", usuarioController.createUsuario);
router.get("/usuario", usuarioController.readUsuarios);
router.put("/usuario", usuarioController.updateUsuario);
router.delete("/usuario/:id", usuarioController.deleteUsuario);

// Rotas de Aluno
router.post("/aluno", alunoController.createAluno);
router.get("/aluno", alunoController.readAlunos);
router.put("/aluno", alunoController.updateAluno);
router.delete("/aluno/:id", alunoController.deleteAluno);

module.exports = router;
