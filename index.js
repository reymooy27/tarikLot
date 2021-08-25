const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
const mongoose = require('mongoose')
const routes = require('./routes')

const app = express()

const PORT = 8000 || process.env.PORT

dotenv.config()
app.use(cors())
app.use(compression())
app.use(helmet())

mongoose.connect(process.env.DB_URI, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }, 
  (err)=> {
    if (err) throw err
      console.log('DB Connnected')
  }
)

app.use(routes)

app.listen(PORT, ()=> console.log('Server Running'))