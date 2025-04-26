const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "obras",
});

db.connect((err) => {
  if (err) {
    console.error("Erro ao conectar no banco:", err);
    return;
  }
  console.log("Conectado ao MySQL com sucesso!");
});

module.exports = db;
