const Product = require("../models/product.js");

function genAlias(productName) {
    let alias = productName.toLowerCase();
  
    alias = alias.replace(/[^a-z0-9 ]/g, "");
  
    alias = alias.replace(/\s+/g, "-");
  
    return alias;
}


exports.createProduct = async (product) => {
    const savedProduct = await Product.create(product);
    savedProduct.alias = genAlias(savedProduct.name);
    await savedProduct.save();
    return savedProduct;
};

exports.getAllProducts = async () => {
    return await Product.find();
}

exports.getProductById = async (id) => {
    return await Product.findById(id);
};

exports.updateProduct = async (id, product) => {
    return await Product.findByIdAndUpdate(id, product);
}

exports.deleteProduct = async (id) => {
    return await Product.findByIdAndDelete(id);
}