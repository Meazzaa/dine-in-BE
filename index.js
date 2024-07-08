// const express = require("express");
// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();
// const bodyParser = require("body-parser");
// const app = express();
// const port = 3000;

// app.use(bodyParser.json());
// app.use(express.json());

// // Create User
// app.post("/login", async (req, res) => {
//   const { phoneNumber } = req.body;
//   try {
//     const user = await prisma.user.create({
//       data: {
//         phoneNumber: phoneNumber,
//       },
//     });
//     res.status(201).json(user);
//   } catch (error) {
//     res.status(400).json({ msg: error.message });
//   }
// });

// // Get All User
// app.get("/user", async (req, res) => {
//   try {
//     const user = await prisma.user.findMany();
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ msg: error.message });
//   }
// });

// // Get User by Id
// app.get("/user/:id", async (req, res) => {
//   try {
//     const user = await prisma.user.findUnique({
//       where: {
//         id: Number(req.params.id),
//       },
//     });
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(404).json({ msg: error.message });
//   }
// });

// // Update User by Id
// app.patch("/user/:id", async (req, res) => {
//   try {
//     const { phoneNumber } = req.body;
//     const user = await prisma.user.update({
//       where: {
//         id: Number(req.params.id),
//       },
//       data: {
//         phoneNumber: phoneNumber,
//       },
//     });
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(400).json({ msg: error.message });
//   }
// });

// // Get All Category
// app.get("/categories", async (req, res) => {
//   const categories = await prisma.category.findMany();
//   res.send(categories);
// });

// //Get Foods by Category
// app.get("/foods", async (req, res) => {
//   const { category } = req.query;

//   try {
//     let foods;
//     if (category && category !== 'all') {
//       foods = await prisma.food.findMany({
//         where: { categoryId: Number(category) }
//       });
//     } else {
//       foods = await prisma.food.findMany();
//     }
//     res.json(foods);
//   } catch (error) {
//     res.status(500).json({ error: 'Something went wrong' });
//   }
// });

// //Get Carts by userId
// app.get("/carts", async (req, res) => {
//   const { userId } = req.query;

//   try {
//     const cart = await prisma.cart.findFirst({
//       where: { userId: Number(userId) },
//       include: { items: { include: { food: true } } }
//     });

//     if (cart) {
//       res.json(cart);
//     } else {
//       res.status(404).json({ error: 'Cart not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Something went wrong' });
//   }
// });

// //Create Carts for User by userId if not exist create newcart 
// app.post("/carts", async (req, res) => {
//   const { userId, items } = req.body;

//   try {
//     let cart = await prisma.cart.findFirst({
//       where: { userId: Number(userId) },
//       include: { items: true }
//     });

//     if (!cart) {
//       cart = await prisma.cart.create({
//         data: {
//           userId: Number(userId),
//           items: {
//             create: items.map(item => ({
//               foodId: item.foodId,
//               qty: item.quantity
//             }))
//           }
//         },
//         include: { items: true }
//       });
//     } else {
//       cart = await prisma.cart.update({
//         where: { id: cart.id },
//         data: {
//           items: {
//             create: items.map(item => ({
//               foodId: item.foodId,
//               qty: item.quantity
//             }))
//           }
//         },
//         include: { items: true }
//       });
//     }

//     res.json(cart);
//   } catch (error) {
//     res.status(500).json({ error: 'Something went wrong' });
//   }
// });

// // Create Orders by cardId if not exist Cart not found
// app.post("/orders", async (req, res) => {
//   const { cartId } = req.body;

//   try {
//     const cart = await prisma.cart.findUnique({
//       where: { id: Number(cartId) },
//       include: { items: { include: { food: true } } }
//     });

//     if (!cart) {
//       return res.status(404).json({ error: 'Cart not found' });
//     }

//     const total = cart.items.reduce((sum, item) => sum + (item.qty * item.food.price), 0);

//     const order = await prisma.order.create({
//       data: {
//         userId: cart.userId,
//         total,
//         queueNumber: await prisma.order.count() + 1,
//         type: 'Dine-in',
//         items: {
//           create: cart.items.map(item => ({
//             foodId: item.foodId,
//             qty: item.qty,
//             amount: item.qty * item.food.price
//           }))
//         }
//       },
//       include: { items: true }
//     });

//     // Clear the cart after creating the order
//     await prisma.cart.update({
//       where: { id: Number(cartId) },
//       data: { items: { deleteMany: {} } }
//     });

//     res.json(order);
//   } catch (error) {
//     res.status(500).json({ error: 'Something went wrong' });
//   }
// });


// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
