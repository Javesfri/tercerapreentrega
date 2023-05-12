import bcrypt from 'bcrypt'

export const createHash = (password) =>bcrypt.hashSync(password,bcrypt.genSaltSync(parseInt(process.env.salt)))

export const validatePassword = () =>bcrypt.compareSync(passwordSend,passwordBDD)