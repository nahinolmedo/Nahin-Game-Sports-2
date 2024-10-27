document.getElementById('cerrar-sesion').addEventListener('click', () => {
    const confirmacion = confirm('¿Estás seguro de que quieres cerrar sesión?');
    if (confirmacion) {
        // Limpiar el localStorage o cualquier sesión guardada
        localStorage.clear();

        // Redireccionar al usuario a la página de inicio de sesión
        window.location.href = './index.html';  // Cambia por la ruta de tu página de inicio o login
    }
});
