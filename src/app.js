const express = require('express')
const app = express()

// jb hum iseee host krenge tb bhi server will look for port number so the below statement says that if 3000 post number is available then it will take it otherwise it will take random available post no.
const port = process.env.PORT || 3000
const path = require('path')
const hbs = require('hbs')

//public static path
const staticPath = path.join(__dirname,"../public")
const templatePath = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname,"../templates/partials")

app.set("view engine","hbs")
app.use(express.static(staticPath))
app.set("views",templatePath)
hbs.registerPartials(partialsPath)

//routing
app.get("", (req,res) => {
    res.render("index")
})

app.get("",(req,res) => {
    res.send("Home Page")
})

app.get("/about",(req,res) => {
    res.render("about")
})

app.get("/weather",(req,res) => {
    res.render("weather")
})

//if none of the route matched then using * as a route we can display 404 error
app.get("*",(req,res) => {
    res.render("404error", {
        errMsg : "Opps! Page Not Found"
    })
})

app.listen(port,() => {
    console.log(`listening to the port http://localhost:${port}/`)
})