var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true
}

   mongoose.connect(`${process.env.DB_CONNECT}`,
    options,
    function (err) {
        err ? console.log(err) : console.log('*** Database connected ***');
    }
);

module.exports = mongoose