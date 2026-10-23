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
let currentLanguage = "en";
try {
  currentLanguage = localStorage.getItem("siteLanguage") || "en";
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
    "hero.eyebrow": "(Design studio)",
    "hero.text": "Print-ready advertising design for windows, cars, buses, malls, packaging, posters, and simple video ads.",
    "hero.viewWork": "View Work",
    "hero.contact": "Contact Us",
    "hero.badge": "Ads / Packaging / Decals",
    "about.eyebrow": "(What we do)",
    "about.title": "Design prepared for real surfaces, real spaces, and real print jobs.",
    "about.textOne": "Total Studio creates clean, practical visuals for firms that need ads prepared before printing or publishing.",
    "about.textTwo": "The studio can design window stickers, car and bus decals, mall ads, product packages, posters, and simple short video ads.",
    "services.eyebrow": "(Services)",
    "services.title": "Creative work for real business needs.",
    "services.printTitle": "Print Ads",
    "services.printText": "Window stickers, decals for cars and buses, mall visuals, outdoor ads, and posters.",
    "services.packagingTitle": "Packaging",
    "services.packagingText": "Design for bottles, boxes, medicine creams, pills, labels, and other package formats.",
    "services.videoTitle": "Photo & Video Ads",
    "services.videoText": "Product photography, posters made from ads, window stickers from full ads, and short simple video ads.",
    "work.eyebrow": "(Advertising work)",
    "work.title": "Designs ready for print, display, and promotion.",
    "work.empty": "No work images found yet.",
    "videos.eyebrow": "(Short ad samples)",
    "videos.title": "Simple animated ads for online use.",
    "videos.empty": "No video ads found yet.",
    "contact.eyebrow": "(Reach out)",
    "contact.title": "Let's talk.",
    "contact.text": "Have an ad, package, poster, sticker, decal, or simple video idea in mind? Send a message or call and we can figure out the next step.",
    "contact.phone": "Phone number",
    "contact.email": "Email",
    "contact.address": "Address",
    "footer.rights": "© 2026 Total Studio. All rights reserved.",
    "button.viewWork": "View all work",
    "button.lessWork": "Show less work",
    "button.viewVideos": "View all videos",
    "button.lessVideos": "Show less videos",
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
    "hero.eyebrow": "(Studio de design)",
    "hero.text": "Design publicitar pregătit pentru tipar: vitrine, mașini, autobuze, mall-uri, ambalaje, postere și reclame video simple.",
    "hero.viewWork": "Vezi lucrări",
    "hero.contact": "Contactează-ne",
    "hero.badge": "Reclame / Ambalaje / Colantări",
    "about.eyebrow": "(Ce facem)",
    "about.title": "Design pregătit pentru suprafețe reale, spații reale și lucrări reale de tipar.",
    "about.textOne": "Total Studio creează materiale vizuale curate și practice pentru firme care au nevoie de reclame pregătite pentru tipar sau publicare.",
    "about.textTwo": "Studioul poate realiza stickere pentru vitrine, colantări pentru mașini și autobuze, reclame pentru mall-uri, ambalaje, postere și reclame video scurte.",
    "services.eyebrow": "(Servicii)",
    "services.title": "Lucrări creative pentru nevoi reale de business.",
    "services.printTitle": "Reclame printate",
    "services.printText": "Stickere pentru vitrine, colantări pentru mașini și autobuze, materiale pentru mall-uri, reclame outdoor și postere.",
    "services.packagingTitle": "Ambalaje",
    "services.packagingText": "Design pentru sticle, cutii, creme medicinale, pastile, etichete și alte formate de ambalaj.",
    "services.videoTitle": "Foto și reclame video",
    "services.videoText": "Fotografiere de produse, postere realizate din reclame, stickere pentru vitrine din reclame complete și clipuri video simple.",
    "work.eyebrow": "(Lucrări publicitare)",
    "work.title": "Designuri pregătite pentru tipar, afișare și promovare.",
    "work.empty": "Nu există încă imagini cu lucrări.",
    "videos.eyebrow": "(Mostre de reclame scurte)",
    "videos.title": "Reclame animate simple pentru folosire online.",
    "videos.empty": "Nu există încă reclame video.",
    "contact.eyebrow": "(Contact)",
    "contact.title": "Hai să vorbim.",
    "contact.text": "Ai o idee pentru reclamă, ambalaj, poster, sticker, colantare sau video simplu? Trimite un mesaj sau sună-ne și stabilim următorul pas.",
    "contact.phone": "Număr de telefon",
    "contact.email": "Email",
    "contact.address": "Adresă",
    "footer.rights": "© 2026 Total Studio. Toate drepturile rezervate.",
    "button.viewWork": "Vezi toate lucrările",
    "button.lessWork": "Arată mai puține lucrări",
    "button.viewVideos": "Vezi toate videourile",
    "button.lessVideos": "Arată mai puține videouri",
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

// Rotate only preview assets; the rest stay unloaded until they are near the viewport.
const heroWorkImages = galleryAssets.work.slice(0, previewLimit);
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

const mediaObserver = "IntersectionObserver" in window
  ? new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const image = entry.target;
          image.src = image.dataset.src;
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
    image.src = asset.src;
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
    layoutPuzzleGallery(gallery.id === "video-gallery" ? "#video-gallery" : "#work-gallery");

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
});

function shuffleHeroWork() {
  if (heroWorkImages.length === 0) {
    return;
  }

  const shuffled = [...heroWorkImages].sort(() => Math.random() - 0.5);

  heroImages.forEach((image, index) => {
    image.style.opacity = "0";
    setTimeout(() => {
      const asset = shuffled[index % shuffled.length];
      image.src = asset.src;
      image.alt = assetTitle(asset);
      image.style.opacity = "1";
    }, 260);
  });
}

function seedHeroImages() {
  if (heroWorkImages.length === 0 || heroImages.length === 0) {
    return;
  }

  heroImages.forEach((image, index) => {
    const asset = assetBySrc.get(image.getAttribute("src")) || heroWorkImages[index % heroWorkImages.length];
    image.src = asset.src;
    image.alt = assetTitle(asset);
  });
}

function initSite() {
  setLanguage(currentLanguage);
  setMenuOpen(false);
  seedHeroImages();

  loadGallery(workConfig);
  loadGallery(videoConfig);

  languageButtons.forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.language));
  });

  if (heroImages.length > 0) {
    setInterval(shuffleHeroWork, 4200);
  }
}

initSite();
