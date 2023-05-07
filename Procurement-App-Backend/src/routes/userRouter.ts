import { Router } from "express";
import { UserController } from "../controllers/userController";
import { auth } from "../middleware/auth"

/* All routes connected to the userController */
console.log("Router");
export class UserRoutes {

    router: Router;
    public userController: UserController = new UserController();

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.post("/register", this.userController.registerUser);
        this.router.post("/login", this.userController.authenticateUser);
        this.router.post("/logout", auth, this.userController.logoutUser);
        this.router.get("/user", auth, this.userController.getUser);
        this.router.put("/user", auth, this.userController.updateUser);
    }
}
