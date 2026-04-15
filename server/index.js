import express from "express"
import dotenv from "dotenv"
import { Server } from "./server.js";
import { routerProducto } from "./routers/routerProducto.js";

const app = express()
app.use(express.json())

dotenv.config();
const port = process.env.PORT || 3001

const server = new Server(app, port)

server.configureRouters([routerProducto()])
server.launch()