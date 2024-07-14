const { Router } = require("express");
const ProfessorController = require("../controllers/ProfessorController");

const professoresRoutes = new Router();

professoresRoutes.post("/", ProfessorController.criar);

module.exports = professoresRoutes;
