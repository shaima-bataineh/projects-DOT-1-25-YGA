const express = require("express");
const Order = require("../models/Order");
const router = express.Router();

router.post("/", async (req, res) => {
  const order = await Order.create(req.body);
  res.json(order);
});

router.get("/", async (req, res) => {
  const orders = await Order.find().populate("user");
  res.json(orders);
});

// update order

router.patch("/:id", async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,       // id المستخدم من الـ URL
      { $set: req.body },  // التعديلات من body
      { new: true }        // ترجعلي النسخة المحدثة
    );
    if (!updatedOrder) 
      return res.status(404).json({ message: "Order not found" });

    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// delete order 

router.delete("/:id", async (req, res) => { // this route will handle the deletion of an order by its id

  try { // we use a try-catch block to handle any potential errors that may occur during the deletion process

    const deletedOrder = await Order.findByIdAndDelete(req.params.id);// we attempt to find the order by its id and delete it from the database

    if (!deletedOrder)// if the order is not found (i.e., deletedOrder is null), we return a 404 response with a message indicating that the order was not found

      return res.status(404).json({ message: "Order not found" });

    res.json({ message: "Order deleted successfully" });
  } catch (error) {

    res.status(400).json({ error: error.message });// if there is an error during the deletion process (e.g., invalid id format), we catch the error and return a 400 response with the error message
  }
});

module.exports = router;
