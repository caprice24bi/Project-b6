const flame = document.getElementById("flame");

function blowCandle() {
  if (!flame) return;
  flame.style.display = "none";
  launchConfetti();
  Swal.fire({
    title: '✨ Selamat Ulang Tahun yang ke-34 Sayang ✨',
    icon: 'success',
    confirmButtonText: '💖'
  });
}

document.getElementById("candle").addEventListener("click", blowCandle);
