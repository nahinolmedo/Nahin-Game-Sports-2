function actualizarCarrito() {
    const carritoList = document.getElementById('carrito-list');
    const totalPrecios = document.getElementById('total-precios');
    carritoList.innerHTML = '';

    let total = 0;
    carrito.forEach((item, index) => {
        if (!item.nombre || !item.precio || !item.cantidad) return;

        total += item.precio * item.cantidad;

        const li = document.createElement('li');
        li.className = 'flex items-center space-x-4 border-b pb-4';

        li.innerHTML = `
            <img src="${item.imagen}" alt="${item.nombre}" class="w-16 h-16 object-cover rounded"
                 onerror="this.src='https://via.placeholder.com/150';">
            <div class="flex-1">
                <h3 class="text-lg font-bold">${item.nombre}</h3>
                <p class="text-gray-500">Cantidad: ${item.cantidad}</p>
                <p class="text-gray-500">Precio: $${(item.precio * item.cantidad).toFixed(2)}</p>
            </div>
            <button class="text-red-500 hover:underline" onclick="eliminarDelCarrito(${index})">
                Eliminar
            </button>
        `;
        carritoList.appendChild(li);
    });

    totalPrecios.textContent = `Total: $${total.toFixed(2)}`;
    localStorage.setItem('carrito', JSON.stringify(carrito));
}
