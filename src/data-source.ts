//file typeorm connection database

import {DataSource} from "typeorm";
import {Products} from "./entity/Products";
export const AppDataSource = new DataSource({
    type: 'mysql',

    host: "localhost",

    port: 3306,

    username: "root",

    password: "123456",

    database: "dbtest",

    synchronize: true,

    logging: false,

    entities: [Products],

    migrations: ["dist/src/migrations/*.js"],

})