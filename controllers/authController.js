const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { max } = require('moment');


const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };

    //email
    if(err.message.includes('Incorrect email')){
        errors.email = 'That email is not registered';
    }else if(err.message.includes('Incorrect password')){
        errors.password = 'The password is incorrect';
    }

    //error code of duplicate records
    if(err.code == 11000){
        errors.email = "This email already exists";
        return errors;
    }
    //errors
    if(err.message.includes('User validation failed')){
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        })
    }
    return errors;
};




const maxAge = 3 * 60 * 60;
const createJWToken = (id) => {
    return jwt.sign({ id }, 'new user at my website', {
        expiresIn: maxAge,
    });
}


const signup_get = (req, res) => {
    res.render('signup', { title: 'Sing Up'});
};

const signup_post = async (req, res) => {
    const { email, password } = req.body;
    try{
        const user = await User.create({email, password});
        const token = createJWToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        await res.status(201).json({ user: user._id});
    }catch(err){
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

const login_get = (req, res) => {
    res.render('login', { title: 'Log In'});
};

const login_post = async (req, res) => {
    const { email, password } = req.body;
    try{
        const user = await User.logIn(email, password);
        const token = createJWToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({ user: user._id });
    }catch(err){
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

const logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/login');
};

module.exports = {
    signup_get,
    signup_post,
    login_get,
    login_post,
    logout_get,
} 