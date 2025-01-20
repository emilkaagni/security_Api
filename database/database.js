// module.exports = connectDatabase
const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    //console.log("🔄 Connecting to MongoDB Atlas...");
    await mongoose.connect(process.env.MONGODB_CLOUD, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Prevent long waits
    });
    //console.log("CarHealth's Database connected successfully!");
  } catch (error) {
    console.error(
      "CarHealth's Database connection failed, it needs to be fixed:",
      error.message
    );
    process.exit(1); // Stop the app if database connection fails
  }
};

module.exports = connectDatabase;
