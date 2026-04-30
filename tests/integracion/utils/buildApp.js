import express from "express"
import { ProductoController } from "../../../server/controllers/ProductoController.js"
import { ProductoService } from "../../../server/services/ProductoService.js"
import { notFoundHandler } from "../../../server/middlewares/notFoundHandler.js"
import { errorHandler } from "../../../server/middlewares/errorHandler.js"

export function buildTestApp(productoRepository) {
    const productoService = new ProductoService({ productoRepository })
    const productoController = new ProductoController({ productoService })

    const app = express()
    app.use(express.json())

    const router = express.Router()
    router.route("/")
        .get((req, res, next) => productoController.findAll(req, res, next))
        .post((req, res, next) => productoController.create(req, res, next))
    router.route("/:id")
        .get((req, res, next) => productoController.findById(req, res, next))
        .put((req, res, next) => productoController.update(req, res, next))
        .delete((req, res, next) => productoController.delete(req, res, next))

    app.use("/productos", router)
    app.use(notFoundHandler)
    app.use(errorHandler)

    return app
}
