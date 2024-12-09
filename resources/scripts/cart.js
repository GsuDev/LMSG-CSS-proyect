// Inicializar carrito desde localStorage
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Actualizar cantidad en el icono del carrito
function actualizarCantidadCarrito() {
    const cantidadTotal = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    document.getElementById('cart-quantity').textContent = cantidadTotal;
}

// Mostrar productos en el carrito en la modal
function mostrarCarrito() {
    const contenedorCarrito = document.getElementById('carrito-contenedor');
    const totalPrecio = document.getElementById('total-precio');

    contenedorCarrito.innerHTML = '';

    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = '<p>El carrito está vacío.</p>';
        totalPrecio.textContent = '0€';
        return;
    }

    let total = 0;
    carrito.forEach((producto, index) => {
        total += producto.precio * producto.cantidad;

        const productoDiv = document.createElement('div');
        productoDiv.classList.add('carrito-item');
        productoDiv.innerHTML = `
            <div class="carrito-detalle">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="carrito-imagen">
                <div>
                    <h3>${producto.nombre}</h3>
                    <p>Precio: ${producto.precio}€</p>
                    <p>Cantidad: ${producto.cantidad}</p>
                </div>
            </div>
            <button class="btn-eliminar" onclick="eliminarDelCarrito(${index})">Eliminar</button>
        `;
        contenedorCarrito.appendChild(productoDiv);
    });

    totalPrecio.textContent = `${total.toFixed(2)}€`;
}

// Agregar producto al carrito
function addToCart(productId) {
    fetch('../resources/products/products.json') // Ruta al JSON
        .then(response => response.json())
        .then(productos => {
            const producto = productos.find(p => p.id === productId);
            if (producto) {
                const index = carrito.findIndex(p => p.id === productId);
                if (index === -1) {
                    producto.cantidad = 1; // Nuevo producto al carrito
                    carrito.push(producto);
                } else {
                    carrito[index].cantidad += 1; // Incrementa la cantidad si ya está
                }
                localStorage.setItem('carrito', JSON.stringify(carrito));
                actualizarCantidadCarrito(); // Actualizar el contador del carrito
                mostrarCarrito(); // Actualizar la modal en tiempo real
                cerrarModal(); // Cerrar la modal
                animarCarrito(); // Animación pulsante para el carrito
            }
        });
}

// Eliminar producto del carrito
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
    actualizarCantidadCarrito();
}

// Vaciar todo el carrito
function vaciarCarrito() {
    carrito = [];
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
    actualizarCantidadCarrito();
}

// Función para cerrar la modal
function cerrarModal() {
    const modal = document.getElementById('carrito-modal');
    modal.classList.remove('fadeIn');
    modal.classList.add('fadeOut');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 500); // Duración de la animación
}

// Función para animar el carrito
function animarCarrito() {
    const cartIcon = document.getElementById('cart-icon');
    cartIcon.classList.add('pulse');
    setTimeout(() => {
        cartIcon.classList.remove('pulse');
    }, 1000); // Duración de la animación pulsante
}

// Control de la modal del carrito
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('carrito-modal');
    const cartIcon = document.getElementById('cart-icon');

    cartIcon.addEventListener('click', () => {
        const isHidden = modal.classList.contains('hidden');
        modal.classList.toggle('hidden', !isHidden);

        if (!isHidden) {
            modal.classList.remove('fadeIn');
            modal.classList.add('fadeOut');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 500); // Duración de la animación
        } else {
            modal.style.display = 'block';
            modal.classList.remove('fadeOut');
            modal.classList.add('fadeIn');
            mostrarCarrito();
            // Ajustar posición dinámica en caso de desplazamiento
            const rect = cartIcon.getBoundingClientRect();
            modal.style.top = `${rect.bottom}px`;
            modal.style.left = `${Math.min(rect.left, window.innerWidth - modal.offsetWidth - 10)}px`;
        }
    });

    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', (event) => {
        if (!cartIcon.contains(event.target) && !modal.contains(event.target)) {
            modal.classList.add('hidden');
        }
    });

    actualizarCantidadCarrito();
});
