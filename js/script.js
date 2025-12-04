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
// PAGE 1 → PAGE 2
// =======================
const btn = document.getElementById("btnCukur");
if (btn) {
    btn.addEventListener("click", () => {

        // pindah halaman tanpa keluar fullscreen
        setTimeout(() => {
            window.location.href = "face.html";
        }, 200);
    });
}


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

// =======================
// CAMERA SYSTEM (PAGE 2)
// =======================
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





