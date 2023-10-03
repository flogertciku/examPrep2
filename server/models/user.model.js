const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const UserSchema = new mongoose.Schema({
    name: { type: String ,
    required:[true,"Emri kerkohet"]},
    email: { type: String,
    required:[true,"email kerkohet"] ,
    validate: {
        validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Please enter a valid email"
      } },
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

// add this after UserSchema is defined
UserSchema.virtual('confirmPassword')
  .get( () => this._confirmPassword )
  .set( value => this._confirmPassword = value );

  UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
      this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
  });
// this should go after 
UserSchema.pre('save', function(next) {
  bcrypt.hash(this.password, 10)
    .then(hash => {
      this.password = hash;
      next();
    });
});
  
  

module.exports = mongoose.model('User', UserSchema);

