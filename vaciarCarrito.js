// Función para vaciar el carrito
function vaciarCarrito() {
    carrito = []; // Vacía el array del carrito
    localStorage.removeItem('carrito'); // Limpia el carrito en localStorage
    actualizarCarrito(); // Actualiza la interfaz del carrito
    alert('Carrito vaciado con éxito.');
}

// Vincula la función al botón "Vaciar Carrito"
document.getElementById('vaciar-carrito').addEventListener('click', vaciarCarrito);

// Función para actualizar la interfaz del carrito
function actualizarCarrito() {
    const carritoList = document.getElementById('carrito-list');
    const totalPrecios = document.getElementById('total-precios');
    carritoList.innerHTML = ''; // Limpia la lista del carrito

    let total = 0;

    carrito.forEach((item, index) => {
        total += item.precio * item.cantidad;

        const li = document.createElement('li');
        li.className = 'flex items-center space-x-4 border-b pb-4';

        li.innerHTML = `
            <img src="${item.imagen}" alt="${item.nombre}" class="w-16 h-16 object-cover rounded">
            <div class="flex-1">
                <h3 class="text-lg font-bold">${item.nombre}</h3>
                <p class="text-gray-500">Cantidad: ${item.cantidad}</p>
                <p class="text-gray-500">Precio: $${(item.precio * item.cantidad).toFixed(2)}</p>
            </div>
            <button class="text-red-500 hover:underline eliminar-btn" data-index="${index}">
                Eliminar
            </button>
        `;
        carritoList.appendChild(li);
    });

    totalPrecios.textContent = `Total: $${total.toFixed(2)}`;
    localStorage.setItem('carrito', JSON.stringify(carrito)); // Guarda el carrito actualizado
    agregarEventosEliminar(); // Asegura que los botones de eliminar sigan funcionando
}

// Asegura que los botones "Eliminar" funcionen
function agregarEventosEliminar() {
    const botonesEliminar = document.querySelectorAll('.eliminar-btn');
    botonesEliminar.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            eliminarDelCarrito(index);
        });
    });
}

// Función para eliminar un producto específico del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1); // Elimina el producto del carrito
    actualizarCarrito(); // Actualiza la interfaz
}
