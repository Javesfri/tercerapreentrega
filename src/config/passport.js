import local from 'passport-local'
import passport from 'passport'
import {findUserByEmail, findUserById,createUser } from "../services/userService.js"
import { createCart } from "../services/cartService.js"
import { createHash, validatePassword } from '../utils/bcrypt.js'
import "dotenv/config.js"

//Passport se va a manejar como si fuera un middleware 
const LocalStrategy = local.Strategy //Estretagia local de autenticacion
//Passport define done como si fuera un res.status()


const initializePassport = () => {

    //Ruta a implementar
    passport.use('register', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
            //Validar y crear Usuario
            const bodyReq = {...req.body}
            try {
                const user = await findUserByEmail(username) //Username = email

                if (user) { //Usario existe
                    console.log("Usuario Existente")
                    return done(null, false) //null que no hubo errores y false que no se creo el usuario

                }
                const passwordHash = createHash(bodyReq.password)
                bodyReq.password=passwordHash
                let userCart= await createCart()
                bodyReq.idCart=userCart._id
                const result = await createUser(bodyReq)
                console.log("User Creado")
                return done(null, result) //Usuario creado correctamente

            } catch (error) {
                return done("Error al obtener el usario "+error)
            }

        }

    ))

    passport.use('login', new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
        
        try {
            let user = await findUserByEmail(username)
            if (!user) { //Usuario no encontrado
                console.log("User no encontrado")
                const adminUser=process.env.ADMIN_USER
                const adminPass=process.env.ADMIN_PASS
                if(username==adminUser  && password==adminPass){
                    user={
                        _id:process.env.ADMIN_ID,
                        first_name:"ADMINCOD",
                        last_name: "ADMINAPELLIDO",
                        email:adminUser,
                        edad:69,
                        rol:"Admin",
                        idCart:"22",
                    }
                    return  done(null,user)
                }
                return done(null, false)
            }
            if (validatePassword(password, user.password)) { //Usuario y contraseña validos
                console.log("Sesion Iniciada")
                return done(null, user)
            }
            console.log("Constraseña invalida")
            return done(null, false) //Contraseña no valida

        } catch (error) {
            return done(error)
        }
    }))

    //Iniciar la session del usuario
    passport.serializeUser(async (user, done) => {
        let userId = user._id
        if (Array.isArray(user)) {
            userId= user[0]._id;
        }
        done(null, userId)
    })

    //Eliminar la sesion del usuario
    passport.deserializeUser(async (id, done) => {
        const user = await findUserById(id)
        done(null, user)

    })

}

export default initializePassport;