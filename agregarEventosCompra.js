function agregarEventosCompra() {
    const botones = document.querySelectorAll('.comprar-btn');

    botones.forEach((boton) => {
        boton.addEventListener('click', async (e) => {
            const id = e.target.getAttribute('data-id');
            const nombre = e.target.getAttribute('data-nombre');
            const precio = parseFloat(e.target.getAttribute('data-precio'));
            const imagen = e.target.getAttribute('data-imagen');
            const existencias = parseInt(e.target.getAttribute('data-existencias'));

            const cantidadInput = document.getElementById(`cantidad-${id}`);
            const cantidad = parseInt(cantidadInput.value);

            // Validaciones de cantidad
            if (isNaN(cantidad) || cantidad <= 0) {
                alert('Por favor, selecciona una cantidad válida.');
                return;
            }

            if (cantidad > existencias) {
                alert(`Solo hay ${existencias} unidades disponibles.`);
                return;
            }

            try {
                // Agregar producto al carrito
                agregarAlCarrito(id, nombre, precio, imagen, cantidad);

                // Actualizar existencias en Firestore
                await actualizarExistencias(id, existencias - cantidad);

                alert(`${nombre} añadido al carrito.`);
                cantidadInput.value = 1; // Restablecer la selección de cantidad a 1
            } catch (error) {
                console.error('Error al agregar al carrito:', error);
                alert('Hubo un problema al agregar el producto al carrito.');
            }
        });
    });
}

// Función para actualizar las existencias en Firestore
async function actualizarExistencias(id, nuevasExistencias) {
    try {
        const productoRef = doc(db, 'productos', id);
        await updateDoc(productoRef, { Existencias: nuevasExistencias });
        console.log(`Existencias actualizadas a ${nuevasExistencias}.`);
    } catch (error) {
        console.error('Error al actualizar las existencias:', error);
        alert('Hubo un problema al actualizar las existencias.');
    }
}

// Función para agregar productos al carrito en localStorage
function agregarAlCarrito(id, nombre, precio, imagen, cantidad) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const productoExistente = carrito.find((item) => item.id === id);
    if (productoExistente) {
        productoExistente.cantidad += cantidad; // Aumentar cantidad si ya existe
    } else {
        carrito.push({ id, nombre, precio, imagen, cantidad });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
}
