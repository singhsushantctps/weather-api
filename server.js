const express = require("express");
const bodyParser = require("body-parser");
const https = require("https")

const app = express();
app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  const c_name=req.body.cityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+c_name+"&appid=2c2ffbeb2d35c43bb2d68ea9f3284358&units=metric"
  console.log(c_name);
  https.get(url,function(response){
    response.on("data",function(data){
      const x = JSON.parse(data);
      const temp = x.main.temp;
      console.log(temp);
      res.send("today temperature of "+c_name+" is "+temp);
    })
  })
})

















app.listen(3000,function(){
  console.log("server get started");
});
