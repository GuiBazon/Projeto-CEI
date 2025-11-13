const router = require("express").Router();
const userController = require("../controllers/usuarioController");
const alunoController = require("../controllers/alunoController");

// Rotas de Usuário
router.post("/usuario", userController.createUsuario);
router.get("/usuario", userController.readAllUsuario);
router.get("/usuario/:id", userController.readUsuarioById);
router.put("/usuario", userController.updateUsuario);
router.delete("/usuario/:id", userController.deleteUsuario);

// Rotas de Aluno
router.post("/aluno", alunoController.createAluno);
router.get("/aluno", alunoController.readAllAluno);
router.get("/aluno/:id", alunoController.readAlunobyId);
router.put("/aluno", alunoController.updateAluno);
router.delete("/aluno/:id", alunoController.deleteAluno);

module.exports = router;