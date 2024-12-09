const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const axios = require("axios");
const productsModel = require("../models/product_model");
const FormData = require("form-data");

// Import product data
const products = require("../product.json");
const productData = products.products;

// Function to fetch and save image
async function fetchAndSaveImageTemp(imageUrl) {
  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    const fileName = path.basename(imageUrl);
    const filePath = path.join(
      "/home/vamepaire/Desktop/Practice/public/images",
      fileName
    );

    fs.writeFileSync(filePath, response.data);
    console.log(`Image saved to: ${filePath}`);
    return filePath;
  } catch (error) {
    console.error(`Error fetching image: ${error.message}`);
    throw error;
  }
}

// Function to send product data
async function sendProductData(product) {
  try {
    const imageFilePath = await fetchAndSaveImageTemp(product.image);

    const formData = new FormData();
    formData.append("product_name", product.product_name);
    formData.append("price", product.price);
    formData.append("discount", product.discount);
    formData.append("bgcolor", product.bgcolor);
    formData.append("panel_color", product.panel_color);
    formData.append("text_color", product.text_color);
    formData.append("category", product.category);
    formData.append("product_desc", product.product_desc);
    formData.append("image", fs.createReadStream(imageFilePath));

    const response = await axios.post(
      "http://localhost:3000/products/create",
      formData,
      {
        headers: formData.getHeaders(),
      }
    );

    console.log(`Product uploaded successfully:`);
    fs.unlinkSync(imageFilePath);
  } catch (error) {
    console.error(`Error uploading product: ${error.message}`);
  }
}

// Main function to process product data
(async () => {
  for (const product of productData) {
    await sendProductData(product);
  }
})();
