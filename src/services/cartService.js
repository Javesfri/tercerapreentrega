import cartModel from "../models/MongoDB/cartModel.js"
import {getProductById,productUpdate} from "./productService.js"

export const addProductToCart = async (idCart,idProduct)=>{
    let product= await getProductById(idProduct)
    if(await product && await product.stock >0){
        try{
            const cart=await cartModel.findById(idCart)
            let index=await cart.products.findIndex(element => element.productId==idProduct)
            if(index !=-1){
                cart.products[index].quantity+=1;
            }
            else{
                await cart.products.push({  
                    productId:idProduct,
                    quantity: 1})
            } 
            productUpdate(idProduct,{stock:product.stock-1})
            cart.save()
            console.log(`${product.title} agregado al carrito!`)
            return cart
        }catch(error){
            console.log(error)
            return error
        }
    }
    console.log("no hay stock")
}

export const deleteProductFromCart = async (idCart, id)=>{
    if(await getProductById(id)){
        try{
            const cart=await cartModel.findById(idCart)
            await cart.products.remove(id)
            await cart.save()
            return (cart)
        }catch(error){
            console.log(error)
            return error
        }
    }
    return("No se encontro El producto")
}

export const deleteAllProductsFromCart = async (idCart)=>{
    try{
        const cart=await cartModel.findById(idCart)
        cart.products=[]
        cart.save()
        return("Carrito Vacio")
    }catch(error){
        console.log(error)
        return error
    }
    
}
    


export const getProductsFromCart = async (idCart)=>{
    try{
        const cart= await cartModel.findById(idCart)
        let cartTotal=await cart.populate('products.product')
        return  cartTotal
    }catch(error){
        console.log(error)
        return (error)
    }
}


export const updateProductFromCart = async (idCart,idProduct,quantity)=>{
    try{
        const cart=await cartModel.findById(idCart)
        let index=await cart.products.findIndex(element => element.product==idProduct)
        if(index !=-1){
            cart.products[index].quantity=parseInt(quantity.quantity);
        }
        cart.save()
        return(cart)
    }catch(error){
        console.log(error)
        return error
    }
}
export const createCart = async ()=>{
    try{
        let cart= await cartModel.create({})
        return(cart)
    }catch(error){
        console.log(error)
        return error
    }
        
}

export const getAllCarts = async ()=>{
    try{
        return await cartModel.find()
    }catch(error){
        console.log(error)
        return error
    }
        
}