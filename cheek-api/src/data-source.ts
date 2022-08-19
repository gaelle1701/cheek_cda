import "reflect-metadata"
import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3308,
    username: "root",
    password: "",
    database: "bdd_cheek2",
    entities: ["src/entities/*.ts"],
    subscribers: ["src/subscribers/*.ts"],
    synchronize: true,
    logging: false,
})
