const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getCart = async (req, res) => {
  const { userId } = req.query;

  try {
    const cart = await prisma.cart.findFirst({
      where: { userId: Number(userId) },
      include: { items: { include: { food: true } } }
    });

    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ error: 'Cart not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const createCart = async (req, res) => {
  const { userId, items } = req.body;

  try {
    let cart = await prisma.cart.findFirst({
      where: { userId: Number(userId) },
      include: { items: true }
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId: Number(userId),
          items: {
            create: items.map(item => ({
              foodId: item.foodId,
              qty: item.quantity
            }))
          }
        },
        include: { items: true }
      });
    } else {
      cart = await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: {
            create: items.map(item => ({
              foodId: item.foodId,
              qty: item.quantity
            }))
          }
        },
        include: { items: true }
      });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = { getCart, createCart };