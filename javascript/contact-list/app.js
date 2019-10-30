// importing requires from index.js config folder
var {
    express,
    app,
    mongoose,
    path,
    port,
    route
} = require('./config');

// connecting to the database
require('./db.js');

// serving static files externally
app.use('/public', express.static(path.join(__dirname, 'public')));
// express url encoder
app.use(express.urlencoded({ extended: true }));
//express json 
app.use(express.json());

// allow CORS
var cors = require('cors');
app.use(cors());

// routes
app.use('/api', route);

// PAGE NOT FOUND HANDLER
app.use(function(req, res, next) {
    next({
        status: 404,
        msg: 'page not found'
    })
});

// GLOBAL ERROR HANDLER
app.use(function(err, req, res, next) {
    res.json({
        status: err.status || 400,
        msg: err.msg || err
    });
});

app.listen(port, 'localhost', function(err, connect) {
    if (err) {
        console.log('error connecting to the server');
    } else {
        console.log('connected to the server');
    }
});