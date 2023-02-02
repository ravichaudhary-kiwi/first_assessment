const User = require('../schema/userSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
// importing function to generate token for the user
const { jsontokenGenerate } = require('../validate/token');

const createUser= async (req, res) => {
    try {
    const{ name, email, password, phone, address } = req.body;   
    const hashPassword =  await bcrypt.hash(password, 8);
        const user = new User({
        name,
        email,
        password: hashPassword,
        phone,
        address,
    })
        const result = await user.save(); 
        res.status(201).send(result);
        }
         catch (err) {
         res.status(404).send({err});
    }  
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email})
        if (!user ) {
            return res.send("Email is not registered");
        }
    const result = await bcrypt.compare(password,user.password);
     if (!result) {
            return res.send("password is not matched");
        }
        if(user.role === 'user') {
         const token = await jsontokenGenerate(user.email);
         res.status(200).send(token);
    }
  }
    catch (err) {
    res.status(404).send({err});
} 
};

const viewUser = async (req, res) => {
    const data = await User.findOne({ email: req.body.email });
    if(data) {
        res.status(200).send(data);
    } else {
        res.status(404).send(error);
    }
};

const updateUser = async(req,res) => {
    try{
        const result = await User.findOneAndUpdate({email:req.body.email},{$set: { name:req.body.name, address: req.body.address}});
        res.status(200).send(result);
    }
    catch(err){
        res.status(404).send({err});
    }
};

const deleteUser = async(req,res) => {
    const result = await User.findOneAndDelete({_id:req.body.id});
    if(!result){
        res.status(404).send({err});
    }
    else {
        res.status(200).send(result);
    }
};

module.exports = {
    createUser,
    loginUser,
    viewUser,
    updateUser,
    deleteUser,
};