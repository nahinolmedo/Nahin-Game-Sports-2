async function cargarProductos() {
    try {
        const querySnapshot = await getDocs(collection(db, 'productos'));
        const productosContainer = document.getElementById('productos-container');
        productosContainer.innerHTML = ''; // Limpiar el contenedor

        querySnapshot.forEach((doc) => {
            const producto = doc.data();
            const id = doc.id;
            const nombre = producto.Nombre || 'Producto sin nombre';
            const precio = producto.Precio || 0;
            const imagen = producto.Imagen || 'https://via.placeholder.com/150';
            const existencias = producto.Existencias || 0;

            const div = document.createElement('div');
            div.className = 'bg-gray-800 text-white rounded-lg shadow-md overflow-hidden';

            // Generar HTML dinámicamente para cada producto
            div.innerHTML = `
                <img src="${imagen}" alt="${nombre}" class="w-full h-64 object-cover">
                <div class="p-4">
                    <h3 class="text-2xl font-bold mb-2">${nombre}</h3>
                    <p class="text-gray-400 mb-2">Precio: $${precio.toFixed(2)}</p>
                    <p class="text-gray-400 mb-4">Existencias: ${existencias}</p>

                    <label for="cantidad-${id}" class="block text-sm mb-2">Cantidad:</label>
                    <select id="cantidad-${id}" class="w-full px-2 py-1 mb-4 border rounded bg-white text-black">
                        ${crearOpcionesCantidad(existencias)}
                    </select>

                    <button class="bg-yellow-500 text-black px-4 py-2 rounded-full hover:bg-yellow-600 comprar-btn"
                            data-id="${id}" data-nombre="${nombre}" data-precio="${precio}" 
                            data-imagen="${imagen}" data-existencias="${existencias}"
                            ${existencias === 0 ? 'disabled' : ''}>
                        ${existencias === 0 ? 'Sin Existencias' : 'Comprar Ahora'}
                    </button>
                </div>
            `;

            productosContainer.appendChild(div);
        });

        agregarEventosCompra(); // Asignar eventos de compra
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

// Función para generar las opciones de cantidad
function crearOpcionesCantidad(existencias) {
    let opciones = '';
    for (let i = 1; i <= existencias; i++) {
        opciones += `<option value="${i}">${i}</option>`;
    }
    return opciones;
}

// Función para asignar los eventos de compra a los botones
function agregarEventosCompra() {
    const botones = document.querySelectorAll('.comprar-btn');
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            const nombre = e.target.getAttribute('data-nombre');
            const precio = parseFloat(e.target.getAttribute('data-precio'));
            const imagen = e.target.getAttribute('data-imagen');
            const existencias = parseInt(e.target.getAttribute('data-existencias'));
            const cantidadSeleccionada = parseInt(document.getElementById(`cantidad-${id}`).value);

            // Verificar si la cantidad seleccionada es mayor a las existencias
            if (cantidadSeleccionada > existencias) {
                alert(`Solo hay ${existencias} unidades disponibles.`);
                return;
            }

            // Verificar si las existencias son 0
            if (existencias <= 0) {
                alert(`El producto "${nombre}" no tiene existencias disponibles.`);
                return;
            }

            agregarAlCarrito(id, nombre, precio, imagen, cantidadSeleccionada);
        });
    });
}

// Función para agregar productos al carrito
function agregarAlCarrito(id, nombre, precio, imagen, cantidad) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const productoExistente = carrito.find(item => item.id === id);
    if (productoExistente) {
        productoExistente.cantidad += cantidad; // Aumentar cantidad si ya existe en el carrito
    } else {
        carrito.push({ id, nombre, precio, imagen, cantidad });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert(`${nombre} añadido al carrito.`);
}

// Asegúrate de llamar a esta función al cargar la página de productos
cargarProductos();
