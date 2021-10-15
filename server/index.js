const express = require("express")
const app = express()
const cors = require('cors')
const dbConnect = require('./db/db')

//const userRoute = require("./routes/users")
const pinRoute = require("./routes/pins")

app.use(cors())
app.use(express.json())
dbConnect()

app.get('/', (req,res)=>{
    res.send('Server is running on 5000...')
})

//app.use("/api/users", userRoute)
app.use("/api/pins", pinRoute)

app.listen(8800,()=>{
    console.log("Server is running...")
})