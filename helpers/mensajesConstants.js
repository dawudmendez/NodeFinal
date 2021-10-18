module.exports = {
    objetoNoEncontrado: function(objeto) { return `No se ha econtrado el registro de ${objeto} solicitado.`; },
    objetoUtilizado: function(objeto) { return `El registro de ${objeto} solicitado está siendo utilizado.`; },
    objetoEliminadoCorrectamente: function (objeto) { return `El registro de ${objeto} solicitado ha sido eliminado correctamente.`; },
    objetoValorNuloOVacio: function (campo) { return `El valor de ${campo} no puede ser nulo o vacío.`; },
    objetoValorMuyLargo: function (campo, longitud) { return `El valor de ${campo} no puede superar los ${longitud} caracteres.`; },
    objetoTipoInvalido: function (campo, tipo) { return `El valor de ${campo} debe ser ${tipo}.`; },
    objetoDuplicado: function (objeto) { return `Ya existe un registro de ${objeto} con esos valores.`; },
    objetoDuplicadoCampo: function (objeto, campo) { return `Ya existe un registro de ${objeto} con esos valores. El campo ${campo} debe ser único.`; },
    loginErroneo: function () { return `Login erróneo, revise su usuario y contraseña.`; },
    usuarioCreado: function () { return `Usuario creado correctamente`; },
    authSinSesion: function () { return `Debe iniciar sesión.`},
    authTokenInvalido: function () { return `El token proporcionado es inválido.`},
    errorGenerico: function () { return `Ha ocurrido un error.`; }
}