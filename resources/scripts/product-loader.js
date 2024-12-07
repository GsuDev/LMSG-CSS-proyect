// Ruta al archivo JSON unificado
const url = '../resources/products/products.json';

// Contenedor donde se mostrarán los juguetes
const contenedor = document.getElementById('juguetes-contenedor');

// Obtener el nombre de la página actual sin extensión
const paginaActual = window.location.pathname.split('/').pop().replace('.html', '');
console.log(paginaActual);

// Cargar y procesar el JSON
fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('No se pudo cargar el archivo JSON');
        }
        return response.json();
    })
    .then(productos => {
        // Filtrar productos si la página no es "catalogo"
        const productosFiltrados = paginaActual !== 'catalogo'
            ? productos.filter(producto => producto.marca.toLowerCase() === paginaActual.toLowerCase())
            : productos;

        // Mostrar mensaje si no hay productos disponibles
        if (productosFiltrados.length === 0) {
            contenedor.innerHTML = '<p>No hay productos disponibles para esta marca.</p>';
            return;
        }

        // Mostrar los productos
        productosFiltrados.forEach(producto => {
            const productoDiv = document.createElement('div');
            productoDiv.classList.add('juguete');

            productoDiv.innerHTML = `
          <a href="${producto.url}">
          <img src="${producto.imagen}" alt="${producto.nombre}">
          <h3>${producto.nombre}</h3>
          <p>${producto.descripcion}</p>
          <span>Precio: ${producto.precio}€</span>
          </a>
        `;

            contenedor.appendChild(productoDiv);
        });
    })
    .catch(error => {
        console.error('Error al cargar los productos:', error);
        contenedor.innerHTML = '<p>Error al cargar los datos.</p>';
    });
