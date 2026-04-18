const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.login = async( req , res ) => {

    try{
        const {username , password} = req.body;
        const userdb = await User.findOne({username});

        if(!userdb){
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password , userdb.password);

        if(!isMatch){
            return res.status(400).json({message: 'Invalid credentials'});
        }

        const token = jwt.sign({
            sub :userdb._id,
            username: userdb.username
            },
            process.env.JWT_SECRET,
            {expiresIn : '1d'}
        );


        res.json({
            message : 'login succesful',
            token
        });
    }catch(error){
        res.status(500).json({error : error.message});
    }
    
}