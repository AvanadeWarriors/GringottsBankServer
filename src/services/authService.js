'user strict'
/* Estes metodos ficarão disponiveis para todas as requisições,
podemos chamalos de middlewares. Eu consigo realizar a identificação do token por exemplo em cada requisição feita*/
const jwt = require('jsonwebtoken');

exports.generateToken = async (data) => {
    return jwt.sign(data, global.SALT, {expiresIn: '5m'});
}

exports.decodeToken = async (token) => {
    let data = await jwt.verify(token, global.SALT);
    return data;
}

exports.authorize = (req, res, next) => {
    let token =  req.headers['x-access-token'];

    if (!token){
        res.status(401).json({
            sucess: false,
            message: 'unauthorized access'
        });
    }else{
        jwt.verify(token, global.SALT, function(error, decoded){
            if (error){
                res.status(401).json({
                    sucess: false,
                    message: 'unauthorized access, invalid token'
                });
            }else{
                next();
            }
        })
    }
}