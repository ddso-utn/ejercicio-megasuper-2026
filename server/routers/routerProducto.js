import express from "express";
import { ProductoController } from "../controllers/ProductoController.js";
import { ProductoService } from "../services/ProductoService.js";
import { ProductoRepository } from "../repositories/ProductoRepository.js";
 
export function routerProducto() {
    const controller = new ProductoController(new ProductoService(new ProductoRepository()));
 
    const router = express.Router();
    const pathBase = "/productos";
    
    router.get(pathBase, controller.findAll);
    router.post(pathBase, controller.create);
    router.get(`${pathBase}/:id`, controller.findById);
    router.put(`${pathBase}/:id`, controller.update);
    router.delete(`${pathBase}/:id`, controller.delete);

    return router;
}
 