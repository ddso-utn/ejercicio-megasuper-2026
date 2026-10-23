import {
    BadRequestError,
} from "../errors/AppError.js"
import { ProductoService } from "../services/ProductoService.js";

export class ProductoController {
    constructor({
        productoService = new ProductoService()
    } = {}) {
        this.productoService = productoService;
    }


    findAll = async (req, res, next) => {
        try {
            const paginacion = this.extraerPaginacion(req.query)
            const filtros = this.extraerFiltros(req.query)
            const resultado = this.productoService.obtenerTodos({ ...paginacion, filtros })

            return res.status(200).json({
                status: "success",
                data: resultado.productos,
                paginacion: {
                    numeroPagina: resultado.numeroPagina,
                    limitePorPagina: resultado.limitePorPagina,
                    totalPaginas: resultado.totalPaginas,
                    totalProductos: resultado.totalProductos
                }
            })
        } catch (error) {
            return next(error)
        }
    }

    create = async (req, res, next) => {
        try {
            const datosProducto = this.extraerYValidarBodyProducto(req.body)
            const productoCreado = this.productoService.crear(datosProducto)

            return res.status(201).json({ status: "success", data: productoCreado })
        } catch (error) {
            return next(error)
        }
    }

    findById = async (req, res, next) => {
        try {
            const id = this.parsearId(req.params.id)
            const producto = this.productoService.obtenerPorId(id)

            return res.status(200).json({ status: "success", data: producto })
        } catch (error) {
            return next(error)
        }
    }

    update = async (req, res, next) => {
        try {
            const id = this.parsearId(req.params.id)
            const datosProducto = this.extraerYValidarBodyProducto(req.body)
            const productoActualizado = this.productoService.actualizar(id, datosProducto)

            return res.status(200).json({ status: "success", data: productoActualizado })
        } catch (error) {
            return next(error)
        }
    }

    seed = async (req, res, next) => {
        const PRODUCTOS_INICIALES = [
            { nombre: "Coca-Cola 1.5L", precio: 2500, cantidad: 50, categoria: "Bebidas", descripcion: "Gaseosa cola sabor original en botella de 1.5 litros.", imagen: "/images/coca-cola-1lt.jpg" },
            { nombre: "Pepsi 1.5L", precio: 2400, cantidad: 40, categoria: "Bebidas", descripcion: "Gaseosa sabor cola en botella de 1.5 litros.", imagen: "/images/pepsi.jpg" },
            { nombre: "Agua Mineral 500ml", precio: 800, cantidad: 100, categoria: "Bebidas", descripcion: "Agua mineral sin gas en botella de 500 ml.", imagen: "/images/agua.jpg" },
            { nombre: "Pan Integral", precio: 450, cantidad: 3, categoria: "Panaderia", descripcion: "Pan integral de 500g, alto en fibra.", imagen: "/images/pan.png" },
            { nombre: "Leche Entera 1L", precio: 2200, cantidad: 60, categoria: "Lacteos", descripcion: "Leche entera pasteurizada en envase de 1 litro.", imagen: "/images/leche.jpg" },
            { nombre: "Yogur Natural 200g", precio: 600, cantidad: 30, categoria: "Lacteos", descripcion: "Yogur natural sin azúcar añadido.", imagen: "/images/yogur.jpg" },
            { nombre: "Arroz Premium 1kg", precio: 1250, cantidad: 35, categoria: "Almacen", descripcion: "Arroz de grano largo, paquete de 1 kg.", imagen: "/images/arroz.jpg" },
            { nombre: "Fideos Espagueti 500g", precio: 700, cantidad: 45, categoria: "Almacen", descripcion: "Fideos de trigo durum, paquete de 500 g.", imagen: "/images/fideos.jpg" },
            { nombre: "Aceite Girasol 1L", precio: 6000, cantidad: 25, categoria: "Almacen", descripcion: "Aceite de girasol en botella de 1 litro.", imagen: "/images/aceite1l.jpg" }
        ]

        try {
            const lista = Array.isArray(req.body) && req.body.length > 0 ? req.body : PRODUCTOS_INICIALES
            const productosCreados = this.productoService.crearVarios(lista)

            return res.status(201).json({ status: "success", data: productosCreados })
        } catch (error) {
            return next(error)
        }
    }

    delete = async (req, res, next) => {
        try {
            const id = this.parsearId(req.params.id)
            const productoEliminado = this.productoService.eliminar(id)

            return res.status(200).json({ status: "success", data: productoEliminado })
        } catch (error) {
            return next(error)
        }
    }

    parsearId(idParam) {
        const id = Number(idParam)

        this.validarEnteroPositivo(id, "id")

        return id
    }

    extraerYValidarBodyProducto(body) {
        if (!body || typeof body !== "object" || Array.isArray(body)) {
            throw new BadRequestError("El cuerpo de la request es inválido")
        }

        const camposObligatorios = ["nombre", "precio", "cantidad", "categoria"]
        const camposOpcionales = ["descripcion", "imagen"]
        const camposPermitidos = [...camposObligatorios, ...camposOpcionales]
        const camposBody = Object.keys(body)
        const camposNoPermitidos = camposBody.filter((campo) => !camposPermitidos.includes(campo))

        if (camposNoPermitidos.length > 0) {
            throw new BadRequestError(`Campos no permitidos en la request: ${camposNoPermitidos.join(", ")}`)
        }

        const camposFaltantes = camposObligatorios.filter((campo) => body[campo] === undefined)

        if (camposFaltantes.length > 0) {
            throw new BadRequestError(`Faltan campos obligatorios en la request: ${camposFaltantes.join(", ")}`)
        }

        return {
            nombre: body.nombre,
            precio: body.precio,
            cantidad: body.cantidad,
            categoria: body.categoria,
            descripcion: body.descripcion,
            imagen: body.imagen
        }
    }

    extraerFiltros(query) {
        const filtros = {}

        if (query.precioMin !== undefined) {
            const precioMin = Number(query.precioMin)
            if (!Number.isFinite(precioMin)) {
                throw new BadRequestError("precioMin debe ser un número válido")
            }
            filtros.precioMin = precioMin
        }

        if (query.precioMax !== undefined) {
            const precioMax = Number(query.precioMax)
            if (!Number.isFinite(precioMax)) {
                throw new BadRequestError("precioMax debe ser un número válido")
            }
            filtros.precioMax = precioMax
        }

        if (query.categoria !== undefined) {
            filtros.categoria = query.categoria
        }

        if (query.nombre !== undefined) {
            filtros.nombre = query.nombre
        }

        return filtros
    }

    extraerPaginacion(query) {
        const numeroPagina = query?.page === undefined ? 1 : Number(query.page)
        const limitePorPagina = query?.limit === undefined ? 10 : Number(query.limit)

        this.validarEnteroPositivo(numeroPagina, "page")
        this.validarEnteroPositivo(limitePorPagina, "limit")

        return { numeroPagina, limitePorPagina }
    }

    validarEnteroPositivo(numero, parametro) {
        if (!Number.isInteger(numero) || numero <= 0) {
            throw new BadRequestError(`El parámetro ${parametro} debe ser un entero positivo`)
        }
    }
}
