import { Producto } from "../domain/Producto.js"
import {
    BadRequestError,
    ConflictError,
    NotFoundError,
    UnprocessableEntityError
} from "../errors/AppError.js"

export class ProductoService {
    constructor(productoRepository) {
        this.productoRepository = productoRepository
    }

    // Numero y limite, si no están 1 o 10 respectivamente y si se pasa undefined {}
    obtenerTodos({ numeroPagina = 1, limitePorPagina = 10 } = {}) {
        this.#validarPaginacion(numeroPagina, limitePorPagina)

        const { productos, totalProductos } = this.productoRepository.obtenerPaginados(
            numeroPagina,
            limitePorPagina
        )

        const totalPaginas = totalProductos === 0
            ? 0
            : Math.ceil(totalProductos / limitePorPagina)

        return {
            productos,
            numeroPagina,
            limitePorPagina,
            totalPaginas,
            totalProductos
        }
    }

    obtenerPorId(id) {
        this.#validarEnteroPositivo(id, "Id")

        const producto = this.productoRepository.obtenerPorId(id)

        if (!producto) {
            throw new NotFoundError("Producto no encontrado")
        }

        return producto
    }

    crear(datosProducto) {
        this.#validarDatosProducto(datosProducto)
        this.#validarNombreDisponible(datosProducto.nombre)

        const producto = new Producto(
            datosProducto.nombre,
            datosProducto.precio,
            datosProducto.cantidad,
            datosProducto.categoria
        )

        return this.productoRepository.guardar(producto)
    }

    actualizar(id, datosProducto) {
        this.#validarEnteroPositivo(id, "Id")

        this.#validarDatosProducto(datosProducto)

        const productoExistente = this.obtenerPorId(id)
        this.#validarNombreDisponible(datosProducto.nombre, id)

        const productoActualizado = new Producto(
            datosProducto.nombre,
            datosProducto.precio,
            datosProducto.cantidad,
            datosProducto.categoria
        )

        productoActualizado.id = productoExistente.id
        return this.productoRepository.guardar(productoActualizado)
    }

    eliminar(id) {
        this.#validarEnteroPositivo(id, "Id")
        this.obtenerPorId(id)

        return this.productoRepository.eliminar(id)
    }

    #validarDatosProducto(datosProducto) {
        if (!datosProducto || typeof datosProducto !== "object" || Array.isArray(datosProducto)) {
            throw new BadRequestError("Los datos del producto son inválidos")
        }

        const { nombre, precio, cantidad, categoria } = datosProducto

        if (typeof nombre !== "string" || nombre.trim().length < 3) {
            throw new UnprocessableEntityError("El nombre del producto debe tener al menos 3 caracteres")
        }

        if (!Number.isFinite(precio) || precio <= 0) {
            throw new UnprocessableEntityError("El precio debe ser mayor a 0")
        }

        if (!Number.isInteger(cantidad) || cantidad <= 0) {
            throw new UnprocessableEntityError("La cantidad debe ser un entero mayor a 0")
        }

        if (typeof categoria !== "string" || categoria.trim().length < 3) {
            throw new UnprocessableEntityError("La categoría debe tener al menos 3 caracteres")
        }
    }

    #validarNombreDisponible(nombre, idActual = null) {
        const productoExistente = this.productoRepository.obtenerPorNombre(nombre)
        const existeProductoConMismoNombre = productoExistente && productoExistente.id !== idActual

        if (existeProductoConMismoNombre) {
            throw new ConflictError("Ya existe un producto con el mismo nombre")
        }
    }

    #validarPaginacion(numeroPagina, limitePorPagina) {
        this.#validarEnteroPositivo(numeroPagina, "Numero de página")
        this.#validarEnteroPositivo(limitePorPagina, "Límite por página")
    }

    #validarEnteroPositivo(numero, parametro) {
        if (!Number.isInteger(numero) || numero <= 0) {
            throw new BadRequestError(`${parametro} debe ser un entero positivo`)
        }
    }
}