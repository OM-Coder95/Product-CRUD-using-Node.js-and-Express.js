
const products = require("../productData/productData");

// single Product
function getSingleProduct(req, res) {
    try {
        const id = req.params.id;

        let productObj = products.find(p => p.id === id);

        if (!productObj) {
            return res(404).json({
                success: false,
                message: "Product Not Found",
            })
        }

        res.status(200).json({
            success: true,
            message: "Product Fetched successfully",
            data: productObj
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Network Error",
            error: err.message
        })
    }
}

// all Products

function getAllProducts(req, res) {
    try {
        res.status(200).json({
            success: true,
            message: "Product Data Fetched",
            body: products
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Network Error",
            error: err.message
        })
    }
}

// create Products

function onProductAdd(req, res) {
    try {
        let createdObj = {
            ...req.body,
            id: Date.now().toString()
        }

        products.push(createdObj);

        res.status(201).json({
            success: true,
            message: "Product is Created successfully",
            body: createdObj
        })
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Network Error",
            error: err.message
        })
    }
}

// update Product

function updateProduct(req, res) {
    try {
        let updateId = req.params.id;
        let getIndex = products.findIndex(p => p.id === updateId);

        if (getIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Not Found"
            })
        }

        let updatedObj = {
            ...products[getIndex],
            ...req.body,
            id: updateId
        }

        products[getIndex] = updatedObj;

        res.status(200).json({
            success: true,
            message: "product Updated Successfully",
            body: updatedObj
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Network Error",
            error: err.message
        })
    }
}

// delete Product

function deleteProduct(req, res) {
    try {
        let removeId = req.params.id;
        let getIndex = products.findIndex(p => p.id === removeId);
        if (getIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            })
        }

        let arr = products.splice(getIndex, 1);

        res.status(200).json({
            success: true,
            message: "Product Deleted Successfully",
            data: arr[0]
        })

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Network Error",
            error: err.message
        })
    }
}

module.exports = {
    getAllProducts,
    getSingleProduct,
    onProductAdd,
    updateProduct,
    deleteProduct
}