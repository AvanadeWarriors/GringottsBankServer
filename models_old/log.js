const mongoose = require('mongoose');

const Log = new mongoose.Schema({
    usuario_id:Schema.Types.ObjectId,
    dataHora:Date,
    method:String,
    params:String,
    ip:String,
    user_agent:String,
    descricao:String
});