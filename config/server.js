const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("../routes/userRoutes");
const cartRoutes = require("../routes/cartRoutes");
const categoryRoutes = require("../routes/categoryRoutes");
const foodRoutes = require("../routes/foodRoutes");
const orderRoutes = require("../routes/orderRoutes");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.json());

app.use(userRoutes);
app.use(cartRoutes);
app.use(categoryRoutes);
app.use(foodRoutes);
app.use(orderRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
