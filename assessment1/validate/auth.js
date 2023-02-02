const jwt = require('jsonwebtoken');
//authentication for the user
const userAuth = (req,res,next) => {
    try{
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token,'studentKey')
    next();
} catch (err) {
    res.status(404).send({ err });
}
};
//authentication for the admin
const adminAuth = (req,res,next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token,'adminKey');
        next();
    } catch (err) {
        res.status(404).send({err});
    }
}

module.exports= {
    userAuth,
    adminAuth,
};




