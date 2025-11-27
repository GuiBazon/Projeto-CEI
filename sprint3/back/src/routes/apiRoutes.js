const express = require('express');
const router = express.Router();

const usuarioController = require('../controllers/usuarioController');
const turmaController = require('../controllers/turmaController');
const alunoController = require('../controllers/alunoController');
const ocorrenciaController = require('../controllers/ocorrenciaController');

// USUARIO
router.get('/usuarios', usuarioController.listar);
router.get('/usuarios/:id', usuarioController.listarPorId);
router.post('/usuarios', usuarioController.criar);
router.put('/usuarios/:id', usuarioController.editar);
router.delete('/usuarios/:id', usuarioController.deletar);

// TURMA
router.get('/turmas', turmaController.listar);
router.get('/turmas/:id', turmaController.listarPorId);
router.post('/turmas', turmaController.criar);
router.put('/turmas/:id', turmaController.editar);
router.delete('/turmas/:id', turmaController.deletar);

// ALUNO
router.get('/alunos', alunoController.listar);
router.get('/alunos/:id', alunoController.listarPorId);
router.post('/alunos', alunoController.criar);
router.put('/alunos/:id', alunoController.editar);
router.delete('/alunos/:id', alunoController.deletar);

// OCORRENCIA
router.get('/ocorrencias', ocorrenciaController.listar);
router.get('/ocorrencias/:id', ocorrenciaController.listarPorId);
router.post('/ocorrencias', ocorrenciaController.criar);
router.put('/ocorrencias/:id', ocorrenciaController.editar);
router.delete('/ocorrencias/:id', ocorrenciaController.deletar);

// VIEW DETALHADA
router.get('/ocorrencias-detalhadas', ocorrenciaController.listarDetalhadas);

// PROCEDURE
router.post('/ocorrencias-proc', ocorrenciaController.registrarViaProcedure);

module.exports = router;
