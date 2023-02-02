const mongoose = require('mongoose');

const schemaDraft = new mongoose.Schema({   
    title : String,
    description : String,
});

module.exports = mongoose.model('post',schemaDraft);