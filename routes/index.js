var express = require('express');
var router = express.Router();
var request = require('sync-request');

const cityModel = require('../models/cities');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('login');
});

/* GET weather page. */
router.get('/weather', async function (req, res, next) {

  if (req.session.user == null) {
    res.redirect('/')
  } else {
    var cityList = await cityModel.find();
    res.render('weather', { cityList })
  }

});

/* Add a new city */
router.post('/add-city', async function (req, res, next) {

  var data = request('GET', `https://api.openweathermap.org/data/2.5/weather?q=${req.body.newcity}&units=metric&lang=fr&appid=2eb8c180339bf8ac52dd9aa424e9d920`)
  var weatherData = JSON.parse(data.body)


  var alreadyExist = await cityModel.findOne({
    name: req.body.newcity.toLowerCase(),
  });


  if (alreadyExist == null && weatherData.name) {

    var newCity = new cityModel({
      name: req.body.newcity,
      temp: Math.round(weatherData.main.temp),
      desc: weatherData.weather[0].description,
      img: "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + ".png",
      temp_min: Math.round(weatherData.main.temp_min),
      temp_max: Math.round(weatherData.main.temp_max),
      lon: weatherData.coord.lon,
      lat: weatherData.coord.lat
    })
    await newCity.save();
  } 
    cityList = await cityModel.find();
    res.render('weather', { cityList})
});

/* Delete a city */
router.get('/delete-city', async function (req, res, next) {

  await cityModel.deleteOne({
    _id: req.query.id
  })

  var cityList = await cityModel.find();
  res.render('weather', { cityList })
});

router.get('/update-cities', async function (req, res, nex) {

  var cityList = await cityModel.find();

  for (var i = 0; i < cityList.length; i++) {
    var data = request('GET', `https://api.openweathermap.org/data/2.5/weather?q=${cityList[i].name}&units=metric&lang=fr&appid=2eb8c180339bf8ac52dd9aa424e9d920`)
    var weatherData = JSON.parse(data.body)

    await cityModel.updateOne({
      _id: cityList[i].id
    }, {
      name: cityList[i].name,
      temp: Math.round(weatherData.main.temp),
      desc: weatherData.weather[0].description,
      img: "http://openweathermap.org/img/wn/" + weatherData.weather[0].icon + ".png",
      temp_min: Math.round(weatherData.main.temp_min),
      temp_max: Math.round(weatherData.main.temp_max),
      lon: weatherData.coord.lon,
      lat: weatherData.coord.lat

    })
  }
  var cityList = await cityModel.find();
  res.render('weather', { cityList })
})




module.exports = router;
