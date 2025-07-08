// Variables del DOM
const listaCarrito = document.getElementById('lista-carrito');
const totalCarrito = document.getElementById('total-carrito');
const modal = document.getElementById('modal-carrito');
const cerrarModal = document.querySelector('.cerrar');
const verCarritoBtn = document.getElementById('ver-carrito');
const borrarCarritoBtn = document.getElementById('borrar-carrito');
const hacerPedidoBtn = document.getElementById('hacer-pedido');
const contadorItems = document.getElementById('contador-items');

let total = 0;

// Función para mostrar notificaciones
function mostrarToastPersonalizado(mensaje) {
  const toast = document.getElementById('toast');
  toast.textContent = mensaje;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

// Función para actualizar contador de ítems
function actualizarContadorItems() {
  const cantidad = listaCarrito.children.length;
  contadorItems.textContent = cantidad;

  if (cantidad === 0) {
    contadorItems.style.display = 'none';
  } else {
    contadorItems.style.display = 'inline-block';
  }
}


// Evento para agregar al carrito
document.querySelectorAll('button').forEach(button => {
  if (button.textContent.trim() === '✚') {
    button.addEventListener('click', () => {
      const burger = button.closest('.burger') || button.parentElement;
      const nombre = burger.querySelector('.item-title').childNodes[0].textContent.trim();
      const precioTexto = burger.querySelector('span').textContent.replace('$', '').trim();
      const precio = parseInt(precioTexto);

      const categoria = burger.closest('.item')?.querySelector('h3')?.textContent.trim();
      const producto = `${categoria} ${nombre}`;

      // Crear el ítem del carrito
      const item = document.createElement('li');
      item.classList.add('item-carrito');

      // Texto del producto
      const contenido = document.createElement('span');
      contenido.textContent = `${producto} - $${precio}`;

      // Botón de borrar individual
      const botonBorrar = document.createElement('button');
      botonBorrar.textContent = '✖';
      botonBorrar.classList.add('btn-borrar-individual');
      botonBorrar.addEventListener('click', () => {
        if (confirm('¿Querés eliminar este ítem del carrito? ❌')) {
          listaCarrito.removeChild(item);
          total -= precio;
          totalCarrito.textContent = total;
          mostrarToastPersonalizado('Ítem eliminado ❌');
          actualizarContadorItems();
        }
      });

      // Estructura del item en carrito
      item.appendChild(contenido);
      item.appendChild(botonBorrar);
      listaCarrito.appendChild(item);

      // Actualizar total
      total += precio;
      totalCarrito.textContent = total;

      // Mostrar notificación y actualizar contador
      mostrarToastPersonalizado('Agregado al carrito ✅');
      actualizarContadorItems();
    });
  }
});

// Mostrar el modal
verCarritoBtn.addEventListener('click', () => {
  modal.style.display = 'block';
});

// Cerrar el modal
cerrarModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Cerrar al hacer clic fuera del modal
window.addEventListener('click', e => {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
});


// Hacer pedido por WhatsApp
hacerPedidoBtn.addEventListener('click', () => {
  if (listaCarrito.children.length === 0) {
    alert('El carrito está vacío. Agregá productos para hacer un pedido.');
    return;
  }

  let mensaje = '¡Hola! Quisiera hacer el siguiente pedido:%0A';
  for (const li of listaCarrito.children) {
    const texto = li.querySelector('span')?.textContent.trim();
    if (texto) mensaje += `- ${texto}%0A`;
  }

  mensaje += `%0ATotal: $${total}%0A%0AGracias.`;

  const urlWpp = `https://wa.me/5493534766302?text=${mensaje}`;
  window.open(urlWpp, '_blank');
});

// Función para volver al index.html
document.getElementById("btn-volver")?.addEventListener("click", function () {
  window.location.href = "index.html";
});