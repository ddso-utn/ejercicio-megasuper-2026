import {
    AppError,
    BadRequestError,
    ConflictError,
    NotFoundError,
    UnprocessableEntityError,
} from "../errors/AppError.js"

export function errorHandler(err, req, res, next) {
    if (res.headersSent) {
        return next(err)
    }

    const message = err?.message || "Error interno"
    const timestamp = err?.timestamp || new Date().toISOString()

    if (err instanceof NotFoundError) {
        return res.status(404).json({ status: "fail", message, timestamp })
    }

    if (err instanceof ConflictError) {
        return res.status(409).json({ status: "fail", message, timestamp })
    }

    if (err instanceof BadRequestError) {
        return res.status(400).json({ status: "fail", message, timestamp })
    }

    if (err instanceof UnprocessableEntityError || err instanceof AppError) {
        return res.status(422).json({ status: "fail", message, timestamp })
    }

    return res.status(500).json({
        status: "error",
        message: "Error interno del servidor",
        timestamp,
    })
}
