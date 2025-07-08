// Elementos del DOM
const listaCarrito = document.getElementById('lista-carrito');
const totalCarrito = document.getElementById('total-carrito');
const modal = document.getElementById('modal-carrito');
const cerrarModal = document.querySelector('.cerrar');
const verCarritoBtn = document.getElementById('ver-carrito');
const hacerPedidoBtn = document.getElementById('hacer-pedido');
const contadorItems = document.getElementById('contador-items');

let total = 0;
let cantidadItems = 0;

// Mostrar notificacion
function mostrarToastPersonalizado(mensaje) {
  const toast = document.getElementById('toast');
  toast.textContent = mensaje;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

// Actualiza el contador
function actualizarContador() {
  contadorItems.textContent = cantidadItems;
  contadorItems.style.display = cantidadItems > 0 ? 'inline-block' : 'none';
}

// Manejo de botones ✚
document.querySelectorAll('.combo-box button').forEach(button => {
  button.addEventListener('click', () => {
    const span = button.previousElementSibling?.querySelector('span');
    const strong = button.previousElementSibling?.previousElementSibling?.tagName === 'STRONG'
      ? button.previousElementSibling.previousElementSibling
      : button.previousElementSibling?.previousElementSibling?.previousElementSibling;

    if (!span || !strong) {
      alert('Error al leer datos del combo');
      return;
    }

    const precioTexto = span.textContent.replace('$', '').trim();
    const precio = parseInt(precioTexto);
    const nombre = strong.textContent.trim();

    // Crear el item en el carrito
    const item = document.createElement('li');
    item.classList.add('item-carrito');
    item.textContent = `${nombre} - $${precio}`;

    // Boton eliminar
    const botonBorrar = document.createElement('button');
    botonBorrar.textContent = '✖';
    botonBorrar.classList.add('btn-borrar-individual');
    botonBorrar.addEventListener('click', () => {
      if (confirm('¿Querés eliminar este ítem del carrito? ❌')) {
        listaCarrito.removeChild(item);
        total -= precio;
        cantidadItems--;
        totalCarrito.textContent = total;
        actualizarContador();
        mostrarToastPersonalizado('Ítem eliminado ❌');
      }
    });

    item.appendChild(botonBorrar);
    listaCarrito.appendChild(item);

    // Actualizar total
    total += precio;
    cantidadItems++;
    totalCarrito.textContent = total;
    actualizarContador();
    mostrarToastPersonalizado('Agregado al carrito ✅');
  });
});

// Mostrar modal
verCarritoBtn.addEventListener('click', () => {
  modal.style.display = 'block';
});

// Cerrar modal
cerrarModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Cerrar modal al hacer clic fuera
window.addEventListener('click', e => {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
});

// Enviar por WhatsApp
hacerPedidoBtn.addEventListener('click', () => {
  if (listaCarrito.children.length === 0) {
    alert('El carrito está vacío. Agregá productos para hacer un pedido.');
    return;
  }

  let mensaje = '¡Hola! Quisiera hacer el siguiente pedido:%0A';
  for (const li of listaCarrito.children) {
    const texto = li.firstChild.textContent.trim();
    mensaje += `- ${texto}%0A`;
  }
  mensaje += `%0ATotal: $${total}%0A%0AGracias.`;

  const urlWpp = `https://wa.me/5493534766302?text=${mensaje}`;
  window.open(urlWpp, '_blank');
});

// Función para volver al index.html
document.getElementById("btn-volver")?.addEventListener("click", function () {
  window.location.href = "index.html";
});