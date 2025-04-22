  const mainSection = document.getElementById('main-section');
    const guessSection = document.getElementById('guess-section');
    const alternateDivs = document.querySelectorAll('.alternate-div');
    const resultMessage = document.getElementById('result-message');

    let currentIndex = 0;
    let scoreMap = {};
    const allActors = Array.from(document.querySelectorAll('.main-div .actor-item')).map(el => el.textContent);

    function startGuessing() {
      mainSection.classList.add('hidden');
      guessSection.classList.remove('hidden');
      alternateDivs[0].classList.remove('hidden');
    }

    function handleResponse(answer) {
      const currentDiv = alternateDivs[currentIndex];
      const actors = Array.from(currentDiv.querySelectorAll('.actor-item')).map(el => el.textContent);

      actors.forEach(actor => {
        if (!scoreMap[actor]) scoreMap[actor] = 0;
        scoreMap[actor] += (answer === 'Yes') ? 1 : -1;
      });

      currentDiv.classList.add('hidden');
      currentIndex++;

      if (currentIndex < alternateDivs.length) {
        alternateDivs[currentIndex].classList.remove('hidden');
      } else {
        displayResult();
      }
    }

    function displayResult() {
      let bestGuess = null;
      let maxScore = -Infinity;

      allActors.forEach(actor => {
        const score = scoreMap[actor] || 0;
        if (score > maxScore) {
          maxScore = score;
          bestGuess = actor;
        }
      });

      resultMessage.textContent = maxScore > 0
        ? `🎉 I guess your favourite actor is: ${bestGuess}!`
        : `😅 Hmm... I couldn't guess it this time.`;

      document.querySelector('.button-group').style.display = 'none';
    }

    function resetGame() {
      currentIndex = 0;
      scoreMap = {};
      resultMessage.textContent = '';

      mainSection.classList.remove('hidden');
      guessSection.classList.add('hidden');

      alternateDivs.forEach(div => div.classList.add('hidden'));
      alternateDivs[0].classList.remove('hidden');

      document.querySelectorAll('.button-group')[1].style.display = 'flex';
    }
