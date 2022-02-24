var mongoose = require('mongoose');

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect('mongodb+srv://mili86:MYjIc84FP9lsytzf@cluster0.qpx2f.mongodb.net/weatherapp?retryWrites=true&w=majority',
    options,
    function (err) {
        err ? console.log(err) : console.log('*** Database connected ***');
    }
);

module.exports = mongoose