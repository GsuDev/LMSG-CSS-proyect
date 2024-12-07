// Ruta al archivo JSON unificado 
const url = '../resources/products/products.json';

// Contenedor donde se mostrarán los juguetes
const contenedor = document.getElementById('juguetes-contenedor');

// Obtener el nombre de la página actual sin extensión
const paginaActual = window.location.pathname.split('/').pop().replace('.html', '');
console.log(paginaActual);

// Obtener los elementos de ordenación y filtro
const sortSelect = document.getElementById('sortOptions1');
const filtrosEdad = document.querySelector('.filtro.edad');
const filtrosPrecio = document.querySelector('.filtro.precio');
const filtrosValoracion = document.querySelector('.filtro.valoracion');

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

        // Función para mostrar productos
        const mostrarProductos = (productos) => {
            contenedor.innerHTML = ''; // Limpiar contenedor antes de agregar productos
            if (productos.length === 0) {
                contenedor.innerHTML = '<p>No hay productos disponibles.</p>';
                return;
            }

            productos.forEach(producto => {
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
        };

        // Mostrar productos inicialmente
        mostrarProductos(productosFiltrados);

        // Ordenar los productos según la selección
        sortSelect.addEventListener('change', () => {
            let productosOrdenados = [...productosFiltrados]; // Copiar el array

            switch (sortSelect.value) {
                case 'name-asc':
                    productosOrdenados.sort((a, b) => a.nombre.localeCompare(b.nombre));
                    break;
                case 'name-desc':
                    productosOrdenados.sort((a, b) => b.nombre.localeCompare(a.nombre));
                    break;
                case 'price-asc':
                    productosOrdenados.sort((a, b) => a.precio - b.precio);
                    break;
                case 'price-desc':
                    productosOrdenados.sort((a, b) => b.precio - a.precio);
                    break;
                case 'stars-desc':
                    productosOrdenados.sort((a, b) => b.valoracion - a.valoracion);
                    break;
                case 'stars-asc':
                    productosOrdenados.sort((a, b) => a.valoracion - b.valoracion);
                    break;
                default:
                    break;
            }
            mostrarProductos(productosOrdenados);
        });

        // Filtros por edad (puedes implementar lógica según el producto)
        filtrosEdad.addEventListener('click', () => {
            // Lógica para filtrar por edad
            const edadFiltrada = productosFiltrados.filter(producto => producto.edad >= 3); // Ejemplo de filtrado
            mostrarProductos(edadFiltrada);
        });

        // Filtros por precio
        filtrosPrecio.addEventListener('click', () => {
            // Lógica para filtrar por precio
            const precioFiltrado = productosFiltrados.filter(producto => producto.precio <= 50); // Ejemplo de filtrado
            mostrarProductos(precioFiltrado);
        });

        // Filtros por valoración
        filtrosValoracion.addEventListener('click', () => {
            // Lógica para filtrar por valoración
            const valoracionFiltrada = productosFiltrados.filter(producto => producto.valoracion >= 4); // Ejemplo de filtrado
            mostrarProductos(valoracionFiltrada);
        });

    })
    .catch(error => {
        console.error('Error al cargar los productos:', error);
        contenedor.innerHTML = '<p>Error al cargar los datos.</p>';
    });
