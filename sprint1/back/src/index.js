const express = require("express");

// Cria uma classe para organizar a configuração do app
class AppController {
  constructor() {
    // Cria a instância do Express dentro da classe
    this.express = express();

    // Chama os métodos para configurar middlewares e rotas
    this.middlewares();
    this.routes();
  }

  // Método para configurar middlewares (funções que processam requisições antes das rotas)
  // Aqui estamos dizendo que o app vai entender requisições com corpo JSON
  middlewares() {
    this.express.use(express.json());
  }

  // Método para configurar rotas da aplicação
  routes() {
    // Importa o arquivo com as rotas da API
    const apiRoutes = require("./routes/apiRoutes");

    // Todas as rotas do arquivo apiRoutes vão começar com /api
    this.express.use("/api", apiRoutes);
  }
}

// Exporta o app pronto, já com middlewares e rotas configuradas
module.exports = new AppController().express;
