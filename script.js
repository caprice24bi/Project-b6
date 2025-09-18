// Candle blow simulation (simplified)
const canvas = document.getElementById("birthday");
const ctx = canvas.getContext("2d");
canvas.width = 300;
canvas.height = 300;

let candleLit = true;

function drawCandle() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // candle body
  ctx.fillStyle = "#FFD700";
  ctx.fillRect(140, 100, 20, 100);
  // flame
  if (candleLit) {
    ctx.beginPath();
    ctx.ellipse(150, 90, 10, 20, 0, 0, Math.PI * 2);
    ctx.fillStyle = "orange";
    ctx.fill();
  }
}

drawCandle();

// microphone input to blow out candle
navigator.mediaDevices.getUserMedia({ audio: true })
  .then(function(stream) {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const mic = audioContext.createMediaStreamSource(stream);
    mic.connect(analyser);
    const data = new Uint8Array(analyser.frequencyBinCount);

    function detectBlow() {
      analyser.getByteFrequencyData(data);
      let values = 0;
      for (let i = 0; i < data.length; i++) values += data[i];
      let average = values / data.length;
      if (average > 60 && candleLit) {
        candleLit = false;
        drawCandle();
        launchConfetti();
      }
      requestAnimationFrame(detectBlow);
    }
    detectBlow();
  })
  .catch(function(err) {
    console.log("Mic not allowed", err);
  });
