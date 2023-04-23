const CarCollections = require("../model/carModel");
const cloudinary = require("cloudinary");
const ApiFeatures = require("../utils/apifeatures");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

//Add a new Car
exports.addNewCar = async (req, res) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });

  const { modelName, yearOfModel, price, color, mileage } = req.body;

  const newCar = await CarCollections.create({
    modelName,
    yearOfModel,
    price,
    color,
    mileage,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    newCar,
  });
};

//Get all Cars
exports.getAllCars = async (req, res) => {
  const carCount = await CarCollections.countDocuments();
  const apiFeature = new ApiFeatures(CarCollections.find(), req.query)
    .search()
    .filter();
  let cars = await apiFeature.query; 

  res.status(200).json({
    success: true,
    cars,
    carCount,
  });
};

//Get Single Car Detail
exports.getCarDetails = async (req, res) => {
  const car = await CarCollections.findById(req.params.id);

  if (!car) {
    return res.status(404).json({
      success: false,
      message: "Product Not Found",
    });
  }

  res.status(200).json({
    success: true,
    car,
  });
};

//Update Car
exports.updateCar = async (req, res) => {
  let car = await CarCollections.findById(req.params.id);
  if (!car) {
    return res.status(404).json({
      success: false,
      message: "Product Not Found",
    });
  }

  car = await CarCollections.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    car,
  });
};

// Delete Car
exports.deleteCar = catchAsyncErrors(async (req, res,next) => {
  // console.log(req.params.id);
  // const car = await CarCollections.findById(req.params.id);
  const car = await CarCollections.findOneAndDelete(req.params.id); 
  if (!car) {
    return next(new ErrorHander("Product not found", 404));
  }

  // Deleting Images From Cloudinary
  // for (let i = 0; i < car.images.length; i++) {
  //   await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  // }

  // if (!car) {
  //   return res.status(404).json({
  //     success: false,
  //     message: "Car Not Found",
  //   });
  // }

  // await car.remove();

  res.status(200).json({
    success: true,
    message: "Car deleted successfully",
    car
  });
});
