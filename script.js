/* ==========================================================================
   Portfólio — Henrique Cardoso Silva
   Tudo é gerado a partir de data/projects.js e data/skills.js.
   ========================================================================== */
(function () {
  "use strict";

  const PROJECTS_ALL = Array.isArray(window.PROJECTS) ? window.PROJECTS : [];
  const SKILLS = Array.isArray(window.SKILLS) ? window.SKILLS : [];
  const SKILL_LEVELS = window.SKILL_LEVELS || {};

  // index.html?rascunhos → mostra rascunhos e campos a preencher
  const params = new URLSearchParams(location.search);
  const REVIEW_MODE = params.has("rascunhos") || params.has("drafts");
  const PROJECTS = PROJECTS_ALL.filter((p) => REVIEW_MODE || !p.draft);

  const CATEGORY_LABELS = {
    web: "Web",
    mobile: "Mobile",
    ia: "IA",
    cloud: "Cloud",
    games: "Games",
    academico: "Acadêmico",
  };

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const esc = (value) =>
    String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  const isFilled = (v) => (Array.isArray(v) ? v.length > 0 : typeof v === "string" ? v.trim() !== "" : !!v);
  const asList = (v) => (Array.isArray(v) ? v : isFilled(v) ? [v] : []);
  const icon = (id) => `<svg class="icon" aria-hidden="true"><use href="#i-${id}"/></svg>`;
  const initials = (name) =>
    name.split(/\s+/).filter((w) => /^[A-Za-zÀ-ú0-9]/.test(w)).slice(0, 2).map((w) => w[0].toUpperCase()).join("");
  const normImage = (img) => (typeof img === "string" ? { src: img, alt: "" } : img);

  document.documentElement.classList.remove("no-js");

  /* ------------------------------ Boas-vindas ------------------------------ */
  const welcome = $("#welcome");
  const WELCOME_KEY = "hcs-welcome-seen";

  function readSeen() {
    try { return sessionStorage.getItem(WELCOME_KEY) === "1"; } catch { return false; }
  }
  function markSeen() {
    try { sessionStorage.setItem(WELCOME_KEY, "1"); } catch { /* sem storage */ }
  }

  function setupWelcome() {
    const deepLink = location.hash && location.hash !== "#";
    if (readSeen() || deepLink) {
      welcome.classList.add("is-hidden");
      return;
    }
    document.body.classList.add("is-locked");
    $("#conteudo").setAttribute("aria-hidden", "true");
    $("#nav").setAttribute("aria-hidden", "true");
    const btn = $("#welcome-continue");
    requestAnimationFrame(() => btn.focus({ preventScroll: true }));
    btn.addEventListener("click", closeWelcome);
  }

  function closeWelcome() {
    markSeen();
    welcome.classList.add("is-leaving");
    document.body.classList.remove("is-locked");
    $("#conteudo").removeAttribute("aria-hidden");
    $("#nav").removeAttribute("aria-hidden");
    window.scrollTo(0, 0);
    const done = () => {
      welcome.classList.add("is-hidden");
      $("#hero-title").setAttribute("tabindex", "-1");
      $("#hero-title").focus({ preventScroll: true });
    };
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    reduce ? done() : setTimeout(done, 750);
  }

  /* ------------------------------ Navegação ------------------------------ */
  function setupNav() {
    const nav = $("#nav");
    const toggle = $("#nav-toggle");
    const menu = $("#nav-menu");

    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
      menu.classList.toggle("is-open", open);
      nav.classList.toggle("menu-open", open);
    };

    toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
    $$("a", menu).forEach((a) => a.addEventListener("click", () => setOpen(false)));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && menu.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });
    document.addEventListener("click", (e) => {
      if (menu.classList.contains("is-open") && !nav.contains(e.target)) setOpen(false);
    });

    const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Link ativo conforme a seção visível
    const links = $$("[data-nav]");
    const sections = links.map((a) => $(a.getAttribute("href"))).filter(Boolean);
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            links.forEach((a) => {
              const active = a.getAttribute("href") === "#" + entry.target.id;
              a.classList.toggle("is-active", active);
              if (active) a.setAttribute("aria-current", "true");
              else a.removeAttribute("aria-current");
            });
          });
        },
        { rootMargin: "-45% 0px -50% 0px" }
      );
      sections.forEach((s) => io.observe(s));
    }
  }

  /* ------------------------------ Filtros ------------------------------ */
  const filterState = { category: "all", tech: "all" };

  function matches(p) {
    const cats = p.categories || [];
    const techs = p.technologies || [];
    return (
      (filterState.category === "all" || cats.includes(filterState.category)) &&
      (filterState.tech === "all" || techs.includes(filterState.tech))
    );
  }

  function renderFilters() {
    // Categorias presentes nos projetos, na ordem de CATEGORY_LABELS
    const catCount = {};
    PROJECTS.forEach((p) => (p.categories || []).forEach((c) => (catCount[c] = (catCount[c] || 0) + 1)));
    const cats = Object.keys(CATEGORY_LABELS).filter((c) => catCount[c])
      .concat(Object.keys(catCount).filter((c) => !(c in CATEGORY_LABELS)));

    // Tecnologias: mais usadas primeiro
    const techCount = {};
    PROJECTS.forEach((p) => (p.technologies || []).forEach((t) => (techCount[t] = (techCount[t] || 0) + 1)));
    const techs = Object.keys(techCount).sort((a, b) => techCount[b] - techCount[a] || a.localeCompare(b, "pt-BR"));

    const btn = (group, value, label, count) =>
      `<button type="button" class="filter-btn" data-group="${group}" data-value="${esc(value)}" aria-pressed="${filterState[group] === value}">${esc(label)}${count ? `<span class="count">${count}</span>` : ""}</button>`;

    $("#filter-categories").innerHTML =
      btn("category", "all", "Todos") + cats.map((c) => btn("category", c, CATEGORY_LABELS[c] || c, catCount[c])).join("");
    const VISIBLE_TECHS = 12;
    const extra = techs.length - VISIBLE_TECHS;
    $("#filter-techs").innerHTML =
      btn("tech", "all", "Todas") +
      techs.map((t, i) => btn("tech", t, t, techCount[t]).replace("<button", i >= VISIBLE_TECHS ? '<button data-extra hidden' : "<button")).join("") +
      (extra > 0 ? `<button type="button" class="filter-btn filter-btn--more" id="filter-more" aria-expanded="false">+${extra} tecnologias</button>` : "");

    if (!techs.length) $("#filter-techs").closest(".filters__group").hidden = true;
  }

  function setupFilters() {
    $("#filters").addEventListener("click", (e) => {
      const more = e.target.closest("#filter-more");
      if (more) {
        const open = more.getAttribute("aria-expanded") !== "true";
        $$("#filter-techs [data-extra]").forEach((x) => (x.hidden = !open));
        more.setAttribute("aria-expanded", String(open));
        more.textContent = open ? "Mostrar menos" : `+${$$("#filter-techs [data-extra]").length} tecnologias`;
        return;
      }
      const b = e.target.closest(".filter-btn");
      if (!b) return;
      filterState[b.dataset.group] = b.dataset.value;
      $$(`.filter-btn[data-group="${b.dataset.group}"]`).forEach((x) =>
        x.setAttribute("aria-pressed", String(x === b))
      );
      renderProjects();
    });
    $("#filters-reset").addEventListener("click", () => {
      filterState.category = "all";
      filterState.tech = "all";
      $$(".filter-btn[data-group]").forEach((x) => x.setAttribute("aria-pressed", String(x.dataset.value === "all")));
      renderProjects();
    });
  }

  /* ------------------------------ Cards ------------------------------ */
  function coverHtml(p, eager) {
    const cover = p.cover || (p.images && p.images[0] && normImage(p.images[0]).src);
    if (cover) {
      return `<img src="${esc(cover)}" alt="Capa do projeto ${esc(p.name)}" width="1200" height="750" ${eager ? "" : 'loading="lazy"'} decoding="async" />`;
    }
    return `<div class="placeholder-cover" aria-hidden="true"><strong>${esc(initials(p.name))}</strong><span>screenshots em breve</span></div>`;
  }

  function cardLinks(p) {
    const l = p.links || {};
    let html = "";
    if (l.github) html += `<a href="${esc(l.github)}" target="_blank" rel="noopener" aria-label="Código de ${esc(p.name)} no GitHub">${icon("github")}</a>`;
    if (l.demo) html += `<a href="${esc(l.demo)}" target="_blank" rel="noopener" aria-label="Demo de ${esc(p.name)}">${icon("external")}</a>`;
    return html ? `<div class="project-card__links">${html}</div>` : "<span></span>";
  }

  function renderProjects() {
    const list = PROJECTS.filter(matches);
    const grid = $("#projects-grid");

    grid.innerHTML = list
      .map((p, i) => {
        const cats = (p.categories || []).map((c) => `<span class="cat-tag">${esc(CATEGORY_LABELS[c] || c)}</span>`).join("");
        const techs = (p.technologies || []).slice(0, 5).map((t) => `<span>${esc(t)}</span>`).join("");
        const more = (p.technologies || []).length > 5 ? `<span>+${p.technologies.length - 5}</span>` : "";
        const shots = (p.images || []).length;
        const short = p.shortDescription || (REVIEW_MODE ? "[preencher shortDescription]" : "");
        return `
          <article class="project-card" style="animation-delay:${Math.min(i, 6) * 60}ms">
            ${p.draft ? '<span class="draft-badge">RASCUNHO</span>' : ""}
            <button type="button" class="project-card__media" data-open="${esc(p.id)}" aria-label="Ver projeto ${esc(p.name)}" tabindex="-1">
              ${coverHtml(p, i < 2)}
              ${shots ? `<span class="project-card__shots mono">${shots} ${shots === 1 ? "imagem" : "imagens"}</span>` : ""}
            </button>
            <div class="project-card__body">
              ${cats ? `<div class="project-card__cats">${cats}</div>` : ""}
              <h3 class="project-card__title">${esc(p.name)}</h3>
              ${short ? `<p class="project-card__desc">${esc(short)}</p>` : ""}
              ${techs ? `<p class="project-card__techs">${techs}${more}</p>` : ""}
              <div class="project-card__footer">
                ${cardLinks(p)}
                <button type="button" class="btn btn--ghost btn--sm" data-open="${esc(p.id)}">Ver projeto <span aria-hidden="true">→</span></button>
              </div>
            </div>
          </article>`;
      })
      .join("");

    const total = PROJECTS.length;
    $("#projects-count").textContent =
      list.length === total
        ? `${total} ${total === 1 ? "projeto" : "projetos"}`
        : `${list.length} de ${total} projetos`;
    $("#projects-empty").hidden = list.length > 0;
  }

  /* ------------------------------ Modal do projeto ------------------------------ */
  const modal = $("#project-modal");
  const modalContent = $("#project-modal-content");
  let current = null; // { project, images, index }
  let lastFocus = null;

  const todo = (label) => (REVIEW_MODE ? `<p class="todo">PREENCHER: ${esc(label)}</p>` : "");

  function section(title, body, filled, todoLabel) {
    if (!filled && !REVIEW_MODE) return "";
    return `<section class="pm-section"><h3>${esc(title)}</h3>${filled ? body : todo(todoLabel)}</section>`;
  }

  function paragraphs(v) {
    return asList(v).map((t) => `<p>${esc(t)}</p>`).join("");
  }

  function linkButtons(p) {
    const l = p.links || {};
    const items = [];
    if (l.github) items.push(`<a class="btn btn--ghost btn--sm" href="${esc(l.github)}" target="_blank" rel="noopener">${icon("github")} GitHub</a>`);
    if (l.demo) items.push(`<a class="btn btn--primary btn--sm" href="${esc(l.demo)}" target="_blank" rel="noopener">${icon("external")} Demo</a>`);
    if (l.docs) items.push(`<a class="btn btn--ghost btn--sm" href="${esc(l.docs)}" target="_blank" rel="noopener">${icon("doc")} Documentação</a>`);
    return items;
  }

  function buildModal(p) {
    const images = (p.images || []).map(normImage);
    const cats = (p.categories || []).map((c) => `<span class="cat-tag">${esc(CATEGORY_LABELS[c] || c)}</span>`).join("");

    const gallery = images.length
      ? `
        <div class="gallery">
          <button type="button" class="gallery__main" id="gallery-main" aria-label="Ampliar imagem">
            <img id="gallery-img" src="${esc(images[0].src)}" alt="${esc(images[0].alt || p.name)}" />
            <span class="gallery__counter" id="gallery-counter">1 / ${images.length}</span>
            <span class="gallery__zoom">${icon("expand")} Ampliar</span>
          </button>
          <p class="gallery__caption" id="gallery-caption">${esc(images[0].alt || "")}</p>
          ${images.length > 1 ? `
          <div class="gallery__thumbs" role="list" aria-label="Miniaturas">
            ${images.map((img, i) => `
              <button type="button" class="gallery__thumb" role="listitem" data-index="${i}" aria-label="Imagem ${i + 1}: ${esc(img.alt || "")}" ${i === 0 ? 'aria-current="true"' : ""}>
                <img src="${esc(img.src)}" alt="" loading="lazy" decoding="async" />
              </button>`).join("")}
          </div>` : ""}
        </div>`
      : REVIEW_MODE ? `<div class="gallery">${todo("images (screenshots em assets/projects/" + p.id + "/)")}</div>` : "";

    const aboutItems = [
      ["O que é", p.description, "description", true],
      ["Objetivo", p.goal, "goal"],
      ["Qual problema resolve", p.problem, "problem"],
      ["Para quem", p.audience, "audience"],
    ];
    const aboutHtml = aboutItems
      .filter(([, v]) => isFilled(v) || REVIEW_MODE)
      .map(([label, v, key, wide]) => `
        <div class="about-item${wide ? " about-item--wide" : ""}">
          <h4>${label}</h4>
          ${isFilled(v) ? `<p>${esc(v)}</p>` : todo(key)}
        </div>`)
      .join("");

    const links = linkButtons(p);
    const techs = p.technologies || [];

    modalContent.innerHTML = `
      ${p.draft ? '<p class="draft-banner">Rascunho — este projeto não aparece para visitantes. Troque <code>draft</code> para <code>false</code> em data/projects.js quando estiver pronto.</p>' : ""}
      <header class="pm-header">
        ${cats ? `<div class="project-card__cats">${cats}</div>` : ""}
        <h2 class="pm-title" id="pm-title">${esc(p.name)}</h2>
        ${p.shortDescription ? `<p class="pm-short">${esc(p.shortDescription)}</p>` : ""}
      </header>

      ${gallery}

      <div class="pm-grid">
        <div class="pm-main">
          ${aboutHtml ? `<section class="pm-section"><h3>Sobre o projeto</h3><div class="about-grid">${aboutHtml}</div></section>` : ""}
          ${section("Como surgiu", `<div class="story">${paragraphs(p.origin)}</div>`, isFilled(p.origin), "origin — como surgiu o projeto")}
          ${section("Desenvolvimento", `<ol class="dev-list">${asList(p.development).map((t) => `<li>${esc(t)}</li>`).join("")}</ol>`, isFilled(p.development), "development — arquitetura, stack, desafios e soluções")}
          ${section("Funcionalidades", `<ul class="feature-list">${(p.features || []).map((f) => `<li>${esc(f)}</li>`).join("")}</ul>`, isFilled(p.features), "features")}
          ${section("O que aprendi com este projeto", `<div class="story">${paragraphs(p.learnings)}</div>`, isFilled(p.learnings), "learnings — conhecimentos adquiridos ou aprofundados")}
        </div>

        <aside class="pm-aside">
          ${techs.length || REVIEW_MODE ? `
          <div class="aside-card pm-section">
            <h3>Tecnologias utilizadas</h3>
            ${techs.length ? `<ul class="badges">${techs.map((t) => `<li class="badge">${esc(t)}</li>`).join("")}</ul>` : todo("technologies")}
          </div>` : ""}
          ${links.length ? `
          <div class="aside-card pm-section">
            <h3>Links</h3>
            <div class="aside-links">${links.join("")}</div>
          </div>` : ""}
        </aside>
      </div>`;

    current = { project: p, images, index: 0 };

    if (images.length) {
      $("#gallery-main").addEventListener("click", () => openLightbox(current.index));
      $$(".gallery__thumb", modalContent).forEach((t) =>
        t.addEventListener("click", () => showImage(Number(t.dataset.index)))
      );
      addSwipe($("#gallery-main"), (dir) => showImage(current.index + dir));
    }
  }

  function showImage(i) {
    if (!current || !current.images.length) return;
    const n = current.images.length;
    current.index = (i + n) % n;
    const img = current.images[current.index];
    const el = $("#gallery-img");
    if (!el) return;
    el.classList.add("is-loading");
    el.onload = () => el.classList.remove("is-loading");
    el.src = img.src;
    el.alt = img.alt || current.project.name;
    $("#gallery-counter").textContent = `${current.index + 1} / ${n}`;
    $("#gallery-caption").textContent = img.alt || "";
    $$(".gallery__thumb", modalContent).forEach((t, k) => {
      if (k === current.index) {
        t.setAttribute("aria-current", "true");
        t.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
      } else t.removeAttribute("aria-current");
    });
  }

  function openProject(id, { updateHash = true } = {}) {
    const p = PROJECTS.find((x) => x.id === id);
    if (!p) return;
    lastFocus = document.activeElement;
    buildModal(p);
    if (!modal.open) modal.showModal();
    $(".project-modal__panel", modal).scrollTop = 0;
    document.body.classList.add("is-locked");
    if (updateHash) history.replaceState(null, "", `#projeto/${encodeURIComponent(id)}` + "");
    $(".project-modal__close", modal).focus({ preventScroll: true });
  }

  function onModalClosed() {
    document.body.classList.remove("is-locked");
    if (location.hash.startsWith("#projeto/")) history.replaceState(null, "", location.pathname + location.search + "#projetos");
    current = null;
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus({ preventScroll: true });
  }

  function setupModal() {
    document.addEventListener("click", (e) => {
      const opener = e.target.closest("[data-open]");
      if (opener) openProject(opener.dataset.open);
    });
    modal.addEventListener("click", (e) => {
      if (e.target.closest("[data-close-modal]") || e.target === modal) modal.close();
    });
    modal.addEventListener("close", onModalClosed);
    modal.addEventListener("keydown", (e) => {
      if (lightbox.open || !current) return;
      if (e.target.closest(".gallery") && (e.key === "ArrowRight" || e.key === "ArrowLeft")) {
        e.preventDefault();
        showImage(current.index + (e.key === "ArrowRight" ? 1 : -1));
      }
    });

    // Link direto: index.html#projeto/dino-english
    const openFromHash = () => {
      const m = location.hash.match(/^#projeto\/(.+)$/);
      if (m) openProject(decodeURIComponent(m[1]), { updateHash: false });
    };
    window.addEventListener("hashchange", openFromHash);
    openFromHash();
  }

  /* ------------------------------ Lightbox ------------------------------ */
  const lightbox = $("#lightbox");
  const lbImg = $("#lb-img");

  function renderLightbox() {
    const img = current.images[current.index];
    lbImg.src = img.src;
    lbImg.alt = img.alt || current.project.name;
    $("#lb-caption").textContent = `${current.index + 1} / ${current.images.length}${img.alt ? " — " + img.alt : ""}`;
    const multi = current.images.length > 1;
    $("#lb-prev").hidden = !multi;
    $("#lb-next").hidden = !multi;
    // Pré-carrega vizinhas
    [1, -1].forEach((d) => {
      const n = current.images[(current.index + d + current.images.length) % current.images.length];
      if (n) new Image().src = n.src;
    });
  }

  function openLightbox(i) {
    if (!current) return;
    current.index = i;
    renderLightbox();
    lightbox.showModal();
    $("[data-close-lightbox]", lightbox).focus({ preventScroll: true });
  }

  function stepLightbox(d) {
    const n = current.images.length;
    current.index = (current.index + d + n) % n;
    renderLightbox();
  }

  function setupLightbox() {
    $("#lb-prev").addEventListener("click", () => stepLightbox(-1));
    $("#lb-next").addEventListener("click", () => stepLightbox(1));
    lightbox.addEventListener("click", (e) => {
      if (e.target.closest("[data-close-lightbox]") || e.target === lightbox || e.target.classList.contains("lightbox__figure")) lightbox.close();
    });
    lightbox.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") { e.preventDefault(); stepLightbox(1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); stepLightbox(-1); }
    });
    // Ao fechar, sincroniza a galeria com a imagem vista
    lightbox.addEventListener("close", () => {
      if (current) {
        showImage(current.index);
        $("#gallery-main")?.focus({ preventScroll: true });
      }
    });
    addSwipe($(".lightbox__figure", lightbox), (dir) => stepLightbox(dir));
  }

  // Swipe horizontal (toque) — dir: +1 próxima, -1 anterior
  function addSwipe(el, onSwipe) {
    let x0 = null, y0 = null, t0 = 0;
    el.addEventListener("touchstart", (e) => {
      const t = e.changedTouches[0];
      x0 = t.clientX; y0 = t.clientY; t0 = Date.now();
    }, { passive: true });
    el.addEventListener("touchend", (e) => {
      if (x0 === null) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - x0, dy = t.clientY - y0;
      x0 = null;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3 && Date.now() - t0 < 800) {
        e.preventDefault();
        onSwipe(dx < 0 ? 1 : -1);
      }
    });
  }

  /* ------------------------------ Tecnologias ------------------------------ */
  function renderSkills() {
    const usedLevels = new Set();
    $("#skills-grid").innerHTML = SKILLS.map((group) => {
      const items = group.items.map((it) => (typeof it === "string" ? { name: it } : it));
      const list = items
        .map((it) => {
          const lvl = it.level && SKILL_LEVELS[it.level] ? it.level : "";
          if (lvl) usedLevels.add(lvl);
          const lvlText = lvl === "basico" ? "básico" : lvl === "intermediario" ? "intermediário" : lvl;
          return `<li class="skill">${lvl ? `<span class="level-dot level-dot--${lvl}" aria-hidden="true"></span>` : ""}${esc(it.name)}${lvl ? ` <span class="skill__level">· ${esc(lvlText)}</span>` : ""}</li>`;
        })
        .join("");
      return `
        <article class="skill-card reveal">
          <header class="skill-card__head">
            <span class="skill-card__icon">${icon(group.icon || "code")}</span>
            <h3>${esc(group.category)}</h3>
            <span class="skill-card__count">${items.length}</span>
          </header>
          <ul class="skill-list">${list}</ul>
        </article>`;
    }).join("");

    // Legenda só aparece se algum item tiver nível principal/intermediário
    // (um único "básico" já é explicado no próprio item)
    const legend = $("#skills-legend");
    if (usedLevels.has("principal") || usedLevels.has("intermediario")) {
      legend.innerHTML = Object.entries(SKILL_LEVELS)
        .filter(([k]) => usedLevels.has(k))
        .map(([k, label]) => `<span><span class="level-dot level-dot--${k}" aria-hidden="true"></span>${esc(label)}</span>`)
        .join("");
      legend.hidden = false;
    }
  }

  /* ------------------------------ Reveal on scroll ------------------------------ */
  function setupReveal() {
    const els = $$(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));
  }

  /* ------------------------------ Init ------------------------------ */
  setupWelcome();
  setupNav();
  renderFilters();
  setupFilters();
  renderProjects();
  renderSkills();
  setupModal();
  setupLightbox();
  setupReveal();

  // Links como index.html#projetos: rola até a seção depois que o conteúdo foi gerado
  const target = location.hash && !location.hash.startsWith("#projeto/") && document.getElementById(location.hash.slice(1));
  if (target) window.addEventListener("load", () => target.scrollIntoView({ behavior: "auto" }));

  $("#year").textContent = new Date().getFullYear();
  $("#code-projects").textContent = PROJECTS_ALL.filter((p) => !p.draft).length;

  if (REVIEW_MODE) {
    const drafts = PROJECTS_ALL.filter((p) => p.draft).length;
    console.info(`[portfólio] Modo revisão: ${drafts} rascunho(s) visíveis e campos vazios destacados.`);
  }
})();
