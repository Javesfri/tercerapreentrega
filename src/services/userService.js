import userModel from "../models/MongoDB/userModel.js";

export const findUsers = async () => {
    try{
        const users = await userModel.find()
        return users
    }catch(error){
        return error
    }
}