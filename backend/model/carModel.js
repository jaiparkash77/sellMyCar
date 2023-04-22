const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  modelName: {
    type: String,
    required: [true, "Please Enter Model Name"],
  },
  yearOfModel: {
    type: Number,
    required: [true, "Please Enter Year of Model"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter Price"],
  },
  color: {
    type: String,
    required: [true, "Please Enter Color"],
  },
  mileage: {
    type: String,
    required: [true, "Please Enter Mileage"],
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


module.exports = mongoose.model("CarCollections", carSchema);
