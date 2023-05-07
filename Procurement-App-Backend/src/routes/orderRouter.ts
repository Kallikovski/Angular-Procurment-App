import { Router } from "express";
import { OrderController } from "../controllers/orderController";
import { auth } from "../middleware/auth"

/* All routes connected to orderController */
export class OrderRoutes {

    router: Router;
    public orderController: OrderController = new OrderController();

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.post("/order", auth, this.orderController.createOrder);
        this.router.get("/order", auth, this.orderController.getOrders);
        this.router.put("/order", auth, this.orderController.updateOrder);
    }
}