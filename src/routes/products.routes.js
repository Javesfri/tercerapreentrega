import {
  productGetById,
  addProduct,
  deleteProduct,
  updateProduct,
  getProducts,
  getProductsPag
} from "../controllers/product.controller.js";
import { Router } from "express";
import { isAuthenticated } from "../middlewares/authentication.js";
const routerProduct = Router();

routerProduct.get("/",isAuthenticated, getProductsPag);

routerProduct.get("/:pid", productGetById);

routerProduct.post("/", addProduct);

routerProduct.delete("/:id", deleteProduct);

routerProduct.put("/:id", updateProduct);

export default routerProduct;
