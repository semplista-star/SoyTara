// Bloque "Un espacio para cada comunidad". Solo observa sus propios elementos:
// no escucha el scroll ni lo bloquea. Sin este archivo el contenido se ve igual, sin el resalte en móvil.
(function () {
  'use strict';
  if (!('IntersectionObserver' in window)) return;
  var items = Array.prototype.slice.call(document.querySelectorAll('.comu'));
  if (!items.length) return;

  // Detiene las órbitas cuando el bloque está fuera de pantalla
  var visible = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      e.target.classList.toggle('is-paused', !e.isIntersecting);
    });
  });
  items.forEach(function (el) { visible.observe(el); });

  // En pantallas táctiles no hay cursor: se activa el bloque que pasa por el centro de la pantalla
  if (window.matchMedia('(hover: none)').matches) {
    var centro = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        e.target.classList.toggle('is-active', e.isIntersecting);
      });
    }, { rootMargin: '-45% 0px -45% 0px' });
    items.forEach(function (el) { centro.observe(el); });
  }
})();
