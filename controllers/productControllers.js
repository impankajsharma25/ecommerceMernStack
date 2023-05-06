const Product = require("../models/productModel");
const ErrorHandler = require("../utils/ErrorHandler");
const CatchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/ApiFeatures");

// create product

exports.createProduct = CatchAsyncError(async (req, res, next) => {

  req.body.user = req.user.id;

  const productPayload = await Product.create(req.body);

  res.status(200).json({ productPayload, message: "Route is working fine" });
});

exports.getAllProducts = CatchAsyncError(async (req, res) => {
  const productCount = await Product.countDocuments();

  const resultPerPage = 5;
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apiFeature.query;
  // const products = await Product.find({ name: "tv" });
  res.status(200).json({
    Success: true,
    Data: products,
  });
});

exports.getProductDetails = CatchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  const productCount = await Product.countDocuments();

  if (!product) {
    return next(new ErrorHandler("Product not Found", 404));
  }
  res.status(201).json({
    Success: true,
    Data: product,
    productCount,
  });
});

// update product

exports.updateProduct = CatchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not Found", 404));
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(201).json({
    Success: true,
    Data: product,
  });
});

// delete product api

exports.deleteProduct = CatchAsyncError(async (req, res, next) => {
  let product = Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not Found", 404));
  }

  await product.remove();

  return res.status(200).json({
    Success: true,
    message: "Product Deleted Succesfully",
  });
});
