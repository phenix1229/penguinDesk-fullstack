const User = require('../models/User');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


module.exports = {
    //register user
    register: async (req, res) => {

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        const {name, email, password, group, isAdmin} = req.body;

        try {
            let user = await User.findOne({email});
            if(user){
                return res.status(400).json({msg:'User already exists'});
            };
            user = new User({
                name,
                email,
                password,
                group,
                isAdmin
            });

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            return res.json(user);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('server error');
        }
    },

    //login user
    login: async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        const {email, password} = req.body;
        try {
            let user = await User.findOne({email});
            if(!user){
                return res.status(400).json({msg:'Invalid credentials'});
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if(!isMatch){
                return res.status(400).json({msg:'Invalid credentials'})
            }
            
            const payload = {
                user: {
                    id: user.id,
                }
            }
    
            jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn:360000
            }, (err, token) => {
                if(err) throw err;
                res.json({token})
            } );
        } catch (err) {
            console.error(err.message);
            res.status(500).json({msg:'server error'})
        }
    },

    //logout user, end session
    logout:(req, res) => {
        req.session.destroy();
        console.log('logout ', req.session);
        req.logout();
        return res.json({message:'Logged out'});
    }
}