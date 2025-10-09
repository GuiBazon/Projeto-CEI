const connect = require("./connect");

module.exports = function testConnect() {
  try {
    const query = `SELECT 'Conexao bem-sucedida' AS Mensagem`;
    connect.query(query, function (err) {
      if (err) {
        console.log("Conexao nao realizada" + err);
        return;
      }
      console.log("Conexao realizada com mysql");
    });
  } catch (error) {
    console.error("Erro ao executar a consulta SQL: ", error);
  }
};