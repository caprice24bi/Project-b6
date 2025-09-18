const confettiCanvas = document.getElementById("confetti");
const confettiCtx = confettiCanvas.getContext("2d");
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

let confettiPieces = [];

function ConfettiPiece(x, y, color, direction) {
  this.x = x;
  this.y = y;
  this.color = color;
  this.size = Math.random() * 6 + 4;
  this.speedY = Math.random() * 3 + 2;
  this.speedX = direction * (Math.random() * 3 + 2);
}

function launchConfetti() {
  for (let i = 0; i < 100; i++) {
    let side = i % 2 === 0 ? 0 : confettiCanvas.width;
    let direction = side === 0 ? 1 : -1;
    let x = side;
    let y = Math.random() * confettiCanvas.height;
    let colors = ["#ff6699", "#ffcc66", "#66ccff", "#99ff99", "#ff9966"];
    let color = colors[Math.floor(Math.random() * colors.length)];
    confettiPieces.push(new ConfettiPiece(x, y, color, direction));
  }
}

function drawConfetti() {
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  for (let i = 0; i < confettiPieces.length; i++) {
    let p = confettiPieces[i];
    confettiCtx.beginPath();
    confettiCtx.arc(p.x, p.y, p.size, 0, 2 * Math.PI);
    confettiCtx.fillStyle = p.color;
    confettiCtx.fill();
    p.y += p.speedY;
    p.x += p.speedX;
    if (p.y > confettiCanvas.height || p.x < 0 || p.x > confettiCanvas.width) {
      confettiPieces.splice(i, 1);
      i--;
    }
  }
  requestAnimationFrame(drawConfetti);
}
drawConfetti();