const post = require('../schema/postSchema');

const createPost = async (req, res) => {
    try {
     const{ title, description } = req.body;
        const userPost = new post({
        title,
        description,
    })
     const result = await userPost.save();
      console.log("User has been created");
           res.status(201).send(result);
    } catch (error) {
         res.status(203).send({ error:error });
    }  
};

module.exports = {
    createPost,
}