import { describe, expect, test } from "@jest/globals"
import { DescuentoFijo, DescuentoPorcentual } from "../../server/domain/Descuento.js"
import { Producto } from "../../server/domain/Producto.js"

describe("DescuentoFijo", () => {
    describe("valorDescontado", () => {
        test("debe retornar el valor fijo independientemente del producto", () => {
            const descuento = new DescuentoFijo(500)
            const producto = new Producto("Leche", 1000, 2, "Lácteos")

            expect(descuento.valorDescontado(producto)).toBe(500)
        })

        test("debe retornar el mismo valor para distintos productos", () => {
            const descuento = new DescuentoFijo(200)
            const productoBarato = new Producto("Pan", 150, 1, "Panadería")
            const productoCaro = new Producto("TV", 50000, 1, "Electrónica")

            expect(descuento.valorDescontado(productoBarato)).toBe(200)
            expect(descuento.valorDescontado(productoCaro)).toBe(200)
        })

        test("debe retornar cero cuando el valor fijo es cero", () => {
            const descuento = new DescuentoFijo(0)
            const producto = new Producto("Agua", 300, 3, "Bebidas")

            expect(descuento.valorDescontado(producto)).toBe(0)
        })
    })
})

describe("DescuentoPorcentual", () => {
    describe("valorDescontado", () => {
        test("debe retornar el porcentaje del precio total (precio * cantidad)", () => {
            const descuento = new DescuentoPorcentual(10)
            const producto = new Producto("Arroz", 1000, 5, "Alimentos")

            expect(descuento.valorDescontado(producto)).toBe(500)
        })

        test("debe retornar 0 con descuento del 0%", () => {
            const descuento = new DescuentoPorcentual(0)
            const producto = new Producto("Fideos", 500, 4, "Alimentos")

            expect(descuento.valorDescontado(producto)).toBe(0)
        })

        test("debe retornar el precio total completo con descuento del 100%", () => {
            const descuento = new DescuentoPorcentual(100)
            const producto = new Producto("Coca-Cola", 2500, 2, "Bebidas")

            expect(descuento.valorDescontado(producto)).toBe(5000)
        })

        test("debe calcular correctamente con porcentaje decimal", () => {
            const descuento = new DescuentoPorcentual(12.5)
            const producto = new Producto("Aceite", 800, 1, "Alimentos")

            expect(descuento.valorDescontado(producto)).toBe(100)
        })
    })
})
