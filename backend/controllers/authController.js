const generateToken = require('../utils/jwt');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const Log = require('../models/Log');
const generatelog = require('../utils/loguilt');

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

        const token = generateToken(userdb);
        const log = generatelog(userdb , 'LOGIN');


        res.json({
            message : 'login successful',
            token
        });
    }catch(error){
        return res.status(500).json({error : error.message});
    }
    
};

exports.signup = async(req , res) =>{

    try{
        const {username , email , password} = req.body;
        const existingUser = await User.findOne({username});

        if(existingUser){
            return res.status(400).json({message : 'User already exists'});
        }

        const hashedPassword = await bcrypt.hash(password , 10);

        const user = await User.create({
            username,
            email,
            password : hashedPassword,
            role:'user'
        });

        const token = generateToken(user);
        const log = generatelog(user , 'SINGUP');

        return res.status(201).json({message : 'User created successfully' , token});
    }catch(error){
        return res.status(500).json({error : error.message});
    }
};