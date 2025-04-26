const db = require("../db/db.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class ObraController {
  static async listarObras(req, res) {
    try {
      db.query("SELECT * FROM obras", (err, results) => {
        if (err)
          return res
            .status(500)
            .json({ success: false, message: "Erro ao buscar obras" });

        res.json({
          success: true,
          message: "Obras listadas com sucesso",
          data: results,
        });
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Erro interno" });
    }
  }

  static async login(req, res) {
    const { senha } = req.body;

    try {
      const query = "SELECT * FROM usuarios WHERE senha = ?";
      db.query(query, [senha], (err, results) => {
        if (err) {
          return res
            .status(500)
            .json({
              success: false,
              message: "Erro ao acessar o banco de dados",
            });
        }

        if (results.length === 0) {
          return res
            .status(404)
            .json({
              success: false,
              message: "Usuário não encontrado ou senha inválida",
            });
        }

        const usuario = results[0];

        const token = jwt.sign(
          { id: usuario.id, permissao: usuario.permissao },
          "segredo_do_backend",
          { expiresIn: "1h" }
        );

        return res.status(200).json({
          success: true,
          message: "Login bem-sucedido",
          token: token,
        });
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Erro no servidor" });
    }
  }

  static async adicionarObra(req, res) {
    const {
      nome,
      descricao,
      status,
      latitude,
      longitude,
      data_inicio,
      data_fim,
      verba,
    } = req.body;

    if (
      !nome ||
      !descricao ||
      !status ||
      !latitude ||
      !longitude ||
      !data_inicio ||
      !data_fim ||
      !verba
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Preencha todos os campos" });
    }

    try {
      const sql =
        "INSERT INTO obras (nome, descricao, status, latitude, longitude, data_inicio, data_fim, verba) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
      db.query(
        sql,
        [
          nome,
          descricao,
          status,
          latitude,
          longitude,
          data_inicio,
          data_fim,
          verba,
        ],
        (err, result) => {
          if (err)
            return res
              .status(500)
              .json({ success: false, message: "Erro ao adicionar obra" });

          res
            .status(201)
            .json({ success: true, message: "Obra adicionada com sucesso" });
        }
      );
    } catch (error) {
      res.status(500).json({ success: false, message: "Erro interno" });
    }
  }

  static async deletarObra(req, res) {
    const { id } = req.params;

    try {
      const sql = "DELETE FROM obras WHERE id = ?";
      db.query(sql, [id], (err, result) => {
        if (err)
          return res
            .status(500)
            .json({ success: false, message: "Erro ao deletar obra" });

        if (result.affectedRows === 0)
          return res
            .status(404)
            .json({ success: false, message: "Obra não encontrada" });

        res.json({ success: true, message: "Obra removida com sucesso" });
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Erro interno" });
    }
  }

  static async atualizarObra(req, res) {
    const { id } = req.params;
    const {
      nome,
      descricao,
      status,
      latitude,
      longitude,
      data_inicio,
      data_fim,
      verba,
    } = req.body;

    try {
      const sql =
        "UPDATE obras SET nome = ?, descricao = ?, status = ?, latitude = ?, longitude = ?, data_inicio = ?, data_fim = ?, verba = ? WHERE id = ?";
      db.query(
        sql,
        [
          nome,
          descricao,
          status,
          latitude,
          longitude,
          data_inicio,
          data_fim,
          verba,
          id,
        ],
        (err, result) => {
          if (err)
            return res
              .status(500)
              .json({ success: false, message: "Erro ao atualizar obra" });

          if (result.affectedRows === 0)
            return res
              .status(404)
              .json({ success: false, message: "Obra não encontrada" });

          res.json({ success: true, message: "Obra atualizada com sucesso" });
        }
      );
    } catch (error) {
      res.status(500).json({ success: false, message: "Erro interno" });
    }
  }
}

module.exports = ObraController;
