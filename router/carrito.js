const express = require("express");
const { Router } = express;
const router = new Router();

const Product = require("../product");
const product = new Product();
const ContenedorCarrito = require("../contenedorCarrito");
const cc = new ContenedorCarrito();

//middlware
router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.post("/", async (req, res) => {
  await cc.save(req.body);
  res.send(`Carrito creado!`);
});

router.delete("/:id", async (req, res) => {
  await cc.delete(req.params.id);
  res.send(`Carrito ${req.params.id} borrado!`);
});

router.get("/", async (req, res) => {
  res.send(await cc.getAll());
});

router.post("/:id/productos", async (req, res) => {
  await cc.update(req.params.id, req.body);
  res.send("Producto agregado al carrito!");
});

router.get("/:id/productos", async (req, res) => {
  res.send(await cc.getProducts(req.params.id));
});

router.delete("/:id/productos/:idProduct", async (req, res) => {
  await cc.deleteProduct(req.params.id, req.params.idProduct);
  res.send("Producto eliminado del carrito!");
  console.log(req.params.idProduct);
});

module.exports = router;
