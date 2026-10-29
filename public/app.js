(function () {
  var root = document.documentElement;

  /* ---------- Theme ---------- */
  function getTheme() { try { return localStorage.getItem("theme") || "light"; } catch (e) { return "light"; } }
  function setTheme(t) {
    root.classList.toggle("dark", t === "dark");
    root.style.colorScheme = t;
    try { localStorage.setItem("theme", t); } catch (e) {}
    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
      btn.querySelector(".ic-moon").classList.toggle("hide", t === "dark");
      btn.querySelector(".ic-sun").classList.toggle("hide", t !== "dark");
    });
  }

  /* ---------- Sound (synthesised, no audio files) ---------- */
  var soundOn = (function () { try { return localStorage.getItem("sound") !== "off"; } catch (e) { return true; } })();
  var ctx = null;
  function beep(freq, dur, gain, type) {
    if (!soundOn) return;
    try {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      var o = ctx.createOscillator(), g = ctx.createGain();
      o.type = type || "sine"; o.frequency.value = freq;
      g.gain.setValueAtTime(gain, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + dur);
      o.connect(g); g.connect(ctx.destination);
      o.start(); o.stop(ctx.currentTime + dur);
    } catch (e) {}
  }
  var sfx = {
    hover: function () { beep(1800, 0.04, 0.02, "sine"); },
    click: function () { beep(900, 0.08, 0.06, "triangle"); },
    toggle: function () { beep(600, 0.12, 0.06, "sine"); setTimeout(function () { beep(1200, 0.1, 0.05, "sine"); }, 60); },
    shuffle: function () { beep(400, 0.15, 0.05, "sawtooth"); }
  };
  function setSound(on) {
    soundOn = on;
    try { localStorage.setItem("sound", on ? "on" : "off"); } catch (e) {}
    document.querySelectorAll("[data-sound-toggle]").forEach(function (btn) {
      btn.querySelector(".ic-on").classList.toggle("hide", !on);
      btn.querySelector(".ic-off").classList.toggle("hide", on);
      btn.setAttribute("aria-label", on ? "Disable sound" : "Enable sound");
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    setTheme(getTheme());
    setSound(soundOn);

    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        sfx.toggle();
        setTheme(root.classList.contains("dark") ? "light" : "dark");
      });
    });
    document.querySelectorAll("[data-sound-toggle]").forEach(function (btn) {
      btn.addEventListener("click", function () { setSound(!soundOn); sfx.click(); });
    });

    /* hover + click sounds on interactive things */
    document.querySelectorAll("a, button").forEach(function (el) {
      el.addEventListener("mouseenter", function () { sfx.hover(); });
      el.addEventListener("click", function () { if (!el.hasAttribute("data-theme-toggle") && !el.hasAttribute("data-sound-toggle")) sfx.click(); });
    });

    /* ---------- Staggered reveal ---------- */
    document.querySelectorAll(".reveal").forEach(function (el, i) {
      setTimeout(function () { el.classList.add("is-in"); }, 80 + i * 120);
    });

    /* ---------- Grid / list toggles ---------- */
    document.querySelectorAll("[data-collection]").forEach(function (section) {
      var items = JSON.parse(section.getAttribute("data-items"));
      var initial = parseInt(section.getAttribute("data-initial") || items.length, 10);
      var body = section.querySelector("[data-body]");
      var seeMore = section.querySelector("[data-see-more]");
      var view = section.getAttribute("data-view") || "grid";
      var expanded = false;

      function visible() { return expanded ? items : items.slice(0, initial); }

      function renderGrid() {
        var grid = document.createElement("div");
        grid.className = "grid";
        visible().forEach(function (it) {
          var cell = document.createElement("div"); cell.className = "cell enter";
          var a = document.createElement("a"); a.className = "card"; a.href = it.href || "#";
          if (!it.href) { a.addEventListener("click", function (e) { e.preventDefault(); }); }
          var media = document.createElement("div");
          media.className = "card-media" + (it.bg ? " has-bg" : "");
          var inner = document.createElement("div"); inner.className = it.bg ? "framed" : "inset";
          var img = document.createElement("img"); img.src = it.src; img.alt = it.title; img.loading = "lazy";
          inner.appendChild(img); media.appendChild(inner);
          var text = document.createElement("div"); text.className = "card-text";
          var h = document.createElement("h3"); h.textContent = it.title;
          var p = document.createElement("p"); p.textContent = it.description;
          text.appendChild(h); text.appendChild(p);
          a.appendChild(media); a.appendChild(text); cell.appendChild(a); grid.appendChild(cell);
        });
        return grid;
      }
      function renderList() {
        var ul = document.createElement("ul"); ul.className = "list";
        visible().forEach(function (it) {
          var li = document.createElement("li"); li.className = "list-item";
          var row = document.createElement(it.href ? "a" : "div"); row.className = "list-row";
          if (it.href) row.href = it.href;
          var t = document.createElement("span"); t.className = "list-title"; t.textContent = it.title;
          var m = document.createElement("span"); m.className = "list-meta"; m.textContent = it.description;
          row.appendChild(t); row.appendChild(m); li.appendChild(row); ul.appendChild(li);
        });
        return ul;
      }
      function render() {
        body.innerHTML = "";
        var node = view === "grid" ? renderGrid() : renderList();
        body.appendChild(node);
        requestAnimationFrame(function () {
          node.querySelectorAll(".cell").forEach(function (c, i) {
            setTimeout(function () { c.classList.remove("enter"); }, 40 * i);
          });
        });
        node.querySelectorAll("a, .list-item").forEach(function (el) {
          el.addEventListener("mouseenter", function () { sfx.hover(); });
          el.addEventListener("click", function () { sfx.click(); });
        });
        if (seeMore) seeMore.classList.toggle("hidden", expanded || items.length <= initial);
        section.querySelectorAll("[data-view-btn]").forEach(function (b) {
          b.setAttribute("aria-pressed", b.getAttribute("data-view-btn") === view ? "true" : "false");
        });
      }
      section.querySelectorAll("[data-view-btn]").forEach(function (b) {
        b.addEventListener("click", function () {
          var v = b.getAttribute("data-view-btn");
          if (v === view) return;
          view = v; sfx.shuffle(); render();
        });
      });
      if (seeMore) seeMore.querySelector("button").addEventListener("click", function () { expanded = true; render(); });
      render();
    });

    /* ---------- Case study: TOC, progress, lightbox ---------- */
    var toc = document.querySelector("[data-toc]");
    if (toc) {
      var links = Array.prototype.slice.call(toc.querySelectorAll(".toc-link"));
      var sections = links.map(function (l) { return document.getElementById(l.getAttribute("data-target")); });
      function setActive(id) { links.forEach(function (l) { l.classList.toggle("active", l.getAttribute("data-target") === id); }); }
      links.forEach(function (l) {
        l.addEventListener("click", function () {
          var s = document.getElementById(l.getAttribute("data-target"));
          if (s) s.scrollIntoView({ behavior: "smooth", block: "start" });
          setActive(l.getAttribute("data-target"));
        });
      });
      function onScroll() {
        var y = window.scrollY + 120, current = sections[0] && sections[0].id;
        sections.forEach(function (s) { if (s && s.offsetTop <= y) current = s.id; });
        setActive(current);
        var bar = document.querySelector("[data-progress]");
        if (bar) {
          var max = document.documentElement.scrollHeight - window.innerHeight;
          bar.style.width = (max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0) + "%";
        }
      }
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    var lb = document.querySelector("[data-lightbox]");
    if (lb) {
      document.querySelectorAll("[data-zoom]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var src = btn.getAttribute("data-zoom"), kind = btn.getAttribute("data-zoom-kind") || "image";
          lb.innerHTML = "";
          var el = document.createElement(kind === "video" ? "video" : "img");
          el.src = src; if (kind === "video") { el.autoplay = true; el.loop = true; el.muted = true; el.playsInline = true; }
          lb.appendChild(el); lb.classList.add("open");
        });
      });
      lb.addEventListener("click", function () { lb.classList.remove("open"); lb.innerHTML = ""; });
      document.addEventListener("keydown", function (e) { if (e.key === "Escape") { lb.classList.remove("open"); lb.innerHTML = ""; } });
    }
  });
})();
