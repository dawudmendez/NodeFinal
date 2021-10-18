const mysqlConnection  = require('./DB');

module.exports = {
    
    buscarPorUsuario: async function(usuario) {
        const query = `SELECT * FROM usuarios where usuario = '${usuario.trim()}'`;
    
        var usuario = await mysqlConnection.query(query); 

        return usuario[0][0];
    },

    insertar: async function (model) {
        const query = `INSERT INTO usuarios VALUES (
            null,
            '${model.usuario.trim()}',
            '${model.password.trim()}',
            '${model.nombre.trim()}',
            '${model.apellido.trim()}'
        )`;
        
        await mysqlConnection.query(query); 

        return await this.buscarPorUsuario(model.usuario);
    }
    
}