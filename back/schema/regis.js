var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RegisSchema = new Schema({
    fname: String,
    lname: String,
    email:{type:String,index:true,unique:true},
    password: String,
    society:String,
    fcoordinator:String,
    role:{
        type:String,
        default:'user'
    },
    date: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('users', RegisSchema);
