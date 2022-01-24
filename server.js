if(process.env.NODE_ENV !=='production'){
    require('dotenv').config()
}


const express =require('express')
const app=express()
const expressLayouts = require('express-layouts')
const bodyPaser=require('body-parser')



const indexRouter =require('./routes/index')
const authorRouter =require('./routes/authors')

app.set('view engine','ejs')
app.set('views',__dirname +'/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('pulbic'))
app.use(bodyPaser.urlencoded({limit: '10mb',extended:false}))

const mongoose =require('mongoose')
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser:true})
const db=mongoose.connection
db.on('error',error=> console.error(error))
db.once('open',()=> console.log('Connected to Mongoose'))

app.use('/', indexRouter)
app.use('/authors', authorRouter)

app.listen(process.env.PORT || 3000)
