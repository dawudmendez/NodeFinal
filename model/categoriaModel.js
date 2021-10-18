const mysqlConnection  = require('./DB');

module.exports = {
    
    buscarPorId: async function(id) {
        const query = `SELECT * FROM categorias where id = ${id}`;
    
        var categoria = await mysqlConnection.query(query); 

        return categoria[0][0];
    },

    buscarPorNombre: async function(nombre) {
        const query = `SELECT * FROM categorias where nombre = '${nombre.trim()}'`;
    
        var categoria = await mysqlConnection.query(query); 

        return categoria[0][0];
    },

    traerTodos: async function() {
        const query = 'SELECT * FROM categorias';

        var categorias = await mysqlConnection.query(query);

        return categorias[0];
    },

    insertar: async function (nombre) {
        const query = `INSERT INTO categorias VALUES (null, '${nombre.trim()}')`;        
        await mysqlConnection.query(query); 

        return await this.buscarPorNombre(nombre);
    },

    modificar: async function (model) {
        const query = `UPDATE categorias SET nombre = '${model.nombre.trim()}' WHERE id = ${model.id}`;        
        await mysqlConnection.query(query); 

        return await this.buscarPorId(model.id);
    },

    eliminar: async function (id) {
        const query = `DELETE FROM categorias WHERE id = ${id}`;
        await mysqlConnection.query(query); 

        return true;
    }
}