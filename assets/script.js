var swiper = new Swiper(".mySwiper", {
      effect: "cards",
      grabCursor: true,
    });

    var datingProposal = new Date(2024, 3, 14); // 14th April 2024

    var now = new Date();

    // Calcula a diferença em milissegundos
    var diffMs = now - datingProposal;

    // Converte para dias
    var diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    // Calcula anos, meses e dias
    var years = now.getFullYear() - datingProposal.getFullYear();
    var months = now.getMonth() - datingProposal.getMonth();
    var days = now.getDate() - datingProposal.getDate();

    if (days < 0) {
      months--;
      // Ajusta os dias considerando o mês anterior
      var prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    document.getElementById("completeDate").innerText = `Se passaram: ${years} ano${years > 1 ? 's' : ''}, ${months} ${months > 1 ? 'meses' : 'mês'} e ${days} dias desde que te pedi em namoro.`;
    document.getElementById("qtdDays").innerText = `Total de dias: ${diffDays}`;

    const audio = document.getElementById("audio");
    const playPause = document.getElementById("playPause");
    const seekBar = document.getElementById("seekBar");
    const currentTimeEl = document.getElementById("currentTime");
    const totalTimeEl = document.getElementById("totalTime");

    function formatTime(sec) {
      const m = Math.floor(sec / 60);
      const s = Math.floor(sec % 60).toString().padStart(2, "0");
      return `${m}:${s}`;
    }

    // Quando os metadados estiverem prontos (duração disponível)
    audio.addEventListener("loadedmetadata", () => {
      totalTimeEl.textContent = formatTime(audio.duration);
    });

    playPause.addEventListener("click", () => {
      if (audio.paused) {
        audio.play().then(() => {
          playPause.textContent = "⏸";
        }).catch((err) => {
          console.error("Erro ao tentar tocar o áudio:", err);
        });
      } else {
        audio.pause();
        playPause.textContent = "►";
      }
    });

    audio.addEventListener("timeupdate", () => {
      seekBar.value = (audio.currentTime / audio.duration) * 100;
      currentTimeEl.textContent = formatTime(audio.currentTime);
    });

    seekBar.addEventListener("input", () => {
      audio.currentTime = (seekBar.value / 100) * audio.duration;
    });