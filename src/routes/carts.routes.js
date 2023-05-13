import { Router } from "express";
import {
  cartCreate,
  getCarts,
  getProductsCart,
  AddProductCart,
  deleteProductCart,
  deleteAllProductsCart,
  updateProductCart,
} from "../controllers/cart.controller.js";

const routerCart = Router();

routerCart.post("/", cartCreate);

routerCart.get("/", getCarts);

routerCart.get("/:cid", getProductsCart);

routerCart.post("/:cid/products/:pid", AddProductCart);

routerCart.delete("/:cid/products/:pid", deleteProductCart);

routerCart.delete("/cid", deleteAllProductsCart);

routerCart.put(":cid/products/:pid", updateProductCart);

export default routerCart;
