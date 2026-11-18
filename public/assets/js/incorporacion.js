// Formulario «Quiero que mi centro participe» (form[data-tara-incorporacion]).
// Envía a la Edge Function «solicitar-incorporacion» de Supabase, el único camino público para pedir la incorporación de un centro:
//   1) pide un reto firmado ({accion:"reto"}), 2) resuelve la prueba de trabajo (pow.js), 3) envía los datos con el reto y el nonce.
// Solo confirma si el servidor responde {ok:true}. Toda la validación definitiva y los límites están en el servidor.
(function () {
  'use strict';
  var ALL = {
    es: {
      sending: 'Enviando…', checking: 'Haciendo una comprobación de seguridad…',
      ok: 'Gracias. Hemos recibido tu solicitud y te responderá una persona del equipo.',
      invalid: 'Revisa los campos marcados: faltan datos obligatorios o el correo no es válido.',
      stages: 'Elige al menos una etapa.',
      error: 'No hemos podido enviar la solicitud. Puedes escribirnos directamente a',
      fast: 'Revisa los datos y vuelve a enviarlo en unos segundos.'
    },
    ca: {
      sending: 'Enviant…', checking: 'Fent una comprovació de seguretat…',
      ok: 'Gràcies. Hem rebut la teva sol·licitud i et respondrà una persona de l\'equip.',
      invalid: 'Revisa els camps marcats: falten dades obligatòries o el correu no és vàlid.',
      stages: 'Tria almenys una etapa.',
      error: 'No hem pogut enviar la sol·licitud. Ens pots escriure directament a',
      fast: 'Revisa les dades i torna-ho a enviar d\'aquí a uns segons.'
    },
    en: {
      sending: 'Sending…', checking: 'Running a security check…',
      ok: 'Thank you. We have received your request and a member of the team will reply.',
      invalid: 'Please check the highlighted fields: some required details are missing or the email isn\'t valid.',
      stages: 'Choose at least one stage.',
      error: 'We couldn\'t send your request. You can write to us directly at',
      fast: 'Please check your details and send it again in a few seconds.'
    }
  };
  var MSG = ALL[(document.documentElement.lang || 'es').slice(0, 2)] || ALL.es;
  var EMAIL = 'soporte@soytara.com';
  var MIN_MS = 2000, TIMEOUT_MS = 15000, POW_TIMEOUT_MS = 90000;

  function status(form, text, kind, withMail) {
    var el = form.querySelector('.form__status');
    el.textContent = text;
    el.className = 'form__status' + (kind ? ' is-' + kind : '');
    if (withMail) {
      var a = document.createElement('a');
      a.className = 'inline-link'; a.href = 'mailto:' + EMAIL; a.textContent = ' ' + EMAIL;
      el.appendChild(a); el.appendChild(document.createTextNode('.'));
    }
  }

  function post(url, body) {
    var ctrl = 'AbortController' in window ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, TIMEOUT_MS);
    return fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), signal: ctrl ? ctrl.signal : undefined })
      .then(function (res) { return res.json().catch(function () { return {}; }).then(function (j) { return { http: res.status, ok: res.ok && j && j.ok === true, body: j || {} }; }); })
      .then(function (r) { clearTimeout(timer); return r; }, function (e) { clearTimeout(timer); throw e; });
  }

  // Resuelve la prueba de trabajo fuera del hilo principal; si no hay Workers, por trozos para no congelar la página.
  function solve(prefix, dif) {
    return new Promise(function (resolve, reject) {
      var t = setTimeout(function () { reject(new Error('pow-timeout')); }, POW_TIMEOUT_MS);
      var done = function (n) { clearTimeout(t); n === null ? reject(new Error('pow')) : resolve(n); };
      if (window.Worker) {
        try {
          var w = new Worker('/assets/js/pow.js');
          w.onmessage = function (e) { w.terminate(); done(e.data.nonce); };
          w.onerror = function () { w.terminate(); fallback(); };
          w.postMessage({ prefix: prefix, dif: dif });
          return;
        } catch (_) { /* sigue con el plan B */ }
      }
      fallback();
      function fallback() {
        if (!window.taraPow) { done(null); return; }
        var n = 0, CHUNK = 20000;
        (function step() {
          var r = window.taraPow.search(prefix, dif, n, CHUNK);
          if (r !== null) { done(r); return; }
          n += CHUNK; setTimeout(step, 0);
        })();
      }
    });
  }

  function validate(form) {
    var fields = Array.prototype.slice.call(form.querySelectorAll('input, select, textarea'));
    fields.forEach(function (f) { if ((f.type === 'text' || f.type === 'email') && typeof f.value === 'string') f.value = f.value.trim(); });
    form.querySelectorAll('.is-invalid').forEach(function (w) { w.classList.remove('is-invalid'); });
    form.querySelectorAll('[aria-invalid]').forEach(function (f) { f.removeAttribute('aria-invalid'); });
    var bad = fields.filter(function (f) { return f.willValidate && !f.checkValidity(); });
    var group = form.querySelector('[data-required-group]');
    var noStage = group && !group.querySelector('input:checked');
    bad.forEach(function (f) { var w = f.closest('.field, .check'); if (w) w.classList.add('is-invalid'); f.setAttribute('aria-invalid', 'true'); });
    if (noStage) { group.classList.add('is-invalid'); group.setAttribute('aria-invalid', 'true'); }
    return { bad: bad, noStage: noStage, group: group };
  }

  function init(form) {
    var endpoint = form.getAttribute('data-endpoint');
    var started = Date.now(), busy = false;
    var send = form.querySelector('[type="submit"]');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (busy) return;
      var v = validate(form);
      if (v.bad.length || v.noStage) {
        status(form, v.bad.length ? MSG.invalid : MSG.stages, 'error');
        (v.bad[0] || v.group.querySelector('input')).focus();
        return;
      }
      if (Date.now() - started < MIN_MS) { status(form, MSG.fast, 'error'); return; }

      var el = form.elements;
      var datos = {
        contacto_nombre: el.nombre.value, contacto_cargo: el.cargo.value, nombre_centro: el.entidad.value,
        comunidad: el.comunidad.value, provincia: el.provincia.value, contacto_email: el.email.value,
        etapas: Array.prototype.map.call(form.querySelectorAll('input[name="etapas"]:checked'), function (c) { return c.value; }),
        acepta_privacidad: el.privacidad.checked === true, web: el.web.value
      };
      // Opcional (máx. 2000). Lo guarda la función desde la v19 (migración tara_0800_mensaje_solicitudes, 14-nov-2026).
      if (el.mensaje && el.mensaje.value.trim()) datos.mensaje = el.mensaje.value.trim();

      busy = true; if (send) send.disabled = true;
      status(form, MSG.checking, '');
      post(endpoint, { accion: 'reto' }).then(function (r) {
        if (!r.ok || !r.body.reto) throw r;
        var rt = r.body.reto;
        return solve(rt.id + '.' + rt.exp + '.' + rt.dif + '.', rt.dif).then(function (nonce) {
          status(form, MSG.sending, '');
          datos.reto = { id: rt.id, exp: rt.exp, firma: rt.firma };
          datos.nonce = nonce;
          return post(endpoint, datos);
        });
      }).then(function (r) {
        if (r.ok) { form.reset(); started = Date.now(); status(form, MSG.ok, 'ok'); return; }
        throw r;
      }).catch(function (r) {
        // El servidor da mensajes claros para el visitante (por ejemplo «Elige al menos una etapa»); si no hay, uno genérico con el correo.
        var msg = r && r.body && typeof r.body.error === 'string' ? r.body.error : '';
        if (msg) status(form, msg, 'error'); else status(form, MSG.error, 'error', true);
      }).then(function () { busy = false; if (send) send.disabled = false; });
    });
  }

  Array.prototype.forEach.call(document.querySelectorAll('form[data-tara-incorporacion]'), init);
})();
