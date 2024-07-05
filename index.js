const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.json());

// getUser
app.get("/user", async (req, res) => {
  try {
    const user = await prisma.user.findMany();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// getUserById
app.get("/user/:id", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
});

// createUser
app.post("/login", async (req, res) => {
  const { phoneNumber } = req.body;
  try {
    const user = await prisma.user.create({
      data: {
        phoneNumber: phoneNumber,
      },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

// updateUser
app.patch("/user/:id", async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const user = await prisma.user.update({
      where: {
        id: Number(req.params.id),
      },
      data: {
        phoneNumber: phoneNumber,
      },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

// getCategories
app.get("/categories", async (req, res) => {
  const categories = await prisma.category.findMany();
  res.send(categories);
});

// // Gagal | GET /foods?category=(for you = all, categoryId)
// app.get("/foods", (req, res) => {
//   const { category } = req.query;
//   const foods = [
//     { id: 1, name: "Apple", categoryId: "fruit" },
//     { id: 2, name: "Broccoli", categoryId: "vegetable" },
//     { id: 3, name: "Chicken", categoryId: "meat" },
//     { id: 4, name: "Banana", categoryId: "fruit" },
//     { id: 5, name: "Carrot", categoryId: "vegetable" },
//   ];
//   if (category === "all" || !category) {
//     res.json(foods);
//   } else {
//     res.json(foods.filter((food) => food.categoryId === category));
//   }
//   console.log("Foods Hit:", foods);
// });

// app.use((req, res, next) => {
//   req.user = { id: 1 }; // Simulasi user dengan id 1
//   next();
// });

// // Gagal | GET /carts (get current cart if exist by user)
// app.get("/carts", (req, res) => {
//   const carts = [
//     { userId: 1, items: [{ id: 1, name: "Apple", quantity: 3 }] },
//     { userId: 2, items: [{ id: 2, name: "Broccoli", quantity: 2 }] },
//   ];
//   const userCart = carts.find((c) => c.userId === req.user.id);
//   if (userCart) {
//     res.json(userCart);
//   } else {
//     res.status(404).json({ error: "Cart not found" });
//   }
//   console.log("Cart Hit:", userCart);
// });

// app.use((req, res, next) => {
//   req.user = { id: 1 }; // Simulasi user dengan id 1
//   next();
// });

// // Gagal | POST /carts (create if not exist)
// app.post("/carts", (req, res) => {
//   const carts = [
//     { userId: 2, items: [{ id: 2, name: "Broccoli", quantity: 2 }] },
//   ];
//   const cart = carts.find((c) => c.userId === req.user.id);
//   if (cart) {
//     res.json(cart);
//   } else {
//     const newCart = {
//       id: uuidv4(),
//       userId: req.user.id,
//       items: req.body.items || [],
//     };
//     carts.push(newCart);
//     console.log("New Cart created:", newCart);
//     res.status(201).json(newCart);
//   }
// });

// // Hit | POST /orders
// app.post("/orders", (req, res) => {
//   const { cartId } = req.body;
//   const orders = { cartId };
//   console.log("Orders Hit:", orders);
//   res.json(orders);
// });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
