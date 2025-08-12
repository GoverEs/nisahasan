const riddles = [
  { question: "Sana ilk hangi kelimeyle hitap ettim?", answer: "balım", hint: "Çok tatlı bir hitap." },
  { question: "Birlikte izlediğimiz ilk film hangisiydi?", answer: "film", hint: "İlk sinema anımız." },
  { question: "Bana ilk aldığın hediyenin türü neydi?", answer: "kolye", hint: "Boyunda taşınır." },
  { question: "Sana en çok hangi tatlıyı yakıştırırım?", answer: "baklava", hint: "Şerbetli, çıtır." },
  { question: "Bir gün evlenirsek balayı için nereye gitmek isteriz?", answer: "antalya", hint: "Deniz, güneş, tatil." }
];

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

const PASSWORD = "balım";

const heartsContainer = document.getElementById("hearts");

const riddleTitle = document.getElementById("riddleTitle");
const riddleText = document.getElementById("riddleText");
const answerInput = document.getElementById("answerInput");
const submitBtn = document.getElementById("submitBtn");
const skipBtn = document.getElementById("skipBtn");
const hintText = document.getElementById("hintText");

const barFill = document.getElementById("barFill");
const progressText = document.getElementById("progressText");

const finalCodeEl = document.getElementById("finalCode");
const codeInput = document.getElementById("codeInput");
const unlockBtn = document.getElementById("unlockBtn");
const codeMsg = document.getElementById("codeMsg");

const revealArea = document.getElementById("revealArea");
const gallery = document.getElementById("gallery");

const playerControls = document.getElementById("playerControls");
const playPauseBtn = document.getElementById("playPauseBtn");
const muteBtn = document.getElementById("muteBtn");

let currentRiddleIndex = 0;
let player;
let isPlaying = false;

// Başlangıçta şifre gizli
revealArea.style.display = "none";
playerControls.style.display = "none";

function updateProgress() {
  const total = riddles.length;
  barFill.style.width = ((currentRiddleIndex) / total) * 100 + "%";
  progressText.textContent = `${currentRiddleIndex} / ${total}`;
}

function loadRiddle(index) {
  if (index >= riddles.length) {
    // Bulmacalar bitti, şifre göster
    riddleTitle.textContent = "🎉 Tüm bilmeceler çözüldü!";
    riddleText.textContent = "Aşağıdaki şifreyi kullanarak sürprizi açabilirsin.";
    answerInput.style.display = "none";
    submitBtn.style.display = "none";
    skipBtn.style.display = "none";
    hintText.style.display = "none";

    finalCodeEl.style.opacity = 1;
    codeInput.disabled = false;
    unlockBtn.disabled = false;
    return;
  }

  const current = riddles[index];
  riddleTitle.textContent = `${index + 1}. Bilmece`;
  riddleText.textContent = current.question;
  answerInput.value = "";
  answerInput.style.display = "block";
  submitBtn.style.display = "inline-block";
  skipBtn.style.display = "inline-block";
  hintText.style.display = "none";
  hintText.textContent = "";
  answerInput.disabled = false;
  submitBtn.disabled = false;

  updateProgress();
  answerInput.focus();
  answerInput.classList.remove("correct");
}

submitBtn.addEventListener("click", () => {
  const answer = answerInput.value.trim().toLowerCase();
  if (!answer) return;

  if (answer === riddles[currentRiddleIndex].answer.toLowerCase()) {
    answerInput.classList.add("correct");
    currentRiddleIndex++;
    setTimeout(() => {
      answerInput.classList.remove("correct");
      loadRiddle(currentRiddleIndex);
    }, 700);
  } else {
    hintText.style.display = "block";
    hintText.textContent = "Yanlış cevap, tekrar dene veya İpucu'ya tıkla.";
    answerInput.classList.add("shake");
    setTimeout(() => answerInput.classList.remove("shake"), 300);
  }
});

skipBtn.addEventListener("click", () => {
  hintText.style.display = "block";
  hintText.textContent = riddles[currentRiddleIndex].hint;
});

unlockBtn.addEventListener("click", () => {
  if (codeInput.value.trim().toLowerCase() === PASSWORD) {
    codeMsg.textContent = "Şifre doğru! Sürpriz açılıyor...";
    showSurprise();
  } else {
    codeMsg.textContent = "Yanlış şifre. Tekrar deneyin.";
    codeInput.classList.add("shake");
    setTimeout(() => codeInput.classList.remove("shake"), 300);
  }
});

function showSurprise() {
  revealArea.style.display = "flex";
  playerControls.style.display = "flex";

  // Fotoğrafları ekle
  gallery.innerHTML = "";
  photos.forEach(src => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = "Anımız";
    gallery.appendChild(img);
  });

  // Müzik başlat
  if (player && player.playVideo) {
    player.playVideo();
    isPlaying = true;
    playPauseBtn.textContent = "Duraklat";
  }
}

// YouTube Player API yükleme ve video başlatma
const VIDEO_ID = "iTLUb5UmeJo"; // Şarkı ID'si
const START_TIME = 100; // 1:40 = 100 saniye
const END_TIME = 121;   // 2:01 = 121 saniye

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

// Sayfa yüklendiğinde ilk bilmeceyi yükle
window.onload = () => {
  loadRiddle(0);
};
