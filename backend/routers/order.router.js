import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { placeOrder, getUserOrders, removeOrder } from "../controllers/order.controller.js";

const orderRouter = express.Router();

orderRouter.post("/place", protectRoute, placeOrder); // Place an order
orderRouter.get("/myorders", protectRoute, getUserOrders); // Get user orders
orderRouter.delete("/remove/:orderId", protectRoute, removeOrder); // Remove order

export default orderRouter;
