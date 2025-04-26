const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5050;
const rotas = require("../rotas/rotas.js");
app.use(cors());
app.use(express.json());
app.use("/api", rotas);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
