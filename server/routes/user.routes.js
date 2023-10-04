const UserController = require('../controllers/user.controller');
const { authenticate } = require('../config/jwt.config');
module.exports = (app) => {
    app.post("/api/register", UserController.register);
    app.post("/api/login", UserController.login);
    app.post("/api/logout", UserController.logout);
    app.post('/api/users',authenticate, UserController.createUser);
    app.get('/api/people',authenticate, UserController.getAllUsers); 
    app.delete('/api/people/:id',authenticate, UserController.deletePerson);
    app.get('/api/people/:id', UserController.getPerson);
    app.patch('/api/people/:id', UserController.updatePerson);


     /* This is new */
}

