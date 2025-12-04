// FULLSCREEN BUTTON
document.getElementById("fullscreenBtn").addEventListener("click", () => {
    let elem = document.documentElement;

    if (!document.fullscreenElement) {
        elem.requestFullscreen().catch(err => {
            alert("Fullscreen gagal: " + err.message);
        });
    } else {
        document.exitFullscreen();
    }
});

// OPTIONAL: warning jika user memutar device ke horizontal
function checkOrientation() {
    if (window.innerHeight < window.innerWidth) {
        alert("Harap gunakan tampilan VERTIKAL (9:16).");
    }
}

window.addEventListener("resize", checkOrientation);
checkOrientation();
