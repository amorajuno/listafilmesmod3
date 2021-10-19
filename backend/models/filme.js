//


const mongoose = require('mongoose');

const filmeModel = new mongoose.Schema({
    title: {type: String,required:true},
    genre:{type: String, required:true},
    grade:{type: Number, required:true},
    imageUrl:{type: String, required:true},
    assistido:{type: Boolean, default: false}
})

const Filme = mongoose.model('filmes', filmeModel);

module.exports = Filme; 


