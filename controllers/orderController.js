const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createOrder = async (req, res) => {
  const { cartId } = req.body;

  try {
    const cart = await prisma.cart.findUnique({
      where: { id: Number(cartId) },
      include: { items: { include: { food: true } } }
    });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const total = cart.items.reduce((sum, item) => sum + (item.qty * item.food.price), 0);

    const order = await prisma.order.create({
      data: {
        userId: cart.userId,
        total,
        queueNumber: await prisma.order.count() + 1,
        type: 'Dine-in',
        items: {
          create: cart.items.map(item => ({
            foodId: item.foodId,
            qty: item.qty,
            amount: item.qty * item.food.price
          }))
        }
      },
      include: { items: true }
    });

    await prisma.cart.update({
      where: { id: Number(cartId) },
      data: { items: { deleteMany: {} } }
    });

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const getOrder = async (req, res) => {
  try {
    const rders = await prisma.order.findMany();
    res.status(200).json(rders);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = { createOrder, getOrder };