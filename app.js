// Sorular, cevaplar ve ipuçları
const riddles = [
  {
    question: "Seni ilk gördüğümde kalbim hangi hisle doldu?",
    answer: "aşk",
    hint: "Bu his bir duygu, iki harfli bir kelime."
  },
  {
    question: "Birlikte en çok gitmek istediğimiz yer neresi?",
    answer: "deniz",
    hint: "Suda olan, mavidir ve tatil demektir."
  },
  {
    question: "Beni en çok güldüren özelliğin nedir?",
    answer: "gülüşün",
    hint: "Dudaklarından çıkan, mutluluk belirtisi."
  },
  {
    question: "İsminin baş harfi nedir?",
    answer: "n",
    hint: "İsminin ilk harfi."
  },
  {
    question: "Son bilmecem, şifreyi öğrenmek için cevapla: Kelime ne?",
    answer: "balım",
    hint: "Sevgi dolu, tatlı bir kelime."
  }
];

const photos = [
  "https://hizliresim.com/7onv06v.jpg",
  "https://hizliresim.com/r0mn2hw.jpg",
  "https://hizliresim.com/qa88r7q.jpg",
  "https://hizliresim.com/c2zna96.jpg",
  "https://hizliresim.com/e63p98c.jpg",
  "https://hizliresim.com/mjefcw5.jpg",
  "https://hizliresim.com/pcn8230.jpg",
  "https://hizliresim.com/jx9t17f.jpg",
  "https://hizliresim.com/5ov3wrg.jpg",
  "https://hizliresim.com/a8pxb5c.jpg",
  "https://hizliresim.com/6e2asty.jpg",
  "https://hizliresim.com/iqgau8s.jpg",
  "https://hizliresim.com/lsh150e.jpg",
  "https://hizliresim.com/su6sqhm.jpg",
  "https://hizliresim.com/nle4tj1.jpg",
  "https://hizliresim.com/r4reqnw.jpg",
  "https://hizliresim.com/qfbsdu8.jpg",
  "https://hizliresim.com/h7nlrjv.jpg"
];

const notes = [
  "Bu anı hiç unutma, kalbim hep seninle.",
  "Deniz kıyısında birlikte geçirdiğimiz güzel günler.",
  "Gülüşün dünyamı aydınlatıyor.",
  "İsminin baş harfi, kalbimin ritmi.",
  "Sevgiyle dolu tatlı kelime: balım.",
  "Sonsuza kadar birlikte olacağız.",
  "Seninle her an özel.",
  "Gözlerindeki parıltı, hayatımın ışığı.",
  "El ele, her engeli aşarız.",
  "Kalbimde saklı en güzel sır.",
  "Birlikte yürüdüğümüz yollar çok değerli.",
  "Gülüşün en güzel melodim.",
  "Seninle hayat daha güzel.",
  "En güzel anılar seninle.",
  "Aşkımız hiç bitmesin.",
  "Sonsuzlukta el ele.",
  "Kalbim sadece sana ait.",
  "İyi ki doğdun, iyi ki varsın."
];

// Şifre
const PASSWORD = "balım";

// DOM elemanları
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

const loveNote = document.getElementById("loveNote");
const playerControls = document.getElementById("playerControls");
const playPauseBtn = document.getElementById("playPauseBtn");
const muteBtn = document.getElementById("muteBtn");

const heartsContainer = document.getElementById("hearts");

let currentRiddleIndex = 0;
let correctCount = 0;
let isPlaying = false;
let player = null;

const START_TIME = 100; // 1:40 saniye (youtube başlangıç)
const END_TIME = 121;   // 2:01 saniye (youtube bitiş)

// YouTube Player kurulumu
function onYTReadyCallback() {
  player = new YT.Player('player', {
    height: '180',
    width: '320',
    videoId: 'iTLUb5UmeJo',
    playerVars: {
      start: START_TIME,
      end: END_TIME,
      autoplay: 0,
      controls: 0,
      disablekb: 1,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      iv_load_policy: 3
    },
    events: {
      'onStateChange': onPlayerStateChange
    }
  });
}

window.onYTReadyCallback = onYTReadyCallback;

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.ENDED) {
    player.stopVideo();
    isPlaying = false;
    playPauseBtn.textContent = "Oynat";
  }
}

function loadRiddle(index) {
  const riddle = riddles[index];
  riddleTitle.textContent = `${index + 1}. Bilmece`;
  riddleText.textContent = riddle.question;
  answerInput.value = "";
  hintText.style.display = "none";
  hintText.textContent = "";
  answerInput.classList.remove("wrong");
  answerInput.disabled = false;
  submitBtn.disabled = false;
  skipBtn.disabled = false;
}

function updateProgress() {
  progressText.textContent = `${correctCount} / ${riddles.length}`;
  barFill.style.width = `${(correctCount / riddles.length) * 100}%`;
}

function enableCodeInput(enable) {
  codeInput.disabled = !enable;
  unlockBtn.disabled = !enable;
  finalCode.style.opacity = enable ? "1" : "0.3";
}

function showSurprise() {
  document.querySelector(".game").style.display = "none";
  revealArea.style.display = "flex";

  gallery.innerHTML = "";
  photos.forEach((src, i) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = `Fotoğraf ${i + 1}`;
    img.title = notes[i] || "";
    gallery.appendChild(img);
  });

  // Notu göster (isteğe bağlı çoklu not)
  loveNote.innerHTML = `<em>${notes.join("<br><br>")}</em>`;

  playerControls.style.display = "flex";

  if (player && player.playVideo) {
    player.seekTo(START_TIME);
    player.playVideo();
    isPlaying = true;
    playPauseBtn.textContent = "Duraklat";
  }
}

submitBtn.addEventListener("click", () => {
  const answer = answerInput.value.trim().toLowerCase();

  if (!answer) return;

  if (answer === riddles[currentRiddleIndex].answer.toLowerCase()) {
    correctCount++;
    updateProgress();
    currentRiddleIndex++;
    if (currentRiddleIndex < riddles.length) {
      loadRiddle(currentRiddleIndex);
    } else {
      // Oyun bitti, şifre aktifleşiyor
      enableCodeInput(true);
      hintText.style.display = "none";
      answerInput.disabled = true;
      submitBtn.disabled = true;
      skipBtn.disabled = true;
      riddleTitle.textContent = "Tebrikler!";

      riddleText.textContent = "Bilmeceleri başarıyla tamamladın. Şifreyi girip sürprizi açabilirsin.";
    }
  } else {
    answerInput.classList.add("wrong");
    hintText.style.display = "block";
    hintText.textContent = "Yanlış cevap, tekrar dene.";
  }
});

answerInput.addEventListener("input", () => {
  answerInput.classList.remove("wrong");
  hintText.style.display = "none";
});

skipBtn.addEventListener("click", () => {
  const hint = riddles[currentRiddleIndex].hint;
  hintText.style.display = "block";
  hintText.textContent = `İpucu: ${hint}`;
});

unlockBtn.addEventListener("click", () => {
  const code = codeInput.value.trim().toLowerCase();
  if (code === PASSWORD) {
    codeMsg.textContent = "";
    showSurprise();
  } else {
    codeMsg.textContent = "Şifre yanlış, lütfen tekrar deneyin.";
  }
});

// Player kontrol düğmeleri
playPauseBtn.addEventListener("click", () => {
  if (!player) return;

  if (isPlaying) {
    player.pauseVideo();
    playPauseBtn.textContent = "Oynat";
  } else {
    player.playVideo();
    playPauseBtn.textContent = "Duraklat";
  }
  isPlaying = !isPlaying;
});

muteBtn.addEventListener("click", () => {
  if (!player) return;

  if (muteBtn.classList.contains("muted")) {
    player.unMute();
    muteBtn.classList.remove("muted");
    muteBtn.textContent = "Sessiz";
  } else {
    player.mute();
    muteBtn.classList.add("muted");
    muteBtn.textContent = "Ses Aç";
  }
});

// Kalplerin rastgele oluşması (animasyon)
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = "❤";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = 4 + Math.random() * 3 + "s";
  heart.style.fontSize = 14 + Math.random() * 24 + "px";
  heartsContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 7000);
}

// Her 350 ms'de yeni kalp
setInterval(createHeart, 350);

// İlk bilmecenin yüklenmesi
loadRiddle(currentRiddleIndex);
updateProgress();
enableCodeInput(false);
