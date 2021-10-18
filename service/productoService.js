// Models
const categoriaModel = require('../model/categoriaModel');
const productoModel = require('../model/productoModel');

// Exceptions
const ValidacionException = require('../exceptions/validacionException');
const NotFoundException = require('../exceptions/notFoundException');

// Constantes globales
const mensajesConstants = require('../helpers/mensajesConstants');

// Constantes locales
const ACCION_INSERCION = 'insercion';
const ACCION_MODIFICACION = 'modificacion';


module.exports = {

    insertarProducto: async function (model) {

        await this.validarParametros(model, ACCION_INSERCION);

        await this.validarDuplicado(model);

        return await productoModel.insertar(model);      

    },

    modificarProducto: async function (model) {

        //lo traigo para corroborar que exista, si no existe, devuelve exception
        await this.traerProducto(model.id);

        await this.validarParametros(model, ACCION_MODIFICACION);

        return await productoModel.modificar(model);     

    },

    eliminarProducto: async function (id) {

        await this.traerProducto(id);

        var output = await productoModel.eliminar(id);

        if (output) {
            return mensajesConstants.objetoEliminadoCorrectamente('Producto');
        } else {
            throw mensajesConstants.errorGenerico();
        }
    },

    traerProductos: async function () {
        
        var productos = await productoModel.traerTodos();
        return productos;

    },

    traerProductosDestacados: async function () {
        
        var productos = await productoModel.traerDestacados();
        return productos;

    },

    traerProducto: async function (id) {
        
        var producto = await productoModel.buscarPorId(id);
        
        if (producto === undefined) {
            throw new NotFoundException(mensajesConstants.objetoNoEncontrado('Producto'));
        }        

        return producto;
    },

    traerProductoDetalle: async function (id) {
        
        var producto = await productoModel.buscarPorId(id);

        if (producto === undefined) {
            throw new NotFoundException(mensajesConstants.objetoNoEncontrado('Producto'));
        }

        var categoria = await categoriaModel.buscarPorId(producto.idcategoria);

        var productoDetalle = {
            codigo: producto.codigo,
            nombre: producto.nombre,
            precio: producto.precio,
            descripcion: producto.descripcion,
            categoria: {
                id: categoria.id,
                nombre: categoria.nombre
            }
        };      

        return productoDetalle;
    },
    
    //Validaciones
    validarParametros: async function(model, accion) {  

        let validParams = this.validarParametrosNull(model, accion);

        if (validParams.trim() != '') {
            throw new ValidacionException(validParams);
        }

        let validParamsTipo = this.validarParametrosTipo(model);

        if (validParamsTipo.trim() != '') {
            throw new ValidacionException(validParamsTipo);
        }

        let validParamsLongitud = this.validarLongitud(model, accion);

        if (validParamsLongitud.trim() != '') {
            throw new ValidacionException(validParamsLongitud);
        }

        let validCategoria = await this.validarCategoria(model);

        if (validCategoria.trim() != '') {
            throw new ValidacionException(validCategoria);
        }

    }, 

    validarDuplicado: async function(model) {     

        let prod = await productoModel.buscarPorCodigo(model.codigo);

        if (prod != undefined) {
            throw new ValidacionException(mensajesConstants.objetoDuplicado('Producto'));        
        }

    },

    validarParametrosNull: function(model, accion) {     

        let errores = '';

        if(accion == ACCION_INSERCION) {
            if(!model.codigo || model.codigo.trim() == '') {
                errores += mensajesConstants.objetoValorNuloOVacio('Codigo') + ' ';
            }
        }

        if(!model.nombre || model.nombre.trim() == '') {
            errores += mensajesConstants.objetoValorNuloOVacio('Nombre') + ' ';
        }

        if(!model.precio) {
            errores += mensajesConstants.objetoValorNuloOVacio('Precio') + ' ';
        }

        if(!model.idcategoria) {
            errores += mensajesConstants.objetoValorNuloOVacio('idcategoria') + ' ';
        }
        
        if(model.destacado == undefined || model.destacado == null) {
            errores += mensajesConstants.objetoValorNuloOVacio('destacado') + ' ';
        }

        return errores.trim();

    },

    validarParametrosTipo: function(model) {
        
        let errores = '';

        if(isNaN(model.precio)) {
            errores += mensajesConstants.objetoTipoInvalido('Precio', 'numérico') + ' ';
        }

        if(!Number.isInteger(model.idcategoria)) {
            errores += mensajesConstants.objetoTipoInvalido('idcategoria', 'entero') + ' ';
        }
        
        if(model.destacado !== 1 && model.destacado !== 0) {
            errores += mensajesConstants.objetoTipoInvalido('destacado', 'boolean (0 o 1)') + ' ';
        }

        return errores.trim();

    },
    
    validarCategoria: async function(model) {

        let categ = await categoriaModel.buscarPorId(model.idcategoria)

        if (categ == undefined) {
            return mensajesConstants.objetoNoEncontrado('Categoría');        
        }

        return '';

    },

    validarLongitud: function(model, accion) {

        let errores = '';

        if(accion == ACCION_INSERCION) {
            if(model.codigo.length > 50) {
                errores += mensajesConstants.objetoValorMuyLargo('Codigo', '50') + ' ';
            }
        }        
        
        if(model.nombre.length > 50) {
            errores += mensajesConstants.objetoValorMuyLargo('Nombre', '50') + ' ';
        }
        
        if(model.descripcion.length > 200) {
            errores += mensajesConstants.objetoValorMuyLargo('Descripcion', '200') + ' ';
        }

        return errores;

    }
}