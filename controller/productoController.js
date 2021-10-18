const express = require('express');
const routerProducto = express.Router();

const productoService = require('../service/productoService');
const ValidacionException = require('../exceptions/validacionException');
const NotFoundException = require('../exceptions/notFoundException');

// Trae todo
routerProducto.get('/', async (req, res) => {
    try {
        var productos = await productoService.traerProductos();

        res.send(productos);

    } catch (error) {
        res.status(500).send(error.message)
    };
});

// Trae por id
routerProducto.get('/:id', async (req, res) => {
    const id  = req.params.id;

    try {
        var producto = await productoService.traerProducto(id);

        res.send(producto);
      
    } catch (error) {
        if (error instanceof NotFoundException) {
            res.status(404).send(error.message)
        } else {
            res.status(500).send(error.message)
        }
    };
});

// Trae por id
routerProducto.get('/detalle/:id', async (req, res) => {
    const id  = req.params.id;

    try {
        var producto = await productoService.traerProductoDetalle(id);

        res.send(producto);
      
    } catch (error) {
        if (error instanceof NotFoundException) {
            res.status(404).send(error.message)
        } else {
            res.status(500).send(error.message)
        }
    };
});

// Inserta
routerProducto.post('/', async (req, res) => {

    try {
    
        var producto = {
            codigo: req.body.codigo,
            nombre: req.body.nombre,
            precio: req.body.precio,
            descripcion: req.body.descripcion,
            idcategoria: req.body.idcategoria,
            destacado: req.body.destacado
        };

        var insercion = await productoService.insertarProducto(producto);

        res.send(insercion);

    } catch (error) {
        if (error instanceof ValidacionException) {
            res.status(400).send(error.message)
        } else {
            res.status(500).send(error.message)
        }
    };
});

// Trae por Id y modifica
routerProducto.put('/:id', async (req, res) => {
    
    const id  = req.params.id;

    var producto = {
        id: id,
        nombre: req.body.nombre,
        precio: req.body.precio,
        descripcion: req.body.descripcion,
        idcategoria: req.body.idcategoria,
        destacado: req.body.destacado
    };

    try {
        var modificacion = await productoService.modificarProducto(producto);
        
        res.send(modificacion);
      
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

// Elimina por Id
routerProducto.delete('/:id', async (req, res) => {

    let id = req.params.id;

    try {
        var eliminacion = await productoService.eliminarProducto(id);
        
        res.send(eliminacion);
      
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

module.exports = routerProducto;