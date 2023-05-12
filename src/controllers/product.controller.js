import productModel from "../models/MongoDB/productModel.js";
import {
  getPagProducts,
  productAdd,
  productDelete,
  productUpdate,
} from "../services/productService.js";

export const getProducts = async (res, req) => {
  const mail = req.session.user.email;
  const rol = req.session.user.rol;
  console.log(req.session);
  const category = req.query.category;
  const sort = req.query.sort;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const data = await getPagProducts(category, sort, page, limit);
  const products = [...data.docs];
  const total = [];
  products.map((prod) => {
    const newProd = { ...prod._doc };
    const { title, description, price, code, category, thumbnail, stock } = {
      ...newProd,
    };
    total.push({
      title: title,
      description: description,
      price: price,
      code: code,
      category: category,
      stock: stock,
      imagen: thumbnail,
    });
  });
  const pages = data.totalPages;
  let totalPages = [];
  for (let i = 1; i <= pages; i++) {
    totalPages.push({ page: i });
  }
  res.render("products", {
    products: total,
    pages: totalPages,
    mail: mail,
    rol: rol,
  });
};

export const addProduct = async (res, req) => {
  let newProduct = productAdd(req.body);
  res.send(newProduct);
};

export const deleteProduct = async (res, req) => {
    await productManager.deleteElement(req.params.id);
    res.send(await getProducts());
};

export const updateProduct = async (res, req) => {
  let updateProduct = await productUpdate(
    req.params.id,
    req.body
  );
  res.send(updateProduct)
};

export const productsGet = async () => {
     try {
         return await productModel.find()
     } catch (error) {
         return error
     }
 }
