const express = require("express");
const app = express();
const port = process.env.port || 8080;

const productosRoutes = require("./router/productos");
const carritoRoutes = require("./router/carrito");

//Mindleware
//transforma a json el la info del form
app.use(express.json());
//formatea la info de un form
app.use(express.urlencoded({ extended: false }));
//Engine
// app.set("views", "./views");
// app.set("view engine", "hbs");
// app.engine(
//   "hbs",
//   handlebars({
//     extname: "hbs",
//     layoutsDir: __dirname + "/views/layout", //Se posiciona dentro de la carpeta handlerbarexpress
//     defaultLayout: "main", //plantilla principal
//     partialsDir: __dirname + "/views/partials",
//   })
// );

app.use("/api/productos", productosRoutes);
app.use("/api/carrito", carritoRoutes);

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
