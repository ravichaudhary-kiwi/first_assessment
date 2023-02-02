
const jwt = require('jsonwebtoken');
const User = require('../schema/userSchema');
const createUser= async (req, res) => {
    try {
    const{ name, email, password, phone, address } = req.body;   
        const user = new User({
        name: name,
        email: email,
        password: password,
        phone: phone,
        address: address,
    })
        const result = await user.save();
        console.log("User has been created");
        res.status(201).send(result);
        }
         catch (error) {
         res.status(203).send({error:error});
    }  
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email})
        if (!user ) {
            return res.send("Email is not registered");
        }
        if (user.password != password) {
            return res.send("Password is Incorrect");
        }
        if(user.role === 'user') {
        const token = await user.jsontokenGenerate()
        // console.log(user,token);
        res.status(200).send({user,token});
        }
      } catch (error) {
        res.status(404).send({error: error});
    }
};

const viewUser = async (req, res) => {
    const data = await User.findOne({ email: req.body.email });
    if(data) {
        console.log(data);
        res.status(200).send(data);
    } else {
        res.status(204).send(error);
    }
};

const updateUser = async(req,res) => {
    try{
        const result = await User.findOneAndUpdate({email:req.body.email},{$set: { name:req.body.name, address: req.body.address}});
        console.log("Data has been updated");
        res.status(200).send(result);
    }
    catch(error){
        res.status(304).send({error: error});
    }
};

const deleteUser = async(req,res) => {
    const result = await User.findOneAndDelete({_id:req.body.id});
    if(!result){
        res.status(404).send({error:error});
    }
    else {
        console.log("User is deleted");
        res.status(200).send(result);
    }
}

module.exports = {
    createUser,
    loginUser,
    viewUser,
    updateUser,
    deleteUser,
};