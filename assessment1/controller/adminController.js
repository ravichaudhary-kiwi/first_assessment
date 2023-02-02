const jwt = require('jsonwebtoken');
const User = require('../schema/userSchema');

//importing function to generate token for the admin
const { tokenGenerate } = require('../validate/token');

const createAdmin = async (req, res) => {
        try {
    const { name, email, password, phone, address, role } = req.body;
    const admin = new User({
            name,
            email,
            password,
            phone,
            address,
            role,
        })
        const result = await admin.save();
        res.status(201).send(result);
    } catch (err) {
        res.status(404).send({err});
    }
};

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            return res.send("email is not registered");
        }
        if (user.password != password) {
            return res.send("password is incorrect");
        }
        if(user.role === 'admin') {
            const token = await tokenGenerate(user.email);
            res.status(200).send(token);    
        } else {
            return res.send("user is not admin");
        }
    } catch (err) {
        res.status(404).send({err});
    }
};

const viewAdmin = async (req, res) => {
    const data = await User.findOne({ email: req.body.email });
    if (data) {
        res.status(200).send(data);
    } else {
        res.status(404).send(error);
    }
};

const allUsers = async (req,res) => {
    try{
        const result = await User.find()
        res.status(200).send(result);    
    } catch (err) {
          res.status(404).send({err});
       }
    };

const updateAdmin = async (req, res) => {
  try {
    const updatedData = await User.findOneAndUpdate({ email: req.body.email },{ $set: { name: req.body.name , address: req.body.address }});
    res.status(205).send(updatedData);  //status code:205 for modified data
  }
      catch (err) {
       res.status(404).send({err});
      }
};

const deleteAdmin = async (req, res) => {
    const deletedData = await User.findOneAndDelete({ _id: req.body.id });
    if (deletedData) {
        res.status(200).send(deletedData);
    }
    else {
        res.status(404).send(error);
    }
};

const adminActive = async (req, res) => {
        try {
        User.findOneAndUpdate({ email: req.body.email }, { $set: { active : true } }).then((value) => {
            res.send("User has been activated");
        })
    }
    catch (err) {
        res.send({err});
    }
};

 const adminDeactivate = async (req, res) => {
        try {
        User.findOneAndUpdate({ email: req.body.email }, {$set: { active : false } }).then((value) => {
            res.send("User has been deactivated");
        })
    }
        catch (err) {
         res.send({err});
    }
};

module.exports = {
    createAdmin,
    loginAdmin,
    viewAdmin,
    allUsers,
    updateAdmin,
    deleteAdmin,
    adminActive,
    adminDeactivate,
}