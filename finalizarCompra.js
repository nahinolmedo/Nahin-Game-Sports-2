export async function finalizarCompra() {
    if (carrito.length === 0) {
        alert('El carrito está vacío. No puedes finalizar la compra.');
        return;
    }

    try {
        for (const item of carrito) {
            const productoRef = doc(db, 'productos', item.id);
            const docSnap = await getDoc(productoRef);

            if (docSnap.exists()) {
                const producto = docSnap.data();
                const nuevasExistencias = producto.Existencias - item.cantidad;

                if (nuevasExistencias < 0) {
                    alert(`No hay suficientes existencias para ${item.nombre}.`);
                    return;
                }

                await updateDoc(productoRef, { Existencias: nuevasExistencias });
            }
        }

        alert('Compra realizada con éxito.');
        vaciarCarrito();
    } catch (error) {
        console.error('Error al finalizar la compra:', error);
        alert('Hubo un problema al finalizar la compra.');
    }
}
