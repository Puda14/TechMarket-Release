const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 200,
    },
    alias: {
      type: String,
      required: false,
      minlength: 3,
      maxlength: 200,
    },
    desc: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: [String],
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    image: { type: Object, required: true },
    rate: {
      type: Number,
      default: 1,
      min: 1,
      max: 5,
    },
    comments: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        comment: { type: String, required: true },
        userName: { type: String, required: true },
        subComments: [
          {
            _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
            userId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "User",
              required: true,
            },
            comment: { type: String, required: true },
            userName: { type: String, required: true },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
