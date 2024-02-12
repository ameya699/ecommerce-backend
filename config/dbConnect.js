const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const connectdb = async () => {
  try {
    console.log("in connection");
    const connect = await mongoose.connect(process.env.MONGO_URI);

    console.log(
      "Database Connected",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectdb;