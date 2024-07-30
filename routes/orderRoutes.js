const express = require("express");
const { createOrder, getOrder, getOrderById } = require("../controllers/orderController");
const router = express.Router();

router.post("/orders", createOrder);
router.get("/orders", getOrder);
router.get("/orders/:id", getOrderById);

module.exports = router;
