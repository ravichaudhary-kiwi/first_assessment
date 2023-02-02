const jwt = require('jsonwebtoken');
const User = require('../schema/userSchema');

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
        res.status(201).send(result)
    } catch (error) {
        res.status(203).send({ error: error });
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
            const token = await user.tokenGenerate()
            // console.log(user,token);
            res.status(200).send(token);    
        } else {
            return res.send("user is not admin");
        }
    } catch (error) {
        res.status(404).send({ error: error });
    }
};

const viewAdmin = async (req, res) => {
    const userData = await User.findOne({ email: req.body.email });
    if (data) {
        console.log("Now,You can access the user through the given id");
        res.status(202).send(userData);
    } else {
        res.status(204).send(error);
    }
};

const allUsers = async (req,res) => {
    try{
        const result = await User.find()
        console.log("all the users will be shown there");
        res.status(200).send(result);    
    } catch (error) {
          res.status(200).send({error: error});
       }
    };

const updateAdmin = async (req, res) => {
  try {
    const updatedData = await User.findOneAndUpdate({ email: req.body.email },{ $set: { name: req.body.name , address: req.body.address }});  
    console.log("The given information has been updated");
    res.status(205).send(updatedData);
  }
      catch (error) {
       res.status(304).send({ error: error})
      }
};

const deleteAdmin = async (req, res) => {
    const deletedData = await User.findOneAndDelete({ _id: req.body.id });
    if (deletedData) {
        console.log("User has been deleted");
        res.status(200).send(deletedData);
    }
    else {
        res.status(404).send(error);
    }
};

const adminActive = async (req, res) => {
        try {
        User.findOneAndUpdate({ email: req.body.email }, { $set: { active : true } }).then((value) => {
            console.log("User has been activated");
            res.send("User has been activated");
        })
    }
    catch (error) {
        console.log(error);
        res.send({error: error});
    }
};

 const adminDeactivate = async (req, res) => {
        try {
        User.findOneAndUpdate({ email: req.body.email }, {$set: { active : false } }).then((value) => {
            console.log("User has been deactivated");
            res.send("User has been deactivated");
        })
    }
    catch (error) {
        console.log(error);
        res.send({error: error});
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