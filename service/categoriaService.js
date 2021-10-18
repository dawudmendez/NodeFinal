const categoriaModel = require('../model/categoriaModel');
const productoModel = require('../model/productoModel');
const ValidacionException = require('../exceptions/validacionException');
const NotFoundException = require('../exceptions/notFoundException');
const mensajesConstants = require('../helpers/mensajesConstants');


module.exports = {

    insertarCategoria: async function (model) {

        try {
            await this.validarParametros(model);  

            return await categoriaModel.insertar(model.nombre.trim());
        } catch (error) {
            throw error;
        }        

    },

    modificarCategoria: async function (model) {

        try {
            var categoria = await this.traerCategoria(model.id);
            await this.validarParametros(model);  

            return await categoriaModel.modificar(model);
        } catch (error) {
            throw error;
        }        

    },

    eliminarCategoria: async function (id) {

        await this.traerCategoria(id);
        let enUso = await this.comprobarUso(id);   

        if(enUso) {
            throw new ValidacionException(mensajesConstants.objetoUtilizado('Categoría'));
        }

        var output = await categoriaModel.eliminar(id);

        if (output) {
            return mensajesConstants.objetoEliminadoCorrectamente('Categoría');
        } else {
            throw mensajesConstants.errorGenerico();
        }
    },

    //Devuelven una categoría o un array
    traerCategorias: async function () {
        
        var categorias = await categoriaModel.traerTodos();
        return categorias;
    },

    traerCategoria: async function (id) {
        
        var categoria = await categoriaModel.buscarPorId(id);
        
        if (categoria === undefined) {
            throw new NotFoundException(mensajesConstants.objetoNoEncontrado('Categoría'));
        }        

        return categoria;
    },

    traerCategoriaPorNombre: async function (nombre) {
        
        var categoria = await categoriaModel.buscarPorNombre(nombre);
        
        return categoria;
    },
    
    //Validaciones
    validarParametros: async function(model) {  

        let validParams = this.validarParametrosNull(model);

        if (validParams.trim() != '') {
            throw new ValidacionException(validParams);
        }        

        let validParamsLongitud = this.validarLongitud(model);

        if (validParamsLongitud.trim() != '') {
            throw new ValidacionException(validParamsLongitud);
        }

        let validCategoria = await this.validarCategoria(model);

        if (validCategoria.trim() != '') {
            throw new ValidacionException(validCategoria);
        }

    }, 

    validarParametrosNull: function(model) {     

        if(!model.nombre || model.nombre.trim() == '') {
            return mensajesConstants.objetoValorNuloOVacio('Nombre');
        }

        return '';

    },
    
    validarCategoria: async function(model) {

        let categ = await this.traerCategoriaPorNombre(model.nombre)

        if (categ != undefined) {
            return mensajesConstants.objetoDuplicado('Categoría');        
        }

        return '';

    },

    validarLongitud: function(model) {

        let errores = '';
        
        if(model.nombre.length > 50) {
            errores += mensajesConstants.objetoValorMuyLargo('Nombre', '50') + ' ';
        }

        return errores;

    },

    comprobarUso: async function(id) {
        var output = await productoModel.buscarPorIdCategoria(id);

        if (output != undefined) {
            return true;
        }

        return false;
    }
}