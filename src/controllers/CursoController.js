const Curso = require("../models/Curso");

class CursoController {
  async criar(request, response) {
    try {
      const { nome, duracao } = request.body;
      if (!nome || typeof nome !== "string" || nome.trim() === "") {
        return response.status(400).json({
          message: "O nome é obrigatório e deve ser uma string não vazia.",
        });
      }

      if (!duracao || typeof duracao !== "number" || duracao <= 0) {
        return response
          .status(400)
          .json({ message: "A duração deve ser um número inteiro positivo." });
      }
      const curso = await Curso.create({ nome, duracao });
      response.status(201).json(curso);
    } catch (error) {
      response.status(500).json({
        mensagem: "Houve um erro ao cadastrar o curso",
      });
    }
  }

  async listaTodos(request, response) {
    try {
      const cursos = await Curso.findAll({
        attributes: [["id", "identificador"], "nome", "duracao"],
        order: [["duracao", "DESC"]],
      });
      response.json(cursos);
    } catch (error) {
      response.status(500).json({
        mensagem: "Houve um erro ao listar os curso",
      });
    }
  }

  async listarUm(request, response) {
    try {
      const id = request.params.id;

      const curso = await Curso.findByPk(id, {
        attributes: ["nome", "duracao"],
      });

      if (!curso) {
        response.status(404).json({ mensagem: "Não foi encontrado o curso" });
      }

      response.json(curso);
    } catch (error) {
      response.status(500).json({
        mensagem: "Houve um erro ao listar o curso",
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
        dados.duracao &&
        (typeof dados.duracao !== "number" || dados.duracao <= 0)
      ) {
        return response
          .status(400)
          .json({ message: "A duração deve ser um número inteiro positivo." });
      }

      const curso = await Curso.findByPk(id);

      if (!curso) {
        response.status(404).json({ mensagem: "Curso não encontrado" });
      }

      if (curso.nome) curso.nome = dados.nome;
      if (curso.duracao) curso.duracao = dados.duracao;
      await curso.save();

      response.json(curso);
    } catch (error) {
      response.status(500).json({
        mensagem: "Houve um erro ao atualizar o curso",
      });
    }
  }

  async deletar(request, response) {
    try {
      const id = request.params.id;
      const curso = await Curso.findByPk(id);

      if (!curso) {
        response.status(404).json({ mensagem: "Curso não encontrado" });
      }

      await curso.destroy();

      response.status(204).json();
    } catch (error) {
      response.status(500).json({
        mensagem: "Houve um erro ao deletar o curso",
      });
    }
  }
}

module.exports = new CursoController();
