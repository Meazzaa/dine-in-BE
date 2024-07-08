const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getFoods = async (req, res) => {
  const { category } = req.query;

  try {
    let foods;
    if (category && category !== 'all') {
      foods = await prisma.food.findMany({
        where: { categoryId: Number(category) }
      });
    } else {
      foods = await prisma.food.findMany();
    }
    res.json(foods);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = { getFoods };