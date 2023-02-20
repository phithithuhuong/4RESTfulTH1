"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Products_1 = require("./entity/Products");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123456",
    database: "dbtest",
    synchronize: true,
    logging: false,
    entities: [Products_1.Products],
    migrations: ["dist/src/migrations/*.js"],
});
//# sourceMappingURL=data-source.js.map