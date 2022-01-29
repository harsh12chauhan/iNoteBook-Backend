const mongoose = require('mongoose');

const NotesSchema = new Schema({
    title:{
       type:String,
       require:true
        
    },
    decripton:{
       type:String,
       require:true
    },
    tag:{
       type:String,
        default:"General"
    },
    date:{
       type:Date,
       require:Date.now
    }
    
  });
  module.exports = mongoose.model('notes',NotesSchema);