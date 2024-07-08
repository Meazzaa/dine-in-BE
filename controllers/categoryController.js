const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    res.send(categories);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = { getCategories };