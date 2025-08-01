const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Gambar latar belakang (rumput dan langit)
function drawBackground() {
    ctx.fillStyle = '#7CFC00'; // Warna rumput
    ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2);
    ctx.fillStyle = '#87CEEB'; // Warna langit
    ctx.fillRect(0, 0, canvas.width, canvas.height / 2);
}

// --- Gambar "Pemain" (Tangan dan Senjata) ---
let gunImage = new Image();
// Nanti ganti dengan URL gambar tangan pacar kamu + senjata
gunImage.src = 'placeholder_gun.png'; 
// Atau buat kotak sederhana dulu:
function drawGun() {
    ctx.fillStyle = 'black';
    ctx.fillRect(canvas.width / 2 - 50, canvas.height - 150, 100, 150); // Kotak sederhana sebagai senjata
    // Kalau sudah ada gambar, pakai: ctx.drawImage(gunImage, canvas.width / 2 - gunImage.width / 2, canvas.height - gunImage.height);
}

// --- Gambar "Musuh" (Kamu) ---
let enemyX = canvas.width / 2;
let enemyY = canvas.height / 2;
let enemySpeed = 1; // Kecepatan mendekat
let enemySize = 50; // Ukuran awal musuh
let isHit = false; // Status apakah musuh terkena

function drawEnemy() {
    ctx.fillStyle = 'red'; // Ganti dengan sprite kamu nanti
    ctx.fillRect(enemyX - enemySize / 2, enemyY - enemySize / 2, enemySize, enemySize);
    // Kalau sudah ada sprite: ctx.drawImage(yourSpriteImage, enemyX - yourSpriteImage.width / 2, enemyY - yourSpriteImage.height / 2);
}

// --- Pesan-pesan Romantis ---
const romanticMessages = [
    "Aduh! Sakit tapi kok cinta ya?",
    "Kamu emang jago nembak hatiku!",
    "Tembakan itu sekuat cintaku padamu.",
    "Kena! Sama kayak hatiku yang kena panah asmara kamu.",
    "Meski kena tembak, aku akan tetap ngejar kamu!",
    "Cinta kamu tak terelakkan!",
    "Setiap tembakan adalah detak jantungku untukmu.",
    "Hatiku sudah kamu taklukkan.",
    "Target utama saya adalah kebahagiaan kamu!",
    "Kamu adalah satu-satunya 'penyerang' yang kuinginkan."
];
let messageBox = document.getElementById('message-box');
let currentMessageIndex = 0; // Untuk pesan berurutan

function showMessage(message) {
    messageBox.textContent = message;
    messageBox.style.opacity = 1;
    setTimeout(() => {
        messageBox.style.opacity = 0;
    }, 2000); // Pesan akan hilang setelah 2 detik
}

// --- Logika Game ---
function update() {
    // Musuh mendekat
    if (enemyY < canvas.height - 100) { // Berhenti sebelum terlalu dekat ke pemain
        enemyY += enemySpeed;
        enemySize += enemySpeed * 0.5; // Musuh terlihat membesar saat mendekat
    } else {
        // Kalau sudah terlalu dekat dan tidak ditembak, game over atau semacamnya
        // Untuk demo ini, kita reset posisi musuh
        enemyY = canvas.height / 4;
        enemySize = 50;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Bersihkan layar
    drawBackground();
    drawEnemy();
    drawGun();
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// --- Event Listener untuk Tembak (Klik Layar) ---
canvas.addEventListener('click', (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Logika tembak: Apakah klik mengenai musuh?
    // Ini logika yang sangat sederhana, perlu disempurnakan
    if (mouseX > enemyX - enemySize / 2 && mouseX < enemyX + enemySize / 2 &&
        mouseY > enemyY - enemySize / 2 && mouseY < enemyY + enemySize / 2) {

        isHit = true;

        // Tampilkan pesan romantis
        // Pesan random:
        const randomMessage = romanticMessages[Math.floor(Math.random() * romanticMessages.length)];
        showMessage(randomMessage);

        // Atau pesan berurutan:
        // showMessage(romanticMessages[currentMessageIndex % romanticMessages.length]);
        // currentMessageIndex++;

        // Reset posisi musuh setelah ditembak
        enemyX = Math.random() * (canvas.width - enemySize) + enemySize / 2;
        enemyY = canvas.height / 4;
        enemySize = 50;
    } else {
        // Kalau meleset, bisa muncul pesan "meleset", atau tidak sama sekali
        // showMessage("Meleset! Coba lagi :)");
    }
});

// Mulai game
gunImage.onload = () => { // Pastikan gambar senjata sudah terload
    gameLoop();
};
// Jika tidak pakai gambar, langsung panggil gameLoop()
gameLoop(); // Panggil gameLoop() langsung untuk melihat hasilnya tanpa gambar dulu

// Responsif terhadap ukuran layar
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawBackground(); // Redraw background on resize
});
