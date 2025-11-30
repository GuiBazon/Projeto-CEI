const express = require('express');
const router = express.Router();

// Import das Controllers
const usuarioController = require('../controllers/usuarioController');
const turmaController = require('../controllers/turmaController');
const alunoController = require('../controllers/alunoController');
const ocorrenciaController = require('../controllers/ocorrenciaController');

// ==================================================================
// 1. ROTAS DE USUÁRIO (Conferido com seu usuarioController.js)
// ==================================================================
// Nomes no Controller: readUsers, createUser, updateUser, deleteUser, loginUser
router.get('/usuarios', usuarioController.readUsers);
router.get('/usuarios/:id_usuario', usuarioController.readUserById);
router.post('/usuarios', usuarioController.createUser);
router.put('/usuarios/:id_usuario', usuarioController.updateUser); // Atenção ao :id_usuario
router.delete('/usuarios/:id_usuario', usuarioController.deleteUser);
router.post('/login', usuarioController.loginUser);


// ==================================================================
// 2. ROTAS DE TURMA (Conferido com seu turmaController.js)
// ==================================================================
// Nomes no Controller: readTurmas, createTurma, updateTurma, deleteTurma
router.get('/turmas', turmaController.readTurmas);
router.post('/turmas', turmaController.createTurma);
router.put('/turmas/:id_turma', turmaController.updateTurma); // Atenção ao :id_turma
router.delete('/turmas/:id_turma', turmaController.deleteTurma);

// ==================================================================
// 3. ROTAS DE ALUNO (Conferido com seu alunoController.js)
// ==================================================================
// Nomes no Controller: readAlunos, createAluno, updateAluno, deleteAluno
router.get('/alunos', alunoController.readAlunos);
router.get('/alunos/:id_aluno', alunoController.readAlunoById);
router.post('/alunos', alunoController.createAluno);
router.put('/alunos/:id_aluno', alunoController.updateAluno); // Atenção ao :id_aluno
router.delete('/alunos/:id_aluno', alunoController.deleteAluno);

// ==================================================================
// 4. ROTAS DE OCORRÊNCIA (Conferido com seu ocorrenciaController.js)
// ==================================================================
// Nomes no Controller: readOcorrencias, createOcorrencia, updateOcorrencia, deleteOcorrencia
router.get('/ocorrencias', ocorrenciaController.readOcorrencias);
router.post('/ocorrencias', ocorrenciaController.createOcorrencia);
router.put('/ocorrencias/:id_ocorrencia', ocorrenciaController.updateOcorrencia); // Atenção ao :id_ocorrencia
router.delete('/ocorrencias/:id_ocorrencia', ocorrenciaController.deleteOcorrencia);

// ==================================================================
// 🚀 5. SPRINT 3 - REQUISITOS NOVOS
// ==================================================================
// ATENÇÃO: Essas funções SÓ VÃO FUNCIONAR se você adicionou elas no 
// ocorrenciaController.js como conversamos antes.
router.get('/ocorrencias-detalhadas', ocorrenciaController.listarDetalhadas);
router.post('/ocorrencias-proc', ocorrenciaController.registrarViaProcedure);

module.exports = router;












































// const express = require('express');
// const router = express.Router();

// const usuarioController = require('../controllers/usuarioController');
// const turmaController = require('../controllers/turmaController');
// const alunoController = require('../controllers/alunoController');
// const ocorrenciaController = require('../controllers/ocorrenciaController');

// // ... seus imports ...

// // --- USUARIO (Corrigido para bater com o seu controller) ---

// // 1. GET /usuarios -> Chama o readUsers
// router.get('/usuarios', usuarioController.readUsers); 

// // 2. POST /usuarios -> Chama o createUser
// router.post('/usuarios', usuarioController.createUser);

// // 3. PUT /usuarios/:id_usuario -> Chama o updateUser
// // ATENÇÃO: Mudei de :id para :id_usuario porque seu controller pede req.params.id_usuario
// router.put('/usuarios/:id_usuario', usuarioController.updateUser); 

// // 4. DELETE /usuarios/:id_usuario -> Chama o deleteUser
// router.delete('/usuarios/:id_usuario', usuarioController.deleteUser);

// // 5. LOGIN (Você tem essa função no controller, vale a pena criar a rota!)
// router.post('/login', usuarioController.loginUser);

// // ⚠️ IMPORTANTE: Eu removi a rota "listarPorId" (GET /usuarios/:id) 
// // porque ela NÃO EXISTE no seu arquivo usuarioController.js. 
// // Se você deixar ela lá, o servidor vai cair de novo.


// // // USUARIO ANTERIOR
// // router.get('/usuarios', usuarioController.listar);
// // router.get('/usuarios/:id', usuarioController.listarPorId);
// // router.post('/usuarios', usuarioController.criar);
// // router.put('/usuarios/:id', usuarioController.editar);
// // router.delete('/usuarios/:id', usuarioController.deletar);

// // TURMA
// router.get('/turmas', turmaController.listar);
// router.get('/turmas/:id', turmaController.ltaisrPorId);
// router.post('/turmas', turmaController.criar);
// router.put('/turmas/:id', turmaController.editar);
// router.delete('/turmas/:id', turmaController.deletar);

// // ALUNO
// router.get('/alunos', alunoController.listar);
// router.get('/alunos/:id', alunoController.listarPorId);
// router.post('/alunos', alunoController.criar);
// router.put('/alunos/:id', alunoController.editar);
// router.delete('/alunos/:id', alunoController.deletar);

// // OCORRENCIA
// router.get('/ocorrencias', ocorrenciaController.listar);
// router.get('/ocorrencias/i:d', ocorrenciaController.listarPorId);
// router.post('/ocorrencias', ocorrenciaController.criar);
// router.put('/ocorrencias/:id', ocorrenciaController.editar);
// router.delete('/ocorrencias/:id', ocorrenciaController.deletar);

// // VIEW DETALHADA
// router.get('/ocorrencias-detalhadas', ocorrenciaController.listarDetalhadas);

// // PROCEDURE
// router.post('/ocorrencias-proc', ocorrenciaController.registrarViaProcedure);

// module.exports = router;
