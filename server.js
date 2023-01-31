const express = require("express")
const axios= require("axios")
const app = express()
const cors = require('cors');
require("dotenv").config();
app.use(cors());
const API_KEY = process.env.API_KEY;
app.get('/ip/:ip', async (req, res) => {
    let ip = req.params.ip;
    let isValid = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip);
    if(!isValid){
        res.status(400);
        res.send(
            {
                "error": {
                    "code": 400,
                    "message": "The ip address is not valid",
                    "status": "INVALID_ARGUMENT"
                }
            }
        )
        console.log(ip)
        return;
    }
    try{
        const infos = await axios.get(`https://geo.ipify.org/api/v2/country,city,vpn?apiKey=${API_KEY}&ipAddress=${ip}`)
        res.send(infos.data)

    }catch(error){
        res.send(error)
    }
})
app.use(cors({
    origin: '*' // that will for all like  https / http
}))
app.listen(3000, ()=>{
})