const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const usuarioModel = require('../model/usuarioModel');
const ValidacionException = require('../exceptions/validacionException');
const NotFoundException = require('../exceptions/notFoundException');
const mensajesConstants = require('../helpers/mensajesConstants');


module.exports = {

    insertarUsuario: async function (model) {

        await this.validarParametros(model);

        await this.validarDuplicado(model);

        let password = this.cryptEncriptar(model.password);
        model.password = password;

        await usuarioModel.insertar(model);
        
        return mensajesConstants.usuarioCreado();

    },

    loginUsuario: async function (model) {

        this.validarParametrosLogin(model);
    
        var usuario = await usuarioModel.buscarPorUsuario(model.usuario);
        
        if (usuario === undefined) {
            throw new NotFoundException(mensajesConstants.loginErroneo());
        }

        let comparacion = await this.cryptCompararValores(model.password, usuario.password);

        if(!comparacion) {
            throw new NotFoundException(mensajesConstants.loginErroneo());
        }

        const tokenData = {
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            usuario: usuario.usuario
        }

        const token = jwt.sign(tokenData, 'Secret', {
            expiresIn: 60 * 60 * 24
        })

        return token;
        
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

    }, 

    validarParametrosLogin: function(model) {  

        let errores = '';

        if(!model.usuario || model.usuario.trim() == '') {
            errores += mensajesConstants.objetoValorNuloOVacio('Usuario') + ' ';
        }

        if(!model.password || model.password.trim() == '') {
            errores += mensajesConstants.objetoValorNuloOVacio('Password') + ' ';
        }

        if (errores.trim() != '') {
            throw new ValidacionException(errores.trim());
        }

    }, 

    validarDuplicado: async function(model) {     

        let usuario = await usuarioModel.buscarPorUsuario(model.usuario);

        if (usuario != undefined) {
            throw new ValidacionException(mensajesConstants.objetoDuplicadoCampo('Usuario', 'Usuario'));
        }

    },

    validarParametrosNull: function(model) {     

        let errores = '';

        if(!model.usuario || model.usuario.trim() == '') {
            errores += mensajesConstants.objetoValorNuloOVacio('Usuario') + ' ';
        }

        if(!model.password || model.password.trim() == '') {
            errores += mensajesConstants.objetoValorNuloOVacio('Password') + ' ';
        }

        if(!model.nombre || model.nombre.trim() == '') {
            errores += mensajesConstants.objetoValorNuloOVacio('Nombre') + ' ';
        }

        if(!model.apellido || model.apellido.trim() == '') {
            errores += mensajesConstants.objetoValorNuloOVacio('Apellido') + ' ';
        }

        return errores.trim();

    },

    validarLongitud: function(model) {

        let errores = '';

        if(model.usuario.length > 50) {
            errores += mensajesConstants.objetoValorMuyLargo('Usuario', '50') + ' ';
        }
        
        if(model.password.length > 50) {
            errores += mensajesConstants.objetoValorMuyLargo('Password', '50') + ' ';
        }
        
        if(model.nombre.length > 50) {
            errores += mensajesConstants.objetoValorMuyLargo('Nombre', '50') + ' ';
        }
        
        if(model.apellido.length > 50) {
            errores += mensajesConstants.objetoValorMuyLargo('Descripcion', '50') + ' ';
        }

        return errores;

    },

    // Encripción
    cryptEncriptar: function(valor) {

        let salt = bcrypt.genSaltSync(10);
        var valorEncriptado = bcrypt.hashSync(valor, salt);

        return valorEncriptado;
    },

    cryptCompararValores: async function(valorOriginal, valorEncriptado) {
        let comparacion = await bcrypt.compareSync(valorOriginal, valorEncriptado);

        return comparacion;
    }
}