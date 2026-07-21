/* =========================================================
   NOURGEOUS ACCESSORIES — INTERACTIONS & ANIMATIONS
========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- Loading screen ---------------- */
  const loadingScreen = document.getElementById('loadingScreen');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loadingScreen.style.transition = 'opacity .7s ease';
      loadingScreen.style.opacity = '0';
      setTimeout(() => loadingScreen.style.display = 'none', 750);
    }, 1500);
  });

  /* ---------------- Ambient background ---------------- */
  const ambience = document.getElementById('ambience');
  const actx = ambience.getContext('2d');
  function resizeAmbience(){ ambience.width = innerWidth; ambience.height = innerHeight; }
  resizeAmbience(); addEventListener('resize', resizeAmbience);

  const dust = Array.from({ length: 65 }, () => ({
    x: Math.random() * innerWidth,
    y: Math.random() * innerHeight,
    r: Math.random() * 1.5 + 0.5,
    speed: Math.random() * 0.2 + 0.05,
    tw: Math.random() * Math.PI * 2
  }));

  function animateAmbience(){
    actx.clearRect(0, 0, ambience.width, ambience.height);
    dust.forEach(p => {
      p.y -= p.speed;
      p.tw += 0.02;
      if (p.y < -10) { p.y = ambience.height + 10; p.x = Math.random() * ambience.width; }
      const alpha = 0.2 + Math.sin(p.tw) * 0.2;
      actx.beginPath();
      actx.fillStyle = `rgba(212,175,55,${Math.max(alpha,0)})`;
      actx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      actx.fill();
    });
    requestAnimationFrame(animateAmbience);
  }
  animateAmbience();

  /* ---------------- Mouse glow ---------------- */
  const glow = document.getElementById('mouseGlow');
  window.addEventListener('mousemove', e => {
    glow.style.opacity = '1';
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
  window.addEventListener('mouseleave', () => glow.style.opacity = '0');

  /* ---------------- Confetti ---------------- */
  function fireConfetti(opts = {}) {
    if (typeof confetti !== 'function') return;
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#F3E5C8', '#FFFFFF', '#081a28'],
      ...opts
    });
  }

  /* ---------------- Scene 1: Wax seal ---------------- */
  const sceneSeal = document.getElementById('sceneSeal');
  const waxSeal = document.getElementById('waxSeal');

  waxSeal.addEventListener('click', () => {
    fireConfetti({ particleCount: 60, spread: 70, origin: { y: 0.4 } });
    document.getElementById('sceneEnvelope').scrollIntoView({ behavior: 'smooth' });
  });

  /* ---------------- Scene 2: Envelope ---------------- */
  const envelopeBox = document.getElementById('envelopeBox');
  const letterLines = document.querySelectorAll('#theLetter [data-line]');
  const balloons = document.querySelectorAll('.balloon');
  let envelopeOpened = false;

  const envelopeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !envelopeOpened) {
        envelopeOpened = true;
        setTimeout(() => {
          envelopeBox.classList.add('open');
          fireConfetti();
          balloons.forEach((b, i) => {
            if (window.gsap) {
              gsap.to(b, {
                y: -innerHeight - 200,
                opacity: 1,
                duration: 5 + i,
                delay: i * 0.3,
                ease: 'power1.out'
              });
            } else {
              b.style.transition = 'transform 5s ease-out, opacity .5s ease';
              b.style.opacity = '1';
              b.style.transform = `translateY(-${innerHeight + 200}px)`;
            }
          });
          letterLines.forEach((line, i) => {
            setTimeout(() => line.classList.add('revealed'), 600 + i * 350);
          });
        }, 400);
      }
    });
  }, { threshold: 0.4 });
  envelopeObserver.observe(document.getElementById('sceneEnvelope'));

  document.getElementById('toMoments').addEventListener('click', () => {
    document.getElementById('sceneMoments').scrollIntoView({ behavior: 'smooth' });
  });

  /* ---------------- Scene 3 & 5: Polaroids reveal ---------------- */
  document.querySelectorAll('.polaroid').forEach(p => {
    p.style.setProperty('--r', (p.dataset.rot || 0) + 'deg');
  });
  const polaroidObserver = new IntersectionObserver(entries => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('in-view'), idx * 90);
        polaroidObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });
  document.querySelectorAll('.polaroid').forEach(p => polaroidObserver.observe(p));

  /* ---------------- Scene 4: Music player ---------------- */
  const audio = document.getElementById('audio');
  const playBtn = document.getElementById('playBtn');
  const prevBtn = document.getElementById('prevBtn');
  const likeBtn = document.getElementById('likeBtn');
  const seek = document.getElementById('seek');
  const volume = document.getElementById('volume');
  const curTime = document.getElementById('curTime');
  const durTime = document.getElementById('durTime');
  const vinyl = document.getElementById('vinyl');
  const tonearm = document.getElementById('tonearm');
  const waveBars = document.getElementById('waveBars');

  for (let i = 0; i < 20; i++) {
    const bar = document.createElement('span');
    bar.style.animationDelay = (i * 0.05) + 's';
    waveBars.appendChild(bar);
  }

  function fmt(t) {
    if (!isFinite(t)) return '00:00';
    const m = Math.floor(t / 60).toString().padStart(2, '0');
    const s = Math.floor(t % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  audio.addEventListener('loadedmetadata', () => { durTime.textContent = fmt(audio.duration); });
  audio.addEventListener('timeupdate', () => {
    curTime.textContent = fmt(audio.currentTime);
    if (audio.duration) seek.value = (audio.currentTime / audio.duration) * 100;
  });
  seek.addEventListener('input', () => {
    if (audio.duration) audio.currentTime = (seek.value / 100) * audio.duration;
  });
  volume.addEventListener('input', () => { audio.volume = volume.value; });
  audio.volume = volume.value;

  function setPlayingUI(playing) {
    playBtn.innerHTML = playing ? '<i class="fa-solid fa-pause"></i>' : '<i class="fa-solid fa-play"></i>';
    vinyl.classList.toggle('spinning', playing);
    tonearm.classList.toggle('playing', playing);
    waveBars.classList.toggle('playing', playing);
  }

  playBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().catch(() => {});
      setPlayingUI(true);
    } else {
      audio.pause();
      setPlayingUI(false);
    }
  });
  prevBtn.addEventListener('click', () => { audio.currentTime = 0; });
  likeBtn.addEventListener('click', () => {
    likeBtn.classList.toggle('liked');
    likeBtn.innerHTML = likeBtn.classList.contains('liked')
      ? '<i class="fa-solid fa-heart" style="color:#D4AF37"></i>'
      : '<i class="fa-regular fa-heart"></i>';
  });
  audio.addEventListener('ended', () => setPlayingUI(false));

  /* ---------------- Scene 6: Final surprise ---------------- */
  const finalOverlay = document.getElementById('finalOverlay');
  const finalPhotosWrap = document.getElementById('finalPhotos');
  const finalSurpriseBtn = document.getElementById('finalSurpriseBtn');
  const closeFinal = document.getElementById('closeFinal');

  const allImagePaths = [
    'images/moments/1.png','images/moments/2.png','images/moments/3.png',
    'images/moments/4.png','images/moments/5.png',
    'images/us/1.png','images/us/2.png','images/us/3.png','images/us/4.png'
  ];

  finalSurpriseBtn.addEventListener('click', () => {
    finalOverlay.classList.add('show');
    finalOverlay.setAttribute('aria-hidden', 'false');
    finalPhotosWrap.innerHTML = '';

    allImagePaths.forEach((src, i) => {
      const fig = document.createElement('div');
      fig.className = 'final-photo';
      fig.style.left = (Math.random() * 80 + 5) + '%';
      fig.style.top = (Math.random() * 75 + 5) + '%';
      fig.style.transform = `rotate(${(Math.random() * 20 - 10)}deg)`;
      const img = document.createElement('img');
      img.src = src;
      img.alt = '';
      img.onerror = () => fig.classList.add('ph-empty');
      fig.appendChild(img);
      finalPhotosWrap.appendChild(fig);
      setTimeout(() => fig.classList.add('in'), i * 110);
    });

    fireConfetti({ particleCount: 160, spread: 120, origin: { y: 0.5 } });
    if (audio.paused) { audio.play().catch(() => {}); setPlayingUI(true); }
  });

  closeFinal.addEventListener('click', () => {
    finalOverlay.classList.remove('show');
    finalOverlay.setAttribute('aria-hidden', 'true');
  });

});
