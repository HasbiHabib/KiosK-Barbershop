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





