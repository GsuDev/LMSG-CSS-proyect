// Ruta al archivo JSON unificado 
const url = '../resources/products/products.json';

// Contenedor donde se mostrarán los juguetes
const contenedor = document.getElementById('juguetes-contenedor');

// Obtener el nombre de la página actual sin extensión
const paginaActual = window.location.pathname.split('/').pop().replace('.html', '');
console.log(paginaActual);
// Obtener los elementos de ordenación y filtro
const sortSelect = document.getElementById('sortOptions1');
const filtrosEdad = document.querySelectorAll('.filtro.edad a');
const filtrosPrecio = document.getElementById('filtroPrecio');
const filtrosValoracion = document.querySelectorAll('.filtro.valoracion a');
const filtrosCategoria = document.querySelectorAll('.filtro.categoria a');

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
                    <button onclick="addToCart(${producto.id})">Añadir al carrito</button>
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

        // Filtros por categoría
        filtrosCategoria.forEach(filtro => {
            filtro.addEventListener('click', () => {
                const categoriaFiltrada = productosFiltrados.filter(producto => producto.categoria === filtro.getAttribute('data-categoria'));
                mostrarProductos(categoriaFiltrada);
            });
        });

        // Filtros por edad
        filtrosEdad.forEach(filtro => {
            filtro.addEventListener('click', () => {
                const edad = filtro.getAttribute('data-edad');
                let edadFiltrada;

                switch (edad) {
                    case '3':
                        edadFiltrada = productosFiltrados.filter(producto => producto.edad < 3);
                        break;
                    case '3-6':
                        edadFiltrada = productosFiltrados.filter(producto => producto.edad >= 3 && producto.edad <= 6);
                        break;
                    case '6-10':
                        edadFiltrada = productosFiltrados.filter(producto => producto.edad >= 6 && producto.edad <= 10);
                        break;
                    case '10-16':
                        edadFiltrada = productosFiltrados.filter(producto => producto.edad >= 10 && producto.edad <= 16);
                        break;
                    default:
                        edadFiltrada = productosFiltrados;
                }
                mostrarProductos(edadFiltrada);
            });
        });

        // Filtro por precio
        filtrosPrecio.addEventListener('input', () => {
            const precio = filtrosPrecio.value;
            document.getElementById('precioValor').textContent = `${precio}€`;
            const precioFiltrado = productosFiltrados.filter(producto => producto.precio <= precio);
            mostrarProductos(precioFiltrado);
        });

        // Filtros por valoración
        filtrosValoracion.forEach(filtro => {
            filtro.addEventListener('click', () => {
                const valoracion = parseInt(filtro.getAttribute('data-valoracion'));
                const valoracionFiltrada = productosFiltrados.filter(producto => producto.valoracion === valoracion);
                mostrarProductos(valoracionFiltrada);
            });
        });

    })
    .catch(error => {
        console.error('Error al cargar los productos:', error);
        contenedor.innerHTML = '<p>Error al cargar los datos.</p>';
    });

function toggleHeight(cual) {
    const contenido = document.querySelector(cual);
    if (contenido.style.height === '0px' || contenido.style.height === '') {
        contenido.style.height = 'auto'; // Cambia la altura a auto para expandir
    } else {
        contenido.style.height = '0'; // Cambia la altura a 0 para contraer
    }
}
