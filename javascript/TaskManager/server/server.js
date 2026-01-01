const { cors, port, host, morgan, express } = require('./config');
const app = express();
const mainRoutes = require('./controllers/api.route');

// connecting to the database
require('./mongodb.connect');

// third party Middleware to parse the request body
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());

// using Third party Middlewares
app.use(cors());
app.use(morgan('dev'));
//Application level middleware
app.use(function(req, res, next) {
        // Allowing the exposure of access and refresh token in 
        // frontend Response to save in localstorage
        res.header(
            'Access-Control-Expose-Headers',
            'x-access-token, x-refresh-token'
        )
        next();
    })
    // response on simply sending get request to the server host address
    // Root request handling middleware
app.get('/', function(req, res, next) {
    res.send('Welcome');
});

// API endpoints handling middlewares
//  Routing level Middlewares
app.use('/api', mainRoutes);

// Unregistered endpoint handler Middleware
// Application level Middleware
app.use(function(req, res, next) {
    next({
        status: 404,
        msg: 'No such endpoint exists'
    })
});

// Global Error Handler Middleware
// Error handling Middleware
app.use(function(error, req, res, next) {
    // console.log("error>>>", error);
    res.json({
        status: error.status || 400,
        msg: error.msg || error
    })
});

// Running the server
app.listen(port, host, function(err, done) {
    if (err) {
        console.log('Error occured during connection.');
    } else {
        console.log(`Server is Online at ${host}:${port} `);
    }
});