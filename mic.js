navigator.mediaDevices.getUserMedia({ audio: true }).then(function(stream) {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const analyser = audioContext.createAnalyser();
  const microphone = audioContext.createMediaStreamSource(stream);
  const scriptProcessor = audioContext.createScriptProcessor(256, 1, 1);

  analyser.smoothingTimeConstant = 0.8;
  analyser.fftSize = 1024;

  microphone.connect(analyser);
  analyser.connect(scriptProcessor);
  scriptProcessor.connect(audioContext.destination);

  scriptProcessor.onaudioprocess = function() {
    const array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(array);
    let values = 0;

    for (let i = 0; i < array.length; i++) {
      values += array[i];
    }

    const average = values / array.length;
    if (average > 20) { // threshold super sensitif
      blowCandle();
    }
  };
}).catch(function(err) {
  console.log("Mic tidak tersedia, gunakan klik lilin.");
});
