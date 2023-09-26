const UserController = require('../controllers/user.controller');
module.exports = (app) => {
    app.post('/api/users', UserController.createUser);
    app.get('/api/people', UserController.getAllUsers); 
    app.delete('/api/people/:id', UserController.deletePerson);
    app.get('/api/people/:id', UserController.getPerson);
    app.patch('/api/people/:id', UserController.updatePerson);


     /* This is new */
}

