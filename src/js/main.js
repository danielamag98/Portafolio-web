// espera a que la página termine de cargar antes de buscar elementos
document.addEventListener('DOMContentLoaded', function () {
  ponerAnio();
  sombraDelMenu();
  cintaInfinita();
  filtrarProyectos();
});

// ---- año actual ------------------------------------------------
function ponerAnio() {
  var lugar = document.getElementById('anio');
  if (lugar) {
    lugar.textContent = new Date().getFullYear();
  }
}

// --------- sombra del menú (cuando bajas +10px) ------------------
function sombraDelMenu() {
  var barra = document.querySelector('.barra');
  if (!barra) return;

  function revisar() {
    barra.classList.toggle('con-sombra', window.scrollY > 10);
  }

  window.addEventListener('scroll', revisar);
  revisar(); // una vez al inicio, por si la página ya está más abajo
}

// -- cinta infinita en skills ----------------------------------------
function cintaInfinita() {
  var pista = document.querySelector('.cinta-pista');
  var grupo = document.querySelector('.cinta-grupo');
  if (!pista || !grupo) return;

  var copia = grupo.cloneNode(true);          // copia exacta de la lista
  copia.setAttribute('aria-hidden', 'true');  // los lectores de pantalla no la repiten
  pista.appendChild(copia);
}

// ---- filtrar proyectos ---------------------------------------------
function filtrarProyectos() {
  var botones  = document.querySelectorAll('.filtro');
  var tarjetas = document.querySelectorAll('#lista-proyectos [data-categoria]');

  botones.forEach(function (boton) {
    boton.addEventListener('click', function () {
      var filtro = boton.dataset.filtro;   // lee el data-filtro del botón

      // Marca como activo solo el botón pulsado
      botones.forEach(function (b) { b.classList.remove('activo'); });
      boton.classList.add('activo');

      // Muestra u oculta cada tarjeta
      tarjetas.forEach(function (tarjeta) {
        var coincide = (filtro === 'todos') || (tarjeta.dataset.categoria === filtro);
        tarjeta.hidden = !coincide;        // hidden = true la oculta
      });
    });
  });
}
