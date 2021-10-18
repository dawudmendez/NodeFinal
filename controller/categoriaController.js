const express = require('express');
const routerCategoria = express.Router();

const categoriaService = require('../service/categoriaService');
const ValidacionException = require('../exceptions/validacionException');
const NotFoundException = require('../exceptions/notFoundException');

// Trae todo
routerCategoria.get('/', async (req, res) => {
    try {
        var categorias = await categoriaService.traerCategorias();

        res.send(categorias);

    } catch (error) {        
        res.status(500).send(error.message)
    };
});

// Trae por id
routerCategoria.get('/:id', async (req, res) => {
    const id  = req.params.id;

    try {
        var categoria = await categoriaService.traerCategoria(id);
        
        res.send(categoria);
      
    } catch (error) {
        if (error instanceof NotFoundException) {
            res.status(404).send(error.message)
        } else {
            res.status(500).send(error.message)
        }
    };
});

// Inserta
routerCategoria.post('/', async (req, res) => {

    try {
    
        var categoria = {
            nombre: req.body.nombre
        };

        var insercion = await categoriaService.insertarCategoria(categoria);

        res.status(200).send(insercion);

    } catch (error) {
        if (error instanceof ValidacionException) {
            res.status(400).send(error.message)
        } else {
            res.status(500).send(error.message)
        }
    };
});

// Trae por Id y modifica
routerCategoria.put('/:id', async (req, res) => {
    
    const id  = req.params.id;

    var categoria = {
        id: id,
        nombre: req.body.nombre
    };

    try {
        var modificacion = await categoriaService.modificarCategoria(categoria);
        
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
routerCategoria.delete('/:id', async (req, res) => {

    let id = req.params.id;

    try {
        var eliminacion = await categoriaService.eliminarCategoria(id);
        
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

module.exports = routerCategoria;