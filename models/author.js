const mongoose=require('mongoose')

const authorsSchema =new mongoose.Schema({
    name:{
        type: String,
        require:true
    }
})
module.exports=mongoose.model('Author',authorsSchema)