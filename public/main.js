/* =========================================================
   soytara — interacción y movimiento
   Patrón IIFE, sin módulos. Cada init va protegido con safe().
   ========================================================= */

/* ---------------------------------------------------------
   ENLACES DE LOS BOTONES
   Rellenad aquí las URLs cuando estén listas. Si un enlace
   está vacío, el botón muestra un aviso de «Muy pronto».
   --------------------------------------------------------- */
window.TARA_LINKS = {
  chat: "/chat",      // «Habla con Tara» (abrir el chat)
  schools: "/escoles", // «Ver el programa para centros»
  privacy: "",   // Política de privacidad (pendiente: página legal propia)
  legal: "",     // Aviso legal (pendiente: página legal propia)
  rights: ""     // Cómo ejercer tus derechos (pendiente: página legal propia)
};

(function () {
  "use strict";

  var doc = document.documentElement;
  doc.classList.add("js");

  function safe(fn, name) {
    try { fn(); } catch (e) { if (window.console) console.warn("[tara] " + name + " falló:", e); }
  }
  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  var I18N = window.TaraI18n;
  function D() { return I18N ? I18N.d() : null; }

  /* ---------- Marquee: duplica la pista para un bucle continuo ---------- */
  function initMarquee() {
    var track = $(".marquee__track");
    if (!track || track.dataset.cloned) return;
    track.dataset.cloned = "1";
    Array.prototype.slice.call(track.children).forEach(function (n) {
      track.appendChild(n.cloneNode(true));
    });
  }

  /* ---------- Idioma ---------- */
  function initI18n() { if (I18N) I18N.init(); }

  /* ---------- Header + barra de progreso ---------- */
  function initHeader() {
    var header = $(".header"), bar = $(".progress span"), lastY = 0, ticking = false;
    function update() {
      var y = window.scrollY || window.pageYOffset;
      var h = document.body.scrollHeight - window.innerHeight;
      if (bar) bar.style.transform = "scaleX(" + (h > 0 ? Math.min(1, y / h) : 0) + ")";
      header.classList.toggle("is-scrolled", y > 20);
      var menuOpen = $(".nav.is-open");
      header.classList.toggle("is-hidden", !menuOpen && y > 500 && y > lastY + 4);
      if (y < lastY - 4 || y < 500) header.classList.remove("is-hidden");
      lastY = y; ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* ---------- Menú móvil ---------- */
  function initMenu() {
    var burger = $(".burger"), nav = $("#nav");
    if (!burger || !nav) return;
    function close() { nav.classList.remove("is-open"); burger.setAttribute("aria-expanded", "false"); document.body.style.overflow = ""; }
    burger.addEventListener("click", function () {
      var open = !nav.classList.contains("is-open");
      nav.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    $$("a", nav).forEach(function (a) { a.addEventListener("click", close); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  }

  /* ---------- Sección actual en el menú ---------- */
  function initCurrentNav() {
    if (!("IntersectionObserver" in window)) return;
    var links = $$(".nav a");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (l) { l.classList.toggle("is-current", l.getAttribute("href") === "#" + en.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    links.forEach(function (l) { var s = $(l.getAttribute("href")); if (s) io.observe(s); });
  }

  /* ---------- Revelado al hacer scroll + hilos que se dibujan ---------- */
  function initReveal() {
    $$(".draw").forEach(function (p) {
      try { p.style.setProperty("--len", Math.ceil(p.getTotalLength()) + 2); } catch (e) {}
    });
    var items = $$(".reveal, .draw");
    function show(el) { el.classList.add(el.classList.contains("draw") ? "is-drawn" : "is-in"); }
    if (!("IntersectionObserver" in window)) { items.forEach(show); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target, sibs = el.parentElement ? $$(":scope > .reveal", el.parentElement) : [];
        var i = sibs.indexOf(el);
        el.style.transitionDelay = (i > 0 ? Math.min(i, 6) * 80 : 0) + "ms";
        show(el);
        io.unobserve(el);
      });
    }, { threshold: 0.05, rootMargin: "0px 0px -6% 0px" });
    items.forEach(function (el) { io.observe(el); });
    // Red de seguridad: nada se queda oculto
    setTimeout(function () {
      $$(".reveal:not(.is-in)").forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight) show(el);
      });
    }, 6000);
  }

  /* ---------- Titulares: separa en palabras para que suban una a una ---------- */
  function initSplit() {
    var targets = $$(".h2, .final__title, .mirror__closing");
    function split(el) {
      var i = 0;
      function walk(node) {
        Array.prototype.slice.call(node.childNodes).forEach(function (n) {
          if (n.nodeType === 3) {
            var frag = document.createDocumentFragment();
            n.textContent.split(/(\s+)/).forEach(function (part) {
              if (!part) return;
              if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(" ")); return; }
              var w = document.createElement("span"), inner = document.createElement("span");
              w.className = "w"; inner.textContent = part; inner.style.setProperty("--i", i++);
              w.appendChild(inner); frag.appendChild(w);
            });
            node.replaceChild(frag, n);
          } else if (n.nodeType === 1 && n.tagName !== "BR") walk(n);
        });
      }
      walk(el);
      el.classList.add("split");
    }
    targets.forEach(split);
    // Tras cambiar de idioma el texto se reemplaza: se vuelve a partir ya visible
    if (I18N) I18N.onChange(function () {
      targets.forEach(function (el) { if (!el.querySelector(".w")) { split(el); el.classList.add("is-done"); } });
    });
    $$(".footer__mark span").forEach(function (s, k) { s.style.setProperty("--i", k); });
  }

  /* ---------- Iconos lineales: preparados para dibujarse ---------- */
  function initIconDraw() {
    $$(".icon svg *, .step__icon svg *").forEach(function (p) { p.setAttribute("pathLength", "1"); });
  }

  /* ---------- Chat animado del hero ---------- */
  function initHeroChat() {
    var box = $("#heroChat");
    if (!box) return;
    var run = 0;
    function wait(ms, id) { return new Promise(function (res, rej) { setTimeout(function () { id === run ? res() : rej(); }, ms); }); }
    function bubble(who, text) {
      var b = document.createElement("div");
      b.className = "msg msg--" + who;
      b.textContent = text;
      box.appendChild(b);
      while (box.children.length > 4) box.removeChild(box.firstChild);
      return b;
    }
    function typing() {
      var b = document.createElement("div");
      b.className = "msg msg--tara typing";
      b.innerHTML = "<i></i><i></i><i></i>";
      box.appendChild(b);
      return b;
    }
    function play() {
      var id = ++run;
      box.innerHTML = "";
      var script = D() ? D().chat : [];
      var p = wait(500, id);
      script.forEach(function (m) {
        p = p.then(function () {
          if (m[0] === "tara") {
            var ty = typing();
            return wait(1300, id).then(function () { ty.remove(); bubble("tara", m[1]); return wait(2300, id); });
          }
          bubble("me", m[1]);
          return wait(1500, id);
        });
      });
      p.then(function () { return wait(4200, id); })
       .then(function () {
         $$(".msg", box).forEach(function (m) { m.classList.add("is-leaving"); });
         return wait(600, id);
       })
       .then(play)
       .catch(function () {});
    }
    play();
    if (I18N) I18N.onChange(play);
  }

  /* ---------- «¿Te suena?»: respuesta de Tara ---------- */
  function initMirror() {
    var freqBox = $("#mirrorChips"), themeBox = $("#themeChips"), rail = $("#themeRail"), convo = $("#mirrorConvo");
    var help = $("#mirrorHelp"), helpText = $("#mirrorHelpText"), helpLines = $("#mirrorHelpLines");
    if (!freqBox || !convo || !rail) return;
    // tab: "freq" o índice de tema · pick: {kind:"case", id} | {kind:"theme", t, q}
    var tab = "freq", pick = null, timer = null;

    function buildRail() {
      $$(".rail__tab[data-theme]:not([data-theme='freq'])", rail).forEach(function (b) { b.remove(); });
      D().themes.forEach(function (th, i) {
        var b = document.createElement("button");
        b.type = "button"; b.className = "rail__tab"; b.setAttribute("role", "tab");
        b.setAttribute("data-theme", String(i));
        b.innerHTML = '<span class="rail__n">' + th.n + "</span><span></span>";
        b.lastChild.textContent = th.t;
        rail.appendChild(b);
      });
      syncRail();
    }
    function syncRail() {
      $$(".rail__tab", rail).forEach(function (b) {
        var on = b.getAttribute("data-theme") === String(tab);
        b.classList.toggle("is-active", on); b.setAttribute("aria-selected", on ? "true" : "false");
        if (on && rail.scrollWidth > rail.clientWidth) rail.scrollTo({ left: Math.max(0, b.offsetLeft - rail.offsetLeft - 12), behavior: "smooth" });
      });
    }
    function swapIn(box) { box.classList.remove("is-swapping"); void box.offsetWidth; box.classList.add("is-swapping"); }
    function showTab(animate) {
      var isFreq = tab === "freq";
      freqBox.hidden = !isFreq; themeBox.hidden = isFreq;
      if (!isFreq) {
        themeBox.innerHTML = "";
        D().themes[tab].q.forEach(function (q, k) {
          var c = document.createElement("button");
          c.type = "button"; c.className = "chip"; c.setAttribute("role", "listitem");
          c.setAttribute("data-q", String(k)); c.textContent = q;
          themeBox.appendChild(c);
        });
        themeBox.classList.add("is-in");
      }
      if (animate) swapIn(isFreq ? freqBox : themeBox);
      syncRail();
    }
    function markChips() {
      $$(".chip", freqBox).forEach(function (c) { var on = !!pick && pick.kind === "case" && pick.id === c.getAttribute("data-case"); c.classList.toggle("is-active", on); c.setAttribute("aria-pressed", on ? "true" : "false"); });
      $$(".chip", themeBox).forEach(function (c) { var on = !!pick && pick.kind === "theme" && pick.t === tab && String(pick.q) === c.getAttribute("data-q"); c.classList.toggle("is-active", on); c.setAttribute("aria-pressed", on ? "true" : "false"); });
    }
    function render(animate) {
      if (!pick) return;
      clearTimeout(timer);
      var d = D(), th = pick.kind === "theme" ? d.themes[pick.t] : null;
      var mine = th ? th.q[pick.q] : $('[data-case="' + pick.id + '"]').textContent.trim();
      var reply = th ? th.reply : d.cases[pick.id];
      convo.innerHTML = "";
      help.hidden = true;
      var me = document.createElement("div");
      me.className = "msg msg--me"; me.textContent = mine;
      convo.appendChild(me);
      var ty = document.createElement("div");
      ty.className = "msg msg--tara typing"; ty.innerHTML = "<i></i><i></i><i></i>";
      function answer() {
        if (ty.parentNode) ty.remove();
        var t = document.createElement("div");
        t.className = "msg msg--tara" + (th && th.crisis ? " is-care" : "");
        t.textContent = reply;
        convo.appendChild(t);
        if (!(th && th.crisis)) {
          var cta = document.createElement("a");
          cta.className = "btn btn--primary btn--sm convo__cta";
          cta.href = "#hablar"; cta.setAttribute("data-action", "chat");
          cta.textContent = d.followCta;
          convo.appendChild(cta);
        }
        if (th) {
          helpText.textContent = th.help;
          helpLines.hidden = !th.crisis;
          help.hidden = false;
          help.style.animation = "none"; void help.offsetWidth; help.style.animation = "";
        }
      }
      if (animate) { convo.appendChild(ty); timer = setTimeout(answer, 1100); } else answer();
    }

    rail.addEventListener("click", function (e) {
      var b = e.target.closest(".rail__tab"); if (!b) return;
      var v = b.getAttribute("data-theme");
      tab = v === "freq" ? "freq" : parseInt(v, 10);
      showTab(true);
      markChips();
    });
    freqBox.addEventListener("click", function (e) {
      var c = e.target.closest(".chip"); if (!c) return;
      pick = { kind: "case", id: c.getAttribute("data-case") };
      markChips(); render(true);
    });
    themeBox.addEventListener("click", function (e) {
      var c = e.target.closest(".chip"); if (!c) return;
      pick = { kind: "theme", t: tab, q: parseInt(c.getAttribute("data-q"), 10) };
      markChips(); render(true);
    });
    // Desde la franja de frases: lleva al tema y lo abre
    window.TaraOpenTheme = function (t, q) {
      tab = t; showTab(true);
      pick = { kind: "theme", t: t, q: q }; markChips(); render(true);
    };

    buildRail();
    if (I18N) I18N.onChange(function () {
      buildRail(); showTab(false); markChips(); render(false);
    });
  }

  /* ---------- Diez temas: frases + cómo puede acompañar ---------- */
  function initTopics() {
    var rail = $("#themeRail"), panel = $("#topicPanel"), quotes = $("#topicQuotes");
    var title = $("#topicTitle"), help = $("#topicHelp"), lines = $("#topicLines");
    if (!rail || !panel) return;
    var cur = 0;
    function buildRail() {
      rail.innerHTML = "";
      D().themes.forEach(function (th, i) {
        var b = document.createElement("button");
        b.type = "button"; b.className = "rail__tab"; b.setAttribute("role", "tab");
        b.setAttribute("data-theme", String(i));
        b.innerHTML = '<span class="rail__n">' + th.n + "</span><span></span>";
        b.lastChild.textContent = th.t;
        rail.appendChild(b);
      });
    }
    function show(i, highlight) {
      cur = i;
      var th = D().themes[i];
      $$(".rail__tab", rail).forEach(function (b, k) {
        var on = k === i;
        b.classList.toggle("is-active", on); b.setAttribute("aria-selected", on ? "true" : "false");
        if (on && rail.scrollWidth > rail.clientWidth) rail.scrollTo({ left: Math.max(0, b.offsetLeft - rail.offsetLeft - 12), behavior: "smooth" });
      });
      quotes.innerHTML = "";
      th.q.forEach(function (q, k) {
        var p = document.createElement("p");
        p.className = "tq" + (highlight === k ? " is-hl" : "");
        p.textContent = q;
        quotes.appendChild(p);
      });
      title.textContent = th.full;
      help.textContent = th.help;
      lines.hidden = !th.crisis;
      panel.classList.toggle("is-crisis", !!th.crisis);
      var box = $(".topic__help", panel);
      box.style.animation = "none"; void box.offsetWidth; box.style.animation = "";
    }
    rail.addEventListener("click", function (e) {
      var b = e.target.closest(".rail__tab"); if (b) show(parseInt(b.getAttribute("data-theme"), 10));
    });
    window.TaraOpenTheme = function (t, q) { show(t, q); };
    buildRail(); show(0);
    if (I18N) I18N.onChange(function () { buildRail(); show(cur); });
  }

  /* ---------- Conoce TARA: preguntas que se responden como un chat ---------- */
  function initFaq() {
    var faq = $("#faq"); if (!faq) return;
    faq.addEventListener("click", function (e) {
      var q = e.target.closest(".faq__q"); if (!q) return;
      var item = q.parentNode, a = $(".faq__a", item), open = q.getAttribute("aria-expanded") === "true";
      // Una respuesta abierta cada vez, como en una conversación
      $$(".faq__q", faq).forEach(function (o) {
        if (o !== q) { o.setAttribute("aria-expanded", "false"); $(".faq__a", o.parentNode).hidden = true; }
      });
      if (open) { q.setAttribute("aria-expanded", "false"); a.hidden = true; return; }
      q.setAttribute("aria-expanded", "true");
      a.hidden = false;
      var msg = $(".msg", a);
      msg.style.display = "none";
      var ty = document.createElement("div");
      ty.className = "msg msg--tara typing"; ty.innerHTML = "<i></i><i></i><i></i>";
      a.appendChild(ty);
      setTimeout(function () { ty.remove(); msg.style.display = ""; }, 800);
    });
  }

  /* ---------- Implementación: los niveles se activan como una escalera ---------- */
  function initLevels() {
    var list = $("#levels"); if (!list || !("IntersectionObserver" in window)) return;
    var items = $$(".level", list);
    list.classList.add("is-ready");
    var started = false;
    new IntersectionObserver(function (en) {
      if (!en[0].isIntersecting || started) return;
      started = true;
      items.forEach(function (li, k) {
        setTimeout(function () {
          li.classList.add("is-on");
          items.forEach(function (o) { o.classList.remove("is-current"); });
          li.classList.add("is-current");
          if (k === items.length - 1) setTimeout(function () {
            li.classList.remove("is-current"); items[0].classList.add("is-current");
          }, 900);
        }, 250 + k * 420);
      });
    }, { threshold: 0.15 }).observe(list);
    setTimeout(function () { if (!started) items.forEach(function (li) { li.classList.add("is-on"); }); }, 8000);
  }

  /* ---------- Regla obligatoria: la lista se marca una a una ---------- */
  function initRule() {
    var rule = $("#rule"); if (!rule || !("IntersectionObserver" in window)) return;
    var items = $$(".rule__list li", rule), done = false;
    new IntersectionObserver(function (en) {
      if (!en[0].isIntersecting || done) return;
      done = true;
      items.forEach(function (li, k) { setTimeout(function () { li.classList.add("is-checked"); }, 400 + k * 320); });
    }, { threshold: 0.3 }).observe(rule);
  }

  /* ---------- Segunda franja: frases de los 10 temas (sin el tema de crisis) ---------- */
  function initMarqueeThemes() {
    var track = $("#marqueeThemes");
    if (!track) return;
    function build() {
      track.innerHTML = "";
      var items = [];
      D().themes.forEach(function (th, t) {
        if (th.crisis) return;
        th.q.forEach(function (q, k) { items.push({ q: q, t: t, k: k }); });
      });
      // Mezcla estable: alterna temas para que no se agrupen
      items.sort(function (a, b) { return (a.k - b.k) || (a.t - b.t); });
      for (var pass = 0; pass < 2; pass++) {
        items.forEach(function (it) {
          var s = document.createElement("span");
          s.textContent = it.q;
          s.setAttribute("data-t", it.t); s.setAttribute("data-k", it.k);
          track.appendChild(s);
        });
      }
    }
    build();
    track.addEventListener("click", function (e) {
      var s = e.target.closest("span[data-t]"); if (!s || !window.TaraOpenTheme) return;
      window.TaraOpenTheme(parseInt(s.getAttribute("data-t"), 10), parseInt(s.getAttribute("data-k"), 10));
      var sec = $("#te-suena"); if (sec) sec.scrollIntoView({ behavior: "smooth" });
    });
    if (I18N) I18N.onChange(build);
  }

  /* ---------- Contador «10 temas» ---------- */
  function initCount() {
    var el = $("#quotesNum"); if (!el || !("IntersectionObserver" in window)) return;
    var target = parseInt(el.textContent, 10) || 10;
    var io = new IntersectionObserver(function (en) {
      if (!en[0].isIntersecting) return;
      io.disconnect();
      var start = null;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min(1, (ts - start) / 1400);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      }
      el.textContent = "0"; requestAnimationFrame(step);
    }, { threshold: 0.5 });
    io.observe(el);
  }

  /* ---------- Privacidad: el mensaje se cifra y se descifra ---------- */
  function initCipher() {
    var el = $("#cipher"); if (!el) return;
    var glyphs = "▓▒░#%&@$*+=<>/\\|{}[]0123456789abcdef";
    var frame = 0, phase = 0, hold = 0;
    function text() { return D() ? D().cipher : el.textContent; }
    function tick() {
      var plain = text(), out = "";
      // phase 0: cifrando · 1: cifrado · 2: descifrando · 3: claro
      if (phase === 1 || phase === 3) {
        hold++;
        out = phase === 1 ? plain.replace(/\S/g, function () { return glyphs[(Math.random() * glyphs.length) | 0]; }) : plain;
        if (hold > (phase === 1 ? 22 : 30)) { hold = 0; frame = 0; phase = (phase + 1) % 4; }
      } else {
        frame++;
        var n = Math.min(plain.length, frame);
        for (var i = 0; i < plain.length; i++) {
          var scrambled = phase === 0 ? i < n : i >= n;
          out += (scrambled && plain[i] !== " ") ? glyphs[(Math.random() * glyphs.length) | 0] : plain[i];
        }
        if (frame >= plain.length) { frame = 0; phase++; }
      }
      el.textContent = out;
    }
    setInterval(tick, 70);
  }

  /* ---------- Método: chispa que recorre el hilo ---------- */
  function initStepsDot() {
    var dot = $(".steps__dot"), path = $(".steps__thread path"), svg = $(".steps__thread"), wrap = $(".steps");
    if (!dot || !path || !svg) return;
    var len = path.getTotalLength(), t0 = null, DUR = 7000;
    function frame(ts) {
      if (!t0) t0 = ts;
      var p = ((ts - t0) % DUR) / DUR;
      var e = p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      var pt = path.getPointAtLength(e * len);
      var r = svg.getBoundingClientRect(), wr = wrap.getBoundingClientRect();
      dot.style.transform = "translate(" + (r.left - wr.left + pt.x * r.width / 1200) + "px," + (r.top - wr.top + pt.y * r.height / 60) + "px)";
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ---------- Cierre: ondas al mover o tocar ---------- */
  function initTouchRipples() {
    var sec = $(".final"); if (!sec) return;
    var layer = document.createElement("div");
    layer.className = "final__touch"; layer.setAttribute("aria-hidden", "true");
    sec.insertBefore(layer, sec.firstChild);
    var last = 0;
    function drop(x, y) {
      var r = sec.getBoundingClientRect(), i = document.createElement("i");
      i.style.left = (x - r.left) + "px"; i.style.top = (y - r.top) + "px";
      layer.appendChild(i);
      setTimeout(function () { i.remove(); }, 2500);
    }
    sec.addEventListener("pointermove", function (e) {
      var now = Date.now(); if (now - last < 260) return; last = now; drop(e.clientX, e.clientY);
    });
    sec.addEventListener("pointerdown", function (e) { drop(e.clientX, e.clientY); });
    // Sin ratón: una gota cada cierto tiempo para que el bloque respire
    setInterval(function () {
      var r = sec.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      drop(r.left + r.width * (.2 + Math.random() * .6), r.top + r.height * (.25 + Math.random() * .5));
    }, 2200);
  }

  /* ---------- Método: pasos + ejemplo con avance automático ---------- */
  function initSteps() {
    var steps = $$(".step"), out = $(".example__out"), stepEl = $("#exStep"), textEl = $("#exText"), dots = $$(".example__dots i"), dotsWrap = $(".example__dots");
    if (!steps.length || !out) return;
    var idx = 0, auto = true, timer = null, DUR = 5000, visible = false;
    dotsWrap.style.setProperty("--dur", DUR + "ms");
    function go(i, fromUser) {
      idx = i;
      steps.forEach(function (s, k) { s.classList.toggle("is-active", k === i); s.setAttribute("aria-selected", k === i ? "true" : "false"); });
      dots.forEach(function (d, k) { d.classList.remove("on"); void d.offsetWidth; d.classList.toggle("on", k === i); });
      stepEl.textContent = D().steps[i];
      textEl.textContent = D().example[i];
      out.classList.remove("swap"); void out.offsetWidth; out.classList.add("swap");
      if (fromUser) { auto = false; dotsWrap.classList.add("paused"); }
      schedule();
    }
    function schedule() {
      clearTimeout(timer);
      if (auto && visible) timer = setTimeout(function () { go((idx + 1) % steps.length); }, DUR);
    }
    steps.forEach(function (s, k) { s.addEventListener("click", function () { go(k, true); }); });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (en) {
        visible = en[0].isIntersecting;
        if (visible && auto) go(idx); else clearTimeout(timer);
      }, { threshold: 0.2 }).observe($(".example"));
    }
    if (I18N) I18N.onChange(function () { stepEl.textContent = D().steps[idx]; textEl.textContent = D().example[idx]; });
  }

  /* ---------- Botones magnéticos ---------- */
  function initMagnetic() {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    $$(".magnetic").forEach(function (b) {
      b.addEventListener("mousemove", function (e) {
        var r = b.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) * 0.22, y = (e.clientY - r.top - r.height / 2) * 0.32;
        b.style.transform = "translate(" + x + "px," + y + "px)";
      });
      b.addEventListener("mouseleave", function () { b.style.transform = ""; });
    });
  }

  /* ---------- Inclinación suave en tarjetas ---------- */
  function initTilt() {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    $$(".tilt, .te-card").forEach(function (c) {
      c.addEventListener("mousemove", function (e) {
        var r = c.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        c.style.transform = "perspective(900px) rotateX(" + (-y * 3) + "deg) rotateY(" + (x * 4) + "deg) translateY(-3px)";
      });
      c.addEventListener("mouseleave", function () { c.style.transform = ""; });
    });
  }

  /* ---------- Parallax sutil de las ondas ---------- */
  function initParallax() {
    var r = $(".hero__ripples"), v = $(".hero__visual");
    if (!r) return;
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return; ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        if (y < window.innerHeight * 1.2) {
          r.style.marginTop = (y * 0.25) + "px";
          if (v && window.innerWidth > 960) v.style.transform = "translateY(" + (y * -0.08) + "px)";
        }
        ticking = false;
      });
    }, { passive: true });
  }

  /* ---------- Botones con acción (enlaces pendientes) ---------- */
  function initActions() {
    var toast = document.createElement("div");
    toast.className = "toast"; toast.setAttribute("role", "status"); toast.setAttribute("aria-live", "polite");
    document.body.appendChild(toast);
    var hideT;
    document.addEventListener("click", function (e) {
      var a = e.target.closest("[data-action]");
      if (!a) return;
      var url = (window.TARA_LINKS || {})[a.getAttribute("data-action")];
      if (url) { e.preventDefault(); window.location.href = url; return; }
      // Sin enlace todavía: el CTA del chat lleva al cierre; los demás avisan
      if (a.getAttribute("data-action") === "chat" && !a.closest(".final")) return;
      e.preventDefault();
      toast.textContent = D() ? D().soon : "";
      toast.classList.add("is-on");
      clearTimeout(hideT);
      hideT = setTimeout(function () { toast.classList.remove("is-on"); }, 3200);
    });
  }

  function boot() {
    safe(initMarquee, "marquee");
    safe(initI18n, "i18n");
    safe(initHeader, "header");
    safe(initMenu, "menu");
    safe(initCurrentNav, "nav");
    safe(initSplit, "split");
    safe(initIconDraw, "iconDraw");
    safe(initReveal, "reveal");
    safe(initHeroChat, "heroChat");
    safe(initMirror, "mirror");
    safe(initTopics, "topics");
    safe(initFaq, "faq");
    safe(initLevels, "levels");
    safe(initRule, "rule");
    safe(initMarqueeThemes, "marqueeThemes");
    safe(initCount, "count");
    safe(initCipher, "cipher");
    safe(initStepsDot, "stepsDot");
    safe(initTouchRipples, "touchRipples");
    safe(initSteps, "steps");
    safe(initMagnetic, "magnetic");
    safe(initTilt, "tilt");
    safe(initParallax, "parallax");
    safe(initActions, "actions");
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
