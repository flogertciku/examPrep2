const User = require('../models/user.model');    /* this is new */
const jwt = require("jsonwebtoken");
const bcrypt= require("bcrypt")
require('dotenv').config();

module.exports.register = (req, res) => {
    console.log("tesssttttt")
    console.log(process.env.FIRST_SECRET_KEY)
    User.create(req.body)
      .then(user => {
        const userToken = jwt.sign({
            id: user._id
        }, process.env.FIRST_SECRET_KEY);
 
        res
            .cookie("usertoken", userToken, {
                httpOnly: true
            })
            .json({ msg: "success!", user: user });

      })
      .catch(err => res.status(300).json(err));
  }

  module.exports.logout= (req, res) => {
    res.clearCookie('usertoken');
    res.sendStatus(200);
}
  module.exports.login = async(req, res) => {
    const user = await User.findOne({ email: req.body.email });
 
    if(user === null) {
        // email not found in users collection
        return res.status(300).json({errors:{email:{message:"user nuk egziston"}}});
    }
 
    // if we made it this far, we found a user with this email address
    // let's compare the supplied password to the hashed password in the database
    const correctPassword = await bcrypt.compare(req.body.password, user.password);
 
    if(!correctPassword) {
        // password wasn't a match!
        return res.status(300).json({errors:{password:{message:"passwordi sbo"}}});
    }
 
    // if we made it this far, the password was correct

    // userToken : asjdoijuqpw8oru01    epuw9da0wadaksjdoaisndhasio
    // user._id :    flogert1234567
    // FIRST_SECRET_KEY:     " first key value2"
    const userToken = jwt.sign({
        id: user._id
    }, process.env.FIRST_SECRET_KEY);
 
    // note that the response object allows chained calls to cookie and json
    res
        .cookie("usertoken", userToken, {
            httpOnly: true
        })
        .json({ msg: "success!" });
}
module.exports.createUser = (req, res) => {
    // console.log(req.body.role)
    User.exists({role: "teacher"})
    .then(userExists => {
        if (userExists && req.body.role=="teacher") {
            // Promise.reject() will activate the .catch() below.
            return Promise.reject({errors:{role:{message:"mesuesi egziston"}}});
        }
        return User.create(req.body);
    })
    .then(saveResult => res.json(saveResult))
    .catch(err => res.status(300).json(err));

}
module.exports.getAllUsers = (request, response) => {
    User.find({}).sort({name:'asc'})
        .then(persons => {
            // console.log(persons); //console logs are optional, but they are highly recommended for troubleshooting!
            response.json(persons);
        })
        .catch(err => {
            // console.log(err)
            response.json(err)
        })
}
module.exports.deletePerson = (request, response) => {

    User.findOne({_id:request.params.id})
        .then(person =>
            person.role=="teacher" ?  User.deleteOne({ _id: request.params.id }) //note: "id" here MUST match id in corresponding route
            .then(deleteConfirmation => {
               return User.findOneAndUpdate({role: "student"}, {role:"teacher"}, {new:true})
            .then(updatedPerson => response.json(updatedPerson))
            .catch(err => response.json(err))
            })
            .catch(err => response.json(err)) :
            User.deleteOne({ _id: request.params.id }) //note: "id" here MUST match id in corresponding route
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err)

            
            ))
         .catch(err => response.json(err));
    
}




module.exports.getPerson = (request, response) => {
    User.findOne({_id:request.params.id})
        .then(person => response.json(person))
        .catch(err => response.json(err));
}

module.exports.updatePerson = (request, response) => {
    // console.log("ca marr nga frontendi")
    // console.log(request.body)
    User.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
        .then(updatedPerson => response.json(updatedPerson))
        .catch(err => response.json(err))
}
