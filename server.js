const express = require("express");
const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set(`views`, `./views`);
app.set("view engine", "pug");

const Contenedor = require("./contenedor");
const contenedor = new Contenedor("productos.js");

app.get(`/productos`, async (req, res) => {
  const productosLista = await contenedor.getAll();
  res.render(`pages/index.pug`, {
    productosLista,
  });
  console.log(productosLista);
});

app.get("/", (req, res) => {
  res.render("pages/form.pug");
});

app.post("/productos", async (req, res) => {
  const { title, price } = req.body;
  await contenedor.save(title, price);
  res.redirect("/");
  console.log(body);
});

app.listen(PORT, () => {
  console.log(`Sv ${PORT}`);
});
