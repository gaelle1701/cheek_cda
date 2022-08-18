import "reflect-metadata"
import { DataSource } from "typeorm"
import { BaseEntity } from "./entities/BaseEntity"
import { Role } from "./entities/Role"
import { User } from "./entities/User"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3308,
    username: "root",
    password: "",
    database: "bdd_cheek2",
    synchronize: true,
    logging: false,
    entities: [User, BaseEntity, Role],
})
