document.documentElement.classList.add("js-enabled");
const menuToggle = document.querySelector("#menu-toggle");
const navLinks = document.querySelector("#primary-navigation");
const mobileNavigation = window.matchMedia("(max-width: 970px)");
const heroImages = document.querySelectorAll(".hero-work");
const languageButtons = document.querySelectorAll("[data-language]");
const lightbox = document.querySelector("#media-lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxClose = document.querySelector(".lightbox-close");
const previewLimit = 4;
let workPreviewRotation = null;
let workFilters = null;
let currentLanguage = "ro";
try {
  currentLanguage = localStorage.getItem("siteLanguage") || "ro";
} catch {
  // Language preferences are optional when browser storage is unavailable.
}
let lightboxTrigger = null;

const translations = {
  en: {
    "a11y.language": "Language selector",
    "a11y.openMenu": "Open menu",
    "a11y.closeMenu": "Close menu",
    "a11y.hero": "Total Studio sample advertising work",
    "a11y.preview": "Media preview",
    "a11y.closePreview": "Close preview",
    "a11y.openImage": "Open preview:",
    "a11y.map": "Total Studio location in Bucharest",
    "nav.home": "Home",
    "nav.about": "About",
    "nav.services": "Services",
    "nav.work": "Work",
    "nav.contact": "Contact",
    "hero.eyebrow": "Design studio",
    "hero.text": "We design advertising, packaging, and vehicle graphics. We prepare artwork for print and create short videos for online use.",
    "hero.viewWork": "View Work",
    "hero.contact": "Let’s talk",
    "hero.badge": "Ads / Packaging / Decals",
    "about.eyebrow": "About us",
    "about.title": "From the first idea to the print-ready file.",
    "about.textOne": "We’re Total Studio. We help you design and prepare artwork for print or online publishing.",
    "about.textTwo": "We work on projects for shop windows, cars, buses, and retail spaces, as well as packaging, posters, and short videos.",
    "services.eyebrow": "Services",
    "services.title": "How we can help",
    "services.printTitle": "Graphics for print",
    "services.printText": "Design for posters, stickers, shop windows, vehicle graphics, and billboards.",
    "services.packagingTitle": "Packaging",
    "services.packagingText": "Packaging and label design for boxes, bottles, cosmetics, pharmaceutical products, and more.",
    "services.videoTitle": "Photo and video",
    "services.videoText": "We photograph products, adapt advertisements to the formats you need, and create short videos.",
    "work.eyebrow": "Work",
    "work.title": "A few projects we’ve worked on",
    "work.empty": "We’ll be adding new work soon.",
    "videos.eyebrow": "Video",
    "videos.title": "Advertising in motion",
    "videos.empty": "We’ll be adding new videos soon.",
    "contact.eyebrow": "Contact",
    "contact.title": "Let's talk.",
    "contact.text": "Tell us what you have in mind. Email or call us, and we’ll see how we can help.",
    "contact.phone": "Phone",
    "contact.email": "Email",
    "contact.address": "Address",
    "footer.rights": "© 2026 Total Studio. All rights reserved.",
    "work.filters": "Portfolio filters",
    "work.category": "Category",
    "work.brand": "Brand",
    "work.search": "Search brand, project or year",
    "work.reset": "Reset",
    "work.showAll": "Show all",
    "work.noResults": "No results. Try different filters or reset your search.",
    "work.count": "{count} of {total} works",
    "button.viewWork": "Show more work",
    "button.lessWork": "View fewer projects",
    "button.viewVideos": "View all videos",
    "button.lessVideos": "View fewer videos",
  },
  ro: {
    "a11y.language": "Selectează limba",
    "a11y.openMenu": "Deschide meniul",
    "a11y.closeMenu": "Închide meniul",
    "a11y.hero": "Exemple de lucrări publicitare Total Studio",
    "a11y.preview": "Previzualizare imagine",
    "a11y.closePreview": "Închide previzualizarea",
    "a11y.openImage": "Deschide previzualizarea:",
    "a11y.map": "Locația Total Studio în București",
    "nav.home": "Acasă",
    "nav.about": "Despre",
    "nav.services": "Servicii",
    "nav.work": "Lucrări",
    "nav.contact": "Contact",
    "hero.eyebrow": "Studio de design",
    "hero.text": "Facem grafică pentru reclame, ambalaje și colantări. Pregătim materialele pentru tipar și creăm clipuri scurte pentru online.",
    "hero.viewWork": "Vezi lucrări",
    "hero.contact": "Hai să vorbim",
    "hero.badge": "Reclame / Ambalaje / Colantări",
    "about.eyebrow": "Despre noi",
    "about.title": "De la idee la fișierul gata de tipar.",
    "about.textOne": "Suntem Total Studio. Te ajutăm cu designul și pregătirea materialelor pentru tipar sau publicare online.",
    "about.textTwo": "Lucrăm la proiecte pentru vitrine, mașini, autobuze și spații comerciale, dar și la ambalaje, afișe și clipuri scurte.",
    "services.eyebrow": "Servicii",
    "services.title": "Cu ce te putem ajuta",
    "services.printTitle": "Grafică pentru tipar",
    "services.printText": "Design pentru afișe, autocolante, vitrine, colantări auto și panouri publicitare.",
    "services.packagingTitle": "Ambalaje",
    "services.packagingText": "Design de ambalaje și etichete pentru cutii, sticle, cosmetice, produse farmaceutice și altele.",
    "services.videoTitle": "Foto și video",
    "services.videoText": "Fotografiem produse, adaptăm reclamele la formatele de care ai nevoie și creăm clipuri scurte.",
    "work.eyebrow": "Lucrări",
    "work.title": "Câteva proiecte la care am lucrat",
    "work.empty": "Adăugăm în curând lucrări noi.",
    "videos.eyebrow": "Video",
    "videos.title": "Reclame în mișcare",
    "videos.empty": "Adăugăm în curând clipuri noi.",
    "contact.eyebrow": "Contact",
    "contact.title": "Hai să vorbim.",
    "contact.text": "Spune-ne ce ai în minte. Scrie-ne sau sună-ne și vedem cum te putem ajuta.",
    "contact.phone": "Telefon",
    "contact.email": "Email",
    "contact.address": "Adresă",
    "footer.rights": "© 2026 Total Studio. Toate drepturile rezervate.",
    "work.filters": "Filtre portofoliu",
    "work.category": "Categorie",
    "work.brand": "Brand",
    "work.search": "Caută brand, proiect sau an",
    "work.reset": "Resetează",
    "work.showAll": "Arată toate",
    "work.noResults": "Niciun rezultat. Încearcă alte filtre sau resetează căutarea.",
    "work.count": "{count} din {total} lucrări",
    "button.viewWork": "Vezi mai multe lucrări",
    "button.lessWork": "Vezi mai puține lucrări",
    "button.viewVideos": "Vezi toate clipurile",
    "button.lessVideos": "Vezi mai puține clipuri",
  },
};

const workConfig = {
  assets: galleryAssets.work,
  gallerySelector: "#work-gallery",
  emptySelector: "#work-empty",
  buttonSelector: "#work-view-all",
  cardClass: "work-card",
  viewAllKey: "button.viewWork",
  showLessKey: "button.lessWork",
};

const videoConfig = {
  assets: galleryAssets.videos,
  gallerySelector: "#video-gallery",
  emptySelector: "#video-empty",
  buttonSelector: "#video-view-all",
  cardClass: "video-card",
  viewAllKey: "button.viewVideos",
  showLessKey: "button.lessVideos",
};

// Choose from all main projects, loading only the next visible batch.
const heroWorkImages = galleryAssets.work.filter(asset => !asset.role || asset.role === "project");
let heroQueue = [];
let heroRotationPending = false;
const assetBySrc = new Map([...galleryAssets.work, ...galleryAssets.videos].map(asset => [asset.src, asset]));

function assetTitle(asset) {
  return asset?.title[currentLanguage] || asset?.title.en || "";
}

function itemTitle(config, fileNumber) {
  return assetTitle(config.assets[fileNumber - 1]);
}

function translate(key) {
  return translations[currentLanguage]?.[key] || translations.en[key] || "";
}

function updateResponsiveSize(image) {
  if (!image.dataset.srcset && !image.hasAttribute("srcset")) return;
  const width = Math.ceil(image.getBoundingClientRect().width);
  if (width > 0) image.sizes = `${width}px`;
}

function loadResponsiveImage(image) {
  if (image.dataset.srcset) {
    updateResponsiveSize(image);
    image.srcset = image.dataset.srcset;
  }
  image.src = image.dataset.src;
}

function preloadResponsiveAsset(asset, width) {
  const image = new Image();
  image.sizes = `${Math.ceil(width)}px`;
  if (asset.srcSet) image.srcset = asset.srcSet;
  image.src = asset.src;
  return new Promise((resolve, reject) => {
    const timeout = window.setTimeout(() => reject(new Error("Image loading timed out")), 10000);
    image.decode().then(resolve, reject).finally(() => window.clearTimeout(timeout));
  });
}

function updateGalleryImageSizes(cards) {
  cards.forEach(card => {
    const image = card.querySelector("img[srcset]");
    if (image) updateResponsiveSize(image);
  });
}

const mediaObserver = "IntersectionObserver" in window
  ? new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const image = entry.target;
          loadResponsiveImage(image);
          mediaObserver.unobserve(image);
        }
      });
    }, { rootMargin: "200px" })
  : null;

function createMediaCard(config, asset, fileNumber) {
  const figure = document.createElement("figure");
  figure.className = config.cardClass;
  figure.dataset.order = fileNumber;
  figure.dataset.aspect = asset.width / asset.height;
  figure.dataset.previewItem = fileNumber > previewLimit ? "extra" : "visible";
  if (asset.brandId) {
    figure.dataset.brand = asset.brandId;
    figure.dataset.brands = asset.brandIds.join(" ");
    figure.dataset.brandLabel = asset.brand;
    figure.dataset.category = asset.categoryId;
    figure.dataset.projectId = asset.projectId;
    figure.dataset.role = asset.role;
  }

  const button = document.createElement("button");
  button.type = "button";
  button.className = "media-preview";
  button.dataset.titleNumber = fileNumber;
  button.dataset.titleConfig = config.gallerySelector;
  button.setAttribute("aria-label", `${translate("a11y.openImage")} ${assetTitle(asset)}`);
  button.setAttribute("aria-haspopup", "dialog");
  button.setAttribute("aria-controls", "media-lightbox");

  const image = document.createElement("img");
  image.alt = assetTitle(asset);
  image.dataset.titleNumber = fileNumber;
  image.dataset.titleConfig = config.gallerySelector;
  image.dataset.src = asset.src;
  if (asset.srcSet) image.dataset.srcset = asset.srcSet;
  image.width = asset.width;
  image.height = asset.height;
  image.loading = "lazy";
  image.decoding = "async";
  button.appendChild(image);
  figure.appendChild(button);
  button.addEventListener("click", () => openLightbox(asset, button));

  if (mediaObserver) {
    mediaObserver.observe(image);
  } else {
    loadResponsiveImage(image);
  }

  if (config.gallerySelector === "#video-gallery") {
    const caption = document.createElement("figcaption");
    caption.textContent = assetTitle(asset);
    caption.dataset.titleNumber = fileNumber;
    caption.dataset.titleConfig = config.gallerySelector;
    figure.appendChild(caption);
  }

  return figure;
}

function openLightbox(asset, trigger) {
  if (!lightbox || !lightboxImage) return;
  setMenuOpen(false);
  lightboxTrigger = trigger || document.activeElement;
  lightboxImage.src = asset.src;
  lightboxImage.alt = assetTitle(asset);
  lightboxImage.dataset.assetSrc = asset.src;
  lightbox.classList.add("is-open");
  document.body.classList.add("lightbox-open");
  if (!lightbox.open) lightbox.showModal();
  lightboxClose.focus();
}

function closeLightbox() {
  if (lightbox?.open) {
    lightbox.close();
    resetLightbox();
  }
}

function resetLightbox() {
  // A queued close event may arrive after the user has opened another preview.
  if (lightbox.open) return;
  lightbox.classList.remove("is-open");
  document.body.classList.remove("lightbox-open");
  lightboxImage.removeAttribute("src");
  lightboxImage.alt = "";
  delete lightboxImage.dataset.assetSrc;
  if (lightboxTrigger?.isConnected) lightboxTrigger.focus({ preventScroll: true });
  lightboxTrigger = null;
}

function updateViewAllButton(gallery, button) {
  const extraItems = gallery.querySelectorAll('[data-preview-item="extra"]');

  if (extraItems.length === 0) {
    button.hidden = true;
    return;
  }

  button.hidden = false;
  button.addEventListener("click", () => {
    const isExpanded = gallery.classList.toggle("is-expanded");
    button.setAttribute("aria-expanded", String(isExpanded));
    button.textContent = isExpanded ? translate(button.dataset.showLessKey) : translate(button.dataset.viewAllKey);
    if (gallery.id === "work-gallery") workFilters?.setExpanded(isExpanded);
    layoutPuzzleGallery(gallery.id === "video-gallery" ? "#video-gallery" : "#work-gallery");
    if (gallery.id === "work-gallery") workPreviewRotation?.refresh();

    if (!isExpanded) {
      gallery.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

function loadGallery(config) {
  const gallery = document.querySelector(config.gallerySelector);
  const emptyGallery = document.querySelector(config.emptySelector);
  const viewAllButton = document.querySelector(config.buttonSelector);
  if (!gallery || !emptyGallery || !viewAllButton) return;

  viewAllButton.dataset.viewAllKey = config.viewAllKey;
  viewAllButton.dataset.showLessKey = config.showLessKey;
  viewAllButton.textContent = translate(config.viewAllKey);
  viewAllButton.setAttribute("aria-controls", gallery.id);
  viewAllButton.setAttribute("aria-expanded", "false");
  const fragment = document.createDocumentFragment();
  config.assets.forEach((asset, index) => fragment.appendChild(createMediaCard(config, asset, index + 1)));
  gallery.appendChild(fragment);
  emptyGallery.classList.toggle("is-hidden", config.assets.length > 0);
  updateViewAllButton(gallery, viewAllButton);
  layoutPuzzleGallery(config.gallerySelector);
}

function visibleWorkCards() {
  return [...document.querySelectorAll("#work-gallery .work-card")]
    .filter((card) => window.getComputedStyle(card).display !== "none");
}

function setupWorkFilters() {
  const form = document.querySelector("#work-filters");
  const gallery = document.querySelector("#work-gallery");
  const category = document.querySelector("#work-category");
  const brand = document.querySelector("#work-brand");
  const query = document.querySelector("#work-query");
  const count = document.querySelector("#work-count");
  const empty = document.querySelector("#work-no-results");
  const cards = [...gallery.querySelectorAll(".work-card")];
  const clean = value => value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  function populate(select, entries) {
    const selected = select.value || "all";
    select.replaceChildren(new Option(translate("work.showAll"), "all"));
    [...entries].sort((a, b) => a[1].localeCompare(b[1], currentLanguage)).forEach(([id, label]) => {
      select.add(new Option(label, id));
    });
    select.value = selected;
  }

  function apply() {
    const expanded = gallery.classList.contains("is-expanded");
    const needle = clean(query.value.trim());
    let matches = 0;
    cards.forEach(card => {
      const asset = galleryAssets.work[Number(card.dataset.order) - 1];
      const text = clean([assetTitle(asset), asset.brand, ...(asset.brands || []), asset.projectId, asset.year,
        asset.categoryLabel?.[currentLanguage] || asset.category].join(" "));
      const match = (category.value === "all" || asset.categoryId === category.value)
        && (brand.value === "all" || (asset.brandIds || [asset.brandId]).includes(brand.value))
        && text.includes(needle);
      card.hidden = expanded && !match;
      if (match) matches += 1;
    });
    count.textContent = translate("work.count").replace("{count}", matches).replace("{total}", cards.length);
    empty.hidden = !expanded || matches > 0;
    layoutPuzzleGallery("#work-gallery");
  }

  function refresh() {
    const categories = new Map();
    const brands = new Map();
    galleryAssets.work.forEach(asset => {
      if (asset.categoryId) categories.set(asset.categoryId, asset.categoryLabel?.[currentLanguage] || asset.category);
      (asset.brandIds || [asset.brandId]).forEach((id, index) => {
        if (id) brands.set(id, asset.brands?.[index] || asset.brand);
      });
    });
    populate(category, categories);
    populate(brand, brands);
    apply();
  }

  function reset() {
    category.value = brand.value = "all";
    query.value = "";
    apply();
  }

  form.addEventListener("submit", event => event.preventDefault());
  form.addEventListener("reset", event => {
    event.preventDefault();
    reset();
  });
  category.addEventListener("change", apply);
  brand.addEventListener("change", apply);
  query.addEventListener("input", apply);
  document.querySelector("#work-view-all").setAttribute("aria-controls", "work-filters work-gallery");
  refresh();
  return {
    refresh,
    setExpanded(expanded) {
      form.hidden = !expanded;
      reset();
      if (expanded) window.requestAnimationFrame(() => form.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
        block: "start",
      }));
    },
  };
}

function setupWorkPreviewRotation() {
  const gallery = document.querySelector("#work-gallery");
  if (!gallery) return null;

  const cards = [...gallery.querySelectorAll("figure")];
  const candidates = cards.filter(card => !card.dataset.role || card.dataset.role === "project");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let pending = false;
  let queue = [];
  let timer;

  function refresh() {
    // Automatic changes must not repeatedly announce the gallery to screen readers.
    gallery.setAttribute("aria-live", gallery.classList.contains("is-expanded") ? "polite" : "off");
    window.clearInterval(timer);
    if (!gallery.classList.contains("is-expanded") && candidates.length > previewLimit) {
      timer = window.setInterval(advance, 7000);
    }
  }

  function canRotate() {
    const bounds = gallery.getBoundingClientRect();
    return !document.hidden && !lightbox?.open
      && !gallery.classList.contains("is-expanded")
      && !gallery.contains(document.activeElement)
      && bounds.top < window.innerHeight && bounds.bottom > 0;
  }

  function shuffle(items) {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  async function advance() {
    if (pending || !canRotate() || candidates.length <= previewLimit) return false;
    const current = new Set(cards.filter(card => card.dataset.previewItem === "visible"));
    if (queue.filter(card => !current.has(card)).length < previewLimit) {
      const queued = new Set(queue);
      queue.push(...shuffle(candidates.filter(card => !queued.has(card) && !current.has(card))));
    }
    const available = queue.filter(card => !current.has(card));
    const next = [];
    const brands = new Set();
    while (next.length < previewLimit && available.length) {
      // Mix brands within a batch, while eventually cycling through every project.
      let index = available.findIndex(card => !brands.has(card.dataset.brand));
      if (index < 0) index = 0;
      const card = available.splice(index, 1)[0];
      next.push(card);
      brands.add(card.dataset.brand);
    }
    if (next.length !== previewLimit) return false;

    pending = true;
    try {
      // Fetch only the next four responsive previews, keeping hidden projects lazy.
      await Promise.all(next.map(card => {
        const asset = galleryAssets.work[Number(card.dataset.order) - 1];
        return preloadResponsiveAsset(asset, gallery.clientWidth / (mobileNavigation.matches ? 1 : 2));
      }));
      if (!canRotate()) return false;
      const selected = new Set(next);
      cards.forEach(card => card.dataset.previewItem = selected.has(card) ? "visible" : "extra");
      queue = queue.filter(card => !selected.has(card));
      layoutPuzzleGallery("#work-gallery");
      if (!reducedMotion.matches) gallery.animate([{ opacity: 0.5 }, { opacity: 1 }], { duration: 300 });
      return true;
    } catch {
      // A failed image request must not replace the currently visible selection.
      return false;
    } finally {
      pending = false;
    }
  }

  reducedMotion.addEventListener("change", refresh);
  refresh();
  return { advance, refresh };
}

function visiblePuzzleCards(selector) {
  return [...document.querySelectorAll(`${selector} figure`)]
    .filter((card) => window.getComputedStyle(card).display !== "none");
}

function applyPuzzleRow(row, rowWidth, gap, isLastRow = false) {
  const aspectSum = row.reduce((sum, card) => sum + Number(card.dataset.aspect || 1), 0);
  const usableWidth = rowWidth - gap * (row.length - 1);
  const rowHeight = isLastRow
    ? Math.min(390, Math.max(230, usableWidth / Math.max(aspectSum, 1)))
    : usableWidth / Math.max(aspectSum, 1);

  const widths = row.map((card) => Math.floor(rowHeight * Number(card.dataset.aspect || 1)));
  const occupiedWidth = widths.reduce((sum, width) => sum + width, 0);
  const targetWidth = isLastRow
    ? Math.min(Math.floor(usableWidth), Math.round(rowHeight * aspectSum))
    : Math.floor(usableWidth);
  const remainingPixels = Math.max(0, targetWidth - occupiedWidth);

  row.forEach((card, index) => {
    card.style.width = `${widths[index] + (index < remainingPixels ? 1 : 0)}px`;
    card.style.height = `${Math.round(rowHeight)}px`;
  });
}

const pendingGalleryLayouts = new Set();
let galleryLayoutFrame = null;

function layoutPuzzleGallery(selector) {
  pendingGalleryLayouts.add(selector);

  if (galleryLayoutFrame !== null) {
    return;
  }

  galleryLayoutFrame = window.requestAnimationFrame(() => {
    galleryLayoutFrame = null;
    const selectors = [...pendingGalleryLayouts];
    pendingGalleryLayouts.clear();
    selectors.forEach(performPuzzleGalleryLayout);
  });
}

function performPuzzleGalleryLayout(selector) {
  const gallery = document.querySelector(selector);

  if (!gallery) {
    return;
  }

  const cards = arrangePuzzleCards(visiblePuzzleCards(selector));
  const rowWidth = gallery.clientWidth;
  const gap = Number.parseFloat(getComputedStyle(gallery).gap) || 18;

  if (!cards.length || rowWidth < 1) {
    return;
  }

  if (window.matchMedia("(max-width: 970px)").matches) {
    cards.forEach((card) => {
      card.style.width = "";
      card.style.height = "";
    });
    updateGalleryImageSizes(cards);
    return;
  }

  const targetHeight = 340;
  let row = [];
  let aspectSum = 0;

  cards.forEach((card) => {
    const aspect = Number(card.dataset.aspect || 1);
    row.push(card);
    aspectSum += aspect;

    if (aspectSum * targetHeight >= rowWidth - gap * (row.length - 1)) {
      applyPuzzleRow(row, rowWidth, gap);
      row = [];
      aspectSum = 0;
    }
  });

  if (row.length) {
    applyPuzzleRow(row, rowWidth, gap, true);
  }
  updateGalleryImageSizes(cards);
}

function arrangePuzzleCards(cards) {
  const currentOrder = cards;
  // Always start from file order, so repeated layouts produce the same sequence.
  cards = [...cards].sort((a, b) => Number(a.dataset.order) - Number(b.dataset.order));
  const wide = cards.filter((card) => Number(card.dataset.aspect || 1) >= 1.55);
  const tall = cards.filter((card) => Number(card.dataset.aspect || 1) <= 0.8);
  const normal = cards.filter((card) => {
    const aspect = Number(card.dataset.aspect || 1);
    return aspect > 0.8 && aspect < 1.55;
  });
  const arranged = [];

  while (wide.length || tall.length || normal.length) {
    if (wide.length) {
      arranged.push(wide.shift());
    }
    if (tall.length) {
      arranged.push(tall.shift());
    }
    if (normal.length) {
      arranged.push(normal.shift());
    }
    if (normal.length) {
      arranged.push(normal.pop());
    }
  }

  if (arranged.some((card, index) => card !== currentOrder[index])) {
    const gallery = arranged[0].parentElement;
    const fragment = document.createDocumentFragment();
    arranged.forEach((card) => fragment.appendChild(card));
    gallery.appendChild(fragment);
  }
  return arranged;
}

function configBySelector(selector) {
  return selector === "#video-gallery" ? videoConfig : workConfig;
}

function refreshGeneratedText() {
  document.querySelectorAll("[data-title-config]").forEach((element) => {
    const config = configBySelector(element.dataset.titleConfig);
    const fileNumber = Number(element.dataset.titleNumber);
    const title = itemTitle(config, fileNumber);

    if (element.tagName.toLowerCase() === "img") {
      element.alt = title;
    } else if (element.tagName.toLowerCase() === "button") {
      element.setAttribute("aria-label", `${translate("a11y.openImage")} ${title}`);
    } else {
      element.textContent = title;
    }
  });

  document.querySelectorAll(".view-all-button").forEach((button) => {
    const gallery = button.id === "video-view-all"
      ? document.querySelector("#video-gallery")
      : document.querySelector("#work-gallery");

    if (!gallery) {
      return;
    }

    button.textContent = gallery.classList.contains("is-expanded")
      ? translate(button.dataset.showLessKey)
      : translate(button.dataset.viewAllKey);
  });
}

function setLanguage(language) {
  currentLanguage = translations[language] ? language : "en";
  try {
    localStorage.setItem("siteLanguage", currentLanguage);
  } catch {
    // Keep language switching functional without persistent storage.
  }
  document.documentElement.lang = currentLanguage;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = translate(element.dataset.i18n);
  });

  languageButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.language === currentLanguage);
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach(element => {
    element.setAttribute("aria-label", translate(element.dataset.i18nAriaLabel));
  });
  document.querySelectorAll("[data-i18n-title]").forEach(element => {
    element.title = translate(element.dataset.i18nTitle);
  });
  languageButtons.forEach(button => button.setAttribute("aria-pressed", String(button.dataset.language === currentLanguage)));
  heroImages.forEach(image => image.alt = assetTitle(assetBySrc.get(image.getAttribute("src"))));
  if (lightboxImage?.dataset.assetSrc) lightboxImage.alt = assetTitle(assetBySrc.get(lightboxImage.dataset.assetSrc));
  refreshGeneratedText();
  workFilters?.refresh();
  workPreviewRotation?.refresh();
}

function setMenuOpen(open, returnFocus = false) {
  if (!menuToggle || !navLinks) return;
  const expanded = mobileNavigation.matches && open;
  navLinks.classList.toggle("is-open", expanded);
  navLinks.inert = mobileNavigation.matches && !expanded;
  if (navLinks.inert) navLinks.setAttribute("aria-hidden", "true");
  else navLinks.removeAttribute("aria-hidden");
  menuToggle.setAttribute("aria-expanded", String(expanded));
  menuToggle.dataset.i18nAriaLabel = expanded ? "a11y.closeMenu" : "a11y.openMenu";
  menuToggle.setAttribute("aria-label", translate(menuToggle.dataset.i18nAriaLabel));
  menuToggle.querySelector("span").textContent = expanded ? "×" : "☰";
  if (expanded) navLinks.querySelector("a").focus();
  else if (returnFocus) menuToggle.focus();
}

menuToggle?.addEventListener("click", () => setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true", true));
mobileNavigation.addEventListener("change", () => {
  const focusWasInMenu = navLinks?.contains(document.activeElement);
  setMenuOpen(false, mobileNavigation.matches && focusWasInMenu);
});
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    setMenuOpen(false);
    const section = document.querySelector(link.getAttribute("href"));
    if (section) {
      section.tabIndex = -1;
      window.requestAnimationFrame(() => section.focus({ preventScroll: true }));
    }
  });
});
document.addEventListener("click", event => {
  if (menuToggle?.getAttribute("aria-expanded") === "true" && !event.target.closest("nav")) setMenuOpen(false);
});

if (lightbox) {
  lightbox.addEventListener("click", event => {
    if (event.target === lightbox) closeLightbox();
  });
  lightbox.addEventListener("cancel", event => {
    event.preventDefault();
    closeLightbox();
  });
  lightbox.addEventListener("close", resetLightbox);
  lightbox.addEventListener("keydown", event => {
    if (event.key === "Tab") {
      // The close button is the dialog's only interactive control.
      event.preventDefault();
      lightboxClose.focus();
    }
  });
}
lightboxClose?.addEventListener("click", closeLightbox);
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && menuToggle?.getAttribute("aria-expanded") === "true") setMenuOpen(false, true);
});

window.addEventListener("resize", () => {
  layoutPuzzleGallery("#work-gallery");
  layoutPuzzleGallery("#video-gallery");
  heroImages.forEach(updateResponsiveSize);
});

function setHeroAsset(image, asset) {
  image.dataset.srcset = asset.srcSet || "";
  updateResponsiveSize(image);
  if (asset.srcSet) image.srcset = asset.srcSet;
  else image.removeAttribute("srcset");
  image.src = asset.src;
  image.alt = assetTitle(asset);
}

async function shuffleHeroWork() {
  const panel = document.querySelector(".hero-showcase");
  const bounds = panel?.getBoundingClientRect();
  if (!heroImages.length || !heroWorkImages.length || heroRotationPending || document.hidden || lightbox?.open
    || !bounds || bounds.bottom <= 0 || bounds.top >= window.innerHeight) return false;

  const currentSources = new Set([...heroImages].map(image => image.getAttribute("src")));
  if (heroQueue.filter(asset => !currentSources.has(asset.src)).length < heroImages.length) {
    const queued = new Set(heroQueue);
    const additions = heroWorkImages.filter(asset => !queued.has(asset) && !currentSources.has(asset.src));
    for (let i = additions.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [additions[i], additions[j]] = [additions[j], additions[i]];
    }
    heroQueue.push(...additions);
  }
  const available = heroQueue.filter(asset => !currentSources.has(asset.src));
  const next = [];
  const brands = new Set();
  while (next.length < heroImages.length && available.length) {
    let index = available.findIndex(asset => !brands.has(asset.brandId));
    if (index < 0) index = 0;
    const asset = available.splice(index, 1)[0];
    next.push(asset);
    brands.add(asset.brandId);
  }
  if (next.length !== heroImages.length) return false;

  heroRotationPending = true;
  heroQueue = heroQueue.filter(asset => !next.includes(asset));
  try {
    await Promise.all(next.map((asset, index) => preloadResponsiveAsset(asset, heroImages[index].getBoundingClientRect().width)));
    if (document.hidden || lightbox?.open) return false;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      heroImages.forEach(image => image.style.opacity = "0");
      await new Promise(resolve => window.setTimeout(resolve, 260));
    }
    heroImages.forEach((image, index) => setHeroAsset(image, next[index]));
    return true;
  } catch {
    return false;
  } finally {
    heroImages.forEach(image => image.style.opacity = "1");
    heroRotationPending = false;
  }
}

function seedHeroImages() {
  if (heroWorkImages.length === 0 || heroImages.length === 0) {
    return;
  }

  heroImages.forEach((image, index) => {
    const asset = assetBySrc.get(image.getAttribute("src")) || heroWorkImages[index % heroWorkImages.length];
    setHeroAsset(image, asset);
  });
}

function initSite() {
  setLanguage(currentLanguage);
  setMenuOpen(false);
  seedHeroImages();

  loadGallery(workConfig);
  loadGallery(videoConfig);
  workFilters = setupWorkFilters();
  workPreviewRotation = setupWorkPreviewRotation();

  languageButtons.forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.language));
  });

  if (heroImages.length > 0) {
    setInterval(shuffleHeroWork, 4200);
  }
}

initSite();
