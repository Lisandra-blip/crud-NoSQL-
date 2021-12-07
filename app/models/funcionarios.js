// arquivo: funcionarios.js

// requisição do mongoose
const { text } = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// valores
var FuncionarioSchema = new Schema({

    nome: String,
    cargo: String,
    email: String,
    salario: Number
    
});

module.exports = mongoose.model('Funcionario', FuncionarioSchema);