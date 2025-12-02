const connect = require("../db/connect");

module.exports = class ocorrenciaController {

  static async listarDetalhadas(req, res) {
    const query = `SELECT * FROM vw_detalhes_ocorrencias`;

    connect.query(query, (err, results) => {
      if (err) {
        console.error(err.sqlMessage);
        return res.status(500).json({ error: "Erro ao buscar detalhes" });
      }
      return res.status(200).json(results);
    });
  }

  static async registrarViaProcedure(req, res) {
    const { fk_id_aluno, fk_id_usuario, descricao } = req.body;

    if (!fk_id_aluno || !fk_id_usuario || !descricao) {
      return res.status(400).json({ error: "Campos obrigatórios faltando" });
    }

    // Chama a procedure 'proc_nova_ocorrencia' que criamos no banco
    const query = `CALL proc_nova_ocorrencia(?, ?, ?)`;
    const values = [fk_id_aluno, fk_id_usuario, descricao];

    connect.query(query, values, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro na procedure" });
      }
      return res.status(201).json({ message: "Ocorrência registrada via Procedure com sucesso!" });
    });
  }

  



  static async createOcorrencia(req, res) {
    const { fk_id_aluno, fk_id_usuario, data_ocorrencia, descricao } = req.body;

    if (!fk_id_aluno || !fk_id_usuario || !data_ocorrencia) {
      return res.status(400).json({ error: "Campos obrigatórios não preenchidos" });
    }

    const query = `
      INSERT INTO ocorrencia (fk_id_aluno, fk_id_usuario, data_ocorrencia, descricao)
      VALUES (?, ?, ?, ?)
    `;
    const values = [fk_id_aluno, fk_id_usuario, data_ocorrencia, descricao];

    connect.query(query, values, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro interno do servidor" });
      }
      return res.status(201).json({ message: "Ocorrência registrada" });
    });
  }



  static async readOcorrencias(req, res) {
    const query = `SELECT * FROM ocorrencia`;

    connect.query(query, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro interno do servidor" });
      }
      return res.status(200).json(results);
    });
  }



  static async updateOcorrencia(req, res) {
    const id_ocorrencia = req.params.id_ocorrencia; 
    const { fk_id_aluno, fk_id_usuario, data_ocorrencia, descricao } = req.body;

    if (!fk_id_aluno || !fk_id_usuario || !data_ocorrencia) {
      return res.status(400).json({ error: "Campos obrigatórios faltando" });
    }

    const query = `
      UPDATE ocorrencia
      SET fk_id_aluno = ?, fk_id_usuario = ?, data_ocorrencia = ?, descricao = ?
      WHERE id_ocorrencia = ?
    `;
    const values = [fk_id_aluno, fk_id_usuario, data_ocorrencia, descricao, id_ocorrencia];

    connect.query(query, values, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro interno do servidor" });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Ocorrência não encontrada" });
      }
      return res.status(200).json({ message: "Ocorrência atualizada" });
    });
  }



  static async deleteOcorrencia(req, res) {
    const id_ocorrencia = req.params.id_ocorrencia;

    const query = `DELETE FROM ocorrencia WHERE id_ocorrencia = ?`;

    connect.query(query, [id_ocorrencia], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro interno do servidor" });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Ocorrência não encontrada" });
      }
      return res.status(200).json({ message: "Ocorrência excluída" });
    });
  }
};
