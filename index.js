


const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());

// In-memory storage (mimicking a database)
let products = [
  {
    id: 1,
    name: "Sample Product",
    category: "Sample Category",
    price: 100,
    stock: 50,
    description: "Sample Description",
  },
];

// Routes
app.get("/products", (req, res) => res.json(products));

app.post("/products", (req, res) => {
  const newProduct = { id: Date.now(), ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const index = products.findIndex((p) => p.id == id);
  if (index !== -1) {
    products[index] = { id: parseInt(id), ...req.body };
    res.json(products[index]);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  products = products.filter((p) => p.id != id);
  res.status(204).send();
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
