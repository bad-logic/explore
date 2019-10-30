const { mongoose, dbName, dbUrl } = require('./config/db.config');
mongoose.connect(`${dbUrl}/${dbName}`, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }, function(err, done) {
    if (err) {
        console.log("unable to connect to the mongo database>>", err);
    } else {
        console.log(`connected to mongodb at ${dbUrl}/${dbName}`);
    }
});