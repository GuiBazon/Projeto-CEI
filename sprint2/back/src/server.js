const app = require("./index");
const PORT = 3000;

app.listen(5000);
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
