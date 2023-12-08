const express = require('express')
const dotenv =require("dotenv")
const middlewareLogRequest = require('../middleware/logs.js')

const app = express()
dotenv.config()

app.use(middlewareLogRequest)
app.use(express.json())


app.get('/', function (req, res) {
  res.send('Hello World')
})

const db = require("../model")
db.sequelizeDB.sync()
  .then(() => {
    console.log("Synced Database")
  })
  .catch((err) => {
    console.log("Failed to sync Database: " + err.message)
  })

  //pemanggilan masing-masing route
  require("../routes/user_router.js")(app)
  require("../routes/music_router.js")(app)
  require("../routes/album_router.js")(app)
  
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is Running on port : ${PORT}`)
})