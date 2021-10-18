const mysqlConnection  = require('./DB');

module.exports = {
    
    buscarPorId: async function(id) {
        const query = `SELECT * FROM productos WHERE id = ${id}`;
    
        var producto = await mysqlConnection.query(query); 

        return producto[0][0];
    },

    buscarDetallePorId: async function(id) {
        const query = `SELECT  FROM productos WHERE id = ${id}`;
    
        var producto = await mysqlConnection.query(query); 

        return producto[0][0];
    },

    buscarPorIdCategoria: async function(idcategoria) {
        const query = `SELECT * FROM productos WHERE idcategoria = ${idcategoria}`;
    
        var producto = await mysqlConnection.query(query); 

        return producto[0][0];
    },

    buscarPorCodigo: async function(codigo) {
        const query = `SELECT * FROM productos WHERE codigo = '${codigo}'`;
    
        var producto = await mysqlConnection.query(query); 

        return producto[0][0];
    },

    traerTodos: async function() {
        const query = 'SELECT * FROM productos';

        var productos = await mysqlConnection.query(query);

        return productos[0];
    },

    traerDestacados: async function() {
        const query = 'SELECT * FROM productos WHERE destacado = 1';

        var productos = await mysqlConnection.query(query);

        return productos[0];
    },

    insertar: async function (model) {
        const query = `INSERT INTO productos VALUES (
            null,
            '${model.codigo.trim()}',
            '${model.nombre.trim()}',
            ${model.precio},            
            '${model.descripcion.trim()}',
            ${model.idcategoria},
            ${model.destacado}
        )`;

        await mysqlConnection.query(query); 

        return await this.buscarPorCodigo(model.codigo);
    },

    modificar: async function (model) {
        const query = `UPDATE productos SET
            nombre = '${model.nombre.trim()}',
            precio = ${model.precio},
            descripcion = '${model.descripcion.trim()}',
            idcategoria = ${model.idcategoria}
            WHERE id = ${model.id}
        `;
              
        await mysqlConnection.query(query); 

        return await this.buscarPorId(model.id);
    },

    eliminar: async function (id) {
        const query = `DELETE FROM productos WHERE id = ${id}`;
        await mysqlConnection.query(query); 

        return true;
    }
}