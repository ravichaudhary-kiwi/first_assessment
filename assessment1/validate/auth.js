const jwt = require('jsonwebtoken');
const userAuth = (req,res,next) => {
    try{
    const token = req.headers.authorization.split(' ')[1];
    console.log("3efr3wef23",token);
    jwt.verify(token,'studentKey')
    next();
} catch (error) {
    res.status(401).send({ error });
}
};

const adminAuth = (req,res,next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token,'adminKey');
        next();
    } catch (error) {
        res.status(401).send({error});
    }
}

module.exports= {
    userAuth,
    adminAuth,
};




