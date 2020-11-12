const User = require('../models/user');


const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };

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


const signup_get = (req, res) => {
    res.render('signup', { title: 'Sing Up'});
};

const signup_post = async (req, res) => {
    const { email, password } = req.body;
    try{
        const user = await User.create({email, password});
        await res.status(201).json(user);
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
        const user = await User.create({email, password});
        await res.status(201).json(user);
    }catch(err){
        const errors = handleErrors(err);
        res.status(400).json({ errors })
    }
};

module.exports = {
    signup_get,
    signup_post,
    login_get,
    login_post
} 