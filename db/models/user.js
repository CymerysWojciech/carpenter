const  mongoose = require('mongoose')
const {validateEmail} = require("../validators");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type: String,
        unique: [true,"Ten Adres jest już zajęty"],
        require:[ true, "Pole email jest wymagane"],
        lowercase: true,
        trim: true,
        validate: [validateEmail,"Email nieprawidłowy"]

    },
    hash:{
        type: String,
        require:[ true, "Pole email jest wymagane"]
    },
    role:{
        type: String,
        require:[ true, "Pole email jest wymagane"],
        minLength: [4, 'Hasło powinno zawierać minimum cztery znaki']
    }
});

userSchema.post('save', (error, doc, next) => {
    if(error.code === 11000){
        error.errors = {email: {
            message: 'Taki email jest już zajęty'
            }}
    }
    next(error)
})
const User = new mongoose.model('User',userSchema);

module.exports = {
    User
}