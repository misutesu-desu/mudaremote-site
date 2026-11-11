(function () {
  var root = document.documentElement;
  var tr = root.lang === "tr";

  // Theme: follows the system until the visitor picks one.
  var btn = document.querySelector(".theme-btn");
  function current() {
    var set = root.getAttribute("data-theme");
    if (set) return set;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }
  function label() {
    if (!btn) return;
    var next = current() === "dark" ? "light" : "dark";
    var text = tr
      ? (next === "light" ? "Açık temaya geç" : "Koyu temaya geç")
      : "Switch to " + next + " theme";
    btn.setAttribute("aria-label", text);
    btn.title = text;
  }
  if (btn) {
    label();
    btn.addEventListener("click", function () {
      var next = current() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      label();
    });
  }

  // Last release date from GitHub. The page already shows a static date, this only refreshes it.
  var slots = document.querySelectorAll("[data-last-release]");
  if (!slots.length || !window.fetch) return;
  var cacheKey = "lastRelease";
  function show(iso, tag) {
    var d = new Date(iso);
    if (isNaN(d)) return;
    var text = d.toLocaleDateString(tr ? "tr-TR" : "en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });
    slots.forEach(function (el) {
      el.textContent = text;
      el.setAttribute("datetime", iso.slice(0, 10));
    });
    if (tag) document.querySelectorAll("[data-last-tag]").forEach(function (el) { el.textContent = tag; });
  }
  try {
    var cached = JSON.parse(sessionStorage.getItem(cacheKey) || "null");
    if (cached) { show(cached.d, cached.t); return; }
  } catch (e) {}
  fetch("https://api.github.com/repos/misutesu-desu/MudaRemote/releases/latest", { headers: { Accept: "application/vnd.github+json" } })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (j) {
      if (!j || !j.published_at) return;
      show(j.published_at, j.tag_name);
      try { sessionStorage.setItem(cacheKey, JSON.stringify({ d: j.published_at, t: j.tag_name })); } catch (e) {}
    })
    .catch(function () {});
})();
