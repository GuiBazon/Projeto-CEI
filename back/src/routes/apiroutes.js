// Importa o Router do Express, que serve pra criar rotas separadas do app principal
const { Router } = require("express");

// Cria uma instância do Router
const routes = Router();

// Define a rota GET /health
// Quando alguém acessar /api/health, vai responder com status 200 e JSON { message: "OK" }
routes.get("/health", (req, res) => {
  return res.status(200).json({ message: "OK" });
});

// Exporta as rotas pra serem usadas no app principal (index.js)
module.exports = routes;
