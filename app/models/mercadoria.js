// arquivo: mercadorias.js

// requisição do mongoose
const { text } = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// valores
var MercadoriaSchema = new Schema({
    
    nome: String,
    categoria: String,
    preco: Number,
    descricao: String

});

module.exports = mongoose.model('Mercadoria', MercadoriaSchema);