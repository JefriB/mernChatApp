const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(`mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.4`, ()=> {
  console.log('connected to mongodb')
})