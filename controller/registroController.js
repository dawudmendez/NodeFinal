const express = require('express');
const routerRegistro = express.Router();

const usuarioService = require('../service/usuarioService');
const ValidacionException = require('../exceptions/validacionException');

// Inserta
routerRegistro.post('/', async (req, res) => {

    try {
    
        var usuario = {
            usuario: req.body.usuario,
            password: req.body.password,
            nombre: req.body.nombre,
            apellido: req.body.apellido
        };

        var insercion = await usuarioService.insertarUsuario(usuario);

        res.status(200).send(insercion);

    } catch (error) {
        if (error instanceof ValidacionException) {
            res.status(400).send(error.message)
        } else {
            res.status(500).send(error.message)
        }
    };
});

module.exports = routerRegistro;