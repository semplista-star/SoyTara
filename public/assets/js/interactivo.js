/* TARA · Capa de interactividad común (14-nov). No añade textos ni secciones: solo hace que los bloques existentes
   respondan al puntero, al toque y al scroll. Se carga con defer ANTES de /_site/app.*.js, para que las clases
   «tilt» y «magnetic» que añade aquí las recoja ese script (inclinación 3D y botones magnéticos). */
(function () {
  'use strict';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fino = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function alVer(el, fn, umbral, salir) {
    if (!('IntersectionObserver' in window)) { fn(true); return; }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { fn(true); if (!salir) io.disconnect(); } else if (salir) fn(false); });
    }, { threshold: umbral || 0.35 });
    io.observe(el);
  }

  /* 1) Luz que sigue al puntero e inclinación suave en tarjetas */
  var tarjetas = '.ccard, .hm-step, .hm-data, .pcard, .pag-hito';
  $$(tarjetas).forEach(function (el) {
    el.classList.add('ix-spot');
    el.addEventListener('pointermove', function (e) {
      var r = el.getBoundingClientRect();
      el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      el.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });
  // Inclinación (la aplica app.js a «.tilt»): solo tarjetas sueltas, no las que forman secuencias
  $$('.hm-dossier, .pag-grid > .pag-card, .pag-pair > .pag-card, .pag-offer > .pag-card').forEach(function (el) { el.classList.add('tilt'); });
  // Botones principales magnéticos (app.js), salvo los de enviar formularios
  $$('.btn--primary').forEach(function (b) { if (!b.closest('form') && !b.closest('dialog')) b.classList.add('magnetic'); });

  /* 2) Secuencias: se recorren solas mientras se ven; el puntero o el toque eligen el paso */
  function secuencia(lista, items) {
    if (!lista || items.length < 2) return;
    lista.classList.add('ix-seq');
    var actual = -1, timer = null, manual = false, visible = false;
    function poner(n) {
      actual = n;
      items.forEach(function (el, k) { el.classList.toggle('is-active', k === n); el.classList.toggle('is-past', k < n); });
      lista.style.setProperty('--ix-p', String((n + 1) / items.length));
    }
    function parar() { clearInterval(timer); timer = null; }
    function seguir() { if (reduce || manual || timer || !visible) return; timer = setInterval(function () { poner((actual + 1) % items.length); }, 3200); }
    items.forEach(function (el, k) {
      el.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') { manual = true; parar(); poner(k); } });
      el.addEventListener('click', function (e) { if (e.target.closest('a,button,input,select,textarea,summary')) return; manual = true; parar(); poner(k); });
    });
    lista.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') { manual = false; seguir(); } });
    alVer(lista, function (si) { visible = si; if (si) { if (actual < 0) poner(0); seguir(); } else parar(); }, 0.4, true);
  }
  $$('.hm-verbs').forEach(function (l) { secuencia(l, $$(':scope > .hm-verb', l)); });
  $$('.hm-steps').forEach(function (l) { secuencia(l, $$(':scope > .hm-step', l)); });
  $$('.pag-flow').forEach(function (l) { secuencia(l, $$(':scope > .pag-flow__step', l)); });
  $$('.pag-timeline').forEach(function (l) { secuencia(l, $$(':scope > .pag-hito', l)); });

  /* 3) Tabla de niveles: resalta la columna bajo el puntero; las marcas aparecen en cascada al verse */
  $$('.pag-table').forEach(function (t) {
    var wrap = t.closest('.pag-table-wrap') || t;
    wrap.classList.add('ix-table');
    $$('tbody tr', t).forEach(function (tr, fila) {
      $$('.pag-yes', tr).forEach(function (y, k) { y.style.setProperty('--d', (fila * 90 + k * 60) + 'ms'); });
    });
    alVer(wrap, function () { wrap.classList.add('ix-shown'); }, 0.25);
    if (!fino) return;
    t.addEventListener('pointerover', function (e) {
      var c = e.target.closest('td'); $$('.ix-col', t).forEach(function (x) { x.classList.remove('ix-col'); });
      if (!c) return;
      var i = c.cellIndex;
      $$('tr', t).forEach(function (tr) { if (tr.cells[i]) tr.cells[i].classList.add('ix-col'); });
    });
    t.addEventListener('pointerleave', function () { $$('.ix-col', t).forEach(function (x) { x.classList.remove('ix-col'); }); });
  });

  /* 4) Números que cuentan al verse (solo el primero de cada titular marcado; el texto final no cambia) */
  if (!reduce) {
    $$('.hm-red .h2, [data-ix-count]').forEach(function (h) {
      var walker = document.createTreeWalker(h, NodeFilter.SHOW_TEXT), nodo;
      while ((nodo = walker.nextNode())) {
        var m = /\d+/.exec(nodo.nodeValue);
        if (!m) continue;
        var fin = parseInt(m[0], 10); if (fin < 2) return;
        var resto = nodo.splitText(m.index); resto.nodeValue = resto.nodeValue.slice(m[0].length);
        var span = document.createElement('span'); span.className = 'ix-num'; span.textContent = m[0];
        span.style.minWidth = m[0].length + 'ch';
        nodo.parentNode.insertBefore(span, resto);
        alVer(h, function () {
          // app.js puede haber partido el titular en palabras dentro del span: se cambia solo el texto más interno
          var tn = span; while (tn.firstChild) tn = tn.firstChild;
          var t0 = performance.now(), dur = 1400;
          (function paso(t) {
            var p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
            tn.nodeValue = String(Math.round(fin * e));
            if (p < 1) requestAnimationFrame(paso); else tn.nodeValue = m[0];
          })(t0);
        }, 0.5);
        return;
      }
    });
  }

  /* 5) Fondo del hero que sigue suavemente al puntero */
  var hero = document.querySelector('.hero'), ondas = hero && hero.querySelector('.hero__ripples');
  if (hero && ondas && fino && !reduce) {
    var tx = 0, ty = 0, cx = 0, cy = 0, rafId = 0;
    function mover() { cx += (tx - cx) * 0.08; cy += (ty - cy) * 0.08; ondas.style.translate = cx.toFixed(1) + 'px ' + cy.toFixed(1) + 'px'; rafId = (Math.abs(tx - cx) + Math.abs(ty - cy) > 0.3) ? requestAnimationFrame(mover) : 0; }
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 40; ty = ((e.clientY - r.top) / r.height - 0.5) * 30;
      if (!rafId) rafId = requestAnimationFrame(mover);
    });
    hero.addEventListener('pointerleave', function () { tx = 0; ty = 0; if (!rafId) rafId = requestAnimationFrame(mover); });
  }

  /* 6) Contador de caracteres en los campos de texto largos */
  $$('.field textarea[maxlength]').forEach(function (ta) {
    var max = parseInt(ta.getAttribute('maxlength'), 10), c = document.createElement('span');
    c.className = 'ix-counter'; c.setAttribute('aria-hidden', 'true');
    function act() { c.textContent = ta.value.length + ' / ' + max; c.classList.toggle('is-near', ta.value.length > max * 0.9); }
    ta.insertAdjacentElement('afterend', c); ta.addEventListener('input', act);
    var f = ta.form; if (f) f.addEventListener('reset', function () { setTimeout(act, 0); });
    act();
  });
})();
