const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const schemaObject = {
   
    name: {
        type : String,
        minLength : 3,
        maxLength : 20
    },

    email: {
        type : String,
        required : true,
        validate(value){
            if(!validator.isEmail(value)) {
                throw new Error('Invalid email format');
            }
        }
    },

    password: {
        type : String,
        minLength : 8,
        required : true
},

    phone: {
        type : String,
        minLength : 9,
        maxLength : 14
    }, 

    address: {
        type : String,
        minLength: 10,
        maxLength: 50
    },

    tokens:[{
            token: {
                type: String,
            }
        }],

    active : {
        type: Boolean, 
        default: true
    },

    role: {
        type: String,
        default: 'user'
    },

    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post"
    }
};

const schema = new mongoose.Schema(schemaObject);
const model = mongoose.model('User',schemaObject);
module.exports = model;
