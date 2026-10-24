import express from "express"
import { ProductoController } from "../controllers/ProductoController.js"
import { ProductoService } from "../services/ProductoService.js"
import { ProductoRepository } from "../repositories/ProductoRepository.js"
import { PRODUCTOS_INICIALES } from "../data/productosIniciales.js"

// El repositorio es en memoria: arranca con productos de ejemplo
const productoRepository = new ProductoRepository()
const productoService = new ProductoService({ productoRepository })
productoService.crearVarios(PRODUCTOS_INICIALES)

const productoController = new ProductoController({ productoService })

const router = express.Router()

router.route('/')
	.get((req, res, next) => productoController.findAll(req, res, next))
	.post((req, res, next) => productoController.create(req, res, next))

router.route('/seed')
	.post((req, res, next) => productoController.seed(req, res, next))

router.route('/:id')
	.get((req, res, next) => productoController.findById(req, res, next))
	.put((req, res, next) => productoController.update(req, res, next))
	.delete((req, res, next) => productoController.delete(req, res, next))

export default router
