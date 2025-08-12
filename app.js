/* =================== AYARLAR =================== */
const VIDEO_ID = "iTLUb5UmeJo"; // YouTube video ID
const START_SEC = 100; // 1:40 (saniye)
const END_SEC = 121;   // 2:01 (saniye)
const LOOP = true;
const FINAL_CODE = "balım"; // oyun sonu şifresi

/* =================== BİLMECE VERİLERİ =================== */
const riddles = [
  {
    question: `Canımın içi, kalbimin neşesi,
Gözlerime ışık, hayatın sebebi.
Kim bu sevgili, adını yaz bakalım?`,
    answer: "nisa",
    hint: "Sevgi dolu, güzel isim."
  },
  {
    question: `Hasanın kalbinde yer eden,
Sevgiyle dolu, tek bir eden.
Adı nedir, söyle bakalım?`,
    answer: "nisa",
    hint: "Sevdiğin kızın adı."
  },
  {
    question: `Bana her zaman destek olur,
Yanımda olur, hayatıma renk katar.
Kim bu güzel varlık?`,
    answer: "nisa",
    hint: "Hayat arkadaşım."
  },
  {
    question: `Kalbimdeki tek prenses,
Gülüşüyle dünyam güzelleşir.
Kimdir o, yaz bakalım.`,
    answer: "nisa",
    hint: "Adı 4 harfli."
  },
  {
    question: `Her sabah seni düşünürüm,
Her gece adını anarım.
Şimdi söyle bakalım adını?`,
    answer: "nisa",
    hint: "Balım, canım, sevgilim..."
  }
];

/* =================== ELEMENTLER =================== */
const riddleTitle = document.getElementById("riddleTitle");
const riddleText = document.getElementById("riddleText");
const answerInput = document.getElementById("answerInput");
const submitBtn = document.getElementById("submitBtn");
const skipBtn = document.getElementById("skipBtn");
const hintText = document.getElementById("hintText");
const barFill = document.getElementById("barFill");
const progressText = document.getElementById("progressText");
const codeBox = document.querySelector(".codeBox");
const finalCodeDisplay = document.getElementById("finalCode");
const codeInput = document.getElementById("codeInput");
const unlockBtn = document.getElementById("unlockBtn");
const codeMsg = document.getElementById("codeMsg");
const revealArea = document.getElementById("revealArea");
const playerControls = document.getElementById("playerControls");
const playPauseBtn = document.getElementById("playPauseBtn");
const muteBtn = document.getElementById("muteBtn");

/* =================== OYUN DURUMU =================== */
let currentIndex = 0;
let solvedCount = 0;
let hintsShown = false;

/* =================== BİLMECELERİ GÖSTER =================== */
function showRiddle(index) {
  riddleTitle.textContent = `${index + 1}. Bilmece`;
  riddleText.textContent = riddles[index].question;
  answerInput.value = "";
  hintText.style.display = "none";
  hintsShown = false;
}

/* =================== İLERLEME GÜNCELLE =================== */
function updateProgress() {
  solvedCount = currentIndex;
  progressText.textContent = `${solvedCount} / ${riddles.length}`;
  barFill.style.width = `${(solvedCount / riddles.length) * 100}%`;
}

/* =================== BİLMECEYİ KONTROL ET =================== */
function checkAnswer() {
  const answer = answerInput.value.trim().toLowerCase();
  if (answer === riddles[currentIndex].answer) {
    currentIndex++;
    updateProgress();
    if (currentIndex === riddles.length) {
      // Tüm bilmeceler çözüldü
      riddleText.textContent = "Tebrikler! Tüm bilmeceleri çözdün. Şifre aşağıda.";
      answerInput.disabled = true;
      submitBtn.disabled = true;
      skipBtn.disabled = true;
      codeBox.style.display = "block";
      hintText.style.display = "none";
    } else {
      showRiddle(currentIndex);
    }
  } else {
    //
