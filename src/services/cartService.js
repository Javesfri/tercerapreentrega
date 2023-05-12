import cartModel from "../models/MongoDB/cartModel.js"
import getProductById from "./productService.js"

export const addProductToCart = async (idCart,idProduct)=>{
    if(await getProductById(idProduct)){
        try{
            const cart=await cartModel.findById(idCart)
            let index=await cart.products.findIndex(element => element.product==idProduct)
            if(index !=-1){
                cart.products[index].quantity+=1;
            }
            else{
                await cart.products.push({  
                    product:idProduct,
                    quantity: 1})
            } 
            console.log(await cart) 
            cart.save()
            return cart
        }catch(error){
            console.log(error)
            return error
        }
    }
    return("No se encontro El producto")
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
        return await cartModel.create({})
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