const app = require("./index");
const PORT = 3000;

const cors = require("cors")

const corsOptions = {
    origin: '*',
    methods: 'GET, POST, PUT, DELETE, PATCH, HEAD',
    credentials: true,
    optionsSucessStatus: 204
}


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
