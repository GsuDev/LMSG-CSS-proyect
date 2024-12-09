// Inicializar búsqueda
document.getElementById('product-search').addEventListener('input', () => {
    const searchTerm = document.getElementById('product-search').value.toLowerCase();
    console.log('Término de búsqueda:', searchTerm); // Mensaje para depuración
    if (searchTerm.length > 0) { // Mostrar resultados solo si la búsqueda tiene más de 2 caracteres
        buscarProductos(searchTerm);
    } else {
        document.getElementById('search-results').classList.add('hidden');
    }
});

// Mostrar resultados si el campo de búsqueda recupera el foco
document.getElementById('product-search').addEventListener('focus', () => {
    const searchTerm = document.getElementById('product-search').value.toLowerCase();
    if (searchTerm.length > 0) { // Mostrar resultados solo si la búsqueda tiene más de 2 caracteres
        buscarProductos(searchTerm);
    }
});

// Buscar productos
function buscarProductos(searchTerm) {
    fetch(url) // Utilizar `url` de `product-loader.js`
        .then(response => response.json())
        .then(productos => {
            console.log('Productos cargados:', productos); // Mensaje para depuración
            const resultados = productos.filter(producto =>
                producto.nombre.toLowerCase().includes(searchTerm) ||
                producto.descripcion.toLowerCase().includes(searchTerm)
            );
            console.log('Resultados encontrados:', resultados); // Mensaje para depuración
            mostrarResultados(resultados);
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
            document.getElementById('search-results').innerHTML = '<p>Error al cargar los datos.</p>';
        });
}

// Mostrar resultados de búsqueda
function mostrarResultados(resultados) {
    const contenedorResultados = document.getElementById('search-results');
    contenedorResultados.innerHTML = ''; // Limpiar contenedor antes de agregar resultados
    contenedorResultados.classList.remove('hidden');

    if (resultados.length === 0) {
        contenedorResultados.innerHTML = '<p>No se encontraron productos.</p>';
        return;
    }

    resultados.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('search-result-item');
        productoDiv.innerHTML = `
            <div class="search-result-detalle">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="search-result-imagen">
                <div>
                    <h3>${producto.nombre}</h3>
                    <p>${producto.descripcion}</p>
                    <span>Precio: ${producto.precio}€</span>
                </div>
            </div>
        `;
        contenedorResultados.appendChild(productoDiv);
    });
}

// Cerrar resultados de búsqueda al hacer clic fuera
window.addEventListener('click', (event) => {
    const searchBox = document.querySelector('.search-box');
    const searchResults = document.getElementById('search-results');
    if (!searchBox.contains(event.target) && !searchResults.contains(event.target)) {
        searchResults.classList.add('hidden');
    }
});
