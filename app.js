const express = require("express");
const https = require("https");



const app = express();

// This use function allows the post content from the client site to be parse or divided or analysed into understandable content
app.use(express.urlencoded({
    extended: true
}));

//getting a response to the request from the client site
app.get("/", function(req, res){
    res.sendFile(__dirname +"/index.html");
    console.log("It's all fine");
});

//Allows the client to make input on to web page
app.post("/", function(req,res){
    var requestedCity=(req.body.cityName);


    const url = "https://api.openweathermap.org/data/2.5/weather?q="+requestedCity+"&appid=a611f1188bfe417108ea62b2939c8545&units=metric";
    https.get(url, function(response){

        console.log(response.statusCode);

        response.on("data", function(data){

           // console.log(data);
           var weatherData = JSON.parse(data);
           console.log(weatherData);
           var temperature = weatherData.main.temp;
           var weatherStatus = weatherData.weather[0].description;
           var icon = weatherData.weather[0].icon;
           var imageurl = "https://openweathermap.org/img/wn" + icon + "@2x.png";
           console.log("The temperature in Kampala City is " + temperature);
           res.write("<h1>The weather status as of now is " + weatherStatus +"</h1>");
           res.write("<h1>The temperature in " + requestedCity+" City is " + temperature + " degree celsius</h1>");
           res.write("<img src='imageurl'></img>")
           res.send();
        });
        
    });
    
});



















app.listen("3000", function(){

    console.log("The server is running on port 3000");
});