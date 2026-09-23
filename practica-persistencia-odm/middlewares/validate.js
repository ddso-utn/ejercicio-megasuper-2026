import { ValidationError } from "../error/appError.js";

export function validate(schema) {
    return (req, res, next) => {
        const resultado = schema.safeParse(req.body);

        if (!resultado.success) {
            const mensaje = resultado.error.issues
                .map(i => i.message)
                .join(' | ');
            return next(new ValidationError(mensaje));
        }

        req.body = resultado.data;
        next();
    };
}
