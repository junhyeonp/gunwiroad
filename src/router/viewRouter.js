// viewRouter.js
import express from "express";
import {
    courseController,
    homeViewController,
    introduceViewController,
    joinViewController,
    loginViewController,
    profileViewController,
    qrViewController,
} from "../controller/viewController";

const viewRouter = express.Router();

viewRouter.get("/login", loginViewController);
viewRouter.get("/join", joinViewController);
viewRouter.get("/profile", profileViewController);
viewRouter.get("/qr", qrViewController);
viewRouter.get("/course", courseController);
viewRouter.get("/introduce", introduceViewController);
viewRouter.get("/", homeViewController);

export default viewRouter;
