import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
  addToCart,
  getCart,
  getCartItem,
  removeFromCart,
  updateCart
} from "../controllers/cart.controller.js";

const cartRouter = express.Router();

cartRouter.get("/", protectRoute, getCart);
cartRouter.get("/:productId", protectRoute, getCartItem);
cartRouter.post("/add", protectRoute, addToCart);
cartRouter.post("/remove", protectRoute, removeFromCart);
cartRouter.post("/update", protectRoute, updateCart);

export default cartRouter;
