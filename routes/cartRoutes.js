const express = require("express");
const { getCart, createCart } = require("../controllers/cartController");
const router = express.Router();

router.get("/carts", getCart);
router.post("/carts", createCart);

module.exports = router;
