const { default: mongoose } = require("mongoose");

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error while connected to database" + error.message);
  }
};

module.exports = { connection };
