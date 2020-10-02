require('dotenv').config()
const express = require('express')
const app = express()
const port = 3333
const routes = require('./routes')
const mongoose = require('mongoose')
const cors = require('cors')


const pass = process.env.MONGOOSE_PASS



mongoose.connect(`mongodb+srv://joao99sb:${pass}@cluster0.sc82m.mongodb.net/testando?retryWrites=true&w=majority`,{
    useNewUrlParser: true,
    useUnifiedTopology:true ,
    useCreateIndex:true
})

app.use(cors())
app.use(express.json())
app.use(routes)



app.listen(port,()=> console.log(port + ' aberta'))