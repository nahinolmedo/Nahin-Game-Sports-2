async function actualizarExistencias(id, nuevasExistencias) {
    try {
        const productoRef = doc(db, 'productos', id);  // Referencia al producto
        await updateDoc(productoRef, { Existencias: nuevasExistencias });

        console.log(`Existencias actualizadas a ${nuevasExistencias}.`);
        alert(`Compra realizada. Quedan ${nuevasExistencias} unidades.`);
    } catch (error) {
        console.error('Error al actualizar las existencias:', error);
        alert('Hubo un problema al actualizar las existencias.');
    }
}
