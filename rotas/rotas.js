const express = require("express");
const router = express.Router();
const ObrasController = require("../controller/controller.js");
const authMiddleware = require("../middlewear/middle.js");

router.get("/obras", ObrasController.listarObras);

router.post("/obras", authMiddleware, ObrasController.adicionarObra);

router.put("/obras/:id", authMiddleware, ObrasController.atualizarObra);

router.delete("/obras/:id", authMiddleware, ObrasController.deletarObra);

router.post("/verify", ObrasController.login);

module.exports = router;
