import { Router } from "express";
import {
  cartCreate,
  getCarts,
  getProductsCart,
  AddProductCart,
  deleteProductCart,
  deleteAllProductsCart,
  updateProductCart,
  purchaseCart
} from "../controllers/cart.controller.js";
import { isAuthenticated } from "../middlewares/authentication.js";
const routerCart = Router();

routerCart.post("/",isAuthenticated, cartCreate);

routerCart.get("/",isAuthenticated, getCarts);

routerCart.get("/:cid",isAuthenticated, getProductsCart);

routerCart.post("/:cid/products/:pid",isAuthenticated, AddProductCart);

routerCart.delete("/:cid/products/:pid",isAuthenticated, deleteProductCart);

routerCart.delete("/:cid",isAuthenticated, deleteAllProductsCart);

routerCart.put("/:cid/products/:pid",isAuthenticated, updateProductCart);

routerCart.post("/:cid/purchase",isAuthenticated,purchaseCart)
routerCart.get("/:cid/purchase",isAuthenticated)

export default routerCart;
