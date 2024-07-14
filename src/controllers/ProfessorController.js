const Professor = require("../models/Professor");
const validator = require("validator");

class ProfessorController {
  async criar(request, response) {
    try {
      const { nome, sobrenome, email } = request.body;
      if (!nome || typeof nome !== "string" || nome.trim() === "") {
        return response.status(400).json({
          message: "O nome é obrigatório e deve ser uma string não vazia.",
        });
      }

      if (
        !sobrenome ||
        typeof sobrenome !== "string" ||
        sobrenome.trim() === ""
      ) {
        return response.status(400).json({
          message: "O sobrenome é obrigatório e deve ser uma string não vazia.",
        });
      }

      if (
        !email ||
        typeof email !== "string" ||
        email.trim() === "" ||
        !validator.isEmail(email)
      ) {
        return response.status(400).json({
          message: "O e-mail é obrigatório e deve ser válido.",
        });
      }
      const professor = await Professor.create({ nome, sobrenome, email });
      response.status(201).json(professor);
    } catch (error) {
      response.status(500).json({
        mensagem: "Houve um erro ao cadastrar professor",
      });
    }
  }
}

module.exports = new ProfessorController();
