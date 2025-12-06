import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { placeOrder, getUserOrders, removeOrder, getAllOrders, updateOrderStatus } from "../controllers/order.controller.js";

const orderRouter = express.Router();

orderRouter.post("/place", protectRoute, placeOrder); // Place an order
orderRouter.get("/myorders", protectRoute, getUserOrders); // Get user orders
orderRouter.get("/all", getAllOrders);
orderRouter.delete("/remove/:orderId", protectRoute, removeOrder); // Remove order
orderRouter.put("/status/:orderId", protectRoute, updateOrderStatus);

export default orderRouter;
