var mongoose = require('./connection')

var citySchema = mongoose.Schema({
    name: String,
    temp: Number,
    desc: String,
    img: String,
    temp_min: Number,
    temp_max: Number,
    lon: Number,
    lat: Number
})

var cityModel = mongoose.model('cities', citySchema)

module.exports = cityModel;