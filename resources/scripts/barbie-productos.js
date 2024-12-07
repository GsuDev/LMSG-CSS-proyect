// Ruta al archivo JSON
const url = 'resources/products/barbie.json';

// Contenedor donde se mostrarán los juguetes
const contenedor = document.getElementById('juguetes-contenedor');

// Cargar y procesar el JSON
fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('No se pudo cargar el archivo JSON');
        }
        return response.json();
    })
    .then(juguetes => {
        juguetes.forEach(juguete => {
            // Crear un elemento para cada juguete
            const jugueteDiv = document.createElement('div');
            jugueteDiv.classList.add('juguete');

            jugueteDiv.innerHTML = `
          <a href="${juguete.url}">
          <img src="${juguete.imagen}" alt="${juguete.nombre}">
          <h3>${juguete.nombre}</h3>
          <p>${juguete.descripcion}</p>
          <span>Precio: $${juguete.precio}</span>
          </a>
        `;

            // Añadir al contenedor
            contenedor.appendChild(jugueteDiv);
        });
    })
    .catch(error => {
        console.error('Error al cargar los juguetes:', error);
        contenedor.innerHTML = '<p>Error al cargar los datos.</p>';
    });

