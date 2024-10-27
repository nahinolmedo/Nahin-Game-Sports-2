function manejarCompra(nombre, precio, imagen, cantidad) {
    if (!nombre || !precio || !imagen || !cantidad) {
        alert("Error al agregar el producto. Información incompleta.");
        return;
    }

    agregarAlCarrito(nombre, precio, imagen, cantidad);
}
