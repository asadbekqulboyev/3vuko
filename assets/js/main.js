const music_data = [
  {
    id: 1,
    number: "01",
    title: "Братья Грим - Лето (Remix)",
    author: "Аранжировка",
    src: "./assets/audio/music.mp3",
  },
  {
    id: 2,
    number: "02",
    title: "Кравц – Есть как есть (feat. Нигатив)",
    author: "Запись, сведение",
    src: "audio/audio-2.mp3",
  },
  {
    id: 3,
    number: "03",
    title: "Д. Клявер – Удача найдет (Remix)",
    author: "Аранжировка",
    src: "audio/audio-3.mp3",
  },
  {
    id: 4,
    number: "04",
    title: "Stepski, B.Junkie - На Созерцании",
    author: "Запись, сведение",
    src: "audio/audio-4.mp3",
  },
  {
    id: 5,
    number: "05",
    title: "Dina Mongo - Слезы-Вода",
    author: "Аранж, запись, сведение",
    src: "audio/audio-5.mp3",
  },
];

const music_list = document.getElementById("musicList");

let current_audio = null;
let current_item = null;

const pause_icon = `
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M1.33301 4.00016C1.33301 2.74308 1.33301 2.11454 1.72353 1.72402C2.11406 1.3335 2.7426 1.3335 3.99967 1.3335C5.25675 1.3335 5.88529 1.3335 6.27582 1.72402C6.66634 2.11454 6.66634 2.74308 6.66634 4.00016V12.0002C6.66634 13.2572 6.66634 13.8858 6.27582 14.2763C5.88529 14.6668 5.25675 14.6668 3.99967 14.6668C2.7426 14.6668 2.11406 14.6668 1.72353 14.2763C1.33301 13.8858 1.33301 13.2572 1.33301 12.0002V4.00016Z" fill="white"/>
    <path d="M9.33301 4.00016C9.33301 2.74308 9.33301 2.11454 9.72353 1.72402C10.1141 1.3335 10.7426 1.3335 11.9997 1.3335C13.2568 1.3335 13.8853 1.3335 14.2758 1.72402C14.6663 2.11454 14.6663 2.74308 14.6663 4.00016V12.0002C14.6663 13.2572 14.6663 13.8858 14.2758 14.2763C13.8853 14.6668 13.2568 14.6668 11.9997 14.6668C10.7426 14.6668 10.1141 14.6668 9.72353 14.2763C9.33301 13.8858 9.33301 13.2572 9.33301 12.0002V4.00016Z" fill="white"/>
  </svg>
`;

const sound_icon = `
  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
    <circle cx="15" cy="15" r="15" fill="#0C0C0C"/>
    <path d="M14.2761 10.5905C14.938 10.1178 15.8573 10.5909 15.8573 11.4043V18.9468C15.8573 19.7601 14.938 20.2333 14.2761 19.7605L11.8572 18.0327H11C9.89543 18.0327 9 17.1373 9 16.0327V14.3183C9 13.2137 9.89543 12.3183 11 12.3183H11.8572L14.2761 10.5905Z" fill="white"/>
    <path d="M17.5676 17.9786C18.2766 17.2568 18.714 16.2672 18.714 15.1755C18.714 14.0792 18.2729 13.0858 17.5586 12.3633" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M19.1602 10.7305C20.2977 11.868 21.0012 13.4395 21.0012 15.1753C21.0012 16.9111 20.2977 18.4825 19.1602 19.6201" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
`;

function format_time(seconds) {
  if (!Number.isFinite(seconds)) return "00:00";
  const min = Math.floor(seconds / 60);
  const sec = Math.floor(seconds % 60);
  return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

function set_default_left(left_element, number) {
  left_element.innerHTML = `<span class="music_index">${number}</span>`;
}

function set_active_left(left_element) {
  left_element.innerHTML = `
    <button class="music_play_btn" type="button" aria-label="pause">
      ${pause_icon}
    </button>
  `;
}

function reset_music_item(item) {
  if (!item) return;

  const left = item.querySelector(".music_item_left");
  const sound = item.querySelector(".music_sound");
  const progress = item.querySelector(".music_progress_current");
  const time = item.querySelector(".music_time");
  const number = item.dataset.number;
  const duration = Number(item.dataset.duration || 0);

  item.classList.remove("is_active");
  set_default_left(left, number);
  sound.innerHTML = "";
  progress.style.width = "0%";
  time.textContent = format_time(duration);
}

function activate_music_item(item) {
  const left = item.querySelector(".music_item_left");
  const sound = item.querySelector(".music_sound");

  item.classList.add("is_active");
  set_active_left(left);
  sound.innerHTML = sound_icon;
}

function stop_current_audio() {
  if (!current_audio || !current_item) return;

  current_audio.pause();
  current_audio.currentTime = 0;
  reset_music_item(current_item);

  current_audio = null;
  current_item = null;
}

function create_music_item(track) {
  const item = document.createElement("li");
  item.className = "music_item";
  item.dataset.number = track.number;

  const audio = new Audio(track.src);
  audio.preload = "metadata";

  item.innerHTML = `
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
  const progress_bar = item.querySelector(".music_progress_bar");
  const progress_current = item.querySelector(".music_progress_current");

  audio.addEventListener("loadedmetadata", () => {
    item.dataset.duration = audio.duration;
    time.textContent = format_time(audio.duration);
  });

  audio.addEventListener("timeupdate", () => {
    if (!audio.duration) return;

    const percent = (audio.currentTime / audio.duration) * 100;
    progress_current.style.width = `${percent}%`;
    time.textContent = format_time(audio.currentTime);
  });

  audio.addEventListener("ended", () => {
    reset_music_item(item);

    if (current_audio === audio) {
      current_audio = null;
      current_item = null;
    }
  });

  left.addEventListener("click", () => {
    const is_same_audio = current_audio === audio;

    if (is_same_audio && !audio.paused) {
      audio.pause();
      reset_music_item(item);
      current_audio = null;
      current_item = null;
      return;
    }

    if (current_audio && current_audio !== audio) {
      stop_current_audio();
    }

    activate_music_item(item);
    current_audio = audio;
    current_item = item;

    audio.play();
  });

  progress_bar.addEventListener("click", (event) => {
    if (!audio.duration) return;

    const rect = progress_bar.getBoundingClientRect();
    const offset_x = event.clientX - rect.left;
    const percent = offset_x / rect.width;

    audio.currentTime = audio.duration * percent;

    if (current_audio !== audio) {
      if (current_audio && current_audio !== audio) {
        stop_current_audio();
      }

      activate_music_item(item);
      current_audio = audio;
      current_item = item;
      audio.play();
    }
  });

  return item;
}

function render_music_list() {
  music_list.innerHTML = "";

  music_data.forEach((track) => {
    const item = create_music_item(track);
    music_list.appendChild(item);
  });
}

render_music_list();
