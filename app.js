const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const { urlencoded } = require("body-parser");
const https = require("https");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    
    const data = {
       members: [
        {
        email_address: email,
        status: "subscribed",
        merge_fields: {
            FNAME: firstName,
            LNAME: lastName,


        }

        }
       ]
    }
    const jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/fd01ee03e8";
    const options = {
        method: "POST",
        auth: "sf1:ef08e5ce7c48cccae8f761bf8d4c5d2f4-us21"
    }
    const request = https.request(url, options, function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html")
        }else{
            res.sendFile(__dirname + "/failure.html")
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })
        request.write(jsonData);
        request.end();
});
      app.post("/failure", function(req, res){
        res.redirect("/");
      })

app.listen(process.envy.PORT || 3000, function(){
    console.log("Server is running on port 3000")
})

// api key
// f08e5ce7c48cccae8f761bf8d4c5d2f4-us21

// list Id
// fd01ee03e8