const mongoose = require('mongoose'); 

const UserSchema = new mongoose.Schema({
        name:'string',
        email:{type:'string', unique: true}, 
        password: 'string',
        gender: {type:'string', enum:['male', 'female', 'other']}
    }
)

const model = mongoose.model('User', UserSchema);

module.exports= model;