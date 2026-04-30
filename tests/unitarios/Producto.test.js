import { describe, expect, test, beforeEach } from "@jest/globals"
import { Producto } from "../../server/domain/Producto.js"
import { DescuentoFijo, DescuentoPorcentual } from "../../server/domain/Descuento.js"
import { UnprocessableEntityError } from "../../server/errors/AppError.js"

describe("Producto", () => {
    describe("constructor", () => {
        test("debe crear un producto correctamente con datos válidos", () => {
            const producto = new Producto("Coca-Cola", 1500, 10, "Bebidas")

            expect(producto.nombre).toBe("Coca-Cola")
            expect(producto.precio).toBe(1500)
            expect(producto.cantidad).toBe(10)
            expect(producto.categoria).toBe("Bebidas")
            expect(producto.eliminado).toBe(false)
            expect(producto.descuentos).toEqual([])
        })

        test("debe hacer trim del nombre y la categoría", () => {
            const producto = new Producto("  Leche  ", 800, 5, "  Lácteos  ")

            expect(producto.nombre).toBe("Leche")
            expect(producto.categoria).toBe("Lácteos")
        })

        test("debe lanzar error si el nombre está vacío", () => {
            expect(() => new Producto("", 1000, 5, "Bebidas"))
                .toThrow(UnprocessableEntityError)
        })

        test("debe lanzar error si el nombre es solo espacios", () => {
            expect(() => new Producto("   ", 1000, 5, "Bebidas"))
                .toThrow(UnprocessableEntityError)
        })

        test("debe lanzar error si el precio es cero", () => {
            expect(() => new Producto("Leche", 0, 5, "Lácteos"))
                .toThrow(UnprocessableEntityError)
        })

        test("debe lanzar error si el precio es negativo", () => {
            expect(() => new Producto("Leche", -100, 5, "Lácteos"))
                .toThrow(UnprocessableEntityError)
        })

        test("debe lanzar error si el precio no es un número", () => {
            expect(() => new Producto("Leche", "cara", 5, "Lácteos"))
                .toThrow(UnprocessableEntityError)
        })

        test("debe lanzar error si la cantidad es cero", () => {
            expect(() => new Producto("Leche", 1000, 0, "Lácteos"))
                .toThrow(UnprocessableEntityError)
        })

        test("debe lanzar error si la cantidad es negativa", () => {
            expect(() => new Producto("Leche", 1000, -3, "Lácteos"))
                .toThrow(UnprocessableEntityError)
        })

        test("debe lanzar error si la cantidad es decimal", () => {
            expect(() => new Producto("Leche", 1000, 1.5, "Lácteos"))
                .toThrow(UnprocessableEntityError)
        })

        test("debe lanzar error si la categoría está vacía", () => {
            expect(() => new Producto("Leche", 1000, 5, ""))
                .toThrow(UnprocessableEntityError)
        })
    })

    describe("precioFinal", () => {
        test("debe retornar precio * cantidad cuando no hay descuentos", () => {
            const producto = new Producto("Arroz", 1000, 3, "Alimentos")

            expect(producto.precioFinal()).toBe(3000)
        })

        test("debe restar un descuento fijo al precio total", () => {
            const producto = new Producto("Arroz", 1000, 3, "Alimentos")
            producto.agregarDescuento(new DescuentoFijo(500))

            expect(producto.precioFinal()).toBe(2500)
        })

        test("debe aplicar un descuento porcentual sobre precio * cantidad", () => {
            const producto = new Producto("Agua", 500, 4, "Bebidas")
            producto.agregarDescuento(new DescuentoPorcentual(20))

            expect(producto.precioFinal()).toBe(1600)
        })

        test("debe acumular múltiples descuentos", () => {
            const producto = new Producto("Fideos", 200, 10, "Alimentos")
            producto.agregarDescuento(new DescuentoFijo(300))
            producto.agregarDescuento(new DescuentoFijo(200))

            expect(producto.precioFinal()).toBe(1500)
        })

        test("no debe retornar precio negativo aunque los descuentos superen el total", () => {
            const producto = new Producto("Pan", 100, 1, "Panadería")
            producto.agregarDescuento(new DescuentoFijo(9999))

            expect(producto.precioFinal()).toBe(0)
        })
    })

    describe("agregarDescuento", () => {
        let producto

        beforeEach(() => {
            producto = new Producto("Leche", 800, 2, "Lácteos")
        })

        test("debe agregar un descuento a la lista", () => {
            const descuento = new DescuentoFijo(100)

            producto.agregarDescuento(descuento)

            expect(producto.descuentos).toHaveLength(1)
            expect(producto.descuentos[0]).toBe(descuento)
        })

        test("debe lanzar error si el descuento no tiene el método valorDescontado", () => {
            expect(() => producto.agregarDescuento({ valor: 100 }))
                .toThrow(UnprocessableEntityError)
        })

        test("debe lanzar error si el descuento es null", () => {
            expect(() => producto.agregarDescuento(null))
                .toThrow(UnprocessableEntityError)
        })

        test("debe lanzar error si el descuento es undefined", () => {
            expect(() => producto.agregarDescuento(undefined))
                .toThrow(UnprocessableEntityError)
        })
    })
})
