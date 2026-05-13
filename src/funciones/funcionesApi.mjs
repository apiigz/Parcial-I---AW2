//Importamos libros para trabajar con ella en las funciones de la API.
import libros from "../datos/libros.mjs"

//Siguiendo con el contexto de la aplicación, nuestro primer GET nos permitirá obtener la información de todos los libros.
export function obtenerLibros(req, res){
    res.json(libros) //=> a la respuesta la devolvemos siempre en formato .JSON
}

//En nuestra aplicación, el segundo GET nos permitirá obtener la información de un libro específico, a través de su id. 
// Para esto, se necesita un parámetro en la ruta (el id del libro), y se mostrará la información del libro solicitado, 
// o un mensaje de error si el libro no existe.
export function obtenerLibroPorID(req, res){
    const idLibro = Number(req.params.id) //=> para convertir el id que viene como string a un número.

    const librosFiltrados = libros.find((libro)=>{
        return libro.id === Number(idLibro)
    })

    res.json(librosFiltrados)
}

//Siguiendo con el contexto de nuestra aplicación, el POST nos permitirá calcular el valor total del inventario, o sea, la suma 
// de (stock * precio) de todos los libros en stock.
export function obtenerValorTotalInventario(req, res){
    let valorTotal = 0
    libros.forEach((libro)=>{
        valorTotal += libro.stock * libro.precio
    })
    res.json({ valorTotalInventario: valorTotal })
}

