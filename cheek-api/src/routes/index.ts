import addressRoutes from "./addressRoutes";
import priceRoutes from "./priceRoutes";
import categoryRoutes from "./categoryRoutes";
import sizeRoutes from "./sizeRoutes";
import { Application } from "express";
import stockRoutes from "./stockRoutes";

const routes = [priceRoutes, addressRoutes, categoryRoutes, sizeRoutes, stockRoutes]

export function addRoutes(app: Application) {
    app.use(routes)
}