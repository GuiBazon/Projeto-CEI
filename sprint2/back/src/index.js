const express = require("express");

class AppController {
  constructor() {
    this.express = express(); // cria uma intancia do express dentro da classe
    this.middlewares();
    this.routes();
  }

  // Permite que a aplicacao receba dados em formato JSON nas requires
  middlewares() {
    this.express.use(express.json());
  }

  // Nos definimos as nossas rotas
  routes() {
    const apiRoutes = require("./routes/apiRoutes");
    this.express.use("/api/v1", apiRoutes);
  }
}

// Exporta a instacia do express ja configurada acima, tornando-a acessivel em outros arquivos
module.exports = new AppController().express;