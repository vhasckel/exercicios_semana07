const { DataTypes } = require("sequelize");
const connection = require("../database/connection");

const Professor = connection.define(
  "professores",
  {
    nome: {
      type: DataTypes.STRING,
    },
    sobrenome: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    cursoId: {
      type: DataTypes.INTEGER,
      references: {
        model: "cursos",
        key: "id",
      },
      allowNull: true,
    },
  },
  { paranoid: true }
);

module.exports = Professor;
