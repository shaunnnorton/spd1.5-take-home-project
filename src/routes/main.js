import {Router} from "express"
import request from "request"
import timeadjust from "./../utils/adjust"

import dotenv from "dotenv"
dotenv.config({path:__dirname + "/../../.env"})
const router = Router()


router.get("/", (req,res) => {
    res.render("main")
})

const key = process.env.APIKEY

router.get("/home", (req,res) => {
    const city = req.query.city
    
    const api_request = { 
        method: "GET",
        url:`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&units=imperial`,
        json:true
    }
    request(api_request, (err,response,body) => {
        //console.log(body.list)
        let forcasts = {}
        let cityname = body.city.name
        let offset = body.city.timezone
        body.list.forEach(element => {
            let datetime = element.dt_txt.split(" ")
            console.log(element.weather)
            let data = {
                "temp_max":element.main.temp_max,
                "weather":element.weather.description,
                "time":timeadjust(datetime[1],offset)
            }
            if(datetime[0] in forcasts){
                forcasts[datetime[0]].push(data) 
            }
            else{
                forcasts[datetime[0]] = [data]
            }
            forcasts[datetime[0]].feeling = req.cookies[datetime[0]]
            
            
            
            
            
            
            console.log(`${element.main.temp_max} + ${element.dt_txt}`)
        });
        
        res.render("forcast",{forcasts,cityname})

    })
})

router.get("/feeling",(req,res) => {
    res.cookie(req.query.time,req.query.feeling,{maxAge:720000}).redirect(`/home?city=${req.query.city}`)
})


export default router