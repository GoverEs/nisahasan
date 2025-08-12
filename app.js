const riddles = [
  {
    question: "Beni açarsan beni görürsün, beni kapatırsan beni duyamazsın. Neyim ben?",
    answer: "kulak",
    hint: "Duyma organın."
  },
  {
    question: "Üzerinde elbisem yok, hep üstümde taşırım yük. Neyim ben?",
    answer: "sırt",
    hint: "Arkanda taşırsın."
  },
  {
    question: "Gündüz güneş, gece ayım, binlerce ışığım var ama yanmam. Neyim ben?",
    answer: "yıldız",
    hint: "Gece gökyüzünde parlarım."
  },
  {
    question: "Suda yaşarım, havada uçamam, çok renkliyim, seni büyülerim. Neyim ben?",
    answer: "balık",
    hint: "Denizlerde yaşarım."
  },
  {
    question: "Hep yürür durur, hiç durmaz ama ayağı yoktur. Neyim ben?",
    answer: "zaman",
    hint: "Geçer ve durmaz."
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

const notes = [
  "İlk tanıştığımız günün fotoğrafı.",
  "Birlikte gezdiğimiz unutulmaz an.",
  "Gülüşün en güzel halin.",
  "Seni en çok sevdiğim anlar.",
  "Hayallerimizi paylaştığımız an.",
  "El ele verdiğimiz yolculuk.",
  "Sonsuz sevgimizin simgesi.",
  "Kalplerimizin birleştiği an.",
  "Hayatımın en değerli anısı.",
  "Göz göze geldiğimiz o an.",
  "Beraber başardığımız her şey.",
  "Sevgiyle dolu her anımız.",
  "Birlikte attığımız ilk adım.",
  "Rüyaları süsleyen anılarımız.",
  "Sana olan sonsuz bağlılığım.",
  "Kalbimin tek sahibi sensin.",
  "Birlikte büyüdüğümüz zamanlar.",
  "Hayatımın anlamı sensin."
];

let currentRiddleIndex = 0;
let correctCount = 0;
let player = null;
let surprisePlayer = null;
let isPlaying = false;

const riddleTitle = document.getElementById("riddleTitle");
const riddleText = document.getElementById("riddleText");
const answerInput = document.getElementById("answerInput");
const submitBtn = document.getElementById("submitBtn");
const skipBtn = document.getElementById("skipBtn");
const hint
const hintText = document.getElementById("hintText");
const barFill = document.getElementById("barFill");
const progressText = document.getElementById("progressText");
const finalCode = document.getElementById("finalCode");
const codeInput = document.getElementById("codeInput");
const unlockBtn = document.getElementById("unlockBtn");
const codeMsg = document.getElementById("codeMsg");

const revealArea = document.getElementById("revealArea");
const gallery = document.getElementById("gallery");

const playPauseBtn = document.getElementById("playPauseBtn");
const muteBtn = document.getElementById("muteBtn");

const heartsContainer = document.getElementById("hearts");

const surprisePage = document.getElementById("surprisePage");
const surpriseGallery = document.getElementById("surpriseGallery");
const ytSurprisePlayerDiv = document.getElementById("ytSurprisePlayer");

const START_TIME = 100; // Şarkının 1:40 = 100 saniye başlangıç zamanı
const END_TIME = 121;   // 2:01 = 121 saniye bitiş zamanı

// YouTube player kurulumu
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '180',
    width: '320',
    videoId: 'iTLUb5UmeJo', // Şarkı ID'si
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

let playerReady = false;
function onPlayerStateChange(event) {
  // Şarkı bitince durdur
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
  // Oyun bölümünü gizle
  document.querySelector(".game").style.display = "none";
  revealArea.style.display = "flex";

  // Kod girişi alanını gizle
  codeInput.disabled = true;
  unlockBtn.disabled = true;

  // Fotoğrafları ve notları galeriye ekle
  gallery.innerHTML = "";
  photos.forEach((src, i) => {
    const img = document.createElement("img");
    img.src = src;
    img.alt = `Fotoğraf ${i + 1}`;
    img.title = notes[i] || "";
    gallery.appendChild(img);
  });

  // Player kontrol görünür yap
  document.getElementById("playerControls").style.display = "flex";

  // Şarkıyı başlat
  if (player && player.playVideo) {
    player.seekTo(START_TIME);
    player.playVideo();
    isPlaying = true;
    playPauseBtn.textContent = "Duraklat";
  }
}

submitBtn.addEventListener("click", () => {
  const answer = answerInput.value.trim().toLowerCase();
  const correctAnswer = riddles[currentRiddleIndex].answer.toLowerCase();

  if (!answer) return;

  if (answer === correctAnswer) {
    correctCount++;
    currentRiddleIndex++;

    updateProgress();

    if (currentRiddleIndex < riddles.length) {
      loadRiddle(currentRiddleIndex);
    } else {
      // Bilmeceler bitti
      riddleTitle.textContent = "Tebrikler!";
      riddleText.textContent = "Bilmeceleri başarıyla çözdün. Şifre artık aktif.";
      answerInput.disabled = true;
      submitBtn.disabled = true;
      skipBtn.disabled = true;

      enableCodeInput(true);
    }
  } else {
    // Yanlış cevap animasyonu
    answerInput.classList.add("wrong");
    setTimeout(() => {
      answerInput.classList.remove("wrong");
    }, 500);
  }
});

skipBtn.addEventListener("click", () => {
  hintText.style.display = "block";
  hintText.textContent = riddles[currentRiddleIndex].hint;
});

unlockBtn.addEventListener("click", () => {
  const code = codeInput.value.trim().toLowerCase();
  if (code === PASSWORD) {
    codeMsg.textContent = "Şifre doğru! Sürpriz açılıyor...";
    showFinalSurprisePage();
  } else {
    codeMsg.textContent = "Yanlış şifre. Tekrar dene.";
  }
});

function showFinalSurprisePage() {
  // Sürpriz ana sayfasını göster, diğerlerini gizle
  document.querySelector(".card").style.display = "none";
  surprisePage.style.display = "flex";

  // Sürpriz galeriyi temizle
  surpriseGallery.innerHTML = "";

  // Fotoğrafları ve notları ekle
  photos.forEach((src, i) => {
    const container = document.createElement("div");
    container.style.textAlign = "center";

    const img = document.createElement("img");
    img.src = src;
    img.alt = `Fotoğraf ${i + 1}`;
    img.style.width = "100%";
    img.style.borderRadius = "12px";
    img.style.boxShadow = "0 4px 10px rgba(0,0,0,0.3)";

    const note = document.createElement("p");
    note.textContent = notes[i] || "";
    note.style.marginTop = "8px";
    note.style.fontSize = "0.9rem";
    note.style.fontStyle = "italic";

    container.appendChild(img);
    container.appendChild(note);
    surpriseGallery.appendChild(container);
  });

  // Sürpriz sayfa için ayrı bir YouTube player kur
  surprisePlayer = new YT.Player('ytSurprisePlayer', {
    height: '180',
    width: '320',
    videoId: 'iTLUb5UmeJo',
    playerVars: {
      start: START_TIME,
      end: END_TIME,
      autoplay: 1,
      controls: 1,
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      iv_load_policy: 3
    }
  });
}

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
  if (player.isMuted()) {
    player.unMute();
    muteBtn.classList.remove("muted");
    muteBtn.textContent = "Sessiz";
  } else {
    player.mute();
    muteBtn.classList.add("muted");
    muteBtn.textContent = "Sesi Aç";
  }
});

// Başlangıçta bilmeceyi yükle
loadRiddle(currentRiddleIndex);
updateProgress();
enableCodeInput(false);

// Kalp animasyonu (yağan kalpler)
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = (10 + Math.random() * 20) + "px";
  heart.style.animationDuration = 3 + Math.random() * 3 + "s";
  heart.style.opacity = Math.random();

  heart.textContent = "❤️";
  heartsContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 6000);
}
setInterval(createHeart, 400);
