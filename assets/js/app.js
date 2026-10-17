const cl = console.log;

let products = [
    {
        "id": "101",
        "productName": "Laptop",
        "price": 55000,
        "brand": "Dell",
        "category": "Electronics",
        "inStock": true
    },
    {
        "id": "102",
        "productName": "Smartphone",
        "price": 25000,
        "brand": "Samsung",
        "category": "Electronics",
        "inStock": true
    },
    {
        "id": "103",
        "productName": "Headphones",
        "price": 2000,
        "brand": "Boat",
        "category": "Accessories",
        "inStock": false
    },
    {
        "id": "104",
        "productName": "Smartwatch",
        "price": 5000,
        "brand": "Noise",
        "category": "Wearables",
        "inStock": true
    }
];

const express = require("express");
const cors = require("cors");

const port = 8070;

const app = express();

app.use(express.json());
app.use(cors());

// Multiple product 

app.get("/api/product", (req, res) => {
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
})

// single product

app.get("/api/product/:id", (req, res) => {
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
})

// Create Post

app.post("/api/product", (req, res) => {
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
})

// update Project

app.patch("/api/product/:id", (req, res) => {
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
})

// Delete Product

app.delete("/api/product/:id", (req, res) => {
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
})

app.listen(port, () => {
    cl(`Server is running on port ${port}`)
})

