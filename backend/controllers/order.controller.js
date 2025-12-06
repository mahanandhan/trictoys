import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";
import Address from "../models/address.model.js";
import Product from "../models/product.model.js";

// Place an order
export const placeOrder = async (req, res) => {
  try {
    const { addressId, productIds, quantities } = req.body;

    // 1️⃣ Validate address
    const address = await Address.findOne({ _id: addressId, user: req.user._id });
    if (!address) return res.status(400).json({ message: "Invalid address" });

    // 2️⃣ Get user's cart
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart || cart.products.length === 0)
      return res.status(400).json({ message: "Cart is empty" });

    // 3️⃣ Select products to order
    let productsToOrder = productIds && productIds.length > 0
      ? cart.products.filter(p => productIds.includes(p.product.toString()))
      : cart.products;

    // 4️⃣ Assign quantities
    productsToOrder = productsToOrder.map((p, index) => {
      const qty = quantities && quantities[index] ? quantities[index] : p.quantity || 1;
      return { ...p.toObject(), quantity: qty };
    });

    // 5️⃣ Filter products with quantity > 0
    productsToOrder = productsToOrder.filter(p => p.quantity > 0);
    if (productsToOrder.length === 0)
      return res.status(400).json({ message: "No products with quantity > 0" });

    // 6️⃣ Check stock availability
    for (const item of productsToOrder) {
      const product = await Product.findById(item.product);
      if (!product) return res.status(404).json({ message: `Product ${item.name} not found` });
      if (product.stock < item.quantity)
        return res.status(400).json({ message: `Insufficient stock for ${item.name}` });
    }

    // 7️⃣ Deduct stock
    for (const item of productsToOrder) {
      await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } });
    }

    // 8️⃣ Calculate total amount
    const totalAmount = productsToOrder.reduce((sum, p) => sum + p.price * p.quantity, 0);

    // 9️⃣ Create order
    const order = new Order({
      user: req.user._id,
      products: productsToOrder.map(p => ({
        product: p.product,
        name: p.name,
        price: p.price,
        quantity: p.quantity,
      })),
      address: address._id,
      paymentMethod: "COD",
      totalAmount,
      status: "Pending",
    });

    await order.save();

    // 10️⃣ Remove ordered products from cart
    cart.products = cart.products.filter(
      p => !productsToOrder.some(o => o.product.toString() === p.product.toString())
    );
    await cart.save();

    // 11️⃣ Populate order references before sending
    const populatedOrder = await Order.findById(order._id)
      .populate("products.product")
      .populate("address");

    res.status(201).json({ message: "Order placed successfully", order: populatedOrder });

  } catch (error) {
    console.error("Place order error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all orders of the user
export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("products.product")
      .populate("address");
    res.status(200).json(orders);
  } catch (error) {
    console.error("Get orders error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Remove an order
export const removeOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    // Find order owned by the logged-in user
    const order = await Order.findOne({ _id: orderId, user: req.user._id });
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Restore stock for each product
    for (const item of order.products) {
      await Product.findByIdAndUpdate(item.product, { $inc: { stock: item.quantity } });
    }

    // Delete the order (instead of order.remove())
    await Order.deleteOne({ _id: orderId });

    res.status(200).json({ message: "Order removed successfully" });
  } catch (error) {
    console.error("Remove order error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")     // show user info
      .populate("products.product")       // show product info
      .populate("address");

    res.status(200).json(orders);
  } catch (error) {
    console.error("Get all orders error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ["Pending", "Shipped", "Completed"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    // Update order
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    )
      .populate("user", "name email")
      .populate("products.product")
      .populate("address");

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order status updated",
      order: updatedOrder,
    });

  } catch (error) {
    console.error("Update order status error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
