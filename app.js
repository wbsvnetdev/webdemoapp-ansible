const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var requestIp = require('request-ip');
var moment = require('moment');
require('dotenv').config()
const request = require("request");


const app = express();
app.set('view engine', 'ejs');

app.use(express.static("public"));

app.use(bodyParser.urlencoded({

  extended: true

}));

const envApp = process.env.ENVAPP
const apiMapbox = process.env.API_KEY_MAPBOX

app.get("/", function(req, res){

var date = moment().format("dddd, MMMM Do YYYY")
console.log(date)

  console.log("Environnement: " + envApp)

  const clientIp = requestIp.getClientIp(req);
  

  baseURL = "https://api.ipgeolocation.io/ipgeo?apiKey="
  ip=clientIp.substring(7)

  url = baseURL+process.env.API_KEY_IPGEO+"&ip="+ip
  

  request({url: url, json:true}, (error, response) => {
   
    country_flag = response.body.country_flag
    latitude = response.body.latitude
    longitude = response.body.longitude 
    city = response.body.city

    console.log("ip: "+ip+"country_flag: "+country_flag +" latitude: "+latitude+" longitude: "+longitude + "city: "+city + "clientIp: "+clientIp)
    
    res.render("home", {ip: ip, country_flag: country_flag, envApp: envApp, date: date, latitude: latitude, longitude: longitude, apiMapbox: apiMapbox, city: city})
  })
    
})

app.listen(3030, function(){
  console.log("Server listening on port 3030")
})


