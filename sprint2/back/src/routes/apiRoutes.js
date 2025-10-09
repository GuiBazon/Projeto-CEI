const router = require("express").Router();
const professorController = require('../controllers/professorController')
const organizadorController = require('../controllers/organizadorController');

router.post("/professor", professorController.createProfessor);
router.put("/professor", professorController.updateProfessor);
router.get("/professor", professorController.readProfessor);
router.delete("/professor/:id", professorController.deleteProfessor);
router.get("/professor/:id", professorController.getProfessorById);

router.post('/organizador', organizadorController.createOrganizador);
router.get('/organizador', organizadorController.getAllOrganizadores);
router.put('/organizador', organizadorController.updateOrganizador);
router.delete('/organizador/:id', organizadorController.deleteOrganizador);
router.get("/organizador/:id", professorController.getProfessorById);

module.exports = router;