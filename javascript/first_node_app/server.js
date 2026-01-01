
const dotenv = require("dotenv");
dotenv.config();

const apiKey = process.env.API_KEY;//generated from https://openweathermap.org/appid

const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const request = require('request');


app.use(express.static('public'));//telling express to look in public folder for static files
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');//allowing express to use templates 
							//that are in views folder
							// by default express looks for 
							//templates in views folder

//making variables visible to ejs
//yo nagare program ma error aauxa no idea why 
// figure it out
app.locals.weather = '';
app.locals.error = '';

app.get('/', function(req,res){
	// res.send("Hello World");
	res.render('index');//sending response to the client from server

});

app.post('/', function (req, res) {
  let city = req.body.city;

  // units=imperial for fahrenheit
  //units =metric for celcius
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let _weather = JSON.parse(body)
      if(_weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${_weather.main.temp} degree celcius in ${_weather.name}!`;
        console.log(weatherText);
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
})

app.listen(3000, function(){
	console.log('Listening on port 3000');
});