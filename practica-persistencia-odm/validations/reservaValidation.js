import { z } from "zod";

const reservaBaseSchema = z.object({
    diaInicio: z.coerce.date({ message: 'diaInicio debe ser una fecha válida.' }),
    diaFin: z.coerce.date({ message: 'diaFin debe ser una fecha válida.' }),
    nombreHuesped: z.string()
        .trim()
        .min(3, 'El nombre del huésped debe tener al menos 3 caracteres.'),
    alojamiento: z.string()
        .regex(/^[0-9a-fA-F]{24}$/, 'ID de alojamiento inválido')
        .optional(),
});

function fechasOrdenadas(data) {
    if (!data.diaInicio || !data.diaFin) return true;
    return data.diaFin > data.diaInicio;
}

export const crearReservaSchema = reservaBaseSchema.refine(fechasOrdenadas, {
    message: 'diaFin debe ser posterior a diaInicio.',
    path: ['diaFin'],
});

export const actualizarReservaSchema = reservaBaseSchema.partial().refine(fechasOrdenadas, {
    message: 'diaFin debe ser posterior a diaInicio.',
    path: ['diaFin'],
});
