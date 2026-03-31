export class Producto {
  // precio
  // nombre
  // categoria
  // stock
  // id
  // descuentos[]
  nombre;
  precio;
  cantidad;
  categoria;

  constructor(nombre, precio, cantidad, categoria) {
    if (categoria === undefined) {
      throw new Error("La categoria debe estar definida");
    }
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = cantidad;
    this.categoria = categoria;
    this.descuentos = [];
  }

  precioFinal() {
    const precioBaseTotal = this.precio * this.cantidad;

    const precioFinal = this.descuentos.reduce((precioAnterior, descuento) => {
      return precioAnterior - descuento.valorDescontado(this);
    }, precioBaseTotal);

    /*
    let precioFinal = precioBaseTotal;

    for (let i = 0; i < this.descuentos.length; i++) {
      precioFinal = precioFinal - this.descuentos[i].valorDescontado(this);
    }
    */
    return Math.max(0, precioFinal);
  }

  agregarDecuento(nuevoDescuento) {
    this.descuentos.push(nuevoDescuento);
  }
}

/*
abstract class Descuento {
    valorDescontado(producto) {
        retorna la cantidad de dinero descontada sobre un producto
    }
}
*/

export class DescuentoFijo {
  constructor(valor) {
    this.valor = valor;
  }

  valorDescontado(_producto) {
    return this.valor;
  }
}

export class DescuentoPorcentual {
  constructor(porcentaje) {
    this.porcentaje = porcentaje; // 20
  }

  valorDescontado(producto) {
    return producto.cantidad * producto.precio * (this.porcentaje / 100);
  }
}

export class DescuentoPorCantidad {
  constructor(cantidadQueCompras, cantidadQuePagas) {
    this.cantidadQueCompras = cantidadQueCompras; 
    this.cantidadQuePagas = cantidadQuePagas;     
  }

  valorDescontado(producto) {
    const gruposCompletos = Math.floor(
      producto.cantidad / this.cantidadQueCompras
    );
    
    const itemsRestantes = producto.cantidad % this.cantidadQueCompras;
    const unidadesAhorradas = gruposCompletos * (this.cantidadQueCompras - this.cantidadQuePagas);
    
    return unidadesAhorradas * producto.precio;
  }
}