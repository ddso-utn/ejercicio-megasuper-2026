import express from "express";

export class Server {
    #app;

    constructor(app, port) {
        this.#app = app;
        this.port = port;
    }

    get app() {
        return this.#app;
    }

    configureRouters(routers) {
        routers.forEach(router => this.#app.use(router));

        this.#app.use((req, res) => {
            res.status(404).json({ status: "fail", message: "La ruta solicitada no existe" });
        });
    }

    launch() {
        this.#app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}