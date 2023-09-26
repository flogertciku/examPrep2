const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: { type: String ,
    required:[true,"Emri kerkohet"]},
    email: { type: String,
    required:[true,"email kerkohet"] },
    password: { type: String,
        required:[true,"password kerkohet"] },
    imgUrl: { type: String,
        required:[true,"imgUrl kerkohet"] }  ,
    role: { type: String,
        enum: ["teacher","student"],
    required:[true,"role kerkohet"] },
    belt: { type: Boolean,
         }  , 
    degree: { type: Boolean,
         }  ,       
}, { timestamps: true });
module.exports = mongoose.model('User', UserSchema);

