const mongoose = require('mongoose');

const Usuario = new mongoose.Schema({
    nome:String,
    nascimento:Date,
    cpf:String,
    nomeMae:String,
    cpfMae:String,
    celular:String,
    telefone:String,
    endereco:String,
    cidade:String,
    estado:String,
    cep:Number,
    referenciaEndereco:String
});