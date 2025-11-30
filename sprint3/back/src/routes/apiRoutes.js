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