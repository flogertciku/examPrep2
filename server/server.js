const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
        //*!    per tu ndryshuar porta e localHostit
app.use(cors({credentials: true, origin: 'http://localhost:5173'}));
app.use(express.json());   
app.use(cookieParser());                        /* This is new and allows JSON Objects to be posted */
app.use(express.urlencoded({ extended: true }));   /* This is new and allows JSON Objects with strings and arrays*/
require('./config/mongoose.config'); 
   /* This is new */
require('./routes/user.routes')(app);
app.listen(8000, () => {
    console.log("Listening at Port 8000")
})