import {AppDataSource} from "./src/data-source";
import express from 'express'
import bodyParser from "body-parser";
import {Products} from "./src/entity/Products";
//kết nối tới database bằng phương thức initialize
AppDataSource.initialize().then(async connection=>{
    const app = express();
    app.use(bodyParser.json());
    const ProductsRepo = connection.getRepository(Products);
    //Method POST ở URL /product/create tìm xem có product cùng tên có tồn tại hay không.
    app.post('/products/create', async (req,res)=>{
        try{
            const productSearch = await ProductsRepo.findOneBy({name: req.body.name})
            if(productSearch){
                res.status(500).json({
                    message : "Products already exist"
                })
            }
            const productData = {
                name: req.body.name,
                avatar: req.body.avatar,

                author: req.body.author,

                price: req.body.price
            };
            const products = await ProductsRepo.save(productData);
            if(products){
                res.status(200).json({
                    product : products
                })
            }
        } catch(err){
            res.status(500).json({
                message : err.message
            })
            console.log(1)
        }
        //Method PUT ở URL /product/update tìm xem product có id được gửi lên tồn tại hay không.
        //
        // Nếu product không tồn tại thì sẽ báo lỗi.
        //
        // Nếu product tồn tại thì sẽ tiến hành update product.
    })
    app.put('/products/update', async (req,res)=>{
        try{
            let productSearch = await ProductsRepo.findOneBy(({id:req.body.id}));
            if(!productSearch){
                res.status(500).json({
                    message :" Products not exist ! "
                })

            }
            const products = await ProductsRepo.update({id : req.body.id}, req.body);
            res.status(200).json({
                message: " Update product success",
            });
        } catch (err){
            res.status(500).json({
                message : err.message
            })
        }
    })
    //Method DELETE ở URL /product/delete chúng ta sẽ tìm xem product có id được gửi lên tồn tại hay không.
    //
    // Nếu product không tồn tại thì sẽ báo lỗi.
    //
    // Nếu product tồn tại thì sẽ tiến hành xóa product.
    app.delete("/products/delete", async (req, res) => {

        try {

            let productSearch = await ProductsRepo.findOneBy({ id: req.body.id });

            if (!productSearch) {

                res.status(500).json({

                    message: "Product is not exist ~~ "

                })

            }

            const product = await ProductsRepo.delete({ id: req.body.id });

            res.status(200).json({

                message: "Delete product success",

            });

        } catch (err) {

            res.status(500).json({

                message: err.message

            })

        }

    });
//Method GET ở URL /product/detail.
//
// Chúng ta sẽ tìm product theo id được gửi lên trong req.query.
//
// Sau đó sẽ gửi lại product đó trong response.
    app.get("/products/detail", async (req, res) => {

        try {

            let productId = parseInt(req.query.productId as string);

            const product = await ProductsRepo.findOneBy({ id: productId })

            if (product) {

                res.status(200).json({ message: "Success", product })

            }

        } catch (err) {

            res.status(500).json({ message: err.mesage })

        }

    });

    app.listen(3000,()=>{
        console.log('OK')
    })
})