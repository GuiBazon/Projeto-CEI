const express = require('express');
const router = express.Router();



const usuarioController = require('../controllers/usuarioController');
const turmaController = require('../controllers/turmaController');
const alunoController = require('../controllers/alunoController');
const ocorrenciaController = require('../controllers/ocorrenciaController');



router.get('/usuarios', usuarioController.readUsers);
router.get('/usuarios/:id_usuario', usuarioController.readUserById);
router.post('/usuarios', usuarioController.createUser);
router.put('/usuarios/:id_usuario', usuarioController.updateUser); // Atenção ao :id_usuario
router.delete('/usuarios/:id_usuario', usuarioController.deleteUser);
router.post('/login', usuarioController.loginUser);



router.get('/turmas', turmaController.readTurmas);
router.post('/turmas', turmaController.createTurma);
router.put('/turmas/:id_turma', turmaController.updateTurma); // Atenção ao :id_turma
router.delete('/turmas/:id_turma', turmaController.deleteTurma);



router.get('/alunos', alunoController.readAlunos);
router.get('/alunos/:id_aluno', alunoController.readAlunoById);
router.post('/alunos', alunoController.createAluno);
router.put('/alunos/:id_aluno', alunoController.updateAluno); // Atenção ao :id_aluno
router.delete('/alunos/:id_aluno', alunoController.deleteAluno);



router.get('/ocorrencias', ocorrenciaController.readOcorrencias);
router.post('/ocorrencias', ocorrenciaController.createOcorrencia);
router.put('/ocorrencias/:id_ocorrencia', ocorrenciaController.updateOcorrencia); // Atenção ao :id_ocorrencia
router.delete('/ocorrencias/:id_ocorrencia', ocorrenciaController.deleteOcorrencia);

router.get('/ocorrencias-detalhadas', ocorrenciaController.listarDetalhadas);
router.post('/ocorrencias-proc', ocorrenciaController.registrarViaProcedure);



module.exports = router;
