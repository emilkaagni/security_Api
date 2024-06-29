const path = require('path')
const productModel = require('../models/productModel');
const { error } = require('console');
const fs = require('fs') //file system

const createProduct = async (req, res) => {

    // check incomming data
    console.log(req.body)
    console.log(req.files)

    // Destructuring the body data (json)
    const {

        productName,
        productPrice,
        productCategory,
        productDescription
    } = req.body;

    // Validation (Task)
    if (!productName || !productPrice || !productCategory || !productDescription) {
        return res.status(400).json({
            "success": false,
            "message": "Enter all fields!"
        })
    }




    //     // So that uploading image was optional
    //     let imageName = null;

    //     // validate if there is image
    //     if (req.files && req.files.productImage) {
    //         const { productImage } = req.files;

    //         // Generate new image name (abc.png) -> (213456-abc.png)
    //         imageName = `${Date.now()}-${productImage.name}`;

    //         // Make an upload path (/path/upload - directory)
    //         const imageUploadPath = path.join(__dirname, `../public/products/${imageName}`);

    //         // Move to that directory (await, try-catch)
    //         try {
    //             await productImage.mv(imageUploadPath);
    //         } catch (error) {
    //             console.log(error);
    //             return res.status(500).json({
    //                 "success": false,
    //                 "message": "Internal Server Error!",
    //                 "error": error
    //             });
    //         }
    //     }

    //     // save to database
    //     const newProduct = new productModel({
    //         productName: productName,
    //         productPrice: productPrice,
    //         productCategory: productCategory,
    //         productDescription: productDescription,
    //         productImage: imageName
    //     });
    //     try {
    //         const product = await newProduct.save();
    //         res.status(201).json({
    //             "success": true,
    //             "message": "Product Created Successfully!",
    //             "data": product
    //         });
    //     } catch (error) {
    //         console.log(error);
    //         res.status(500).json({
    //             "success": false,
    //             "message": "Internal Server Error!",
    //             "error": error
    //         });
    //     }
    // };





    // validate if there is image
    if (!req.files || !req.files.productImage) {
        return res.status(400).json({
            "success": false,
            "message": "Image not found!!"
        })
    }



    const { productImage } = req.files;

    // upload image
    // 1. Generate new image name (abc.png) -> (213456-abc.png)
    const imageName = `${Date.now()}-${productImage.name}`

    // 2. Make a upload path (/path/uplad - directory)
    const imageUploadPath = path.join(__dirname, `../public/products/${imageName}`)


    // 3. Move to that directory (await, try-catch)
    try {
        await productImage.mv(imageUploadPath)

        // save to database
        const newProduct = new productModel({
            productName: productName,
            productPrice: productPrice,
            productCategory: productCategory,
            productDescription: productDescription,
            productImage: imageName
        })
        const product = await newProduct.save()
        res.status(201).json({
            "success": true,
            "message": "Product Created Successfully!",
            "data": product
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            "success": false,
            "message": "Internal Server Error!",
            "error": error
        })
    }

};

// Fetch all products
const getAllProducts = async (req, res) => {

    // try catch
    try {
        const allProducts = await productModel.find({})
        res.status(201).json({
            "success": true,
            "message": "Product Fetched successfully!",
            "products": allProducts
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            "success": false,
            "message": "Internal server error",
            "error": error
        })
    }
}
// fetch all products
const getSingleProduct = async (req, res) => {
    // get product id from url(params)
    const prodcuctId = req.params.id;
    //find
    try {
        const product = await productModel.findById(prodcuctId)
        if (!product) {
            res.status(404).json({
                "success": false,
                "message": "Product not found"
            })
        }
        res.status(201).json({
            "success": true,
            "message": "Product Fetched successfully!",
            "product": product
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            "success": false,
            "message": "Internal server error",
            "error": error
        })
    }

}
// send response

// delete productr
const deleteProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.id)
        res.status(201).json({
            "success": true,
            "message": "Product deleted successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            "success": false,
            "message": "Internal server error",
            "error": error
        })
    }
}

// update product
// 1. get product id
// 2. if image
// 3. New image should be upload
// 4. old image should be deleted
// 5. find product(db) ProductImage
// 6. find that image in image controller
// 7. update product
const updateProduct = async (req, res) => {
    try {
        // if there is image
        if (req.files && req.files.productImage) {
            // destructuring
            const { productImage } = req.files;
            // upload image to /public/products folder
            // 1. Generate new image name (abc.png) -> (213456-abc.png)
            const imageName = `${Date.now()}-${productImage.name}`
            // 2. Make a upload path (/path/uplad - directory)
            const imageUploadPath = path.join(__dirname, `../public/products/${imageName}`)
            // Move to that folder(await, try-catch)
            await productImage.mv(imageUploadPath)
            // req.params(id), req.body(updated data - pn, pp, pc, pd), req.files(image)
            // add new field to req.body(productImage -> name)
            req.body.productImage = imageName; //image uploaded
            //if imagea is uploaded and req.body is assigned
            if (req.body.productImage) {
                // finding existing product
                const existingProduct = await productModel.findById(req.params.id)
                // searching in the directory/folder
                const oldImagePath = path.join(__dirname, `../public/products/${existingProduct.productImage}`)
                // delete from filesystem
                fs.unlinkSync(oldImagePath)
            }
        }
        // update the data
        const updatedProduct = await productModel.findByIdAndUpdate(req.params.id, req.body)
        res.status(201).json({
            success: true,
            message: "Product has been updated",
            updatedProduct: updatedProduct
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error
        })
    }
}

// pagination 
const paginationProducts = async (req, res) => {
    // result page number
    const pageNo = req.query.page || 1;

    // result per page
    const resultPerPage = req.query.limit || 2;

    try {
        // Find all products, skip, limit
        const products = await productModel.find({

        })
            .skip((pageNo - 1) * resultPerPage)
            .limit(resultPerPage)

        // if page 6 is requested, result 0
        if (products.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No products found',
            })
        }
        // response
        res.status(200).json({
            success: true,
            message: 'Product fetched successfully',
            products: products
        })



    } catch (error) {
        console.log(error)
        res.status(500).json({
            'success': false,
            'message': 'Internal server error',
        })
    }




}

module.exports = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    deleteProduct,
    updateProduct,
    paginationProducts
};



// START YOUR PROJECT! (in Quite Mode)



