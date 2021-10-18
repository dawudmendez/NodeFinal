# Trabajo práctico integrador final (OBLIGATORIO)
**Alumno:** Muhammad Dawud Méndez

## Consigna

Utilizando express + MySql y/o Mongo DB Desarrollar un ecommerce (sin carrito de compra) que posea las siguiente paginas (servicios):

- **Home**
    - Json de productos destacados, mostrar al menos 4 productos
- **Pagina de detalle de producto**
    - **Deberá retornar un json con los siguientes datos:**
    - Nombre
    - Precio
    - Código
    - Descripción
    - Categoría
- **Registro **
    - Alta de usuario (Enviar un json por post y desde express darlo de alta, crearlo en la base de datos)
- **Login**
    - Validar el usuario enviando un json por POST
- **Se debe utilizar JWT para la generación del token**

# Instalación e Inicialización

## Base de datos
1. Inicializar el motor de base de datos MySQL.
2. Abrir PhpMyAdmin o algún otro gestor de base de datos MySql.
3. Abrir el archivo CreateDB.sql que se encuentra dentro de este proyecto, en la carpeta DBScripts
4. Ejecutar el script en PhpMyAdmin.

## Aplicación
1. Abrir una terminal y navegar hasta el directorio raíz de esta aplicación.
2. Ejecutar el comando
```
npm install
```
3. Ejecutar el comando
```
npm run dev
```

# Utilización
Dado que el sistema en cuestión es una Web API REST, deberán utilizarse comandos para enviar requests HTTP al servidor. En la carpeta *postman* se encuentra una colección de Postman ya armada, con todos los requests necesarios para utilizar la API. Tener en cuenta que la colección tiene algunas variables que deben ser correctamente inicializadas para que los requests funcionen.

## Creación de usuario
Crear un usuario es un requisito para poder utilizar la mayoría de los endpoints. Para crear un usuario:
1. Hacer un *POST* request a http://localhost:3000/registro
2. Incluir el siguiente payload (reemplazando los valores por los que desee):
```
{
    "usuario": "profesor",
    "password": "1234",
    "nombre": "Profesor",
    "apellido": "UTN"
}
```
3. Guardar el *Token* devuelto en la respuesta.

## Incio de sesión
Para obtener un token de acceso es necesario iniciar sesión. Los pasos son:
1. Hacer un *POST* request a http://localhost:3000/login
2. Incluir el siguiente payload (reemplazando los valores por los del usuario creado):
```
{
    "usuario": "profesor",
    "password": "1234"
}
```

## Utilización de los endpoints
Para poder utilizar los endpoints será necesario proveer el authorization token del tipo bearer conseguido en el paso anterior.

## Endpoints
### Home
- **GET Home**:
    - URL: */home*
    - Devuelve el listado de los productos destacados

### Usuario
- **POST Registro**:
    - URL: */registro*
    - Permite registrar un nuevo usuario.
    - Payload:
```
{
    "usuario": "usuario",
    "password": "password",
    "nombre": "nombre",
    "apellido": "apellido"
}
```
- **POST Login**:
    - URL: */login*
    - Permite iniciar sesión. Devuelve un token JWR.
    - Payload:
```
{
    "usuario": "usuario",
    "password": "password"
}
```

### Categoria
- **GET Categoria**:
    - URL: */categoria*
    - Trae todas las categorías disponibles.
- **GET Categoria por Id**:
    - URL: */categoria/:id*
    - Parámetros: Id
    - Trae la categoría pasada por parámetro.
- **POST Categoria**:
    - URL: */categoria*
    - Inserta una categoría.
    - Payload:
```
{
    "nombre": "nombre"
}
```
- **PUT Categoria**:
    - URL: */categoria/:id*
    - Parámetros: Id
    - Modifica la categoría pasada por parámetro.
    - Payload:
```
{
    "nombre": "nombre"
}
```
- **DELETE Categoria**:
    - URL: */categoria/:id*
    - Parámetros: Id
    - Elimina la categoría pasada por parámetro.

### Producto
- **GET Producto**:
    - URL: */producto*
    - Trae todos los productos disponibles.
- **GET Producto por Id**:
    - URL: */producto/:id*
    - Parámetros: Id
    - Trae el producto pasado por parámetro.
- **GET Producto Detalle**:
    - URL: */producto/detalle/:id*
    - Parámetros: Id
    - Trae el producto pasado por parámetro. Oculta algunos valores.
    - **Responde al punto 2 de la consigna**.
- **POST Producto**:
    - URL: */producto*
    - Inserta un producto.
    - Payload:
```
{
    "codigo": "codigo",
    "nombre": "nombre",
    "precio": 3000.50,
    "descripcion": "descripción",
    "idcategoria": 1,
    "destacado": 1
}
```
- **PUT Producto**:
    - URL: */producto/:id*
    - Parámetros: Id
    - Modifica el producto pasado por parámetro.
    - El código no puede modificarse.
    - Payload:
```
{
    "nombre": "nombre",
    "precio": 3000.50,
    "descripcion": "descripción",
    "idcategoria": 1,
    "destacado": 1
}
```
- **DELETE Producto**:
    - URL: */producto/:id*
    - Parámetros: Id
    - Elimina el producto por parámetro.

## Categorías y productos
La entidad *producto* se relacióna con la entidad *categoria*, conteniendo un producto sólo una categoría, pero pudiendo haber múltiples productos pertenecientes a la misma categoría. Por este motivo es necesario primero crear las categorías requeridas para poder crear productos relacionados a ellas.


### Endpoints disponibles sin autenticación
Los endpoints correspondientes a las siguientes entidades no necesitan autenticación:
1. Home
2. Registro
3. Login

# Implementación

## Tecnologías
- **Ruteo**: Express.js
- **Base de datos**: MySQL
- **Encripción**: Bcrypt
- **Autenticación**: JSON Web Token

## Modelo de datos
El modelo de datos está compuesto de las siguientes entidades y sus atributos.

### Productos
- **id** (PK)
- **codigo**
- **nombre**
- **precio**
- **descripcion**
- **idcategoria** (FK a Categorias)
- **destacado**

### Categorias
- **id** (PK)
- **nombre**

### Usuarios
- **id** (PK)
- **usuario**
- **password**
- **nombre**
- **apellido**

**Notas:** 
1. _Para las primary key (PK) se utilizó un campo externo autonumérico llamado Id, en vez de utilizar las claves candidatas (como codigo_producto, nombre_usuario, etc). Esto se debe a que: a - el uso del campo Id como PK se ha extendido debido a ciertos ORMs que obligaban implementarlo de esta forma y se ha vuelto la forma más común de llamar a la PK, b - en algunos casos, como en producto, usuario, y categoría, se pretende poder cambiar los campos que serían clave candidata sin tener que modificar las referencias de las FKs._
2. _La tabla Categorias podría parecer irrelevante, pero su función es evitar anomalías de actualización en las categorías de los productos. Si uno tuviera a la categoría como un campo de texto libre en la tabla productos, si se quisiera modificar el nonbre de una categoría, se deberían modificar todos los productos que tengan dicha categoría. Teniéndolas en una tabla aparte, se modificaría sólo el registro de la categoría en cuestión. También, si se incluyera la categoría como un texto libre sin FK, se podrían ingresar errores de tipeo y tener en categorías diferentes dos productos que deberían estar en la misma categoría._

## Estructura de la API
### Entry point
El punto de entrada a la API es el archivo *ecommerce.js*. Aquí se registra el middleware para autenticación y se crean las rutas básicas para cada controller.

### Controllers
Hay un controller para cada sección pedida en la consigna, y también uno para las categorías. La función principal de los controllers es exponer los endpoints de la entidad que manejan y manipular los requests y los responses. Por este motivo ningún controller arroja excepciones, por el contrario, son los únicos que hacen try catchs de las excepciones generadas por las capas de servicio.
#### Los controllers son:
- **categoriaController**: Entidad Categoría
- **loginController**: Entidad Usuario
- **registroController**: Entidad Usuario
- **productoController**: Entidad Producto
- **homeController**: Entidad Producto

### Services:
Los servicios son clases que realizan la lógica de negocio, incluyendo validaciones. Arrojan excepciones custom de acuerdo a lo que suceda en el flujo. Llama a la capa de model e interactúa con los controllers. Hay un service por entidad de datos.
#### Los services son:
- **categoriaService**
- **productoService**
- **usuarioService**

### Models:
Los models son clases que proporcionan métodos de acceso a la base de datos. Por medio de ellos se pueden realizar todas las acciones CRUD / ABM. En este caso, son los únicos encargados de comunicarse con MySQL. Reciben pedidos de la capa de servicio. Hay un model por entidad de datos.
#### Los models son:
- **categoriaModel**
- **productoModel**
- **usuarioModel**

### Middlewares:
Son clases que interceptan el flujo de datos de entrada y de salida. En este caso sólo tenemos uno para la autenticación:
- **authMiddleware**

### Helpers:
Son clases que contienen métodos que pueden ser utilizados desde cualquier capa. Proporcionan constantes o funcionalidades básicas y cotidianas que no están vinculadas a ninguna entidad en particular. En este caso sólo hay un helper para los mensajes de respuesta.
- **mensajesConstants**

### Exceptions:
Para facilitar el manejo de respuestas de los requests, creé dos clases excepciones custom que tienen un HTTP Status Code asociado. De modo que, al ocurrir algún error de valicación en la capa de servicio, se puede arrojar la excepción correspondiente con un mensaje personalizado. La capa de controller tiene los try / catchs correspondientes, así que las excepciones burbujean hasta llegar a dicha capa, donde son manejadas. El resultado es que el usuario recibe el HTTP Status Code correspondiente al error sucedido junto a un mensaje descriptivo. Las clases son:
- *notFoundException*: Status Code 404
- *validationException*: Status Code 400

## Encripción:
Las passwords de usuario son encriptadas antes de guardarse en la base de datos. Al momento de iniciar sesión, se compara el password recibido en el payload con el hash guardado en la base de datos. Esto devuelve un valor *boolean* que india si coinciden. Esto se hace con una librería llamada bcrypt. Lo ideal sería haberlo puesto en una clase aparte, pero el tiempo no alcanzó, por lo que lo dejé dentro del servicio *usuarioService*.  