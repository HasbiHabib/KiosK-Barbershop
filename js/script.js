// =======================
// FULLSCREEN SYSTEM
// =======================
document.addEventListener("keydown", (e) => {

    // tekan F → fullscreen
    if (e.key === "f" || e.key === "F") {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        }
    }

    // tekan ESC → keluar fullscreen
    if (e.key === "Escape") {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
    }
});

// =======================
// PAGE 1 
// =======================
const btn = document.getElementById("btnCukur");
if (btn) {
    btn.addEventListener("click", () => {

        // pindah halaman tanpa keluar fullscreen
        setTimeout(() => {
            window.location.href = "FacePhoto.html";
        }, 200);
    });
}


// =======================
// PAGE 2
// =======================

const btnPhotoIcon = document.getElementById("btnPhotoIcon");
const photoIcon = document.getElementById("photoIcon");

if (btnPhotoIcon && photoIcon) {

    btnPhotoIcon.addEventListener("mousedown", () => {
        photoIcon.src = "Image/logo/camera_down.png";
    });

    btnPhotoIcon.addEventListener("mouseup", () => {
        photoIcon.src = "Image/logo/camera_idle.png";
    });

    btnPhotoIcon.addEventListener("mouseleave", () => {
        photoIcon.src = "Image/logo/camera_idle.png";
    });
}


const photoButton = document.getElementById("btnPhotoIcon");

if (photoButton) {

    const cam = document.getElementById("cameraView");

    photoButton.addEventListener("click", () => {

    if (!cam) return;

    const canvas = document.createElement("canvas");
    canvas.width = cam.videoWidth;
    canvas.height = cam.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(cam, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL("image/jpeg", 0.9);

    localStorage.setItem("capturedPhoto", imageData);

    savePhotoToServer(imageData);

    window.location.href = "FacePhotoResult.html";
});

}

// FUNCTION KOSONG UNTUK SAVE FOTO
async function savePhotoToServer(base64Image) {
    console.log("Foto siap dikirim ke server...");
    console.log("Data yang akan dikirim:", base64Image.substring(0, 50) + "...");

    // Nanti di sini kamu buat:
    // fetch('/upload', { method: 'POST', body: ... })
    // atau formData.append('file', ...)
    // dll.

    // Untuk sekarang kosong.
}



// CAMERA SYSTEM (PAGE 2)
async function startCamera() {
    const cam = document.getElementById("cameraView");
    if (!cam) return; // halaman bukan face.html

    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "user" },     // kamera depan
            audio: false
        });

        cam.srcObject = stream;
    } 
    catch (err) {
        console.error("Camera Error:", err);
        alert("Tidak bisa mengakses kamera!");
    }
}

startCamera();


// =======================
// (PAGE 3)
// ======================= 

const btnUlang = document.getElementById("btnUlang");
if (btnUlang) {
    btnUlang.addEventListener("click", () => {
        window.location.href = "FacePhoto.html"; // kembali ke kamera
    });
}

const btnRekom = document.getElementById("btnRekomendasi");
if (btnRekom) {
    btnRekom.addEventListener("click", () => {
        window.location.href = "HaircutRecommendation.html"; // Page berikutnya
    });
}

// result photo

const photoResult = document.getElementById("photoResult");
if (photoResult) {
    const savedPhoto = localStorage.getItem("capturedPhoto");

    if (savedPhoto) {
        photoResult.src = savedPhoto;
    } else {
        photoResult.src = "Image/logo/no_image.png";
    }
}

// =======================
// (PAGE 4)
// ======================= 

function goToPhoto() {
    window.location.href = "FacePhoto.html";
}
function goToPage5() {
    window.location.href = "HariRecommendation_More.html";
}
function goToPage6() {
    window.location.href = "PreviewHaircut.html";
}

function changeModel() {
    alert("Fitur model lain akan ditambahkan nanti.");
}

// nanti jika AI generate → update img src + text + percentage
function loadHaircutRecommendation(data) {
    document.querySelector(".haircut-main-img").src = data.mainImage;
    document.querySelector(".haircut-caption").innerHTML = 
        `Rekomendasi Terbaik Buatmu:<br><b>${data.title}</b>`;

    document.querySelector(".percentage-box span").textContent = data.percentage + "%";
}


// =======================
// (PAGE 5)
// ======================= 

function filterHaircut() {
    const input = document.getElementById("searchHaircut").value.toLowerCase();
    const cards = document.querySelectorAll(".page5-card");

    cards.forEach(card => {
        const name = card.dataset.name;
        if (name.includes(input)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

function goToPage4() {
    window.location.href = "HaircutRecommendation.html";
}


// =======================
// (PAGE 6)
// ======================= 

function goToPage7() {
    window.location.href = "additionalservice.html";
}


// =======================
// (PAGE 7)
// ======================= 

document.addEventListener("DOMContentLoaded", () => {

    const listEl = document.querySelector(".page7-service-list");
    const addonEl = document.querySelector(".page7-addon-list");
    const totalEl = document.querySelector(".page7-total-price");

    if (!listEl || !addonEl || !totalEl) return; // ✅ safe

    const basePrice = 20000;

    const services = [
        { name: "Hair Spa", price: 20000 },
        { name: "Hair Wash", price: 15000 },
        { name: "Beard Trim", price: 10000 },
        { name: "Color Styling", price: 30000 },
    ];

    let selected = [];

    function renderServices() {
        listEl.innerHTML = "";

        services.forEach((s) => {
            const row = document.createElement("div");
            row.className = "page7-service-item";
            row.innerHTML = `
                <div class="page7-service-info">
                    <span class="page7-service-name">${s.name}</span>
                    <span class="page7-service-price">Rp ${s.price/1000} K</span>
                </div>
                <div class="page7-toggle"></div>
            `;

            const toggle = row.querySelector(".page7-toggle");
            toggle.addEventListener("click", () => toggleService(s, toggle));

            listEl.appendChild(row);
        });
    }

    function toggleService(service, el) {
        const active = selected.find(x => x.name === service.name);

        if (active) {
            selected = selected.filter(x => x.name !== service.name);
            el.classList.remove("active");
        } else {
            selected.push(service);
            el.classList.add("active");
        }

        updatePrice();
    }

    function updatePrice() {
        addonEl.innerHTML = "";
        let total = basePrice;

        selected.forEach(s => {
            const div = document.createElement("div");
            div.innerHTML = `<span>${s.name}</span><span>Rp ${s.price/1000} K</span>`;
            addonEl.appendChild(div);
            total += s.price;
        });

        totalEl.textContent = "Rp " + (total/1000) + " K";
    }

    renderServices();
});

function goToPage8() {
    window.location.href = "selectbarber.html";
}



// =======================
// (PAGE 8) BARBER SELECT
// =======================

let selectedBarber = null;

function initPage8() {
    const cards = document.querySelectorAll(".page8-barber-card");

    if (!cards.length) {
        console.log("PAGE 8: Card tidak ditemukan");
        return;
    }

    cards.forEach(card => {
        card.addEventListener("click", () => {

            // reset semua
            cards.forEach(c => c.classList.remove("selected"));

            // set yang diklik
            card.classList.add("selected");
            selectedBarber = card.dataset.name;

            console.log("Barber dipilih:", selectedBarber);
        });
    });
}

// search
function filterBarber() {
    const input = document.querySelector(".page8-search").value.toLowerCase();
    const cards = document.querySelectorAll(".page8-barber-card");

    cards.forEach(card => {
        const name = card.dataset.name;
        card.style.display = name.includes(input) ? "block" : "none";
    });
}

// navigation
function goNext() {
    if (!selectedBarber) {
        alert("Pilih kapster terlebih dahulu");
        return;
    }
    window.location.href = "summary.html";
}

function goBack() {
    window.location.href = "additionalservice.html";
}

// init saat halaman siap
document.addEventListener("DOMContentLoaded", initPage8);