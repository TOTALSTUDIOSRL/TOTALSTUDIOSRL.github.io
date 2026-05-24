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
    "services.text": "From first concept to final print files, the site is structured as one scrollable page so visitors can move naturally from introduction to contact.",
    "services.printTitle": "Print Ads",
    "services.printText": "Window stickers, decals for cars and buses, mall visuals, outdoor ads, and posters.",
    "services.packagingTitle": "Packaging",
    "services.packagingText": "Design for bottles, boxes, medicine creams, pills, labels, and other package formats.",
    "services.videoTitle": "Photo & Video Ads",
    "services.videoText": "Product photography, posters made from ads, window stickers from full ads, and short simple video ads.",
    "work.eyebrow": "(Advertising work)",
    "work.title": "Designs ready for print, display, and promotion.",
    "work.note": "Add files named work-01, work-02, work-03 and so on inside images/work. Supported formats: jpg, jpeg, png, webp.",
    "work.empty": "No work images found yet. Add images to images/work using names like work-01.jpg.",
    "videos.eyebrow": "(Short ad samples)",
    "videos.title": "Simple animated ads for online use.",
    "videos.empty": "No video ads found yet. Add GIFs to images/videos using names like video-01.gif.",
    "contact.eyebrow": "(Reach out)",
    "contact.title": "Let's talk.",
    "contact.text": "Have an ad, package, poster, sticker, decal, or simple video idea in mind? Send a message or call and we can figure out the next step.",
    "contact.phone": "Phone number",
    "contact.email": "Email",
    "contact.address": "Address",
    "footer.rights": "(c) 2026 Total Studio. All rights reserved.",
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
    "hero.text": "Design publicitar pregatit pentru tipar: vitrine, masini, autobuze, mall-uri, ambalaje, postere si reclame video simple.",
    "hero.viewWork": "Vezi lucrari",
    "hero.contact": "Contacteaza-ne",
    "hero.badge": "Reclame / Ambalaje / Colantari",
    "about.eyebrow": "(Ce facem)",
    "about.title": "Design pregatit pentru suprafete reale, spatii reale si lucrari reale de tipar.",
    "about.textOne": "Total Studio creeaza materiale vizuale curate si practice pentru firme care au nevoie de reclame pregatite pentru tipar sau publicare.",
    "about.textTwo": "Studioul poate realiza stickere pentru vitrine, colantari pentru masini si autobuze, reclame pentru mall-uri, ambalaje, postere si reclame video scurte.",
    "services.eyebrow": "(Servicii)",
    "services.title": "Lucrari creative pentru nevoi reale de business.",
    "services.text": "De la prima idee pana la fisierele finale pentru tipar, site-ul este structurat ca o singura pagina usor de parcurs pana la contact.",
    "services.printTitle": "Reclame printate",
    "services.printText": "Stickere pentru vitrine, colantari pentru masini si autobuze, materiale pentru mall-uri, reclame outdoor si postere.",
    "services.packagingTitle": "Ambalaje",
    "services.packagingText": "Design pentru sticle, cutii, creme medicinale, pastile, etichete si alte formate de ambalaj.",
    "services.videoTitle": "Foto si reclame video",
    "services.videoText": "Fotografiere de produse, postere realizate din reclame, stickere pentru vitrine din reclame complete si clipuri video simple.",
    "work.eyebrow": "(Lucrari publicitare)",
    "work.title": "Designuri pregatite pentru tipar, afisare si promovare.",
    "work.note": "Adauga fisiere numite work-01, work-02, work-03 si asa mai departe in images/work. Formate acceptate: jpg, jpeg, png, webp.",
    "work.empty": "Nu exista inca imagini cu lucrari. Adauga imagini in images/work cu nume precum work-01.jpg.",
    "videos.eyebrow": "(Mostre de reclame scurte)",
    "videos.title": "Reclame animate simple pentru folosire online.",
    "videos.empty": "Nu exista inca reclame video. Adauga GIF-uri in images/videos cu nume precum video-01.gif.",
    "contact.eyebrow": "(Contact)",
    "contact.title": "Hai să vorbim.",
    "contact.text": "Ai o idee pentru reclama, ambalaj, poster, sticker, colantare sau video simplu? Trimite un mesaj sau suna-ne si stabilim urmatorul pas.",
    "contact.phone": "Numar de telefon",
    "contact.email": "Email",
    "contact.address": "Adresa",
    "footer.rights": "(c) 2026 Total Studio. Toate drepturile rezervate.",
    "button.viewWork": "Vezi toate lucrarile",
    "button.lessWork": "Arata mai putine lucrari",
    "button.viewVideos": "Vezi toate videourile",
    "button.lessVideos": "Arata mai putine videouri",
    "label.work": "Lucrare",
    "label.video": "Reclama video",
    "label.window": "Design sticker vitrina",
    "label.vehicle": "Design colantare vehicul",
    "label.packaging": "Design ambalaj",
    "label.mall": "Design reclama mall",
    "label.videoOne": "Reclame pentru vitrine, masini, autobuze si mall-uri",
    "label.videoTwo": "Ambalaje, fotografii, postere si reclame scurte",
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

const heroWorkImages = [
  "images/work/work-01.png",
  "images/work/work-02.png",
  "images/work/work-03.png",
  "images/work/work-04.png",
];

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
  image.src = src;
  image.alt = `${title} sample`;
  image.dataset.titleNumber = fileNumber;
  image.dataset.titleConfig = config.gallerySelector;
  image.loading = "lazy";

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
    }
  }

  updateViewAllButton(gallery, viewAllButton);
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

function shuffleHeroWork() {
  const shuffled = [...heroWorkImages].sort(() => Math.random() - 0.5);

  heroImages.forEach((image, index) => {
    image.style.opacity = "0";
    setTimeout(() => {
      image.src = shuffled[index % shuffled.length];
      image.style.opacity = "1";
    }, 260);
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
