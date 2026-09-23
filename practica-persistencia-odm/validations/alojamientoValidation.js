import { z } from "zod";

export const crearAlojamientoSchema = z.object({
    nombre: z.string().trim().min(1, 'nombre es requerido'),
    precioPorNoche: z.number().positive('precioPorNoche debe ser mayor a 0'),
});

export const actualizarAlojamientoSchema = crearAlojamientoSchema.partial();
