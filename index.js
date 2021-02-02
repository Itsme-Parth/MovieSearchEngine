const express= require('express')
const request=require('request')
//Syntax of express
const app= express()
//Ignore rn
//Middlewares
/*
    Ask express.js to look for a folder called views
*/
app.set("view engine", "ejs")
app.get("/", (req, res)=>{
    //console.log(req)
     res.render("Homepage")
//    res.send("home")
})
app.get("/aboutme", (req, res)=>{
    //console.log(req)
     res.render("aboutme")
//    res.send("home")
})
/*
    /class/subject_name
    route
*/
app.get("/getmovies", (req, res)=>{
    //console.log(req.query.moviename)
    const url= `http://www.omdbapi.com/?apikey=cfd672ef&s=${req.query.moviename}`//yaha per movie name bula rahe hai
    request(url, function (error, response, body){
        //console.log(response)
        if(!error && response.statusCode==200){
            //Parsing JSON into JS object
            const data= JSON.parse(body)//javascript object ban raha hai data humara
            //console.log(data)
            //res.send(data)
            res.render("movies", {movieData: data})//storing data in the movieData variable
        }else{
            res.send("Uh oh error")
        }
    })
})
app.get("/getmovies/:id", (req, res)=>{
    //console.log(req.query.moviename)
    const url= `http://www.omdbapi.com/?apikey=cfd672ef&i=${req.params.id}`//yaha per movie name bula rahe hai
    request(url, function (error, response, body){
        if(!error && response.statusCode==200){
            //Parsing JSON into JS object
            const data= JSON.parse(body)//javascript object ban raha hai data humara
            //console.log(data)
            //res.send(data)
            res.render("Knowmore", {movieData: data})//storing data in the movieData variable
        }else{
            res.send("Uh oh error")
        }
    })
})
app.get("/class", (req, res)=>{
    res.send("You are in general class now")
})

app.get("*", (req, res)=>{
    res.send("Go back! Illegal response")
})
//We are creating
app.listen(8000, ()=>{
    console.log("Server has started")
})