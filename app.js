const riddles = [
  {
    question: "Tek Kelime 7 Harf En Sevdiğim Senin Kendin",
    answer: "Nisanur",
    hint: "Hasanın Kalbinin Sağibinin İsmi"
  },
  {
    question: "Buluşucağımız İlk Yer",
    answer: "Ankara",
    hint: "Türkiye'nin Başkenti"
  },
  {
    question: "Tanıştığımız Yer",
    answer: "Konya",
    hint: "Bamya Çorbasının Şehri"
  },
  {
    question: "Suda yaşarım, havada uçamam, çok renkliyim, seni büyülerim. Neyim ben?",
    answer: "balık",
    hint: "Denizlerde yaşarım."
  },
  {
    question: "20 Ocak Dünya Ne Günü",
    answer: "Penguen",
    hint: "Paytak Paytak Yürür."
  }
];

const PASSWORD = "balım";
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

let currentRiddleIndex = 0;
let correctCount = 0;
let player = null;
let isPlaying = false;

const riddleTitle = document.getElementById("riddleTitle");
const riddleText = document.getElementById("riddleText");
const answerInput = document.getElementById("answerInput");
const submitBtn = document.getElementById("submitBtn");
const skipBtn = document.getElementById("skipBtn");
const hintText = document.getElementById("hintText");
const barFill = document.getElementById("barFill");
const progressText = document.getElementById("progressText");
const finalCode = document.getElementById("finalCode");
const codeInput = document.getElementById("codeInput");
const unlockBtn = document.getElementById("unlockBtn");
const codeMsg = document.getElementById("codeMsg");
const revealArea = document.getElementById("revealArea");
const gallery = document.getElementById("gallery");
const playerControls = document.getElementById("playerControls");
const playPauseBtn = document.getElementById("playPauseBtn");
const muteBtn = document.getElementById("muteBtn");
const heartsContainer = document.getElementById("hearts");

// Yükle ilk bilmeceni
function loadRiddle(index) {
  const riddle = riddles[index];
  riddleTitle.textContent = `${index + 1}. Bilmece`;
  riddleText.textContent = riddle.question;
  hintText.style.display = "none";
  hintText.textContent = "";
  answerInput.value = "";
  answerInput.focus();
  codeMsg.textContent = "";
}

submitBtn.addEventListener("click", () => {
  const answer = answerInput.value.trim().toLowerCase();
  const correctAnswer = riddles[currentRiddleIndex].answer.toLowerCase();

  if (answer === "") return;

  if (answer === correctAnswer) {
    correctCount++;
    currentRiddleIndex++;

    updateProgress();

    if (currentRiddleIndex >= riddles.length) {
      // Bilmeceler bitti
      showPasswordSection();
    } else {
      loadRiddle(currentRiddleIndex);
    }
  } else {
    answerInput.classList.add("wrong");
    setTimeout(() => answerInput.classList.remove("wrong"), 700);
  }
});

skipBtn.addEventListener("click", () => {
  hintText.style.display = "block";
  hintText.textContent = riddles[currentRiddleIndex].hint;
});

function updateProgress() {
  const progressPercent = (correctCount / riddles.length) * 100;
  barFill.style.width = `${progressPercent}%`;
  progressText.textContent = `${correctCount} / ${riddles.length}`;
}

function showPasswordSection() {
  // Bilmeceler bittiğinde:
  riddleTitle.textContent = "Tebrikler! Bilmece oyununu tamamladın.";
  riddleText.textContent = "Aşağıdaki şifreyi kullanarak sürprizi açabilirsin.";
  answerInput.style.display = "none";
  submitBtn.style.display = "none";
  skipBtn.style.display = "none";
  hintText.style.display = "none";

  finalCode.classList.add("visible");

  codeInput.disabled = false;
  unlockBtn.disabled = false;
}

// Şifre açma kontrolü
unlockBtn.addEventListener("click", () => {
  if (codeInput.value.trim().toLowerCase() === PASSWORD) {
    codeMsg.textContent = "Şifre doğru! Sürpriz açılıyor...";
    showSurprise();
  } else {
    codeMsg.textContent = "Yanlış şifre, tekrar deneyin.";
    codeInput.classList.add("shake");
    setTimeout(() => codeInput.classList.remove("shake"), 300);
  }
});

function showSurprise() {
  revealArea.style.display = "flex";
  playerControls.style.display = "flex";

  // Galeriyi temizle ve fotoğrafları ekle
  gallery.innerHTML = "";
  photos.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Anımız";
    gallery.appendChild(img);
  });

  // Şarkıyı başlat
  if (player && player.playVideo) {
    player.playVideo();
    isPlaying = true;
    playPauseBtn.textContent = "Duraklat";
  }
}

// YouTube Player API için
const VIDEO_ID = "iTLUb5UmeJo"; // şarkı ID'si
const START_TIME = 100; // 1:40
const END_TIME = 121;   // 2:01

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "0",
    width: "0",
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
      onReady: () => {},
      onStateChange: (event) => {
        if (event.data === YT.PlayerState.ENDED) {
          player.seekTo(START_TIME);
        }
      },
    },
  });
}

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

// Kalpler animasyonu
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = "❤";

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = 4 + Math.random() * 4 + "s";
  heart.style.fontSize = 20 + Math.random() * 20 + "px";

  heartsContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 7000);
}

setInterval(createHeart, 400);

// Sayfa yüklendiğinde ilk bilmeceni yükle
window.onload = () => {
  loadRiddle(0);
  updateProgress();
};

