const express = require('express')
const connectDB = require('./config/db')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.get("/",(req,res) => {
    res.send("Home Page")  
})

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", require('./routes/user.routes.js'))

app.listen(port, () =>{
    console.log(`Server running on http://localhost:${port}`)
    connectDB()
})