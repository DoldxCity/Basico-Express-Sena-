// Mostrar el nombre del usuario registrado
const bienvenida = document.getElementById('bienvenida');
const usuario = camilo;
// JSON.parse(localStorage.getItem("usuarioActivo"));
if(usuario){
  bienvenida.textContent = `¡Bienvenido, ${usuario}!`;
}

// Botón a productos
const btnProductos = document.getElementById('btn-productos');
btnProductos.addEventListener('click', () => {
  window.location.href = ''; // crea productos.html
});
