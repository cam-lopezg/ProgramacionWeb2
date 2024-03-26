document.addEventListener('DOMContentLoaded', function () {
    const carritoLista = document.getElementById('carrito-lista');
    const totalElemento = document.getElementById('total');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    let total = 0;

    // Función para agregar un juego al carrito
    function agregarAlCarrito(nombre, precio) {
        const juego = document.createElement('li');
        juego.textContent = nombre + ' - $' + precio;
        carritoLista.appendChild(juego);
        total += parseInt(precio);
        totalElemento.textContent = 'Total: $' + total;
    }
       // Recuperar los juegos del carrito del almacenamiento local (si los hay)
       const carrito = JSON.parse(localStorage.getItem('carrito'));
       if (carrito) {
           carrito.forEach(juego => {
               agregarAlCarrito(juego.nombre, juego.precio);
           });
       }

    // Agregar evento clic a todos los botones "Agregar al carrito"
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const nombre = button.getAttribute('data-nombre');
            const precio = button.getAttribute('data-precio');
            agregarAlCarrito(nombre, precio);

            const juego = { nombre, precio };
            let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            carrito.push(juego);
            localStorage.setItem('carrito', JSON.stringify(carrito));
        });
    });
    function limpiarLista() {
        const carritoLista = document.getElementById('carrito-lista');
        carritoLista.innerHTML = ''; // Elimina todos los elementos hijos
        localStorage.removeItem('carrito'); // Elimina el carrito del almacenamiento local
        actualizarTotal(); // Actualiza el total
    }

    // Función para pagar
    function pagar() {
        // Agrega aquí la lógica para procesar el pago
        alert('Pago procesado correctamente');
        limpiarLista(); // Limpia la lista después de pagar
    }

    // Agregar evento clic al botón "Limpiar Lista"
    document.getElementById('limpiarLista').addEventListener('click', limpiarLista);

    // Agregar evento clic al botón "Pagar"
    document.getElementById('pagar').addEventListener('click', pagar);

});