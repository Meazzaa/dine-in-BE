const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const moment = require("moment");

const createOrder = async (req, res) => {
  const { userId, items } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const total = await items.reduce(async (sumPromise, item) => {
      const sum = await sumPromise;
      const food = await prisma.food.findUnique({ where: { id: item.foodId } });
      return sum + item.quantity * food.price;
    }, Promise.resolve(0));

    const order = await prisma.order.create({
      data: {
        userId: Number(userId),
        total,
        queueNumber: (await prisma.order.count()) + 1,
        type: "Dine-in",
        items: {
          create: await Promise.all(
            items.map(async (item) => ({
              foodId: item.foodId,
              qty: item.quantity,
              amount:
                item.quantity *
                (
                  await prisma.food.findUnique({ where: { id: item.foodId } })
                ).price,
            }))
          ),
        },
      },
      include: { items: true },
    });
    order.createdAt = moment(order.createdAt).format('DD-MM-YYYY HH:mm:ss');

    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const getOrder = async (req, res) => {
  try {
    const orders = await prisma.order.findMany();
    orders.forEach(order => {
      order.createdAt = moment(order.createdAt).format('DD-MM-YYYY HH:mm:ss');
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        items: {
          include: {
            food: true,
          },
        },
      },
    });

    if (order) {
      order.createdAt = moment(order.createdAt).format('DD-MM-YYYY HH:mm:ss');
      res.status(200).json(order);
    } else {
      res.status(404).json({ msg: "Order not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = { createOrder, getOrder, getOrderById };
