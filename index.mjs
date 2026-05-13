//Importamos express y las funciones que vamos a usar en las rutas.
import express from 'express'
import {obtenerLibros, obtenerLibroPorID, obtenerValorTotalInventario} from "./funcionesApi.mjs"
import {verificarEstadoInventario, verificarDisponibilidadLibro, avisoLibrosSinStock} from "./middlewares.mjs"

const puerto = 3000 //=> puerto en el que se va a ejecutar el servidor.

const app = express() //=> para crear una instancia de express, que es el servidor que vamos a usar para manejar las peticiones y respuestas (req, y res).

app.use(express.json()) //=> para que el servidor pueda entender los datos en formato JSON (en el body)

//GET 1 => Consulta de todos los libros. 
// Al ser un método GET no modifica la información, solo la consulta. 
// Por lo tanto, no se necesita un body para esta ruta. 
// La respuesta a esta consulta será un array con todos los libros disponibles en la base de datos (o en este caso, en una variable que simule la base de datos).

app.get('/api/v1/libros', verificarEstadoInventario,obtenerLibros)

//GET 2 => Consulta de un libro por su id. 
// Al igual que el anterior GET, no modifica la información, solo la consulta. 
// Sin embargo en este caso se necesita un parámetro en la ruta (el id del libro) para poder identificar qué libro se quiere consultar. 
// La respuesta a esta consulta será un objeto con la información del libro solicitado, o un mensaje de error si el libro no existe.

app.get('/api/v1/libros/:id', verificarDisponibilidadLibro, obtenerLibroPorID)

//POST => Calcular el valor total del inventario (todos los libros en stock, o sea, (stock * precio))

// No es parte del API RESTFUL, ya qué no respeta el principios de las rutas.
app.post('/api/v1/libros/valor-total-inventario', avisoLibrosSinStock, obtenerValorTotalInventario)

//Para que el servidor pueda escuchar las peticiones, se necesita el método listen, con el puerto en el que se va a ejecutar el servidor, 
// y una función de callback que se ejecutará cuando el servidor esté corriendo.
app.listen(puerto, ()=>{
    console.log(`Servidor corriendo en: http://localhost:${puerto}`)
})