const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createUser = async (req, res) => {
  const { phoneNumber } = req.body;
  try {
    const user = await prisma.user.create({
      data: { phoneNumber }
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(req.params.id) }
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const user = await prisma.user.update({
      where: { id: Number(req.params.id) },
      data: { phoneNumber }
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = { createUser, getUsers, getUserById, updateUser };