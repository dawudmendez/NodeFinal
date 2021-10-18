const express = require('express');
const routerHome = express.Router();

const productoService = require('../service/productoService');

// Trae todo
routerHome.get('/', async (req, res) => {
    try {
        var productos = await productoService.traerProductosDestacados();

        res.send(productos);

    } catch (error) {
       res.status(500).send(error.message)
    };
});

module.exports = routerHome;