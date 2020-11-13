const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({

    email:{
        type: String,
        required: [true, 'Please enter the email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email'],
    },
    password:{
        type: String,
        required: true,
        minlength: [10, 'Password legth must be at least 10 characters'],
    }
});

//function which runs after saving to the database
userSchema.post('save', (doc, next) => {

    console.log('New user was created & saved', doc);

    next();
});

//function which runs before saving to the database
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

module.exports = mongoose.model('User', userSchema);