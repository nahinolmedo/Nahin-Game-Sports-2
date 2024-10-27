function agregarAlCarrito(id, nombre, precio, imagen, cantidad) {
    const producto = { id, nombre, precio, imagen, cantidad };
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert(`${nombre} añadido al carrito.`);
}
