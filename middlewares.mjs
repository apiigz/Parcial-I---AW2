//Importamos libros para hacer uso de ella en los middlewares.

import libros from "./libros.mjs";

//En el contexto de nuestra aplicación, buscamos un middleware que nos permita verificar que tantos libros en stock tenemos, y, si llegase
//el caso de que no hay libros, se mostraría un mensaje de error, y no se mostraría la información de los libros (en el caso del GET de todos los libros) o del libro solicitado (en el caso del GET de un libro por su id).
export function verificarEstadoInventario(req, res, next) {
    let contadorStock = 0
    libros.forEach((libro)=>{
        contadorStock += libro.stock
    })

    if (contadorStock <= 0){
        return res.status(404).json({ Mensaje: "No hay libros en stock" });
    }

    console.log(`Hay ${contadorStock} libros en stock.`)
    next(); //=> next() sirve para que el servidor sepa que el middleware terminó su función, y que puede continuar con la siguiente función (en este caso, la función que muestra la información de los libros, en funcionesApi.mjs).
}

//En el contexto de nuestra aplicación, realizamos un middleware que nos permita verificar si el libro solicitado, con un id, realmente
//está disponible, y si no lo está, mostramos un mensaje de error. Cabe recalcar que también nos aseguramos de que esté existe, y si no, mostramos otro mensaje de error.
export function verificarDisponibilidadLibro(req, res, next) {
    const idLibro = Number(req.params.id);
    const libro = libros.find((libro) => libro.id === idLibro);

    console.log(libro)

    if (!libro) {
        return res.status(404).json({ Mensaje: "Libro no encontrado, pruebe con otro ID" });
    }

    if (libro.stock <= 0){
        return res.status(404).json({ Mensaje: "Libro sin stock" });
    }

    next();
}


//En el contexto de nuestra aplicación, hacemos otro middleware, en este caso en un POST. Donde mostraremos, en la consola, todos los libros
//individualmente, qué no están en stock (después de que se haya calculado el valor total del inventario, en funcionesApi.mjs).
export function avisoLibrosSinStock(req, res, next){
    const librosSinStock = libros.filter((libro) => libro.stock <= 0);

    librosSinStock.forEach((libro) => {
        console.log(`El libro "${libro.titulo}" no tiene stock disponible.`);
    });

    next();
}