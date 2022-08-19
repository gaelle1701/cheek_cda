import * as compression from "compression";
import "reflect-metadata";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import { categoryRoutes } from "./routes/categoryRoutes";
import { AppDataSource } from "./data-source";
import { addressRoutes } from "./routes/addressRoutes";
import { priceRoutes } from "./routes/priceRoutes";

const app = express();
const port = process.env.PORT || 3001;

// parse application/json
// @ts-ignore
app.use(bodyParser.urlencoded({ extended: false }));
// @ts-ignore
app.use(bodyParser.json())



//Connect to front
app.use(cors( {
    origin: [process.env.APP_URL],
    header:["Access-Control-Allow-Origin", process.env.APP_URL]

}));

if (process.env.NODE_ENV === "production") {
    app.disable('x-powered-by');
    app.use(compression())
};

AppDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

//app.use(authMiddleware)

app.use(categoryRoutes, addressRoutes, priceRoutes);
app.listen(port, () => {
    return console.log(`App listen on port, ${port}`);
})