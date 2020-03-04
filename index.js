const express = require("express");
const path = require("path"); 
var exphbs  = require('express-handlebars');
const logger = require("./middleware/logger");
const members = require('./members');
const app = express();

// init logger
// app.use(logger);

// Handlebar middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars'); 

// init body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Homepage
app.get('/', function (req, res) {
    res.render('index', {title : 'Member App', members});
});

//set static folder
app.use(express.static(path.join(__dirname,'public')));

// Members Api route
app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server has started ${PORT}`));