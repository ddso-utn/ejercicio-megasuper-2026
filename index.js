import express from "express";
import { z } from "zod";

const PATH_PRODUCTOS_V1 = "/v1/productos";

const app = express();
app.use(express.json());

const productSchema = z.object({
  nombre: z.string().min(3).max(10),
  descripcion: z.string(),
  precioBase: z.number().nonnegative(),
  categoria: z.enum(["Bebidas", "Alimentos"]),
});

const cocaCola = {
  nombre: "Coca-Cola",
  precioBase: 2500,
  descripcion: "1,5lt",
  categoria: "Bebidas",
};

const harina = {
  nombre: "Harina",
  precioBase: 1000,
  descripcion: "1kg",
  categoria: "Alimentos",
};

const fideos = {
  nombre: "fideos",
  precioBase: 1000,
  descripcion: "1 paquete",
  categoria: "Alimentos",
};

const aceite = {
  nombre: "aceite",
  precioBase: 6000,
  descripcion: "1lt",
  categoria: "Alimentos",
};

const productos = [cocaCola, harina, fideos, aceite];

app.get("/v1/healthcheck", (req, res) => {
  res.json({
    status: "ok",
  });
});

app.get(PATH_PRODUCTOS_V1, (req, res) => {
  // query param: precio_lt
  console.log(req.query);
  const precioMenorQue = req.query.precio_lt;
  const categoria = req.query.categoria;
  let productosFiltrados = productos;
  if (precioMenorQue) {
    productosFiltrados = productosFiltrados.filter(
      (p) => p.precioBase < precioMenorQue,
    );
  }
  if (categoria) {
    productosFiltrados = productosFiltrados.filter(
      (p) => p.categoria === categoria,
    );
  }
  res.json(productosFiltrados);
});

app.get(PATH_PRODUCTOS_V1 + "/:id", (req, res) => {
  const id = req.params.id;
  const producto = productos[id];
  if (!producto) {
    res.status(404);
    return;
  }
  res.json(producto);
});

app.post(PATH_PRODUCTOS_V1, (req, res) => {
  const body = req.body;
  const result = productSchema.safeParse(body);
  if (result.error) {
    res.status(400);
    res.json(result.error.issues);
  }

  const nuevoProducto = result.data;

  const productoExistente = productos.find(
    (p) =>
      p.nombre === nuevoProducto.nombre &&
      p.categoria === nuevoProducto.categoria,
  );

  if (productoExistente) {
    res.status(409);
    res.json({
      error: "PRODUCTO_EXISTENTE",
    });
  }

  productos.push(nuevoProducto);
  res.status(201);
  res.json(nuevoProducto);
});

app.put(PATH_PRODUCTOS_V1 + "/:id", (req, res) => {
  const body = req.body;
  const resultBody = productSchema.safeParse(body);

  if (resultBody.error) {
    res.status(400).json(resultBody.error.issues);
    return;
  }

  const updateData = resultBody.data;
  const id = req.params.id;

  const productoExistente = productos[id];

  if (!productoExistente) {
    res.status(404).json({ error: "No existe un producto con ese ID" });
    return;
  }

  const productoExistenteNombre = productos.find(
    (p, index) =>
      p.nombre === updateData.nombre &&
      p.categoria === updateData.categoria &&
      index != id,
  );

  if (productoExistenteNombre) {
    res.status(409).json({ error: "Ya existe otro producto con ese nombre" });
    return;
  }

  productoExistente.nombre = updateData.nombre;
  productoExistente.precioBase = updateData.precioBase;
  productoExistente.descripcion = updateData.descripcion;
  productoExistente.categoria = updateData.categoria;

  res.status(200).json(productoExistente);
});

app.delete(PATH_PRODUCTOS_V1 + "/:id", (req, res) => {
  const id = req.params.id;
  productos.splice(id, 1);
  res.status(204);
  res.send();
});

const puerto = 3000;
app.listen(puerto, () => {
  console.log("El servidor inicializo correctamente en el puerto " + puerto);
});
