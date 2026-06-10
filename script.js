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
    notes: "assets/design/ostad-piano.png",
    scales: "assets/design/ostad-tar.png",
    chords: "assets/design/ostad-guitar.png",
    rhythm: "assets/design/ostad-tombak.png",
    fallback: "assets/design/ostad-piano.png",
  };

  const testimonialImages = [
    "assets/design/testimonial-piano.png",
    "assets/design/testimonial-parts-8.png",
    "assets/design/testimonial-parts-3.png",
    "assets/design/testimonial-guitar.png",
  ];

  const featureIcons = [
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 15c3 0 3-6 6-6s3 6 6 6 3-6 4-6"></path><path d="M4 19h16"></path></svg>',
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M5 4h14v16H5z"></path><path d="M8 8h8M8 12h6M8 16h4"></path></svg>',
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="8"></circle><path d="M12 8v4l3 2"></path></svg>',
  ];

  const nav = document.getElementById("siteNav");
  const menuButton = document.querySelector(".menu-toggle");
  const checkoutForm = document.querySelector("[data-checkout-form]");
  const checkoutStatus = document.querySelector("[data-checkout-status]");
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

  function renderSimpleTags(items) {
    const container = document.querySelector("[data-render-list='course.orbit']");
    clear(container);
    if (!container || !Array.isArray(items)) return;

    items.forEach((item) => {
      const tag = document.createElement("span");
      tag.className = "tag";
      tag.textContent = item;
      container.append(tag);
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

    const line = document.createElement("div");
    line.className = "orbit-line";
    line.setAttribute("aria-hidden", "true");
    board.append(line);

    items.slice(0, 4).forEach((module) => {
      const article = document.createElement("article");
      article.className = "topic";
      article.setAttribute("data-reveal", "");

      const visual = document.createElement("div");
      visual.className = "topic-visual";
      const image = document.createElement("img");
      image.src = imageForModule(module);
      image.alt = module.title || module.label || "";
      image.loading = "lazy";
      image.decoding = "async";
      visual.append(image);

      const title = document.createElement("h3");
      title.textContent = module.label || "";
      const text = document.createElement("p");
      text.textContent = module.topicText || module.text || "";

      article.append(visual, title, text);
      board.append(article);
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
      text.textContent = module.stepText || module.text || "";

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
    renderSimpleTags(content.course?.orbit);
    renderList("[data-render-list='studio.features']", content.studio?.features);
    renderList("[data-render-list='checkout.benefits']", content.checkout?.benefits);
    renderTopics(modules);
    renderFocusSteps(modules);
    renderFeatureCards(content.studio?.featureCards || content.studio?.features);
    renderOutcomes(content.outcomes?.items);
    renderTestimonials(content.testimonials?.items);
    renderContactMethods(content.contact?.methods);
    setupInteractiveBehaviour();

    if (modules[0]) setModule(modules[0].id || "notes");
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

  function setFocusProgress(progress) {
    const stage = document.querySelector(".focus-stage");
    stage?.style.setProperty("--focus-progress", String(Math.max(0, Math.min(1, progress))));
  }

  function setModule(key) {
    const selected = modules.find((module) => module.id === key) || modules[0];
    if (!selected || selected.id === activeModuleKey) return;
    activeModuleKey = selected.id;
    const steps = Array.from(document.querySelectorAll(".focus-step"));

    steps.forEach((step, index) => {
      const isActive = step.dataset.module === selected.id;
      step.classList.toggle("is-active", isActive);
      if (isActive) {
        step.setAttribute("aria-current", "step");
        setFocusProgress(steps.length > 1 ? index / (steps.length - 1) : 1);
      } else {
        step.removeAttribute("aria-current");
      }
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
        const top = target.getBoundingClientRect().top + window.pageYOffset - 96;
        window.scrollTo({ top, behavior: "smooth" });
      });
    });

    document.querySelectorAll(".focus-step").forEach((step) => {
      step.addEventListener("click", () => setModule(step.dataset.module));
      step.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " " && event.key !== "Spacebar") return;
        event.preventDefault();
        setModule(step.dataset.module);
      });
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

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      }, { threshold: 0.14 });

      document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
    } else {
      document.querySelectorAll("[data-reveal]").forEach((element) => element.classList.add("is-visible"));
    }
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
    const content = readEmbeddedContent() || await fetchContent();
    if (!content) {
      console.error("Could not load site content.");
      return;
    }
    renderContent(content);
  });
})();
