const router = require("express").Router();
const userController = require("../controllers/usuarioController");
const alunoController = require("../controllers/alunoController");

// Rotas de Usuário
router.post("/usuario", userController.createUser);
router.get("/usuario", userController.readUsers);
router.get("/usuario/:id", userController.getUserById);
router.put("/usuario", userController.updateUser);
router.delete("/usuario/:id", userController.deleteUser);

// Rotas de Aluno
router.post("/aluno", alunoController.createAluno);
router.get("/aluno", alunoController.getAllAluno);
router.get("/aluno/:id", alunoController.getAlunoById);
router.put("/aluno", alunoController.updateAluno);
router.delete("/aluno/:id", alunoController.deleteAluno);

module.exports = router;
