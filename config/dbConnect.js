const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log('DB connected');
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectedDB;
