import dotenv from "dotenv"
dotenv.config({path:__dirname + "/../.env"})
import routes from "./routes/index"
import cookieParser from "cookie-parser"

import express from "express"
import handlebars from "express-handlebars"

const app = express()

app.engine("handlebars", handlebars())
app.set("view engine", "handlebars")
app.set("views","./src/views")
app.use(cookieParser())

app.use("/", routes.main)

const port = process.env.PORT

app.listen(port, ()=>{
    console.log(`App listening on port ${port}`)
})