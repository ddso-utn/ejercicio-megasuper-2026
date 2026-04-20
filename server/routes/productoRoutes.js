import express from "express"
import { ProductoController } from "../controllers/ProductoController.js"
import { ProductoService } from "../services/ProductoService.js"
import { ProductoRepository } from "../repositories/ProductoRepository.js"

const productoController = new ProductoController()

const router = express.Router()

router.route('/')
	.get((req, res) => productoController.findAll(req, res))
	.post((req, res) => productoController.create(req, res))

router.route('/seed')
	.post((req, res) => productoController.seed(req, res))

router.route('/:id')
	.get((req, res) => productoController.findById(req, res))
	.put((req, res) => productoController.update(req, res))
	.delete((req, res) => productoController.delete(req, res))

export default router
