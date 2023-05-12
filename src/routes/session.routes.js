import { Router } from "express";
import { loginUser, registerUser, res } from "../controllers/session.controller.js";


const routerSession = Router();


routerSession.post("/register",registerUser);
routerSession.post("/login",loginUser)


