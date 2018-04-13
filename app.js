var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');

var app = express();

const route = require('./routes/route');

//connect to mongoDB
mongoose.connect('mongodb://localhost:27017/contactlist');

//on connection
mongoose.connection.on('connected',()=>{
    console.log('Connected to database monodb @ 27017');
});

mongoose.connection.on('error',(err)=>{
    if(err)
    {
    console.log('Error in Database connection:'+err);
    }
});



//port num
const port = 3000;

//adding middleware-cors
app.use(cors());

//body-parser
app.use(bodyparser.json());

//static files
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/api', route);

// for testing server
app.get('/',(req,res) => {
    res.send('testing successful');
});

app.listen(port , () => {
    console.log('Server listening at port:' + port);
});

