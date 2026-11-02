/* =========================================================
   TARA — interacción y movimiento
   Patrón IIFE, sin módulos. Cada init va protegido con safe().
   El HTML llega ya traducido desde el servidor (un dominio, un
   idioma); aquí solo viven los textos que genera el script, en
   window.__TARA__ = { lang, d }.
   ========================================================= */
(function () {
  "use strict";

  var doc = document.documentElement;
  doc.classList.add("js");
  var T = window.__TARA__ || { lang: "es", d: {} };
  function D() { return T.d || {}; }

  function safe(fn, name) {
    try { fn(); } catch (e) { if (window.console) console.warn("[tara] " + name + " falló:", e); }
  }
  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Header + barra de progreso ---------- */
  function initHeader() {
    var header = $(".header"), bar = $(".progress span"), lastY = 0, ticking = false;
    if (!header) return;
    function update() {
      var y = window.scrollY || window.pageYOffset;
      var h = document.body.scrollHeight - window.innerHeight;
      if (bar) bar.style.transform = "scaleX(" + (h > 0 ? Math.min(1, y / h) : 0) + ")";
      header.classList.toggle("is-scrolled", y > 20);
      var menuOpen = $(".nav.is-open");
      header.classList.toggle("is-hidden", !menuOpen && y > 500 && y > lastY + 4 && !header.contains(document.activeElement));
      if (y < lastY - 4 || y < 500) header.classList.remove("is-hidden");
      lastY = y; ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    // Con teclado, la cabecera vuelve a verse al recibir el foco
    header.addEventListener("focusin", function () { header.classList.remove("is-hidden"); });
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
    var links = $$(".nav a").filter(function (l) { return l.getAttribute("href").charAt(0) === "#"; });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (l) { l.classList.toggle("is-current", l.getAttribute("href") === "#" + en.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    links.forEach(function (l) { var s = $(l.getAttribute("href")); if (s) io.observe(s); });
  }

  /* ---------- Selector de idioma: lleva al mismo apartado en el otro dominio ---------- */
  function initLangLinks() {
    var sections = $$("main section[id]");
    function currentSection() {
      var best = "", top = window.innerHeight * 0.4;
      sections.forEach(function (s) { if (s.getBoundingClientRect().top <= top) best = s.id; });
      return best && best !== "inicio" ? "#" + best : "";
    }
    document.addEventListener("click", function (e) {
      var a = e.target.closest("a[data-lang-link]");
      if (!a || !sections.length) return;
      var hash = currentSection();
      if (hash) a.href = a.href.split("#")[0] + hash;
    });
  }

  /* ---------- Revelado al hacer scroll + hilos que se dibujan ---------- */
  function initReveal() {
    $$(".draw").forEach(function (p) {
      try { p.style.setProperty("--len", Math.ceil(p.getTotalLength()) + 2); } catch (e) {}
    });
    var items = $$(".reveal, .draw");
    function show(el) { el.classList.add(el.classList.contains("draw") ? "is-drawn" : "is-in"); }
    if (!("IntersectionObserver" in window) || reduceMotion) { items.forEach(show); return; }
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
    // Red de seguridad: nada se queda oculto (también al saltar a un ancla)
    function sweep() {
      $$(".reveal:not(.is-in)").forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) show(el);
      });
    }
    setTimeout(sweep, 2500);
    window.addEventListener("hashchange", function () { setTimeout(sweep, 400); });
  }

  /* ---------- Titulares: separa en palabras para que suban una a una ---------- */
  function initSplit() {
    if (reduceMotion) return;
    $$(".h2.reveal, .final__title.reveal").forEach(function (el) {
      var i = 0;
      (function walk(node) {
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
      })(el);
      el.classList.add("split");
    });
    $$(".footer__mark span").forEach(function (s, k) { s.style.setProperty("--i", k); });
  }

  /* ---------- Iconos lineales: preparados para dibujarse ---------- */
  function initIconDraw() {
    $$(".icon svg *").forEach(function (p) { p.setAttribute("pathLength", "1"); });
  }

  /* ---------- Maqueta del hero: una docente prepara una reunión ---------- */
  function initHeroChat() {
    var box = $("#heroChat");
    if (!box) return;
    var script = D().chat || [];
    function bubble(who, text) {
      var b = document.createElement("div");
      b.className = "msg msg--" + who;
      b.textContent = text;
      box.appendChild(b);
      return b;
    }
    if (reduceMotion) { script.forEach(function (m) { bubble(m[0], m[1]); }); return; }
    var run = 0;
    function wait(ms, id) { return new Promise(function (res, rej) { setTimeout(function () { id === run ? res() : rej(); }, ms); }); }
    function play() {
      var id = ++run;
      box.innerHTML = "";
      var p = wait(400, id);
      script.forEach(function (m) {
        p = p.then(function () {
          if (m[0] === "tara") {
            var ty = document.createElement("div");
            ty.className = "msg msg--tara typing"; ty.innerHTML = "<i></i><i></i><i></i>";
            box.appendChild(ty);
            return wait(1400, id).then(function () { ty.remove(); bubble("tara", m[1]); return wait(2600, id); });
          }
          bubble("me", m[1]);
          return wait(1300, id);
        });
      });
      p.then(function () { return wait(7000, id); })
       .then(function () {
         $$(".msg", box).forEach(function (m) { m.classList.add("is-leaving"); });
         return wait(600, id);
       })
       .then(play)
       .catch(function () {});
    }
    play();
  }

  /* ---------- Ejemplos por pestañas (Profesorado / Familias) ---------- */
  function initExamples() {
    var tabs = $$(".ex__tab");
    if (!tabs.length) return;
    function select(tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.tabIndex = on ? 0 : -1;
        var panel = document.getElementById(t.getAttribute("aria-controls"));
        if (panel) panel.classList.toggle("is-on", on);
      });
      if (focus) tab.focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () { select(t); });
      t.addEventListener("keydown", function (e) {
        var k = e.key, n = null;
        if (k === "ArrowRight") n = tabs[(i + 1) % tabs.length];
        else if (k === "ArrowLeft") n = tabs[(i - 1 + tabs.length) % tabs.length];
        else if (k === "Home") n = tabs[0];
        else if (k === "End") n = tabs[tabs.length - 1];
        if (n) { e.preventDefault(); select(n, true); }
      });
    });
  }

  /* ---------- Implementación: los niveles se activan como una escalera ---------- */
  function initLevels() {
    var list = $("#levels"); if (!list || !("IntersectionObserver" in window) || reduceMotion) return;
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

  /* ---------- Formulario único de contacto ---------- */
  function initForm() {
    var form = $("#contactForm"); if (!form) return;
    var status = $("#formStatus"), send = $(".form__send", form), f = D().form || {};
    var tipo = form.elements.tipo, dossier = form.elements.dossier, msg = form.elements.mensaje;

    // Los botones de las tarjetas eligen el tipo de entidad (y el dossier)
    $$("[data-entity]").forEach(function (b) {
      b.addEventListener("click", function () {
        if (tipo) tipo.value = b.getAttribute("data-entity");
        var d = b.getAttribute("data-dossier") || "";
        if (dossier) dossier.value = d;
        if (d && msg && !msg.value) msg.value = d === "centros" ? (f.dossierCentros || "") : (f.dossierInst || "");
        setTimeout(function () { var first = form.elements.nombre; if (first) first.focus({ preventScroll: true }); }, 450);
      });
    });

    function setStatus(text, kind, mail) {
      status.textContent = text;
      status.className = "form__status" + (kind ? " is-" + kind : "");
      if (mail) {
        var a = document.createElement("a");
        a.className = "inline-link"; a.href = "mailto:tara@soytara.com"; a.textContent = " tara@soytara.com";
        status.appendChild(a);
        status.appendChild(document.createTextNode("."));
      }
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var bad = $$("input, select, textarea", form).filter(function (el) { return el.willValidate && !el.checkValidity(); });
      $$(".field, .check", form).forEach(function (l) { l.classList.remove("is-invalid"); });
      bad.forEach(function (el) {
        var l = el.closest(".field, .check"); if (l) l.classList.add("is-invalid");
        el.setAttribute("aria-invalid", "true");
      });
      if (bad.length) { setStatus(f.invalid || "", "error"); bad[0].focus(); return; }
      $$("[aria-invalid]", form).forEach(function (el) { el.removeAttribute("aria-invalid"); });

      var data = {};
      Array.prototype.forEach.call(form.elements, function (el) {
        if (!el.name) return;
        data[el.name] = el.type === "checkbox" ? el.checked : el.value;
      });
      data.lang = T.lang;
      send.disabled = true;
      setStatus(f.sending || "", "");
      fetch(form.action, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
        .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { return { ok: r.ok && j.ok, status: r.status }; }); })
        .then(function (res) {
          if (res.ok) {
            form.reset();
            setStatus(f.ok || "", "ok");
          } else if (res.status === 400) {
            setStatus(f.invalid || "", "error");
          } else {
            setStatus(f.error || "", "error", true);
          }
        })
        .catch(function () { setStatus(f.error || "", "error", true); })
        .then(function () { send.disabled = false; });
    });
  }

  /* ---------- Cierre: ondas al mover o tocar ---------- */
  function initTouchRipples() {
    var sec = $(".final"); if (!sec || reduceMotion) return;
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
  }

  /* ---------- Botones magnéticos e inclinación suave ---------- */
  function initPointerFx() {
    if (reduceMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    $$(".magnetic").forEach(function (b) {
      b.addEventListener("mousemove", function (e) {
        var r = b.getBoundingClientRect();
        b.style.transform = "translate(" + (e.clientX - r.left - r.width / 2) * 0.22 + "px," + (e.clientY - r.top - r.height / 2) * 0.32 + "px)";
      });
      b.addEventListener("mouseleave", function () { b.style.transform = ""; });
    });
    $$(".tilt, .te-card").forEach(function (c) {
      c.addEventListener("mousemove", function (e) {
        var r = c.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        c.style.transform = "perspective(900px) rotateX(" + (-y * 3) + "deg) rotateY(" + (x * 4) + "deg) translateY(-3px)";
      });
      c.addEventListener("mouseleave", function () { c.style.transform = ""; });
    });
  }

  function boot() {
    safe(initHeader, "header");
    safe(initMenu, "menu");
    safe(initCurrentNav, "nav");
    safe(initLangLinks, "langLinks");
    safe(initSplit, "split");
    safe(initIconDraw, "iconDraw");
    safe(initReveal, "reveal");
    safe(initHeroChat, "heroChat");
    safe(initExamples, "examples");
    safe(initLevels, "levels");
    safe(initForm, "form");
    safe(initTouchRipples, "touchRipples");
    safe(initPointerFx, "pointerFx");
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
