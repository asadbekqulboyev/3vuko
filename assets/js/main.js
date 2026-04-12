const hamburger_menu = document.querySelector(".hamburger_menu");
const header_mobile = document.querySelector(".header_mobile");
hamburger_menu.addEventListener("click", function () {
  header_mobile.classList.toggle("active");
  this.classList.toggle("active");
});
// dropdown mobile
document.querySelectorAll(".dropdown_menu").forEach((menu) => {
  menu.addEventListener("click", function (e) {
    if (window.innerWidth <= 768) {
      this.classList.toggle("active");
      e.preventDefault();

      const parentLi = this.closest("li");
      const submenu = parentLi.querySelector(".dropdown_submenu");

      if (submenu) {
        submenu.classList.toggle("active");
      }
    }
  });
});
const musicData = [
  {
    id: 1,
    number: "01",
    title: "Братья Грим - Лето (Remix)",
    author: "Аранжировка",
    src: "./assets/audio/music.mp3",
    image: "./assets/images/music_image1.png",
  },
  {
    id: 2,
    number: "02",
    title: "Кравц - Есть как есть (feat. Нигатив)",
    author: "Запись, сведение",
    src: "audio/audio-2.mp3",
    image: "./assets/images/music_image.png",
  },
  {
    id: 3,
    number: "03",
    title: "Д. Клявер - Удача найдет (Remix)",
    author: "Аранжировка",
    src: "audio/audio-3.mp3",
    image: "./assets/images/music_image2.png",
  },
  {
    id: 4,
    number: "04",
    title: "Stepski, B.Junkie - На Созерцании",
    author: "Запись, сведение",
    src: "audio/audio-4.mp3",
    image: "./assets/images/music_image.png",
  },
  {
    id: 5,
    number: "05",
    title: "Dina Mongo - Слезы-Вода",
    author: "Аранж., запись, сведение",
    src: "audio/audio-5.mp3",
    image: "./assets/images/music_image.png",
  },
];
const musicList = document.getElementById("musicList");
const testimonialsTrack = document.getElementById("testimonialsTrack");
const testimonialsProgress = document.getElementById("testimonialsProgress");
let currentAudio = null;
let currentMusicItem = null;
let galleryResizeFrame = null;
let testimonialsSwiper = null;

const pauseIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M1.33301 4.00016C1.33301 2.74308 1.33301 2.11454 1.72353 1.72402C2.11406 1.3335 2.7426 1.3335 3.99967 1.3335C5.25675 1.3335 5.88529 1.3335 6.27582 1.72402C6.66634 2.11454 6.66634 2.74308 6.66634 4.00016V12.0002C6.66634 13.2572 6.66634 13.8858 6.27582 14.2763C5.88529 14.6668 5.25675 14.6668 3.99967 14.6668C2.7426 14.6668 2.11406 14.6668 1.72353 14.2763C1.33301 13.8858 1.33301 13.2572 1.33301 12.0002V4.00016Z" fill="white"/>
    <path d="M9.33301 4.00016C9.33301 2.74308 9.33301 2.11454 9.72353 1.72402C10.1141 1.3335 10.7426 1.3335 11.9997 1.3335C13.2568 1.3335 13.8853 1.3335 14.2758 1.72402C14.6663 2.11454 14.6663 2.74308 14.6663 4.00016V12.0002C14.6663 13.2572 14.6663 13.8858 14.2758 14.2763C13.8853 14.6668 13.2568 14.6668 11.9997 14.6668C10.7426 14.6668 10.1141 14.6668 9.72353 14.2763C9.33301 13.8858 9.33301 13.2572 9.33301 12.0002V4.00016Z" fill="white"/>
  </svg>
`;

// Studio accordion for mobile
function initStudioAccordion() {
  const studioItems = document.querySelectorAll(".studio_item");
  const isMobile = window.innerWidth <= 768;

  studioItems.forEach((item) => {
    const trigger = item.querySelector(".studio_trigger");

    // Remove existing listeners to prevent duplicates
    const newTrigger = trigger.cloneNode(true);
    trigger.replaceWith(newTrigger);

    const updatedTrigger = item.querySelector(".studio_trigger");

    updatedTrigger.addEventListener("click", (e) => {
      e.preventDefault();

      if (!isMobile) return;

      // Close all other items
      studioItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("is-active");
        }
      });

      // Toggle current item
      item.classList.toggle("is-active");

      // Update image when expanded
      if (item.classList.contains("is-active")) {
        const image = updatedTrigger.getAttribute("data-image");
        const alt = updatedTrigger.getAttribute("data-alt");
        const studioImage = document.querySelector("[data-studio-image]");

        if (studioImage) {
          studioImage.src = image;
          studioImage.alt = alt;
        }
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initStudioAccordion();
});

window.addEventListener("resize", () => {
  initStudioAccordion();
});

const soundIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
    <circle cx="15" cy="15" r="15" fill="#0C0C0C"/>
    <path d="M14.2761 10.5905C14.938 10.1178 15.8573 10.5909 15.8573 11.4043V18.9468C15.8573 19.7601 14.938 20.2333 14.2761 19.7605L11.8572 18.0327H11C9.89543 18.0327 9 17.1373 9 16.0327V14.3183C9 13.2137 9.89543 12.3183 11 12.3183H11.8572L14.2761 10.5905Z" fill="white"/>
    <path d="M17.5676 17.9786C18.2766 17.2568 18.714 16.2672 18.714 15.1755C18.714 14.0792 18.2729 13.0858 17.5586 12.3633" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M19.1602 10.7305C20.2977 11.868 21.0012 13.4395 21.0012 15.1753C21.0012 16.9111 20.2977 18.4825 19.1602 19.6201" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`;

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "00:00";

  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = Math.floor(seconds % 60);

  return `${String(minutes).padStart(2, "0")}:${String(remainderSeconds).padStart(2, "0")}`;
}

function setDefaultMusicItemState(leftElement, number) {
  // Only update for desktop - on mobile button stays static
  if (window.innerWidth > 768) {
    leftElement.innerHTML = `<span class="music_index">${number}</span>`;
  }
}

function setActiveMusicItemState(leftElement) {
  // Only update for desktop - on mobile button stays static
  if (window.innerWidth > 768) {
    leftElement.innerHTML = `
    <button class="music_play_btn" type="button" aria-label="pause">
      ${pauseIcon}
    </button>
  `;
  }
}

function resetMusicItem(item) {
  if (!item) return;

  const left = item.querySelector(".music_item_left");
  const sound = item.querySelector(".music_sound");
  const progress = item.querySelector(".music_progress_current");
  const time = item.querySelector(".music_time");
  const number = item.dataset.number;
  const duration = Number(item.dataset.duration || 0);

  item.classList.remove("is_active");
  setDefaultMusicItemState(left, number);
  // sound icon endi HTML da statick
  progress.style.width = "0%";
  time.textContent = formatTime(duration);
}

function activateMusicItem(item) {
  const left = item.querySelector(".music_item_left");
  const sound = item.querySelector(".music_sound");

  item.classList.add("is_active");
  setActiveMusicItemState(left);
  // sound icon endi HTML da statick

  // Update desktop cover image and number
  updateMusicCover(item);
}

function updateMusicCover(item) {
  if (window.innerWidth <= 768) return; // Only update on desktop

  const coverImg = document.querySelector(".music_cover");
  const coverNumber = document.querySelector(".music_cover_number");
  const itemImg = item.querySelector(".music_item_image");
  const itemNumber = item.querySelector(".music_item_number");

  if (coverImg && itemImg) {
    coverImg.src = itemImg.src;
  }

  if (coverNumber && itemNumber) {
    coverNumber.textContent = itemNumber.textContent;
  }
}

function stopCurrentAudio() {
  if (!currentAudio || !currentMusicItem) return;

  currentAudio.pause();
  currentAudio.currentTime = 0;
  resetMusicItem(currentMusicItem);

  currentAudio = null;
  currentMusicItem = null;
}

function createMusicItem(track) {
  const item = document.createElement("li");
  const audio = new Audio(track.src);

  item.className = "music_item";
  item.dataset.number = track.number;
  audio.preload = "metadata";

  item.innerHTML = `
    <div class="music_item_cover">
      <img src="${track.image}" alt="${track.title}" class="music_item_image">
      <div class="music_item_number">${track.number}</div>
    </div>
    <div class="music_row">
      <div class="music_item_left">
        <span class="music_index">${track.number}</span>
      </div>
      <div class="music_info">
        <div class="music_title">${track.title}</div>
        <div class="music_author">${track.author}</div>
      </div>
      <div class="music_sound"></div>
      <div class="music_time">00:00</div>
    </div>
    <div class="music_progress">
      <div class="music_progress_bar">
        <div class="music_progress_current"></div>
      </div>
    </div>
  `;

  const left = item.querySelector(".music_item_left");
  const time = item.querySelector(".music_time");
  const progressBar = item.querySelector(".music_progress_bar");
  const progressCurrent = item.querySelector(".music_progress_current");

  audio.addEventListener("loadedmetadata", () => {
    item.dataset.duration = audio.duration;
    time.textContent = formatTime(audio.duration);
  });

  audio.addEventListener("timeupdate", () => {
    if (!audio.duration) return;

    const percent = (audio.currentTime / audio.duration) * 100;
    progressCurrent.style.width = `${percent}%`;
    time.textContent = formatTime(audio.currentTime);
  });

  audio.addEventListener("ended", () => {
    resetMusicItem(item);

    if (currentAudio === audio) {
      currentAudio = null;
      currentMusicItem = null;
    }
  });

  left.addEventListener("click", () => {
    const isSameAudio = currentAudio === audio;

    if (isSameAudio && !audio.paused) {
      audio.pause();
      resetMusicItem(item);
      currentAudio = null;
      currentMusicItem = null;
      return;
    }

    if (currentAudio && currentAudio !== audio) {
      stopCurrentAudio();
    }

    activateMusicItem(item);
    currentAudio = audio;
    currentMusicItem = item;
    audio.play();
  });

  progressBar.addEventListener("click", (event) => {
    if (!audio.duration) return;

    const rect = progressBar.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const percent = offsetX / rect.width;

    audio.currentTime = audio.duration * percent;

    if (currentAudio !== audio) {
      if (currentAudio && currentAudio !== audio) {
        stopCurrentAudio();
      }

      activateMusicItem(item);
      currentAudio = audio;
      currentMusicItem = item;
      audio.play();
    }
  });

  return item;
}

function setupMusicItems() {
  const musicItems = document.querySelectorAll(".music_item");

  musicItems.forEach((item) => {
    const number = item.dataset.number;
    const trackData = musicData.find((track) => track.number === number);

    if (!trackData) return;

    const audio = new Audio(trackData.src);
    audio.preload = "metadata";

    const left = item.querySelector(".music_item_left");
    const time = item.querySelector(".music_time");
    const progressBar = item.querySelector(".music_progress_bar");
    const progressCurrent = item.querySelector(".music_progress_current");

    audio.addEventListener("loadedmetadata", () => {
      item.dataset.duration = audio.duration;
      time.textContent = formatTime(audio.duration);
    });

    audio.addEventListener("timeupdate", () => {
      if (!audio.duration) return;

      const percent = (audio.currentTime / audio.duration) * 100;
      progressCurrent.style.width = `${percent}%`;
      time.textContent = formatTime(audio.currentTime);
    });

    audio.addEventListener("ended", () => {
      resetMusicItem(item);

      if (currentAudio === audio) {
        currentAudio = null;
        currentMusicItem = null;
      }
    });

    const handlePlayClick = () => {
      const isSameAudio = currentAudio === audio;

      if (isSameAudio && !audio.paused) {
        audio.pause();
        resetMusicItem(item);
        currentAudio = null;
        currentMusicItem = null;
        return;
      }

      if (currentAudio && currentAudio !== audio) {
        stopCurrentAudio();
      }

      activateMusicItem(item);
      currentAudio = audio;
      currentMusicItem = item;
      audio.play();
    };

    left.addEventListener("click", handlePlayClick);

    const playBtn = item.querySelector(".music_play_btn");
    if (playBtn) {
      playBtn.addEventListener("click", (e) => {
        e.preventDefault();
        handlePlayClick();
      });
    }

    item.addEventListener("click", (event) => {
      if (event.target !== progressBar && !progressBar.contains(event.target)) {
        handlePlayClick();
      }
    });

    progressBar.addEventListener("click", (event) => {
      if (!audio.duration) return;

      const rect = progressBar.getBoundingClientRect();
      const offsetX = event.clientX - rect.left;
      const percent = offsetX / rect.width;

      audio.currentTime = audio.duration * percent;

      if (currentAudio !== audio) {
        if (currentAudio && currentAudio !== audio) {
          stopCurrentAudio();
        }

        activateMusicItem(item);
        currentAudio = audio;
        currentMusicItem = item;
        audio.play();
      }
    });
  });
}

function renderMusicList() {
  if (!musicList) return;
  // Static items allaqachon HTML da mavjud
  setupMusicItems();
}

function setupGalleryMarquee() {
  const galleryRows = document.querySelectorAll(".gallery .gallery_items");

  galleryRows.forEach((row) => {
    row.classList.remove("is-ready");
    row
      .querySelectorAll('[data-gallery-clone="true"]')
      .forEach((clone) => clone.remove());

    const originalItems = Array.from(row.children);
    if (!originalItems.length) return;

    const rowStyles = window.getComputedStyle(row);
    const rowGap = parseFloat(rowStyles.columnGap || rowStyles.gap || "0");
    const originalWidth = row.scrollWidth;
    const containerWidth =
      row.parentElement?.clientWidth ||
      row.closest(".gallery")?.clientWidth ||
      window.innerWidth;

    let totalWidth = originalWidth;

    while (totalWidth < originalWidth + containerWidth) {
      originalItems.forEach((item) => {
        const clone = item.cloneNode(true);
        clone.setAttribute("data-gallery-clone", "true");
        clone.setAttribute("aria-hidden", "true");
        row.appendChild(clone);
      });

      totalWidth = row.scrollWidth;
    }

    const travelDistance = originalWidth + rowGap;
    const duration = Math.max(travelDistance / 80, 18);

    row.style.setProperty("--gallery-distance", `${travelDistance}px`);
    row.style.setProperty("--gallery-duration", `${duration}s`);
    row.classList.add("is-ready");
  });
}

function bindTestimonialsCards() {
  const testimonialCards = document.querySelectorAll(".testimonials_card");

  testimonialCards.forEach((card) => {
    const readMoreButton = card.querySelector(".testimonials_more");
    if (!readMoreButton || readMoreButton.dataset.bound === "true") return;

    readMoreButton.dataset.bound = "true";
    readMoreButton.addEventListener("click", () => {
      const isExpanded = card.classList.toggle("is-expanded");
      readMoreButton.textContent = isExpanded ? "Скрыть" : "Читать полностью";

      if (testimonialsSwiper) {
        testimonialsSwiper.updateAutoHeight(300);
        testimonialsSwiper.update();
      }
    });
  });
}

function updateTestimonialsProgress(swiperInstance) {
  if (!testimonialsProgress || !swiperInstance) return;

  const positionsCount = Math.max(swiperInstance.snapGrid.length, 1);
  const currentIndex = Math.min(swiperInstance.snapIndex, positionsCount - 1);
  const progressWidth = 100 / positionsCount;

  testimonialsProgress.style.width = `${progressWidth}%`;
  testimonialsProgress.style.transform = `translateX(${currentIndex * 100}%)`;
}

function initTestimonialsSwiper() {
  if (!testimonialsTrack) return;

  bindTestimonialsCards();

  if (typeof Swiper === "undefined") return;

  testimonialsSwiper = new Swiper("#testimonialsSlider", {
    slidesPerView: 1,
    spaceBetween: 16,
    speed: 700,
    grabCursor: true,
    watchOverflow: true,
    observer: true,
    observeParents: true,
    navigation: {
      prevEl: ".testimonials_btn.prev",
      nextEl: ".testimonials_btn.next",
      disabledClass: "is-disabled",
    },
    breakpoints: {
      0: {
        slidesPerView: 1.2,
        spaceBetween: 20,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 16,
      },
      900: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 24,
      },
    },
    on: {
      init(swiperInstance) {
        updateTestimonialsProgress(swiperInstance);
      },
      slideChange(swiperInstance) {
        updateTestimonialsProgress(swiperInstance);
      },
      resize(swiperInstance) {
        updateTestimonialsProgress(swiperInstance);
      },
    },
  });
}

function setFaqItemState(item, expanded) {
  const trigger = item.querySelector(".faq_trigger");
  const content = item.querySelector(".faq_content");

  if (!trigger || !content) return;

  item.classList.toggle("is-active", expanded);
  trigger.setAttribute("aria-expanded", String(expanded));
  content.hidden = false;
  content.setAttribute("aria-hidden", String(!expanded));
}

function ensureFaqContentInner(content) {
  if (!content || content.querySelector(".faq_content_inner")) return;

  const inner = document.createElement("div");
  inner.className = "faq_content_inner";

  while (content.firstChild) {
    inner.appendChild(content.firstChild);
  }

  content.appendChild(inner);
}

function initFaqAccordion() {
  const faqItems = Array.from(document.querySelectorAll(".faq_item"));
  if (!faqItems.length) return;

  faqItems.forEach((item) => {
    const trigger = item.querySelector(".faq_trigger");
    const content = item.querySelector(".faq_content");
    if (!trigger) return;

    ensureFaqContentInner(content);
    setFaqItemState(item, item.classList.contains("is-active"));

    trigger.addEventListener("click", () => {
      const shouldOpen = !item.classList.contains("is-active");

      faqItems.forEach((faqItem) => {
        const nextExpanded = faqItem === item ? shouldOpen : false;
        setFaqItemState(faqItem, nextExpanded);
      });
    });
  });
}

function initStudioServices() {
  const studioSections = document.querySelectorAll("[data-studio]");
  if (!studioSections.length) return;

  studioSections.forEach((studioSection) => {
    const triggers = Array.from(
      studioSection.querySelectorAll("[data-studio-trigger]"),
    );
    const description = studioSection.querySelector(
      "[data-studio-description]",
    );
    const image = studioSection.querySelector("[data-studio-image]");

    if (!triggers.length || !description || !image) return;

    const setActiveTrigger = (nextTrigger) => {
      if (!nextTrigger) return;

      triggers.forEach((trigger) => {
        const studioItem = trigger.closest(".studio_item");
        const isActive = trigger === nextTrigger;

        studioItem?.classList.toggle("is-active", isActive);
        trigger.setAttribute("aria-pressed", String(isActive));
        trigger.tabIndex = isActive ? 0 : -1;
      });

      description.textContent = nextTrigger.dataset.description || "";

      const nextImage = nextTrigger.dataset.image;
      if (nextImage && image.getAttribute("src") !== nextImage) {
        image.setAttribute("src", nextImage);
      }

      image.setAttribute(
        "alt",
        nextTrigger.dataset.alt || nextTrigger.textContent.trim(),
      );
    };

    triggers.forEach((trigger, index) => {
      trigger.addEventListener("click", () => {
        setActiveTrigger(trigger);
      });

      trigger.addEventListener("focus", () => {
        setActiveTrigger(trigger);
      });

      trigger.addEventListener("pointerenter", (event) => {
        if (event.pointerType === "touch") return;
        setActiveTrigger(trigger);
      });

      trigger.addEventListener("keydown", (event) => {
        if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;

        event.preventDefault();

        const direction = event.key === "ArrowDown" ? 1 : -1;
        const nextIndex =
          (index + direction + triggers.length) % triggers.length;
        const nextStudioTrigger = triggers[nextIndex];

        setActiveTrigger(nextStudioTrigger);
        nextStudioTrigger.focus();
      });
    });

    const defaultTrigger =
      triggers.find((trigger) =>
        trigger.closest(".studio_item")?.classList.contains("is-active"),
      ) || triggers[0];

    setActiveTrigger(defaultTrigger);
  });
}

function handleWindowResize() {
  if (galleryResizeFrame) {
    window.cancelAnimationFrame(galleryResizeFrame);
  }

  galleryResizeFrame = window.requestAnimationFrame(() => {
    setupGalleryMarquee();
  });
}

function initPage() {
  renderMusicList();
  setupGalleryMarquee();
  initTestimonialsSwiper();
  initFaqAccordion();
  initStudioServices();

  window.addEventListener("resize", handleWindowResize);
}

initPage();
