const canvas = document.getElementById("cakeCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 200;
canvas.height = 200;

let candleLit = true;

function drawCake() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Cake base
  ctx.fillStyle = "#ffc1cc";
  ctx.fillRect(50, 100, 100, 60);

  // Candle
  ctx.fillStyle = "#FFD700";
  ctx.fillRect(95, 60, 10, 40);

  // Flame
  if (candleLit) {
    ctx.beginPath();
    ctx.ellipse(100, 50, 8, 15, 0, 0, Math.PI * 2);
    ctx.fillStyle = "orange";
    ctx.fill();
  }
}

drawCake();

// Click to blow candle
canvas.addEventListener("click", () => {
  if (candleLit) {
    candleLit = false;
    drawCake();
    launchConfetti();
    Swal.fire({
      title: "✨ Selamat Ulang Tahun yang ke-34 Sayang ✨",
      text: "Semoga harimu penuh cinta & kebahagiaan 🎉",
      icon: "success",
      confirmButtonText: "💖 Peluk Virtual"
    });
  }
});