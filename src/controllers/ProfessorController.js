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

  async listaTodos(request, response) {
    try {
      const professores = await Professor.findAll({
        attributes: [["id", "identificador"], "nome", "sobrenome", "email"],
        order: [["nome", "ASC"]],
      });
      response.json(professores);
    } catch (error) {
      response.status(500).json({
        mensagem: "Houve um erro ao listar professores",
      });
    }
  }

  async listarUm(request, response) {
    try {
      const id = request.params.id;

      const professor = await Professor.findByPk(id, {
        attributes: ["nome", "sobrenome", "email"],
      });

      if (!professor) {
        response.status(404).json({ mensagem: "Professor não encontrado" });
      }

      response.json(professor);
    } catch (error) {
      response.status(500).json({
        mensagem: "Houve um erro ao buscar professor",
      });
    }
  }

  async atualizar(request, response) {
    try {
      const id = request.params.id;
      const dados = request.body;

      if (
        dados.nome &&
        (typeof dados.nome !== "string" || dados.nome.trim() === "")
      ) {
        return response
          .status(400)
          .json({ message: "O nome deve ser uma string não vazia." });
      }

      if (
        dados.sobrenome &&
        (typeof dados.sobrenome !== "string" || dados.sobrenome.trim() === "")
      ) {
        return response
          .status(400)
          .json({ message: "O sobrenome deve ser uma string não vazia." });
      }

      if (
        dados.email &&
        (typeof dados.email !== "string" ||
          dados.email.trim() === "" ||
          !validator.isEmail(dados.email))
      ) {
        return response.status(400).json({
          message: "O e-mail é obrigatório e deve ser válido.",
        });
      }

      const professor = await Professor.findByPk(id);

      if (!professor) {
        return response
          .status(404)
          .json({ mensagem: "Professor não encontrado" });
      }

      if (dados.nome) professor.nome = dados.nome;
      if (dados.sobrenome) professor.sobrenome = dados.sobrenome;
      if (dados.email) professor.email = dados.email;

      await professor.save();

      response.json(professor);
    } catch (error) {
      response.status(500).json({
        mensagem: "Houve um erro ao atualizar o cadastro do professor",
      });
    }
  }

  async deletar(request, response) {
    try {
      const id = request.params.id;
      const professor = await Professor.findByPk(id);

      if (!professor) {
        response.status(404).json({ mensagem: "professor não encontrado" });
      }

      await professor.destroy();

      response.status(204).json();
    } catch (error) {
      response.status(500).json({
        mensagem: "Houve um erro ao deletar professor",
      });
    }
  }
}

module.exports = new ProfessorController();
