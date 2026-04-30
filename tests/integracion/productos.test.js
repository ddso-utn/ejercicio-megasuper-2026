import request from "supertest"
import { describe, expect, jest, test, beforeEach } from "@jest/globals"
import { buildTestApp } from "./utils/buildApp.js"
import { Producto } from "../../server/domain/Producto.js"

describe("Productos API - Integración", () => {
    let app
    let productoRepository

    beforeEach(() => {
        productoRepository = {
            obtenerPaginados: jest.fn(),
            obtenerPorId: jest.fn(),
            obtenerPorNombre: jest.fn(),
            guardar: jest.fn(),
        }

        app = buildTestApp(productoRepository)
    })

    describe("GET /productos", () => {
        test("debe retornar 200 con lista paginada de productos", async () => {
            const productosMock = [
                new Producto("Leche", 800, 10, "Lácteos"),
                new Producto("Arroz", 1200, 5, "Alimentos"),
            ]
            productosMock[0].id = 1
            productosMock[1].id = 2

            productoRepository.obtenerPaginados.mockReturnValue({
                productos: productosMock,
                totalProductos: 2,
            })

            const response = await request(app).get("/productos")

            expect(response.status).toBe(200)
            expect(response.body.status).toBe("success")
            expect(response.body.data).toHaveLength(2)
            expect(response.body.paginacion.numeroPagina).toBe(1)
            expect(response.body.paginacion.limitePorPagina).toBe(10)
            expect(response.body.paginacion.totalProductos).toBe(2)
            expect(response.body.paginacion.totalPaginas).toBe(1)
        })

        test("debe respetar los parámetros de paginación", async () => {
            productoRepository.obtenerPaginados.mockReturnValue({
                productos: [new Producto("Leche", 800, 5, "Lácteos")],
                totalProductos: 25,
            })

            const response = await request(app).get("/productos?page=2&limit=5")

            expect(response.status).toBe(200)
            expect(response.body.paginacion.numeroPagina).toBe(2)
            expect(response.body.paginacion.limitePorPagina).toBe(5)
            expect(response.body.paginacion.totalPaginas).toBe(5)
            expect(productoRepository.obtenerPaginados).toHaveBeenCalledWith(2, 5, {})
        })

        test("debe retornar 400 si page no es un entero positivo", async () => {
            const response = await request(app).get("/productos?page=0")

            expect(response.status).toBe(400)
            expect(response.body.status).toBe("fail")
        })

        test("debe retornar 400 si limit no es un entero positivo", async () => {
            const response = await request(app).get("/productos?limit=-1")

            expect(response.status).toBe(400)
            expect(response.body.status).toBe("fail")
        })

        test("debe pasar filtros de precio al repositorio", async () => {
            productoRepository.obtenerPaginados.mockReturnValue({
                productos: [],
                totalProductos: 0,
            })

            const response = await request(app).get("/productos?precioMin=500&precioMax=2000")

            expect(response.status).toBe(200)
            expect(productoRepository.obtenerPaginados).toHaveBeenCalledWith(
                1,
                10,
                { precioMin: 500, precioMax: 2000 }
            )
        })

        test("debe retornar 400 si precioMin es mayor que precioMax", async () => {
            const response = await request(app).get("/productos?precioMin=2000&precioMax=500")

            expect(response.status).toBe(400)
            expect(response.body.status).toBe("fail")
        })
    })

    describe("GET /productos/:id", () => {
        test("debe retornar 200 con el producto solicitado", async () => {
            const productoMock = new Producto("Coca-Cola", 2500, 20, "Bebidas")
            productoMock.id = 1
            productoRepository.obtenerPorId.mockReturnValue(productoMock)

            const response = await request(app).get("/productos/1")

            expect(response.status).toBe(200)
            expect(response.body.status).toBe("success")
            expect(response.body.data.nombre).toBe("Coca-Cola")
            expect(productoRepository.obtenerPorId).toHaveBeenCalledWith(1)
        })

        test("debe retornar 404 si el producto no existe", async () => {
            productoRepository.obtenerPorId.mockReturnValue(null)

            const response = await request(app).get("/productos/999")

            expect(response.status).toBe(404)
            expect(response.body.status).toBe("fail")
        })

        test("debe retornar 400 si el id no es un entero positivo", async () => {
            const response = await request(app).get("/productos/abc")

            expect(response.status).toBe(400)
            expect(response.body.status).toBe("fail")
            expect(productoRepository.obtenerPorId).not.toHaveBeenCalled()
        })
    })

    describe("POST /productos", () => {
        test("debe retornar 201 con el producto creado", async () => {
            productoRepository.obtenerPorNombre.mockReturnValue(null)
            productoRepository.guardar.mockImplementation((p) => {
                p.id = 1
                return p
            })

            const response = await request(app).post("/productos").send({
                nombre: "Yerba Mate",
                precio: 3200,
                cantidad: 15,
                categoria: "Alimentos",
            })

            expect(response.status).toBe(201)
            expect(response.body.status).toBe("success")
            expect(response.body.data.nombre).toBe("Yerba Mate")
            expect(productoRepository.guardar).toHaveBeenCalled()
        })

        test("debe retornar 400 si faltan campos obligatorios", async () => {
            const response = await request(app)
                .post("/productos")
                .send({ nombre: "Solo nombre" })

            expect(response.status).toBe(400)
            expect(response.body.status).toBe("fail")
            expect(productoRepository.guardar).not.toHaveBeenCalled()
        })

        test("debe retornar 400 si se envían campos no permitidos", async () => {
            const response = await request(app).post("/productos").send({
                nombre: "Leche",
                precio: 800,
                cantidad: 5,
                categoria: "Lácteos",
                campoExtra: "no permitido",
            })

            expect(response.status).toBe(400)
            expect(response.body.status).toBe("fail")
            expect(productoRepository.guardar).not.toHaveBeenCalled()
        })

        test("debe retornar 409 si ya existe un producto con el mismo nombre", async () => {
            const productoExistente = new Producto("Leche", 800, 10, "Lácteos")
            productoExistente.id = 1
            productoRepository.obtenerPorNombre.mockReturnValue(productoExistente)

            const response = await request(app).post("/productos").send({
                nombre: "Leche",
                precio: 900,
                cantidad: 5,
                categoria: "Lácteos",
            })

            expect(response.status).toBe(409)
            expect(response.body.status).toBe("fail")
            expect(productoRepository.guardar).not.toHaveBeenCalled()
        })

        test("debe retornar 422 si el precio no es un número válido", async () => {
            const response = await request(app).post("/productos").send({
                nombre: "Leche",
                precio: "mil pesos",
                cantidad: 5,
                categoria: "Lácteos",
            })

            expect(response.status).toBe(422)
            expect(response.body.status).toBe("fail")
        })

        test("debe retornar 422 si la cantidad es un decimal", async () => {
            const response = await request(app).post("/productos").send({
                nombre: "Leche",
                precio: 800,
                cantidad: 2.5,
                categoria: "Lácteos",
            })

            expect(response.status).toBe(422)
            expect(response.body.status).toBe("fail")
        })
    })

    describe("PUT /productos/:id", () => {
        test("debe retornar 200 con el producto actualizado", async () => {
            const productoExistente = new Producto("Leche Entera", 800, 10, "Lácteos")
            productoExistente.id = 1

            productoRepository.obtenerPorId.mockReturnValue(productoExistente)
            productoRepository.obtenerPorNombre.mockReturnValue(null)
            productoRepository.guardar.mockImplementation((p) => p)

            const response = await request(app).put("/productos/1").send({
                nombre: "Leche Descremada",
                precio: 950,
                cantidad: 8,
                categoria: "Lácteos",
            })

            expect(response.status).toBe(200)
            expect(response.body.status).toBe("success")
            expect(response.body.data.nombre).toBe("Leche Descremada")
        })

        test("debe retornar 404 si el producto a actualizar no existe", async () => {
            productoRepository.obtenerPorId.mockReturnValue(null)

            const response = await request(app).put("/productos/999").send({
                nombre: "Leche",
                precio: 800,
                cantidad: 5,
                categoria: "Lácteos",
            })

            expect(response.status).toBe(404)
            expect(response.body.status).toBe("fail")
        })
    })

    describe("DELETE /productos/:id", () => {
        test("debe retornar 200 con el producto marcado como eliminado", async () => {
            const productoMock = new Producto("Galletas", 600, 20, "Golosinas")
            productoMock.id = 1
            productoRepository.obtenerPorId.mockReturnValue(productoMock)
            productoRepository.guardar.mockImplementation((p) => p)

            const response = await request(app).delete("/productos/1")

            expect(response.status).toBe(200)
            expect(response.body.status).toBe("success")
            expect(response.body.data.eliminado).toBe(true)
            expect(productoRepository.guardar).toHaveBeenCalled()
        })

        test("debe retornar 404 si el producto no existe", async () => {
            productoRepository.obtenerPorId.mockReturnValue(null)

            const response = await request(app).delete("/productos/999")

            expect(response.status).toBe(404)
            expect(response.body.status).toBe("fail")
        })

        test("debe retornar 400 si el id es inválido", async () => {
            const response = await request(app).delete("/productos/abc")

            expect(response.status).toBe(400)
            expect(response.body.status).toBe("fail")
            expect(productoRepository.obtenerPorId).not.toHaveBeenCalled()
        })
    })

    describe("Rutas inexistentes", () => {
        test("debe retornar 404 para rutas que no existen", async () => {
            const response = await request(app).get("/ruta-que-no-existe")

            expect(response.status).toBe(404)
            expect(response.body.status).toBe("fail")
        })
    })
})
