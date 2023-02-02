const jwt = require('jsonwebtoken');
// verifying token for the user
const jsontokenGenerate = async function(email) {
    const token = jwt.sign({email : email}, 'studentKey');
    return token;
};

// verifying token for the admin
const tokenGenerate = async function(email) {
    const token = jwt.sign({email: email}, 'adminkey');
    return token;
};

module.exports = {
    jsontokenGenerate,
    tokenGenerate,
};
