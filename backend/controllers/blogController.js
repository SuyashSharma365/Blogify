const Blog = require('../models/Blog');
const Log = require('../utils/loguilt');

exports.createBlog = async (res , req) => {

    try{
        const {content} = req.body;
        const userId = req.user.sub;

        const blog = await Blog.createBlog({
            userId,
            content
        });

        return res.status(201).json({message : 'successfully created'});
    }
    catch(error){
        return res.status(500).json({error : error.message});
    }

}