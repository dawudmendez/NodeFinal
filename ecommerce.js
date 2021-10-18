const express = require('express');
const unless = require('express-unless');
const app = express();
const auth = require('./middlewares/authMiddleware');

app.use(express.json());

const port = process.env.PORT ? process.env.PORT : 3000;

auth.unless = unless;
app.use(auth.unless({
    path:[
        { url: '/home', methods: ['GET'] },
        { url: '/registro', methods: ['POST'] },
        { url: '/login', methods: ['POST'] }
    ]
}));

app.use('/home', require('./controller/homeController'));
app.use('/producto', require('./controller/productoController'));
app.use('/categoria', require('./controller/categoriaController'));
app.use('/registro', require('./controller/registroController'));
app.use('/login', require('./controller/loginController'));

app.listen(port, ()=> {
    console.log('Servidor escuchado en el puerto 3000');
});