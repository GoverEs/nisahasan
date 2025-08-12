// YouTube video ayarları
const VIDEO_ID = "iTLUb5UmeJo";
const START_TIME = 100; // 1:40 (saniye)
const END_TIME = 121;   // 2:01 (saniye)
const PASSWORD = "balım";

// Bulmacalar
const riddles = [
  { question: "Sana ilk hangi kelimeyle hitap ettim?", answer: "balım", hint: "Çok tatlı bir hitap." },
  { question: "Birlikte izlediğimiz ilk film hangisiydi?", answer: "film", hint: "İlk sinema anımız." },
  { question: "Bana ilk aldığın hediyenin türü neydi?", answer: "kolye", hint: "Boyunda taşınır." },
  { question: "Sana en çok hangi tatlıyı yakıştırırım?", answer: "baklava", hint: "Şerbetli, çıtır." },
  { question: "Bir gün evlenirsek balayı için nereye gitmek isteriz?", answer: "antalya", hint: "Deniz, güneş, tatil." }
];

// Fotoğraflar (18 tane)
const photos = [
  "https://i.hizliresim.com/7onv06v.jpg",
  "https://i.hizliresim.com/r0mn2hw.jpg",
  "https://i.hizliresim.com/qa88r7q.jpg",
  "https://i.hizliresim.com/c2zna96.jpg",
  "https://i.hizliresim.com/e63p98c.jpg",
  "https://i.hizliresim.com/mjefcw5.jpg",
  "https://i.hizliresim.com/pcn8230.jpg",
  "https://i.hizliresim.com/jx9t17f.jpg",
  "https://i.hizliresim.com/5ov3wrg.jpg",
  "https://i.hizliresim.com/a8pxb5c.jpg",
  "https://i.hizliresim.com/6e2asty.jpg",
  "https://i.hizliresim.com/iqgau8s.jpg",
  "https://i.hizliresim.com/lsh150e.jpg",
  "https://i.hizliresim.com/su6sqhm.jpg",
  "https://i.hizliresim.com/nle4tj1.jpg",
  "https://i.hizliresim.com/r4reqnw.jpg",
  "https://i.hizliresim.com/qfbsdu8.jpg",
  "https://i.hizliresim.com/h7nlrjv.jpg"
];

// DOM elemanları
const riddleNumber = document.getElementById("riddleNumber");
const riddleQuestion = document.getElementById("riddleQuestion");
const answerInput = document.getElementById("answerInput");
const submitAnswer = document.getElementById("submitAnswer");
const showHint = document.getElementById("showHint");
const hint = document.getElementById("hint");
const progressBar = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const passwordSection = document.getElementById("passwordSection");
const passwordInput = document.getElementById("passwordInput");
const checkPassword = document.getElementById("checkPassword");
const passwordMsg = document.getElementById("passwordMsg");
const gameSection = document.getElementById("game");
const finalSection = document.getElementById("finalSection");
const gallery = document.getElementById("gallery");
const hearts = document.getElementById("hearts");
const musicControls = document.getElementById("musicControls");
const playPauseBtn = document.getElementById("playPauseBtn");
const muteBtn = document.getElementById("muteBtn");

let currentRiddle = 0;
let player, isPlaying = false;

// Kalp emojileri animasyonu
const heartEmojis = ["💖", "❤️", "💕", "❣️"];
function spawnHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = (18 + Math.random() * 20) + "px";
  heart.style.animationDuration = (4 + Math.random() * 4) + "s";
  heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
  hearts.appendChild(heart);
  setTimeout(() => heart.remove(), 11000);
}
setInterval(spawnHeart, 300);

// Bulmacayı yükle
function loadRiddle(i = 0) {
  currentRiddle = i;

  if (currentRiddle >= riddles.length) {
    riddleNumber.textContent = "";
    riddleQuestion.textContent = "";
    answerInput.style.display = "none";
    submitAnswer.style.display = "none";
    showHint.style.display = "none";
    hint.textContent = "Tebrikler! Şifreyi aşağıya gir.";

    passwordSection.style.display = "block";

    progressBar.style.width = "100%";
    progressText.textContent = `${riddles.length} / ${riddles.length}`;

    return;
  }

  riddleNumber.textContent = `Soru ${i + 1}`;
  riddleQuestion.textContent = riddles[i].question;
  answerInput.value = "";
  hint.textContent = "";
  answerInput.disabled = false;
  submitAnswer.disabled = false;
  showHint.disabled = false;
  answerInput.style.display = "inline-block";
  submitAnswer.style.display = "inline-block";
  showHint.style.display = "inline-block";

  updateProgress();
  answerInput.focus();
  answerInput.classList.remove("correct");

  passwordSection.style.display = "none";
  passwordInput.value = "";
  passwordMsg.textContent = "";
}

function updateProgress() {
  const percent = (currentRiddle / riddles.length) * 100;
  progressBar.style.width = `${percent}%`;
  progressText.textContent = `${currentRiddle} / ${riddles.length}`;
}

submitAnswer.addEventListener("click", () => {
  const answer = answerInput.value.trim().toLowerCase();
  if (!answer) return;

  if (answer === riddles[currentRiddle].answer.toLowerCase()) {
    answerInput.classList.add("correct");
    setTimeout(() => answerInput.classList.remove("correct"), 1000);
    currentRiddle++;
    loadRiddle(currentRiddle);
  } else {
    hint.textContent = "Yanlış cevap. Tekrar dene veya İpucu'ya tıkla.";
    answerInput.classList.add("shake");
    setTimeout(() => answerInput.classList.remove("shake"), 350);
  }
});

showHint.addEventListener("click", () => {
  hint.textContent = riddles[currentRiddle].hint;
});

checkPassword.addEventListener("click", () => {
  if (passwordInput.value.trim().toLowerCase() === PASSWORD) {
    passwordMsg.textContent = "Şifre doğru! Sürpriz açılıyor...";
    openFinalSection();

    if (player && player.playVideo) {
      player.playVideo();
      isPlaying = true;
      playPauseBtn.textContent = "Duraklat";
    }
  } else {
    passwordMsg.textContent = "Yanlış şifre. Tekrar deneyin.";
    passwordInput.classList.add("shake");
    setTimeout(() => passwordInput.classList.remove("shake"), 350);
  }
});

function openFinalSection() {
  gameSection.style.display = "none";
  finalSection.style.display = "block";
  musicControls.style.display = "flex";

  gallery.innerHTML = "";
  photos.forEach(url => {
    const img = document.createElement("img");
    img.src = url;
    img.alt = "Anımız";
    gallery.appendChild(img);
  });
}

// YouTube API
function onYouTubeIframeAPIReady() {
  player = new YT.Player('ytPlayer', {
    height: '0',
    width: '0',
    videoId: VIDEO_ID,
    playerVars: {
      autoplay: 0,
      controls: 0,
      start: START_TIME,
      end: END_TIME,
      modestbranding: 1,
      loop: 1,
      playlist: VIDEO_ID,
      disablekb: 1,
      iv_load_policy: 3,
      rel: 0,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}

function onPlayerReady(event) {
  // Otomatik başlatma yok, bekle şifre girilsin
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    player.seekTo(START_TIME);
  }
}

// Müzik kontrolleri
playPauseBtn.addEventListener("click", () => {
  if (!player) return;
  if (isPlaying) {
    player.pauseVideo();
    playPauseBtn.textContent = "Oynat";
    isPlaying = false;
  } else {
    player.playVideo();
    playPauseBtn.textContent = "Duraklat";
    isPlaying = true;
  }
});

muteBtn.addEventListener("click", () => {
  if (!player) return;
  if (player.isMuted()) {
    player.unMute();
    muteBtn.textContent = "Sessiz";
  } else {
    player.mute();
    muteBtn.textContent = "Ses Aç";
  }
});

// Sayfa yüklendiğinde başlat
window.onload = () => {
  loadRiddle(0);
};
