const express = require("express");
const { Router } = express;
const router = new Router();
const Contenedor = require("../product");
const c = new Contenedor();
//middlware
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

const administrador = false;
const msjError = {
  error: -1,
  mensaje: "Acceso denegado",
};
const autorizacion = (res) => {
  if (!administrador) {
    res.send(msjError);
  }
};

router.get("/:id", async (req, res) => {
  res.send(await product.getById(req.params.id));
});

router.post("/", async (req, res) => {
  if (req.query.admin === "true") {
    await product.save(req.body);
    res.send("Producto guardado correctamente");
  }
  autorizacion(res);
});

router.put("/:id", async (req, res) => {
  if (req.query.admin === "true") {
    console.log(req.params.id);
    console.log(req.body);
    await product.update(req.params.id, req.body);
    res.send("Producto actualizado con exito");
  }
  autorizacion(res);
});

router.delete("/:id", async (req, res) => {
  if (req.query.admin === "true") {
    await product.delete(req.params.id);
    res.send("Producto eliminado con exito");
  }
  autorizacion(res);
});

module.exports = router;
