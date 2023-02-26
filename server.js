const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/productModel");
const app = express();
// const config = require('./config');
// const mongoKey = config.MONGO_KEY;

const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello node api");
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }

  // console.log(req.body);
  // res.send(req.body);
});

app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }

  // console.log(req.body);
  // res.send(req.body);
});

app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res.status(404).json({ message: `cannnot find product ${id}` });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }

  // console.log(req.body);
  // res.send(req.body);
});

app.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }

  // console.log(req.body);
  // res.send(req.body);
});

mongoose.set("strictQuery", false);

mongoose
  .connect(
    `mongodb+srv://hyperplayer7:${process.env.MONGO_KEY}@cluster0.n373s4n.mongodb.net/Node-API?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("connected to mongo db");
    app.listen(3000, () => {
      console.log(`node api app is running on port 3000`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
