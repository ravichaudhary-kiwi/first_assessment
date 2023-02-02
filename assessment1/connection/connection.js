const mongoose = require('mongoose');
mongoose.set('strictQuery',true);
const connection = () => {
    try {
        mongoose.connect("mongodb://localhost:27017/user", {
            useUnifiedTopology:true,
        });
        console.log("connected");
    } catch(error){
       console.log(error)
  }
};
module.exports = connection();