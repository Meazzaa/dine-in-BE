const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createOrder = async (req, res) => {
  const { userId, items } = req.body;

  try {
    // Ensure the user exists
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Calculate total price from items
    const total = await items.reduce(async (sumPromise, item) => {
      const sum = await sumPromise;
      const food = await prisma.food.findUnique({ where: { id: item.foodId } });
      return sum + item.quantity * food.price;
    }, Promise.resolve(0));

    // Create the order
    const order = await prisma.order.create({
      data: {
        userId: Number(userId),
        total,
        queueNumber: (await prisma.order.count()) + 1, // Assuming queueNumber is sequential
        type: "Dine-in", // or 'Takeaway', as per your requirement
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

    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const getOrder = async (req, res) => {
  try {
    const orders = await prisma.order.findMany();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: Number(req.params.id) }, // Menggunakan req.params.id
      include: {
        items: {
          include: {
            food: true,
          },
        },
      },
    });

    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ msg: "Order not found" });
    }
  } catch (error) {
    console.error(error); // Menggunakan console.error untuk mencatat kesalahan
    res.status(500).json({ msg: "Internal server error" }); // Menggunakan status 500 untuk kesalahan server
  }
};

module.exports = { createOrder, getOrder, getOrderById };
