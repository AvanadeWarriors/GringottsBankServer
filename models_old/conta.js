const mongoose = require('mongoose');

const Conta = new mongoose.Schema({
    conta:Number,
    //hashSenha:String,
    usuario_id:Schema.Types.ObjectId,
    saldo:Number,
    flagAtiva:Boolean,
    ultimoIp:String,
    ultimoUserAgent:String,
    dataAbertura:Date,
    transferenciaFavoritos:{
        nome:String,
        conta:Number
    }
});