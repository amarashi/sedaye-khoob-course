(() => {
  const sectionIds = {
    hero: "top",
    course: "course",
    curriculum: "curriculum",
    studio: "studio",
    outcomes: "outcomes",
    testimonials: "testimonials",
    checkout: "checkout",
    contact: "contact",
  };

  const designImages = {
    notes: "assets/design/ostad-piano.webp",
    scales: "assets/design/ostad-tar.webp",
    chords: "assets/design/ostad-guitar.webp",
    rhythm: "assets/design/ostad-tombak.webp",
    fallback: "assets/design/ostad-piano.webp",
  };

  const testimonialImages = [
    "assets/design/testimonial-piano.webp",
    "assets/design/testimonial-parts-8.webp",
    "assets/design/testimonial-parts-3.webp",
    "assets/design/testimonial-guitar.webp",
  ];

  const featureIcons = [
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 15c3 0 3-6 6-6s3 6 6 6 3-6 4-6"></path><path d="M4 19h16"></path></svg>',
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M5 4h14v16H5z"></path><path d="M8 8h8M8 12h6M8 16h4"></path></svg>',
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="8"></circle><path d="M12 8v4l3 2"></path></svg>',
  ];

  const header = document.getElementById("siteHeader");
  const nav = document.getElementById("siteNav");
  const menuButton = document.querySelector(".menu-toggle");
  const checkoutForm = document.querySelector("[data-checkout-form]");
  const checkoutStatus = document.querySelector("[data-checkout-status]");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let checkoutMessages = {};
  let modules = [];
  let activeModuleKey = null;
  let testimonialIndex = 0;

  function valueAt(source, path) {
    return String(path || "")
      .split(".")
      .reduce((current, key) => (current && Object.prototype.hasOwnProperty.call(current, key) ? current[key] : undefined), source);
  }

  function readEmbeddedContent() {
    const script = document.getElementById("site-content");
    if (!script?.textContent.trim()) return null;

    try {
      return JSON.parse(script.textContent);
    } catch (error) {
      console.error("Could not parse embedded site content.", error);
      return null;
    }
  }

  async function fetchContent() {
    for (const url of ["content/site.json", "/api/content"]) {
      try {
        const response = await fetch(url, { cache: "no-store" });
        if (response.ok) return response.json();
      } catch {
        // Try the next content source.
      }
    }
    return null;
  }

  function normaliseAssetPath(path) {
    if (!path) return "";
    return String(path).replace(/^design2\//, "assets/design/");
  }

  function imageForModule(module) {
    return normaliseAssetPath(module?.image) || designImages[module?.id] || designImages.fallback;
  }

  function isSectionVisible(content, key) {
    return String(content?.[key]?.visibility || "on").toLowerCase() !== "off";
  }

  function syncSectionVisibility(content) {
    Object.entries(sectionIds).forEach(([key, id]) => {
      const visible = isSectionVisible(content, key);
      const section = document.getElementById(id);
      if (section) section.hidden = !visible;
      document.querySelectorAll(`a[href="#${id}"]`).forEach((link) => {
        link.hidden = !visible;
      });
    });
  }

  function setAttributeIfDefined(element, attribute, value) {
    if (!element || value === undefined || value === null) return;
    element.setAttribute(attribute, String(value));
  }

  function setText(element, value) {
    if (!element || value === undefined || value === null) return;
    element.textContent = String(value);
  }

  function clear(element) {
    if (!element) return;
    element.replaceChildren();
  }

  function renderHeroStats(items) {
    const container = document.querySelector("[data-render-list='hero.stats']");
    clear(container);
    if (!container || !Array.isArray(items)) return;

    items.forEach((item) => {
      const cell = document.createElement("div");
      const value = document.createElement("strong");
      value.textContent = item.value || "";
      const label = document.createElement("span");
      label.textContent = item.label || "";
      cell.append(value, label);
      container.append(cell);
    });
  }

  function renderList(selector, items) {
    const container = document.querySelector(selector);
    clear(container);
    if (!container || !Array.isArray(items)) return;

    items.forEach((text) => {
      const item = document.createElement("li");
      item.textContent = text;
      container.append(item);
    });
  }

  function renderTopics(items) {
    const board = document.querySelector("[data-render-list='curriculum.topics']");
    clear(board);
    if (!board || !Array.isArray(items)) return;

    items.slice(0, 4).forEach((module, index) => {
      const figure = document.createElement("figure");
      figure.className = `mod-orb${index === 0 ? " is-active" : ""}`;
      figure.dataset.module = module.id || `module-${index}`;
      figure.setAttribute("data-reveal", "");
      figure.tabIndex = 0;
      figure.setAttribute("role", "button");

      const visual = document.createElement("div");
      visual.className = "mod-orb__visual";
      const image = document.createElement("img");
      image.src = imageForModule(module);
      image.alt = module.title || module.label || "";
      image.loading = "lazy";
      image.decoding = "async";
      visual.append(image);

      const caption = document.createElement("figcaption");
      caption.textContent = module.label || "";

      figure.append(visual, caption);
      board.append(figure);
    });
  }

  function renderFocusSteps(items) {
    const container = document.querySelector("[data-render-list='curriculum.steps']");
    clear(container);
    if (!container || !Array.isArray(items)) return;

    items.forEach((module, index) => {
      const step = document.createElement("article");
      step.className = `focus-step${index === 0 ? " is-active" : ""}`;
      step.dataset.module = module.id || `module-${index}`;
      step.tabIndex = 0;
      step.setAttribute("role", "button");
      if (index === 0) step.setAttribute("aria-current", "step");

      const title = document.createElement("h3");
      title.textContent = module.label || module.title || "";
      const text = document.createElement("p");
      text.textContent = module.text || "";

      step.append(title, text);
      container.append(step);
    });
  }

  function renderFeatureCards(items) {
    const grid = document.querySelector("[data-render-list='studio.featureCards']");
    clear(grid);
    if (!grid || !Array.isArray(items)) return;

    items.slice(0, 3).forEach((item, index) => {
      const card = document.createElement("article");
      card.className = "feature";
      card.setAttribute("data-reveal", "");
      const mark = document.createElement("div");
      mark.className = "feature-mark";
      mark.innerHTML = featureIcons[index % featureIcons.length];
      const title = document.createElement("h3");
      title.textContent = typeof item === "string" ? item : item.title || "";
      const body = document.createElement("p");
      body.textContent = typeof item === "string" ? item : item.text || "";
      card.append(mark, title, body);
      grid.append(card);
    });
  }

  function renderOutcomes(items) {
    const grid = document.querySelector("[data-render-list='outcomes.items']");
    clear(grid);
    if (!grid || !Array.isArray(items)) return;

    items.forEach((outcome) => {
      const card = document.createElement("article");
      card.className = "feature";
      card.setAttribute("data-reveal", "");
      if (outcome.image) {
        const image = document.createElement("img");
        image.src = normaliseAssetPath(outcome.image);
        image.alt = "";
        image.loading = "lazy";
        image.decoding = "async";
        card.append(image);
      }
      const title = document.createElement("h3");
      title.textContent = outcome.title || "";
      const text = document.createElement("p");
      text.textContent = outcome.text || "";
      card.append(title, text);
      grid.append(card);
    });
  }

  function renderTestimonials(items) {
    const carousel = document.querySelector("[data-render-list='testimonials.items']");
    clear(carousel);
    if (!carousel || !Array.isArray(items)) return;

    items.forEach((item, index) => {
      const card = document.createElement("article");
      card.className = "testimonial-card";
      const copy = document.createElement("div");
      copy.className = "testimonial-copy";
      const quote = document.createElement("p");
      quote.textContent = item.quote || "";
      const footer = document.createElement("footer");
      footer.textContent = [item.name, item.role].filter(Boolean).join("، ");
      copy.append(quote, footer);

      const image = document.createElement("img");
      image.className = "testimonial-art";
      image.src = testimonialImages[index % testimonialImages.length];
      image.alt = "";
      image.loading = "lazy";
      image.setAttribute("aria-hidden", "true");

      card.append(copy, image);
      carousel.append(card);
    });

    const controls = document.createElement("div");
    controls.className = "carousel-controls";
    controls.setAttribute("aria-label", "کنترل نظر هنرجوها");
    controls.innerHTML = `
      <button class="carousel-btn" type="button" data-carousel="prev" aria-label="نظر قبلی">→</button>
      <div class="carousel-dots" aria-hidden="true"></div>
      <button class="carousel-btn" type="button" data-carousel="next" aria-label="نظر بعدی">←</button>
    `;
    const dots = controls.querySelector(".carousel-dots");
    items.forEach(() => {
      const dot = document.createElement("button");
      dot.className = "carousel-dot";
      dot.type = "button";
      dot.tabIndex = -1;
      dots.append(dot);
    });
    carousel.append(controls);
  }

  function renderContactMethods(items) {
    const grid = document.querySelector("[data-render-list='contact.methods']");
    clear(grid);
    if (!grid || !Array.isArray(items)) return;

    items.forEach((method) => {
      const card = document.createElement("div");
      card.className = "contact-card";
      const label = document.createElement("span");
      label.className = "meta";
      label.textContent = method.label || "";
      const heading = document.createElement("h3");
      const link = document.createElement("a");
      link.href = method.href || "#";
      link.textContent = method.value || "";
      if (/^\+?\d/.test(method.value || "")) link.dir = "ltr";
      heading.append(link);
      card.append(label, heading);
      grid.append(card);
    });
  }

  function renderContent(content) {
    checkoutMessages = content.checkout?.messages || {};
    syncSectionVisibility(content);

    if (content.page?.title !== undefined) document.title = content.page.title;
    setAttributeIfDefined(document.querySelector("meta[name='description']"), "content", content.page?.description);
    setAttributeIfDefined(document.querySelector(".brand"), "aria-label", content.page?.siteName || content.hero?.logoAlt);
    setAttributeIfDefined(document.querySelector(".nav-links"), "aria-label", content.navigation?.siteMenuLabel);
    setAttributeIfDefined(document.querySelector("input[name='mobile']"), "placeholder", content.checkout?.form?.mobilePlaceholder);
    setAttributeIfDefined(document.querySelector("input[name='email']"), "placeholder", content.checkout?.form?.emailPlaceholder);
    document.querySelectorAll("[data-content-placeholder]").forEach((element) => {
      setAttributeIfDefined(element, "placeholder", valueAt(content, element.dataset.contentPlaceholder));
    });

    document.querySelectorAll("[data-content]").forEach((element) => {
      setText(element, valueAt(content, element.dataset.content));
    });

    modules = Array.isArray(content.curriculum?.modules) ? content.curriculum.modules : [];
    renderHeroStats(content.hero?.stats);
    renderList("[data-render-list='studio.features']", content.studio?.features);
    renderList("[data-render-list='checkout.benefits']", content.checkout?.benefits);
    renderTopics(modules);
    renderFocusSteps(modules);
    renderFeatureCards(content.studio?.featureCards || content.studio?.features);
    renderOutcomes(content.outcomes?.items);
    renderTestimonials(content.testimonials?.items);
    renderContactMethods(content.contact?.methods);
    setupInteractiveBehaviour();
    setupStickyNav();
    setupHeroMotion(content);
    setupScrollReveals();

    if (modules[0]) setModule(modules[0].id || "notes");
  }

  /* Split the hero title into plain + spectrum-gradient line spans so the
     entrance can stagger them (mirrors the design's data-anim="line"). */
  function splitHeroTitle(highlight) {
    const title = document.getElementById("heroTitle");
    if (!title || title.dataset.split === "true") return;
    const text = (title.textContent || "").trim();
    if (!text) return;

    const hl = String(highlight || "").trim();
    const at = hl ? text.indexOf(hl) : -1;
    title.textContent = "";

    const addLine = (chunk, isHighlight) => {
      if (!chunk) return;
      const span = document.createElement("span");
      span.className = isHighlight ? "line hl spectrum-text" : "line";
      span.textContent = chunk;
      title.append(span);
    };

    if (at === -1) {
      addLine(text, false);
    } else {
      const before = text.slice(0, at).trim();
      const after = text.slice(at + hl.length).trim();
      addLine(before, false);
      if (before) title.append(" ");
      addLine(hl, true);
      if (after) {
        title.append(" ");
        addLine(after, false);
      }
    }
    title.dataset.split = "true";
  }

  function setupStickyNav() {
    if (!header || header.dataset.ready === "true") return;
    header.dataset.ready = "true";
    const onScroll = () => header.classList.toggle("is-stuck", window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* Light/dark switch — the saved choice is applied pre-paint by the
     inline bootstrap in <head>; this just wires the button. */
  function setupThemeToggle() {
    const toggle = document.getElementById("themeToggle");
    if (!toggle) return;
    const root = document.documentElement;
    const sync = () => toggle.setAttribute("aria-pressed", String(root.dataset.theme === "dark"));
    toggle.addEventListener("click", () => {
      const dark = root.dataset.theme !== "dark";
      if (dark) {
        root.dataset.theme = "dark";
      } else {
        delete root.dataset.theme;
      }
      try {
        localStorage.setItem("sk-theme", dark ? "dark" : "light");
      } catch {
        // Private mode etc. — the choice just won't persist.
      }
      sync();
    });
    sync();
  }

  /* Count the hero stat numbers up from zero to their target, in Persian digits. */
  function countUpHeroStats(g) {
    const tl = g.timeline();
    const toAscii = (s) => s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
    const toPersian = (n) => String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
    g.utils.toArray(".hero-stats strong").forEach((el) => {
      const match = toAscii(el.textContent || "").match(/\d+/);
      if (!match) return;
      const target = parseInt(match[0], 10);
      const counter = { value: 0 };
      el.textContent = toPersian(0);
      tl.to(counter, {
        value: target,
        duration: 1.8,
        ease: "power2.out",
        onUpdate: () => { el.textContent = toPersian(Math.round(counter.value)); },
      }, 0);
    });
    return tl;
  }

  /* Hero entrance + perpetual motion — the design's night-stage timeline. */
  function setupHeroMotion(content) {
    const hero = document.querySelector(".hero");
    if (!hero || hero.dataset.animated === "true") return;
    hero.dataset.animated = "true";
    splitHeroTitle(content.hero?.titleHighlight);
    if (!window.gsap || prefersReducedMotion.matches) return;

    const g = window.gsap;
    const tl = g.timeline({ defaults: { ease: "power3.out" } });
    tl.from(".hero-spot", { opacity: 0, scale: 0.6, duration: 1.1, ease: "power2.out" })
      .from(".topnav-inner", { y: -24, autoAlpha: 0, duration: 0.6, clearProps: "all" }, 0.1)
      .from("[data-anim='logo']", { y: 50, autoAlpha: 0, scale: 0.9, duration: 1.05 }, 0.25)
      .from("#heroTitle .line", { y: 28, autoAlpha: 0, duration: 0.65, stagger: 0.12 }, 0.7)
      .from("[data-anim='lead']", { y: 18, autoAlpha: 0, duration: 0.55 }, 0.9)
      .from("[data-anim='cta'] > *", { y: 16, autoAlpha: 0, duration: 0.5, stagger: 0.1, clearProps: "all" }, 1.0)
      .from(".hero-stats > div", { y: 14, autoAlpha: 0, duration: 0.45, stagger: 0.08 }, 1.1)
      .add(countUpHeroStats(g), 1.15)
      .from(".hero-maestro", { y: 60, autoAlpha: 0, duration: 0.9, ease: "power2.out" }, 0.6)
      .from(".orchestra-podium", { scale: 0.3, autoAlpha: 0, duration: 0.8 }, 0.75)
      .from(".orb", { scale: 0, autoAlpha: 0, duration: 0.7, stagger: 0.14, ease: "back.out(1.8)" }, 0.8)
      .from(".hero-note", { autoAlpha: 0, scale: 0.4, duration: 0.6, stagger: 0.1 }, 1.0);

    // perpetual float
    g.utils.toArray(".orb").forEach((orb, index) => {
      g.to(orb, {
        y: `+=${18}`,
        rotation: index % 2 ? 3 : -3,
        duration: 3 + index * 0.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.3,
      });
    });
    g.to(".hero-maestro", { y: "-=8", duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut" });
    g.to("[data-anim='logo']", { y: "-=6", duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.4 });

    // pointer parallax over depth-tagged layers
    if (window.matchMedia("(pointer: fine)").matches) {
      const layers = g.utils.toArray(".hero [data-depth]");
      hero.addEventListener("pointermove", (event) => {
        const rect = hero.getBoundingClientRect();
        const dx = (event.clientX - (rect.left + rect.width / 2)) / rect.width;
        const dy = (event.clientY - (rect.top + rect.height / 2)) / rect.height;
        layers.forEach((layer) => {
          const depth = parseFloat(layer.dataset.depth) || 0;
          g.to(layer, { x: -dx * 36 * depth, y: -dy * 26 * depth, duration: 0.6, ease: "power2.out", overwrite: "auto" });
        });
      });
    }
  }

  /* Scroll-triggered reveals; elements stay visible without GSAP. */
  function setupScrollReveals() {
    const elements = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!elements.length || prefersReducedMotion.matches) return;

    if (window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      elements.forEach((element) => {
        if (element.dataset.revealed === "true") return;
        element.dataset.revealed = "true";
        gsap.fromTo(element, { opacity: 0, y: 28 }, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: element, start: "top 86%", once: true },
        });
      });
    }
  }

  function renderModuleContent(module) {
    setText(document.getElementById("moduleTitle"), module?.title || "");
    setText(document.getElementById("moduleText"), module?.text || "");
    const image = document.getElementById("moduleImage");
    if (image) {
      image.src = imageForModule(module);
      image.alt = module?.title || module?.label || "";
    }
  }

  function setModule(key) {
    const selected = modules.find((module) => module.id === key) || modules[0];
    if (!selected || selected.id === activeModuleKey) return;
    activeModuleKey = selected.id;

    document.querySelectorAll(".focus-step").forEach((step) => {
      const isActive = step.dataset.module === selected.id;
      step.classList.toggle("is-active", isActive);
      if (isActive) {
        step.setAttribute("aria-current", "step");
      } else {
        step.removeAttribute("aria-current");
      }
    });
    document.querySelectorAll(".mod-orb").forEach((orb) => {
      orb.classList.toggle("is-active", orb.dataset.module === selected.id);
    });

    renderModuleContent(selected);
  }

  function renderCarouselState() {
    const cards = Array.from(document.querySelectorAll(".testimonial-card"));
    const dots = Array.from(document.querySelectorAll(".carousel-dot"));
    if (cards.length === 0) return;

    cards.forEach((card, index) => {
      const offset = (index - testimonialIndex + cards.length) % cards.length;
      card.classList.toggle("is-active", offset === 0);
      card.classList.toggle("is-next", offset === 1);
      card.classList.toggle("is-prev", offset === cards.length - 1);
      card.setAttribute("aria-hidden", String(offset !== 0));
      card.tabIndex = offset === 0 ? 0 : -1;
    });
    dots.forEach((dot, index) => dot.classList.toggle("is-active", index === testimonialIndex));
  }

  function activateOnKeys(element, action) {
    element.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " " && event.key !== "Spacebar") return;
      event.preventDefault();
      action();
    });
  }

  function setupInteractiveBehaviour() {
    menuButton?.addEventListener("click", () => {
      const open = nav?.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(Boolean(open)));
    });

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (event) => {
        const target = document.querySelector(link.getAttribute("href"));
        if (!target) return;
        event.preventDefault();
        nav?.classList.remove("is-open");
        menuButton?.setAttribute("aria-expanded", "false");
        const top = target.getBoundingClientRect().top + window.pageYOffset - 84;
        window.scrollTo({ top, behavior: "smooth" });
      });
    });

    document.querySelectorAll(".focus-step").forEach((step) => {
      step.addEventListener("click", () => setModule(step.dataset.module));
      activateOnKeys(step, () => setModule(step.dataset.module));
    });

    document.querySelectorAll(".mod-orb").forEach((orb) => {
      orb.addEventListener("mouseenter", () => setModule(orb.dataset.module));
      orb.addEventListener("click", () => setModule(orb.dataset.module));
      activateOnKeys(orb, () => setModule(orb.dataset.module));
    });

    document.querySelectorAll(".testimonial-card").forEach((card, index) => {
      card.addEventListener("click", () => {
        testimonialIndex = index;
        renderCarouselState();
      });
    });

    document.querySelectorAll("[data-carousel]").forEach((button) => {
      button.addEventListener("click", () => {
        const cards = document.querySelectorAll(".testimonial-card");
        const direction = button.dataset.carousel === "next" ? 1 : -1;
        testimonialIndex = (testimonialIndex + direction + cards.length) % cards.length;
        renderCarouselState();
      });
    });
    renderCarouselState();
  }

  function normaliseDigits(value) {
    return String(value || "")
      .replace(/[۰-۹]/g, (digit) => "۰۱۲۳۴۵۶۷۸۹".indexOf(digit))
      .replace(/[٠-٩]/g, (digit) => "٠١٢٣٤٥٦٧٨٩".indexOf(digit));
  }

  function showCheckoutMessage(message, type) {
    if (!checkoutStatus) return;
    checkoutStatus.textContent = message || "";
    checkoutStatus.classList.add("is-visible");
    checkoutStatus.classList.toggle("is-error", type === "error");
    checkoutStatus.classList.toggle("is-success", type === "success");
  }

  checkoutForm?.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = checkoutForm.querySelector("button[type='submit']");
    const formData = new FormData(checkoutForm);
    const payload = {
      fullName: String(formData.get("fullName") || "").trim(),
      mobile: normaliseDigits(formData.get("mobile")).replace(/\s+/g, ""),
      email: String(formData.get("email") || "").trim(),
      question: String(formData.get("question") || "").trim(),
    };

    submitButton.disabled = true;
    showCheckoutMessage(checkoutMessages.preparingPayment || "", "");

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || checkoutMessages.orderUnavailable || "");
      }

      if (result.paymentUrl) {
        showCheckoutMessage(checkoutMessages.redirecting || "", "success");
        window.location.assign(result.paymentUrl);
        return;
      }

      showCheckoutMessage(result.message || checkoutMessages.defaultSuccess || "", "success");
    } catch (error) {
      showCheckoutMessage(error.message || checkoutMessages.defaultFailure || "", "error");
    } finally {
      submitButton.disabled = false;
    }
  });

  document.addEventListener("DOMContentLoaded", async () => {
    setupThemeToggle();
    const content = readEmbeddedContent() || await fetchContent();
    if (!content) {
      console.error("Could not load site content.");
      return;
    }
    renderContent(content);
  });
})();
