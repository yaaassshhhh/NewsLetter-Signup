const express = require("express");
const bodyParser = require("body-parser");
const request = require ("request");
const https = require ("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req,res) =>
{
    res.sendFile(__dirname + "/signup.html")
})

app.post("/",(req,res) =>
{
    const firstName= req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;
    console.log(firstName,lastName,email);

    const data = {
        members : [
            {
                email_address : email,
                status : "subscribed",
                merge_fields : {
                    FNAME : firstName,
                    LNAME : lastName
                }
            }
        ]

    };

    const jsonData =JSON.stringify(data);
    const url = "https://us9.api.mailchimp.com/3.0/lists/892df7a053"
        const options = {
            method  : "POST",
            auth : "YASH1:0a0bd5e609c337b1b502cc6c56d600d2-us9"
        }

   const request = https.request(url, options, (response) =>
    {   
        if (response.statusCode === 200)
        {
            res.sendFile(__dirname + "/success.html");
        }
        else 
        {
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data",(data)=>
        {
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

})

app.post("/failure",(req,res)=>
{
    res.redirect("/");
})

app.listen(process.env.PORT ||3000, ()=>
{
    console.log("server is running on port 3000");
})

//api key 0d8b9ea014f97535fb0b047232466448-us9
//list id 892df7a053
