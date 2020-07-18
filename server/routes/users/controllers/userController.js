const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();


module.exports = {
    //register user
    register:
    // [
    //     check('name', 'Name is required')
    //         .not()
    //         .isEmpty(),
    //     check('email', 'Email is required')
    //         .isEmail(),
    //     check('password', 'Please enter a password with 6 or more characters')
    //         .isLength({min: 6})
    // ],
    async (req, res) => {

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

            await user.save()
            //     .then(user => {
            //         library = new Library();
            //         library.owner = user.id;
            //         library.save();
            //         user.library = library.id;
            //         user.save();
            //         return user;
            //     })

            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(payload,process.env.JWT_SECRET, {
                expiresIn:360000
            }, (err, token) => {
                if(err) throw err;
                res.json({token})
            } )
        } catch (err) {
            console.error(err.message);
            res.status(500).send('server error');
        }
    },

    //login user
    login: (req, res) => {
        User.findOne({email:req.body.email})
        .then((user) => {
            if(!user){
                return res.status(500).json({message:'No user found'})
            };
            bcrypt.compare(req.body.password, user.password)
            .then(result => {
                console.log(result)
                if(!result){
                    //no error no user
                    return res.status(500).json(
                        {message:'Check email or password!'}
                        );
                } else {
                    return res.status(200).json(user);
                };
            })
        })
        .catch(err => {
            res.status(500).json({error:'server error'});
        });
    },

    //logout user, end session
    logout:(req, res) => {
        req.session.destroy();
        console.log('logout ', req.session);
        req.logout();
        return res.json({message:'Logged out'});
    }
}