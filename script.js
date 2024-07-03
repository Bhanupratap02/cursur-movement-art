document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("waveCanvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const waves = [];
  const maxWaves = 50;

  function drawWave(x, y) {
    if (waves.length > maxWaves) waves.shift();

    waves.push({ x, y, radius: 0, alpha: 1 });
  }

  function updateWaves() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < waves.length; i++) {
      const wave = waves[i];
      wave.radius += 4;
      wave.alpha -= 0.02;

      if (wave.alpha <= 0) continue;

      ctx.beginPath();
      ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2, false);
      const gradient = ctx.createRadialGradient(
        wave.x,
        wave.y,
        0,
        wave.x,
        wave.y,
        wave.radius
      );
      gradient.addColorStop(0, `rgba(255,0,0,${wave.alpha})`);
      gradient.addColorStop(0.17, `rgba(255,127,0,${wave.alpha})`);
    //   gradient.addColorStop(0.33, `rgba(255,255,0,${wave.alpha})`);
    //   gradient.addColorStop(0.5, `rgba(0,255,0,${wave.alpha})`);
      gradient.addColorStop(0.67, `rgba(0,0,255,${wave.alpha})`);
      gradient.addColorStop(0.83, `rgba(75,0,130,${wave.alpha})`);
      gradient.addColorStop(1, `rgba(148,0,211,${wave.alpha})`);

      ctx.fillStyle = gradient;
      ctx.fill();
    }
  }

  function animate() {
    updateWaves();
    requestAnimationFrame(animate);
  }

  document.addEventListener("mousemove", (e) => {
    drawWave(e.clientX, e.clientY);
  });

  animate();
});


