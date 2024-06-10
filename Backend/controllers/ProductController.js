const productService = require("../services/ProductService");
const cloudinary = require("../utils/cloudinary");

exports.createProduct = async (req, res) => {
  try {
    if (!req.body.image) {
      throw new Error("error: no image");
    }

    const uploadedResponse = await cloudinary.uploader.upload(req.body.image, {
      upload_preset: "TechMarket-Product",
    });

    if (!uploadedResponse) {
      throw new Error("error: can't upload image to cloudinary");
    }

    req.body.image = uploadedResponse;

    const product = await productService.createProduct(req.body);
    res.status(200).json({ data: product, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.json({ data: product, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const product = await productService.getAllProducts();
    res.json({ data: product, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  console.log(req.body)
  try {
    if (req.body.image) {
      const product = await productService.getProductById(req.params.id);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      if (product.image && product.image.public_id) {
        await cloudinary.uploader.destroy(product.image.public_id);
      }

      const uploadedResponse = await cloudinary.uploader.upload(
        req.body.image,
        {
          upload_preset: "TechMarket-Product",
        }
      );

      if (!uploadedResponse) {
        throw new Error("Failed to upload image to cloudinary");
      }

      const updatedProduct = await productService.updateProduct(
        req.params.id,
        {
          $set: {
            ...req.body,
            image: uploadedResponse,
          },
        },
        { new: true }
      );

      res.status(200).json({ data: updatedProduct, status: "success" });
    } else {
      const updatedProduct = await productService.updateProduct(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json({ data: updatedProduct, status: "success" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (product.image && product.image.public_id) {
      const destroyResponse = await cloudinary.uploader.destroy(
        product.image.public_id
      );
      if (!destroyResponse.result === "ok") {
        throw new Error("Failed to delete image from Cloudinary");
      }
    }

    const deletedProduct = await productService.deleteProduct(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ data: deletedProduct, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllComments = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await productService.getProductById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ data: product.comments, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createComment = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await productService.getProductById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    product.comments.push(req.body);

    await product.save();
    res.json({ data: product, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.reply = async (req, res) => {
  try {
    const productId = req.params.productId;
    const commentId = req.params.commentId;

    const product = await productService.getProductById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const comment = product.comments.id(commentId);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    comment.subComments.push(req.body);

    await product.save();
    res.json({ data: product, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
