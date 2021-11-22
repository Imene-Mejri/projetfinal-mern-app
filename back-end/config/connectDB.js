//require mongoose
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://imene1:imenekodeskoussay1990@freelancer-mern-app1.tfkqq.mongodb.net/freelancermernappupdate?retryWrites=true&w=majority",()=>{
          console.log('connected to dataBase...')
      }
    );
  } catch (error) { console.log(error); }


};
module.exports=connectDB