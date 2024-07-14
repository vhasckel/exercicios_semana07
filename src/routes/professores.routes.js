const { Router } = require("express");
const ProfessorController = require("../controllers/ProfessorController");

const professoresRoutes = new Router();

professoresRoutes.post("/", ProfessorController.criar);
professoresRoutes.get("/", ProfessorController.listaTodos);
professoresRoutes.get("/:id", ProfessorController.listarUm);

module.exports = professoresRoutes;
