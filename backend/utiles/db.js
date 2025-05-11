const mongoose = require("mongoose");
module.exports.connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected:`);
  } catch (error) {
    console.log(error.messages);
  }
};
