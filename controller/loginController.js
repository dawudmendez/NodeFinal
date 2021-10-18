const express = require('express');
const routerLogin = express.Router();

const usuarioService = require('../service/usuarioService');
const ValidacionException = require('../exceptions/validacionException');
const NotFoundException = require('../exceptions/notFoundException');

// Trae todo
routerLogin.post('/', async (req, res) => {
    try {

        var login = {
            usuario: req.body.usuario,
            password: req.body.password
        };

        var login = await usuarioService.loginUsuario(login);

        res.send(login);
        
    } catch (error) {
        if (error instanceof ValidacionException) {
            res.status(400).send(error.message)
        } else if (error instanceof NotFoundException) {
            res.status(404).send(error.message)
        } else {
            res.status(500).send(error.message)
        }
    };
});

module.exports = routerLogin;