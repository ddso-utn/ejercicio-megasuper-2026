import { Producto } from "../domain/Producto.js"
import {
    BadRequestError,
    NotFoundError,
    UnprocessableEntityError
} from "../errors/AppError.js"

export class ProductoRepository {
    constructor() {
        this.productos = {}
        this.nextId = 1
    }

    obtenerTodos() {
        return Object.values(this.productos)
    }

    obtenerPaginados(numeroPagina, limitePorPagina) {
        const todosLosProductos = Object.values(this.productos)
        const inicio = (numeroPagina - 1) * limitePorPagina
        const fin = inicio + limitePorPagina

        return {
            productos: todosLosProductos.slice(inicio, fin),
            totalProductos: todosLosProductos.length
        }
    }

    guardar(producto) {
        this.validarProducto(producto)

        const id = producto.id ?? this.nextId++
        producto.id = id
        this.productos[id] = producto

        return producto
    }

    guardarTodos(productos) {
        if (!Array.isArray(productos)) {
            throw new BadRequestError("Debe enviar una lista de productos")
        }

        return productos.map((producto) => this.guardar(producto))
    }

    obtenerPorId(id) {
        this.validarId(id)

        return this.productos[id] ?? null
    }

    obtenerPorNombre(nombre) {
        this.validarNombre(nombre)
        const nombreNormalizado = nombre.trim().toLowerCase()

        return (
            Object.values(this.productos).find((producto) => {
                return producto.nombre.trim().toLowerCase() === nombreNormalizado
            }) ?? null
        )
    }

    eliminar(id) {
        this.validarId(id)

        const productoAEliminar = this.productos[id]

        if (!productoAEliminar) {
            throw new NotFoundError("El id no pertenece a un producto")
        }

        delete this.productos[id]
        return productoAEliminar
    }

    validarProducto(producto) {
        if (!(producto instanceof Producto)) {
            throw new UnprocessableEntityError("El producto es inválido")
        }
    }

    validarId(id) {
        if (!Number.isInteger(id) || id <= 0) {
            throw new BadRequestError("El id no es válido")
        }
    }

    validarNombre(nombre) {
        if (typeof nombre !== "string" || nombre.trim().length === 0) {
            throw new BadRequestError("El nombre del producto es obligatorio")
        }
    }
}