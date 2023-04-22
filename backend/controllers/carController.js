const OEM = require("../model/carModel");
const cloudinary = require("cloudinary");

//Add a new Car
exports.addNewCar = async (req, res) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });

  const { modelName, yearOfModel, price, color, mileage } = req.body;

  const newCar = await OEM.create({
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
