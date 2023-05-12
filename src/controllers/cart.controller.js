import {
  addProductToCart,
  deleteProductFromCart,
  deleteAllProductsFromCart,
  getProductsFromCart,
  updateProductFromCart,
  createCart,
  getAllCarts,
} from "../services/cartService.js";


export const cartCreate = async(req,res) =>{
    const newCart = await createCart()
    res.send(newCart)

}

export const getCarts = async(req,res) =>{
    const newCart = await getAllCarts()
    res.send(newCart)
}

export const getProductsCart = async(req,res) =>{
    const cart=await getProductsFromCart(req.params.cid)
    const listProducts=await cart.products
    console.log(await listProducts)
    const total=[]
    listProducts.map(prod =>{
        const newProd={...prod.product._doc}
        console.log(newProd)
        const{title,description,price,code,category,thumbnail}=newProd
        total.push({title:title,description:description,price:price,code:code,category:category,quantity:prod.quantity ,imagen:thumbnail})

    })
    res.send(total)

}

export const AddProductCart = async(req,res) =>{
    const addProduct=await addProductToCart(req.params.cid,req.params.pid)
    res.send(addProduct)
}

export const deleteProductCart = async(req,res) =>{
    const deleteProductOfCart=await deleteProductFromCart(req.params.cid,req.params.pid);
    res.send(deleteProductOfCart);
}

export const deleteAllProductsCart = async(req,res) =>{
    const deleteAllProducts= await deleteAllProductsFromCart(req.params.cid);
    res.send(deleteAllProducts);
}

export const updateProductCart = async(req,res) =>{
    const updateProduct= await updateProductFromCart(req.params.cid,req.params.pid,req.body)
    res.send(updateProduct)
}