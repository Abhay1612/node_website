const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.get("/", function(req,res){
    res.sendFile(__dirname + "/index.html");
});
app.post("/", function(req ,res){   
console.log(req.body.cityname);

const query =req.body.cityname;
const apikey ="6aa7499bfad59172fded83a1dee969e9"
const unit = "metric"

const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+ apikey+"&unit=mertric"

https.get(url, function(response){
console.log(response.statusCode);
response.on("data", function(data){

const weatherData= JSON.parse(data);

console.log(weatherData);
const temp = weatherData.main.temp;
const weatherDiscription=weatherData.weather[0].description
const icon = weatherData.weather[0].icon

const temp2= Number(temp-273);


const imageURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
console.log(weatherDiscription);

res.write("<h1>the condition in "+ query+ " will be "+weatherDiscription +".</h1>");
res.write("<img src = " + imageURL+">");
res.write(" <h1>the weather in " +query +" is " + "<h1>"+temp+"kelvin" );
res.write("<h1> The weather in dgree celsius is = " + temp2 +"  C'");
res.send();

});
});
});





app.listen(3000, function(){
console.log("the server is running on the port 3000");
})