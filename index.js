const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.json());

// Hit | POST /login
app.post("/login", (req, res) => {
  const { phoneNumber, pin } = req.body;
  const login = { phoneNumber, pin };
  console.log("Login Hit:", login);
  res.json(login);
});

// Gagal | PATCH /user
app.patch("/user", (req, res) => {
  const { name, email, gender } = req.body;
  const user = { name, email, gender, phoneNumber };
  console.log("User Hit:", user);
  res.json(user);
});

// Hit | GET /categories
app.get("/categories", (req, res) => {
  const { id, name, image } = req.body;
  ``;
  const categories = { id, name, image };
  console.log("Categories Hit:", categories);
  res.json(categories);
});

// Gagal | GET /foods?category=(for you = all, categoryId)
app.get("/foods", (req, res) => {
  const { category } = req.query;
  const foods = [
    { id: 1, name: "Apple", categoryId: "fruit" },
    { id: 2, name: "Broccoli", categoryId: "vegetable" },
    { id: 3, name: "Chicken", categoryId: "meat" },
    { id: 4, name: "Banana", categoryId: "fruit" },
    { id: 5, name: "Carrot", categoryId: "vegetable" },
  ];
  if (category === "all" || !category) {
    res.json(foods);
  } else {
    res.json(foods.filter((food) => food.categoryId === category));
  }
  console.log("Foods Hit:", foods);
});

app.use((req, res, next) => {
  req.user = { id: 1 }; // Simulasi user dengan id 1
  next();
});

// Gagal | GET /carts (get current cart if exist by user)
app.get("/carts", (req, res) => {
  const carts = [
    { userId: 1, items: [{ id: 1, name: "Apple", quantity: 3 }] },
    { userId: 2, items: [{ id: 2, name: "Broccoli", quantity: 2 }] },
  ];
  const userCart = carts.find((c) => c.userId === req.user.id);
  if (userCart) {
    res.json(userCart);
  } else {
    res.status(404).json({ error: "Cart not found" });
  }
  console.log("Cart Hit:", userCart);
});

app.use((req, res, next) => {
  req.user = { id: 1 }; // Simulasi user dengan id 1
  next();
});

// Gagal | POST /carts (create if not exist)
app.post("/carts", (req, res) => {
  const carts = [
    { userId: 2, items: [{ id: 2, name: "Broccoli", quantity: 2 }] },
  ];
  const cart = carts.find((c) => c.userId === req.user.id);
  if (cart) {
    res.json(cart);
  } else {
    const newCart = {
      id: uuidv4(),
      userId: req.user.id,
      items: req.body.items || [],
    };
    carts.push(newCart);
    console.log("New Cart created:", newCart);
    res.status(201).json(newCart);
  }
});

// Hit | POST /orders
app.post("/orders", (req, res) => {
  const { cartId } = req.body;
  const orders = { cartId };
  console.log("Orders Hit:", orders);
  res.json(orders);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
