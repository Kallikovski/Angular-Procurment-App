import { Router } from "express";
import { ProductController } from "../controllers/productController";
import { auth } from "../middleware/auth"

/* All routes connected to productController */
export class ProductRoutes {

    router: Router;
    public productController: ProductController = new ProductController();

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.post("/product", auth, this.productController.createProduct);
        this.router.get("/product", this.productController.getProducts);
        this.router.put("/product", auth, this.productController.updateProduct);
        this.router.delete("/product", auth, this.productController.deleteProduct);
        this.router.get("/product/search", auth, this.productController.searchProduct);
        this.router.get("/product/list", auth, this.productController.getProductList);
    }
}
