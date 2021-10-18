const mensajesConstants = require('../helpers/mensajesConstants');

const jwt = require('jsonwebtoken');


auth = async function (req, res, next) {

    let token = req.headers['authorization'];

    if(!token) {
        res.status(401).send(mensajesConstants.authSinSesion());
    }

    token = token.replace('Bearer ', '')

    await jwt.verify(token, 'Secret', (err,user) => {
        if(err) {
            res.status(400).send(mensajesConstants.authTokenInvalido());
        }
    });

    next();

}

module.exports = auth;