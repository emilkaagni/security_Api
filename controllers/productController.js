// const path = require('path')
// const productModel = require('../models/productModel');
// const { error } = require('console');
// const fs = require('fs') //file system

// const createProduct = async (req, res) => {

//     // check incomming data
//     console.log(req.body)
//     console.log(req.files)

//     // Destructuring the body data (json)
//     const {

//         productName,
//         productPrice,
//         productCategory,
//         productDescription
//     } = req.body;

//     // Validation (Task)
//     if (!productName || !productPrice || !productCategory || !productDescription) {
//         return res.status(400).json({
//             "success": false,
//             "message": "Enter all fields!"
//         })
//     }


//     // validate if there is image
//     if (!req.files || !req.files.productImage) {
//         return res.status(400).json({
//             "success": false,
//             "message": "Image not found!!"
//         })
//     }



//     const { productImage } = req.files;

//     // upload image
//     // 1. Generate new image name (abc.png) -> (213456-abc.png)
//     const imageName = `${Date.now()}-${productImage.name}`

//     // 2. Make a upload path (/path/uplad - directory)
//     const imageUploadPath = path.join(__dirname, `../public/products/${imageName}`)


//     // 3. Move to that directory (await, try-catch)
//     try {
//         await productImage.mv(imageUploadPath)

//         // save to database
//         const newProduct = new productModel({
//             productName: productName,
//             productPrice: productPrice,
//             productCategory: productCategory,
//             productDescription: productDescription,
//             productImage: imageName
//         })
//         const product = await newProduct.save()
//         res.status(201).json({
//             "success": true,
//             "message": "Product Created Successfully!",
//             "data": product
//         })


//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//             "success": false,
//             "message": "Internal Server Error!",
//             "error": error
//         })
//     }

// };

// // Fetch all products
// const getAllProducts = async (req, res) => {

//     // try catch
//     try {
//         const allProducts = await productModel.find({})
//         res.status(201).json({
//             "success": true,
//             "message": "Product Fetched successfully!",
//             "products": allProducts
//         })

//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//             "success": false,
//             "message": "Internal server error",
//             "error": error
//         })
//     }
// }
// // fetch all products
// const getSingleProduct = async (req, res) => {
//     // get product id from url(params)
//     const prodcuctId = req.params.id;
//     //find
//     try {
//         const product = await productModel.findById(prodcuctId)
//         if (!product) {
//             res.status(404).json({
//                 "success": false,
//                 "message": "Product not found"
//             })
//         }
//         res.status(201).json({
//             "success": true,
//             "message": "Product Fetched successfully!",
//             "product": product
//         })
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//             "success": false,
//             "message": "Internal server error",
//             "error": error
//         })
//     }

// }
// // send response

// // delete productr
// const deleteProduct = async (req, res) => {
//     try {
//         await productModel.findByIdAndDelete(req.params.id)
//         res.status(201).json({
//             "success": true,
//             "message": "Product deleted successfully"
//         })

//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//             "success": false,
//             "message": "Internal server error",
//             "error": error
//         })
//     }
// }

// // update product
// // 1. get product id
// // 2. if image
// // 3. New image should be upload
// // 4. old image should be deleted
// // 5. find product(db) ProductImage
// // 6. find that image in image controller
// // 7. update product
// const updateProduct = async (req, res) => {
//     try {
//         // if there is image
//         if (req.files && req.files.productImage) {
//             // destructuring
//             const { productImage } = req.files;
//             // upload image to /public/products folder
//             // 1. Generate new image name (abc.png) -> (213456-abc.png)
//             const imageName = `${Date.now()}-${productImage.name}`
//             // 2. Make a upload path (/path/uplad - directory)
//             const imageUploadPath = path.join(__dirname, `../public/products/${imageName}`)
//             // Move to that folder(await, try-catch)
//             await productImage.mv(imageUploadPath)
//             // req.params(id), req.body(updated data - pn, pp, pc, pd), req.files(image)
//             // add new field to req.body(productImage -> name)
//             req.body.productImage = imageName; //image uploaded
//             //if imagea is uploaded and req.body is assigned
//             if (req.body.productImage) {
//                 // finding existing product
//                 const existingProduct = await productModel.findById(req.params.id)
//                 // searching in the directory/folder
//                 const oldImagePath = path.join(__dirname, `../public/products/${existingProduct.productImage}`)
//                 // delete from filesystem
//                 fs.unlinkSync(oldImagePath)
//             }
//         }
//         // update the data
//         const updatedProduct = await productModel.findByIdAndUpdate(req.params.id, req.body)
//         res.status(201).json({
//             success: true,
//             message: "Product has been updated",
//             updatedProduct: updatedProduct
//         })
//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//             success: false,
//             message: "Internal Server Error",
//             error: error
//         })
//     }
// }

// // pagination 
// const paginationProducts = async (req, res) => {
//     // result page number
//     const pageNo = req.query.page || 1;

//     // result per page
//     const resultPerPage = req.query.limit || 2;

//     try {
//         // Find all products, skip, limit
//         const products = await productModel.find({

//         })
//             .skip((pageNo - 1) * resultPerPage)
//             .limit(resultPerPage)

//         // if page 6 is requested, result 0
//         if (products.length === 0) {
//             return res.status(400).json({
//                 success: false,
//                 message: 'No products found',
//             })
//         }
//         // response
//         res.status(200).json({
//             success: true,
//             message: 'Product fetched successfully',
//             products: products
//         })



//     } catch (error) {
//         console.log(error)
//         res.status(500).json({
//             'success': false,
//             'message': 'Internal server error',
//         })
//     }




// }

// module.exports = {
//     createProduct,
//     getAllProducts,
//     getSingleProduct,
//     deleteProduct,
//     updateProduct,
//     paginationProducts
// };



// // START YOUR PROJECT! (in Quite Mode)


const path = require('path');
const productModel = require('../models/productModel');
const fs = require('fs'); // File system for handling file uploads

// Create a new product with image upload
const createProduct = async (req, res) => {
    console.log(req.body);
    console.log(req.files);
    const { productName, productPrice, productCategory, productDescription } = req.body;

    if (!productName || !productPrice || !productCategory || !productDescription) {
        return res.status(400).json({
            "success": false,
            "message": "Enter all fields!"
        });
    }

    if (!req.files || !req.files.productImage) {
        return res.status(400).json({
            "success": false,
            "message": "Image not found!!"
        });
    }

    const { productImage } = req.files;
    const imageName = `${Date.now()}-${productImage.name}`;
    const imageUploadPath = path.join(__dirname, `../public/products/${imageName}`);

    try {
        await productImage.mv(imageUploadPath);
        const newProduct = new productModel({
            productName,
            productPrice,
            productCategory,
            productDescription,
            productImage: imageName,
            createdBy: req.user.id // Fixed to use req.user.id
        });
        const product = await newProduct.save();
        res.status(201).json({
            "success": true,
            "message": "Product Created Successfully!",
            "data": product
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            "success": false,
            "message": "Internal Server Error!",
            "error": error.message,
            "stack": error.stack

        });
    }
};

// Retrieve all products for authenticated users
const getAllProductsAuth = async (req, res) => {
    try {
        const userId = req.user.id; // Fixed to use req.user.id
        const allProducts = await productModel.find({ createdBy: userId });
        res.status(201).json({
            "success": true,
            "message": "Products Fetched successfully!",
            "products": allProducts
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            "success": false,
            "message": "Internal server error",
            "error": error
        });
    }
};

// Retrieve all products for unauthenticated users
const getAllProducts = async (req, res) => {
    try {
        const allProducts = await productModel.find({});
        res.status(201).json({
            "success": true,
            "message": "Products Fetched successfully!",
            "products": allProducts
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            "success": false,
            "message": "Internal server error",
            "error": error
        });
    }
};

// Retrieve a single product by ID
const getSingleProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({
                "success": false,
                "message": "Product not found"
            });
        }
        res.status(201).json({
            "success": true,
            "message": "Product Fetched successfully!",
            "product": product
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            "success": false,
            "message": "Internal server error",
            "error": error
        });
    }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.id);
        res.status(201).json({
            "success": true,
            "message": "Product deleted successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            "success": false,
            "message": "Internal server error",
            "error": error
        });
    }
};

// Update a product by ID, including image handling
const updateProduct = async (req, res) => {
    try {
        if (req.files && req.files.productImage) {
            const { productImage } = req.files;
            const imageName = `${Date.now()}-${productImage.name}`;
            const imageUploadPath = path.join(__dirname, `../public/products/${imageName}`);
            await productImage.mv(imageUploadPath);
            req.body.productImage = imageName;

            if (req.body.productImage) {
                const existingProduct = await productModel.findById(req.params.id);
                const oldImagePath = path.join(__dirname, `../public/products/${existingProduct.productImage}`);
                fs.unlinkSync(oldImagePath);
            }
        }

        const updatedProduct = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(201).json({
            success: true,
            message: "Product has been updated",
            updatedProduct
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error
        });
    }
};

// Pagination for products
const paginationProducts = async (req, res) => {
    const pageNo = req.query.page || 1;
    const resultPerPage = req.query.limit || 10;

    try {
        const products = await productModel.find({})
            .skip((pageNo - 1) * resultPerPage)
            .limit(resultPerPage);

        if (products.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No products found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Product fetched successfully',
            products
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            'success': false,
            'message': 'Internal server error',
        });
    }
};

module.exports = {
    createProduct,
    getAllProductsAuth,
    getAllProducts,
    getSingleProduct,
    deleteProduct,
    updateProduct,
    paginationProducts
};


