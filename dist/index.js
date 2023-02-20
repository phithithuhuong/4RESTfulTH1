"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("./src/data-source");
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const Products_1 = require("./src/entity/Products");
data_source_1.AppDataSource.initialize().then(async (connection) => {
    const app = (0, express_1.default)();
    app.use(body_parser_1.default.json());
    const ProductsRepo = connection.getRepository(Products_1.Products);
    app.post('/products/create', async (req, res) => {
        try {
            const productSearch = await ProductsRepo.findOneBy({ name: req.body.name });
            if (productSearch) {
                res.status(500).json({
                    message: "Products already exist"
                });
            }
            const productData = {
                name: req.body.name,
                avatar: req.body.avatar,
                author: req.body.author,
                price: req.body.price
            };
            const products = await ProductsRepo.save(productData);
            if (products) {
                res.status(200).json({
                    product: products
                });
            }
        }
        catch (err) {
            res.status(500).json({
                message: err.message
            });
            console.log(1);
        }
    });
    app.put('/products/update', async (req, res) => {
        try {
            let productSearch = await ProductsRepo.findOneBy(({ id: req.body.id }));
            if (!productSearch) {
                res.status(500).json({
                    message: " Products not exist ! "
                });
            }
            const products = await ProductsRepo.update({ id: req.body.id }, req.body);
            res.status(200).json({
                message: " Update product success",
            });
        }
        catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    });
    app.delete("/products/delete", async (req, res) => {
        try {
            let productSearch = await ProductsRepo.findOneBy({ id: req.body.id });
            if (!productSearch) {
                res.status(500).json({
                    message: "Product is not exist ~~ "
                });
            }
            const product = await ProductsRepo.delete({ id: req.body.id });
            res.status(200).json({
                message: "Delete product success",
            });
        }
        catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    });
    app.get("/products/detail", async (req, res) => {
        try {
            let productId = parseInt(req.query.productId);
            const product = await ProductsRepo.findOneBy({ id: productId });
            if (product) {
                res.status(200).json({ message: "Success", product });
            }
        }
        catch (err) {
            res.status(500).json({ message: err.mesage });
        }
    });
    app.listen(3000, () => {
        console.log('OK');
    });
});
//# sourceMappingURL=index.js.map