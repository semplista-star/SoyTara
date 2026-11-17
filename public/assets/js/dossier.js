// Formulario único de dossieres de toda la web (ES / CA / EN).
// - Los botones [data-dossier-open="que-es|centros|institucional"] abren una única ventana con ese dossier ya marcado.
// - Los contenedores [data-dossier-form="…"] muestran el mismo formulario dentro de la página.
// El envío lo hace forms.js (validación, límite de envíos, confirmación solo si el servidor responde {ok:true}).
//
// INTEGRACIÓN PENDIENTE: los dossieres en PDF y el envío automático por correo todavía no existen.
// Hoy la solicitud se manda al formulario de contacto actual (ENDPOINT). Cuando exista el servicio de correo
// o los PDF definitivos, basta con cambiar ENDPOINT y los textos marcados como «pendiente».
(function () {
  'use strict';
  var ENDPOINT = '/api/contacto';
  var TIPOS = ['centro', 'fundacion', 'universidad', 'administracion', 'otra'];
  var T = {
    es: {
      title: 'Recibir el dossier', chosen: 'Dossier:', close: 'Cerrar', name: 'Nombre', email: 'Correo', iam: 'Soy…', choose: 'Elige una opción',
      opts: ['Centro educativo: escuela, instituto o FP', 'Fundación', 'Universidad', 'Administración pública', 'Otro'],
      entity: 'Nombre del centro o la entidad', role: 'Cargo', optional: '(opcional)', accept: 'Acepto la', policy: 'política de privacidad', privacy: '/privacidad',
      send: 'Recibir por correo', note: 'Utilizaremos tus datos únicamente para gestionar esta solicitud, según nuestra política de privacidad.',
      ok: 'Gracias. Hemos recibido tu solicitud del dossier y una persona del equipo se pondrá en contacto contigo.',
      pending: 'Pendiente', flag: 'Los dossieres en PDF y el envío automático por correo todavía no existen: la solicitud llega al equipo por el formulario de contacto actual.',
      names: { 'que-es': 'Qué es TARA', centros: 'Para centros educativos', institucional: 'Para instituciones' }
    },
    ca: {
      title: 'Rebre el dossier', chosen: 'Dossier:', close: 'Tanca', name: 'Nom', email: 'Correu', iam: 'Sóc…', choose: 'Tria una opció',
      opts: ['Centre educatiu: escola, institut o FP', 'Fundació', 'Universitat', 'Administració pública', 'Altres'],
      entity: 'Nom del centre o l\'entitat', role: 'Càrrec', optional: '(opcional)', accept: 'Accepto la', policy: 'política de privacitat', privacy: '/privacitat',
      send: 'Rebre per correu', note: 'Utilitzarem les teves dades únicament per gestionar aquesta sol·licitud, segons la nostra política de privacitat.',
      ok: 'Gràcies. Hem rebut la teva sol·licitud del dossier i una persona de l\'equip es posarà en contacte amb tu.',
      pending: 'Pendent', flag: 'Els dossiers en PDF i l\'enviament automàtic per correu encara no existeixen: la sol·licitud arriba a l\'equip pel formulari de contacte actual.',
      names: { 'que-es': 'Què és TARA', centros: 'Per a centres educatius', institucional: 'Per a institucions' }
    },
    en: {
      title: 'Get the dossier', chosen: 'Dossier:', close: 'Close', name: 'Name', email: 'Email', iam: 'I am…', choose: 'Choose an option',
      opts: ['School: primary, secondary or vocational', 'Foundation', 'University', 'Public administration', 'Other'],
      entity: 'Name of the school or organisation', role: 'Role', optional: '(optional)', accept: 'I accept the', policy: 'privacy policy', privacy: '/privacy',
      send: 'Send it to me by email', note: 'We will only use your data to handle this request, in line with our privacy policy.',
      ok: 'Thank you. We have received your dossier request and a member of the team will get in touch with you.',
      pending: 'Pending', flag: 'The PDF dossiers and automatic email delivery do not exist yet: the request reaches the team through the current contact form.',
      names: { 'que-es': 'What is TARA', centros: 'For schools', institucional: 'For institutions' }
    }
  };
  var lang = (document.documentElement.lang || 'es').slice(0, 2);
  var t = T[lang] || T.es;
  var uid = 0;

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
  function field(label, input, req, full) {
    return '<label class="field' + (full ? ' field--full' : '') + '"><span class="field__l"><span>' + label + '</span> ' +
      (req ? '<span class="field__req" aria-hidden="true">*</span>' : '<span class="field__opt">' + t.optional + '</span>') + '</span>' + input + '</label>';
  }

  // Construye el formulario (una sola definición para toda la web)
  function build(dossier, sendLabel) {
    uid++;
    var form = document.createElement('form');
    form.className = 'form';
    form.action = ENDPOINT;
    form.method = 'post';
    form.noValidate = true;
    form.setAttribute('data-tara-form', '');
    form.setAttribute('data-ok', t.ok);
    form.innerHTML =
      '<div class="form__grid">' +
      field(t.name, '<input type="text" name="nombre" autocomplete="name" required maxlength="120">', true) +
      field(t.email, '<input type="email" name="email" autocomplete="email" required maxlength="160">', true) +
      field(t.iam, '<select name="tipo" required><option value="">' + t.choose + '</option>' +
        TIPOS.map(function (v, i) { return '<option value="' + v + '">' + t.opts[i] + '</option>'; }).join('') + '</select>', true) +
      field(t.entity, '<input type="text" name="entidad" autocomplete="organization" required maxlength="160">', true) +
      field(t.role, '<input type="text" name="cargo" autocomplete="organization-title" maxlength="120">', false, true) +
      '<div class="field--hp" aria-hidden="true"><label>Web <input type="text" name="web" tabindex="-1" autocomplete="off"></label></div>' +
      '<input type="hidden" name="dossier" value="' + esc(dossier || '') + '">' +
      '<label class="check field--full"><input type="checkbox" name="privacidad" value="si" required><span>' + t.accept +
        ' <a class="inline-link" href="' + t.privacy + '" target="_blank" rel="noopener">' + t.policy + '</a>.</span></label>' +
      '</div>' +
      '<button class="btn btn--primary btn--lg form__send" type="submit"><span>' + esc(sendLabel || t.send) + '</span> <span class="arr" aria-hidden="true">→</span></button>' +
      '<p class="form__status" role="status" aria-live="polite"></p>' +
      '<p class="form__note">' + t.note + '</p>';
    // La marca «Pendiente» (t.pending / t.flag) se quitó a petición del cliente el 14-nov; los PDF y el correo siguen sin existir (ver PENDIENTES.md).
    if (window.taraForms) window.taraForms.init(form);
    return form;
  }

  // 1) Formularios dentro de la página
  Array.prototype.forEach.call(document.querySelectorAll('[data-dossier-form]'), function (box) {
    box.appendChild(build(box.getAttribute('data-dossier-form'), box.getAttribute('data-dossier-send')));
  });

  // 2) Ventana única, creada la primera vez que se abre
  var dialog = null, form = null, chosen = null, opener = null, autoTipo = '';
  function ensureDialog() {
    if (dialog) return;
    dialog = document.createElement('dialog');
    dialog.className = 'hm-dialog';
    dialog.setAttribute('aria-labelledby', 'dossierDialogTitle');
    dialog.innerHTML = '<div class="hm-dialog__in"><div class="hm-dialog__head"><div>' +
      '<h3 class="h3" id="dossierDialogTitle">' + t.title + '</h3>' +
      '<p class="hm-dialog__chosen">' + t.chosen + ' <strong></strong></p></div>' +
      '<button class="hm-close" type="button" aria-label="' + t.close + '">×</button></div></div>';
    chosen = dialog.querySelector('strong');
    form = build('');
    dialog.querySelector('.hm-dialog__in').appendChild(form);
    dialog.querySelector('.hm-close').addEventListener('click', function () { dialog.close(); });
    dialog.addEventListener('click', function (e) { if (e.target === dialog) dialog.close(); });
    dialog.addEventListener('close', function () { if (opener) opener.focus(); });
    document.body.appendChild(dialog);
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-dossier-open]');
    if (!btn) return;
    e.preventDefault();
    ensureDialog();
    opener = btn;
    var d = btn.getAttribute('data-dossier-open');
    form.elements.dossier.value = d;
    chosen.textContent = t.names[d] || d;
    // «Soy…» se rellena solo cuando el botón lo indica; si lo rellenamos nosotros antes y la persona no lo cambió, se limpia
    var sel = form.elements.tipo, tipo = btn.getAttribute('data-dossier-tipo') || '';
    if (autoTipo && sel.value === autoTipo) sel.value = '';
    autoTipo = '';
    if (tipo && !sel.value) { sel.value = tipo; autoTipo = tipo; }
    var st = form.querySelector('.form__status');
    st.textContent = ''; st.className = 'form__status';
    if (typeof dialog.showModal === 'function') dialog.showModal(); else dialog.setAttribute('open', '');
    form.elements.nombre.focus();
  });
})();
