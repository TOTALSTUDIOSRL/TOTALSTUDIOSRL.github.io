const closeMenu = document.querySelector("#close-btn");
const heroImages = document.querySelectorAll(".hero-work");
const languageButtons = document.querySelectorAll("[data-language]");
const lightbox = document.querySelector("#media-lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxClose = document.querySelector(".lightbox-close");

const previewLimit = 4;
let currentLanguage = localStorage.getItem("siteLanguage") || "en";

const translations = {
  en: {
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
    "label.work": "Work",
    "label.video": "Video ad",
    "label.window": "Window sticker design",
    "label.vehicle": "Vehicle decal design",
    "label.packaging": "Packaging design",
    "label.mall": "Mall advertising design",
    "label.videoOne": "Window, car, bus, and mall ads",
    "label.videoTwo": "Packaging, photos, posters, and short ads",
  },
  ro: {
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
    "about.title": "Design pregătit pentru suprafețe reale, spații reale si lucrări reale de tipar.",
    "about.textOne": "Total Studio creează materiale vizuale curate și practice pentru firme care au nevoie de reclame pregătite pentru tipar sau publicare.",
    "about.textTwo": "Studioul poate realiza stickere pentru vitrine, colantari pentru mașini și autobuze, reclame pentru mall-uri, ambalaje, postere și reclame video scurte.",
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
    "work.empty": "Nu există înca imagini cu lucrări.",
    "videos.eyebrow": "(Mostre de reclame scurte)",
    "videos.title": "Reclame animate simple pentru folosire online.",
    "videos.empty": "Nu exista inca reclame video.",
    "contact.eyebrow": "(Contact)",
    "contact.title": "Hai să vorbim.",
    "contact.text": "Ai o idee pentru reclamă, ambalaj, poster, sticker, colantare sau video simplu? Trimite un mesaj sau sună-ne și stabilim următorul pas.",
    "contact.phone": "Număr de telefon",
    "contact.email": "Email",
    "contact.address": "Adresa",
    "footer.rights": "© 2026 Total Studio. Toate drepturile rezervate.",
    "button.viewWork": "Vezi toate lucrările",
    "button.lessWork": "Arată mai puține lucrări",
    "button.viewVideos": "Vezi toate videourile",
    "button.lessVideos": "Arată mai puține videouri",
    "label.work": "Lucrare",
    "label.video": "Reclamă video",
    "label.window": "Design sticker vitrină",
    "label.vehicle": "Design colantare vehicul",
    "label.packaging": "Design ambalaj",
    "label.mall": "Design reclamă mall",
    "label.videoOne": "Reclame pentru vitrine, mașini, autobuze și mall-uri",
    "label.videoTwo": "Ambalaje, fotografii, postere și reclame scurte",
  },
};

const workConfig = {
  folder: "images/work",
  prefix: "work",
  extensions: ["jpg", "jpeg", "png", "webp"],
  maxItems: 80,
  gallerySelector: "#work-gallery",
  emptySelector: "#work-empty",
  buttonSelector: "#work-view-all",
  cardClass: "work-card",
  labelPrefixKey: "label.work",
  mediaType: "image",
  viewAllKey: "button.viewWork",
  showLessKey: "button.lessWork",
  labels: [
    "label.window",
    "label.vehicle",
    "label.packaging",
    "label.mall",
  ],
};

const videoConfig = {
  folder: "images/videos",
  prefix: "video",
  extensions: ["gif"],
  maxItems: 80,
  gallerySelector: "#video-gallery",
  emptySelector: "#video-empty",
  buttonSelector: "#video-view-all",
  cardClass: "video-card",
  labelPrefixKey: "label.video",
  mediaType: "image",
  viewAllKey: "button.viewVideos",
  showLessKey: "button.lessVideos",
  labels: [
    "label.videoOne",
    "label.videoTwo",
  ],
};

let heroWorkImages = [];

function itemTitle(config, fileNumber) {
  const language = translations[currentLanguage] || translations.en;
  const labelKey = config.labels[fileNumber - 1];

  if (labelKey && language[labelKey]) {
    return language[labelKey];
  }

  return `${language[config.labelPrefixKey]} ${String(fileNumber).padStart(2, "0")}`;
}

function translate(key) {
  return translations[currentLanguage]?.[key] || translations.en[key] || "";
}

function createMediaCard(config, src, fileNumber) {
  const title = itemTitle(config, fileNumber);
  const figure = document.createElement("figure");
  figure.className = config.cardClass;
  figure.dataset.previewItem = fileNumber > previewLimit ? "extra" : "visible";

  const image = document.createElement("img");
  image.alt = `${title} sample`;
  image.dataset.titleNumber = fileNumber;
  image.dataset.titleConfig = config.gallerySelector;
  image.loading = "lazy";
  image.addEventListener("load", () => {
    if (config.gallerySelector === "#work-gallery" || config.gallerySelector === "#video-gallery") {
      figure.dataset.aspect = image.naturalWidth / image.naturalHeight;
      figure.dataset.pixels = image.naturalWidth * image.naturalHeight;
      layoutPuzzleGallery(config.gallerySelector);
    }
  });
  image.src = src;

  figure.appendChild(image);
  figure.addEventListener("click", () => openLightbox(src, `${title} sample`));

  if (config.gallerySelector === "#video-gallery") {
    const caption = document.createElement("figcaption");
    caption.textContent = title;
    caption.dataset.titleNumber = fileNumber;
    caption.dataset.titleConfig = config.gallerySelector;
    figure.appendChild(caption);
  }

  return figure;
}

function openLightbox(src, altText) {
  if (!lightbox || !lightboxImage) {
    return;
  }

  lightboxImage.src = src;
  lightboxImage.alt = altText;
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-open");
}

function closeLightbox() {
  if (!lightbox || !lightboxImage) {
    return;
  }

  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-open");
  lightboxImage.src = "";
  lightboxImage.alt = "";
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
    button.textContent = isExpanded ? translate(button.dataset.showLessKey) : translate(button.dataset.viewAllKey);
    layoutPuzzleGallery(gallery.id === "video-gallery" ? "#video-gallery" : "#work-gallery");

    if (!isExpanded) {
      gallery.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}

function findMediaFile(config, fileNumber, extensionIndex = 0) {
  return new Promise((resolve) => {
    if (extensionIndex >= config.extensions.length) {
      resolve(null);
      return;
    }

    const paddedNumber = String(fileNumber).padStart(2, "0");
    const src = `${config.folder}/${config.prefix}-${paddedNumber}.${config.extensions[extensionIndex]}`;
    const image = new Image();

    image.onload = () => resolve(src);
    image.onerror = () => resolve(findMediaFile(config, fileNumber, extensionIndex + 1));
    image.src = src;
  });
}

async function loadGallery(config) {
  const gallery = document.querySelector(config.gallerySelector);
  const emptyGallery = document.querySelector(config.emptySelector);
  const viewAllButton = document.querySelector(config.buttonSelector);

  if (!gallery || !emptyGallery || !viewAllButton) {
    return;
  }

  viewAllButton.dataset.viewAllKey = config.viewAllKey;
  viewAllButton.dataset.showLessKey = config.showLessKey;
  viewAllButton.textContent = translate(config.viewAllKey);

  for (let index = 1; index <= config.maxItems; index += 1) {
    const src = await findMediaFile(config, index);

    if (src) {
      gallery.appendChild(createMediaCard(config, src, index));
      emptyGallery.classList.add("is-hidden");

      if (config.gallerySelector === "#work-gallery") {
        heroWorkImages.push(src);
        seedHeroImages();
      }
    }
  }

  updateViewAllButton(gallery, viewAllButton);

  if (config.gallerySelector === "#work-gallery") {
    layoutPuzzleGallery("#work-gallery");
  }

  if (config.gallerySelector === "#video-gallery") {
    layoutPuzzleGallery("#video-gallery");
  }
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

  row.forEach((card) => {
    const aspect = Number(card.dataset.aspect || 1);
    card.style.width = `${Math.round(rowHeight * aspect)}px`;
    card.style.height = `${Math.round(rowHeight)}px`;
  });
}

function layoutPuzzleGallery(selector) {
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

  arranged.forEach((card) => card.parentElement.appendChild(card));
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
      element.alt = `${title} sample`;
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
  localStorage.setItem("siteLanguage", currentLanguage);
  document.documentElement.lang = currentLanguage;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = translate(element.dataset.i18n);
  });

  languageButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.language === currentLanguage);
  });

  refreshGeneratedText();
}

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    if (closeMenu) {
      closeMenu.checked = true;
    }
  });
});

if (lightbox) {
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
}

if (lightboxClose) {
  lightboxClose.addEventListener("click", closeLightbox);
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
  }
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
      image.src = shuffled[index % shuffled.length];
      image.style.opacity = "1";
    }, 260);
  });
}

function seedHeroImages() {
  if (heroWorkImages.length === 0 || heroImages.length === 0) {
    return;
  }

  heroImages.forEach((image, index) => {
    image.src = heroWorkImages[index % heroWorkImages.length];
  });
}

loadGallery(workConfig);
loadGallery(videoConfig);
setLanguage(currentLanguage);

languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.language));
});

if (heroImages.length > 0) {
  setInterval(shuffleHeroWork, 4200);
}
