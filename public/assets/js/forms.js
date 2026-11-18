// Formularios de las páginas interiores (form[data-tara-form]). Mismo envío que el formulario original:
// JSON a /api/contacto con los mismos campos. Solo confirma si el servidor responde que ha guardado la solicitud.
(function () {
  'use strict';
  var MSG = {
    es: { sending: 'Enviando…', ok: 'Gracias. Hemos recibido tu mensaje y te responderá una persona del equipo.', invalid: 'Revisa los campos marcados: faltan datos obligatorios o el correo no es válido.', error: 'No hemos podido enviar el mensaje. Puedes escribirnos directamente a', fast: 'Revisa los datos y vuelve a enviarlo en unos segundos.' },
    ca: { sending: 'Enviant…', ok: 'Gràcies. Hem rebut el teu missatge i et respondrà una persona de l\'equip.', invalid: 'Revisa els camps marcats: falten dades obligatòries o el correu no és vàlid.', error: 'No hem pogut enviar el missatge. Ens pots escriure directament a', fast: 'Revisa les dades i torna-ho a enviar d\'aquí a uns segons.' },
    en: { sending: 'Sending…', ok: 'Thank you. We have received your message and a member of the team will reply.', invalid: 'Please check the highlighted fields: some required details are missing or the email isn\'t valid.', error: 'We couldn\'t send your message. You can write to us directly at', fast: 'Please check your details and send it again in a few seconds.' }
  };
  var lang = (document.documentElement.lang || 'es').slice(0, 2);
  var m = MSG[lang] || MSG.es;
  var MIN_MS = 2000;      // envíos más rápidos que esto se consideran automáticos
  var TIMEOUT_MS = 15000; // tiempo máximo de espera de la respuesta del servidor
  var EMAIL = 'soporte@soytara.com';

  function status(form, text, kind, withMail) {
    var el = form.querySelector('.form__status');
    if (!el) return;
    el.textContent = text;
    el.className = 'form__status' + (kind ? ' is-' + kind : '');
    if (withMail) {
      var a = document.createElement('a');
      a.className = 'inline-link';
      a.href = 'mailto:' + EMAIL;
      a.textContent = ' ' + EMAIL;
      el.appendChild(a);
      el.appendChild(document.createTextNode('.'));
    }
  }

  function validate(form) {
    var fields = Array.prototype.slice.call(form.querySelectorAll('input, select, textarea'));
    fields.forEach(function (f) {
      if (typeof f.value === 'string' && f.type !== 'checkbox' && f.type !== 'hidden') f.value = f.value.trim();
    });
    var bad = fields.filter(function (f) { return f.willValidate && !f.checkValidity(); });
    form.querySelectorAll('.field, .check').forEach(function (w) { w.classList.remove('is-invalid'); });
    form.querySelectorAll('[aria-invalid]').forEach(function (f) { f.removeAttribute('aria-invalid'); });
    bad.forEach(function (f) {
      var w = f.closest('.field, .check');
      if (w) w.classList.add('is-invalid');
      f.setAttribute('aria-invalid', 'true');
    });
    return bad;
  }

  function init(form) {
    if (form.__taraForm) return;
    form.__taraForm = true;
    var started = Date.now();
    var busy = false;
    var send = form.querySelector('[type="submit"]');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (busy) return;
      var bad = validate(form);
      if (bad.length) { status(form, m.invalid, 'error'); bad[0].focus(); return; }
      if (Date.now() - started < MIN_MS) { status(form, m.fast, 'error'); return; }

      var data = { lang: lang };
      Array.prototype.forEach.call(form.elements, function (f) {
        if (f.name) data[f.name] = f.type === 'checkbox' ? f.checked : f.value;
      });

      busy = true;
      if (send) send.disabled = true;
      status(form, m.sending, '');
      var ctrl = 'AbortController' in window ? new AbortController() : null;
      var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, TIMEOUT_MS);

      fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        signal: ctrl ? ctrl.signal : undefined
      }).then(function (res) {
        return res.json().catch(function () { return {}; }).then(function (body) {
          return { ok: res.ok && body && body.ok === true, status: res.status };
        });
      }).then(function (r) {
        if (r.ok) {
          form.reset();
          started = Date.now();
          status(form, form.getAttribute('data-ok') || m.ok, 'ok');
        } else if (r.status === 400 || r.status === 422) {
          status(form, m.invalid, 'error');
        } else {
          status(form, m.error, 'error', true);
        }
      }).catch(function () {
        status(form, m.error, 'error', true);
      }).then(function () {
        clearTimeout(timer);
        busy = false;
        if (send) send.disabled = false;
      });
    });
  }

  window.taraForms = { init: init };
  Array.prototype.forEach.call(document.querySelectorAll('form[data-tara-form]'), init);
})();
