const User = require('../models/user.model');    /* this is new */


module.exports.createUser = (req, res) => {
    console.log(req.body.role)
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
    User.find({})
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
    console.log("ca marr nga frontendi")
    console.log(request.body)
    User.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
        .then(updatedPerson => response.json(updatedPerson))
        .catch(err => response.json(err))
}
