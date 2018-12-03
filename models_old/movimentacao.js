const mongoose = require('mongoose');

const Movimentacao = new mongoose.Schema({
    usuario_id:Schema.Types.ObjectId,
    dataHora:Date,
    diferencaMovimentada: Number,
    usuarioAlvo_id:Schema.Types.ObjectId,
    ip:String,
    user_agent:String,
    descricao:String
});