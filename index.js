const gridContainer = document.querySelector(".field");
  let cards = [
    { "name": "heart", "image": "heart.png" },
    { "name": "diamond", "image": "diamond.png" },
    { "name": "clove", "image": "clove.png" },
    { "name": "spade", "image": "spade.png" },
    { "name": "queen", "image": "queen.png" },
    { "name": "king", "image": "king.png" },
    { "name": "Dog", "image": "Dog.png" },
    { "name": "Cat", "image": "Cat.png" },
    { "name": "Capy", "image": "Capy.png" },
    { "name": "heart", "image": "heart.png" },
    { "name": "diamond", "image": "diamond.png" },
    { "name": "clove", "image": "clove.png" },
    { "name": "spade", "image": "spade.png" },
    { "name": "queen", "image": "queen.png" },
    { "name": "king", "image": "king.png" },
    { "name": "Dog", "image": "Dog.png" },
    { "name": "Cat", "image": "Cat.png" },
    { "name": "Capy", "image": "Capy.png" },
   
    
  ];
  let firstCard = null;
  let secondCard = null;
  let lockBoard = false;
  let score = 0;

  document.querySelector(".score").textContent = score;

  shuffleCards();
  generateCards();

  function shuffleCards() {
    let currentIndex = cards.length,
      randomIndex,
      temporaryValue;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = cards[currentIndex];
      cards[currentIndex] = cards[randomIndex];
      cards[randomIndex] = temporaryValue;
    }
  }

  function generateCards() {
    for (let card of cards) {
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");
      cardElement.setAttribute("data-name", card.name);
      cardElement.innerHTML = `
        <div class="front">
          <img class="front-image" src=${card.image} />
        </div>
        <div class="back"></div>
      `;
      gridContainer.appendChild(cardElement);
      cardElement.addEventListener("click", flipCard);
    }
  }

  function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flipped");

    if (!firstCard) {
      firstCard = this;
      return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
  }

 function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;

  if (isMatch) {
    disableCards();
    score++;
    document.querySelector(".score").textContent = score;

  
    if (score === cards.length / 2) {
      playVictorySound();
      alert("Congratulations! You've completed Match Masters!");

    } else {
      playSameCardMusic(); 
    }
  } else {
    unflipCards();
  }
}

  function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    resetBoard();
  }

  function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");

     
    const firstImage = firstCard.querySelector('.front-image');
    const secondImage = secondCard.querySelector('.front-image');

    let tempName = firstCard.dataset.name;
    firstCard.dataset.name = secondCard.dataset.name;
    secondCard.dataset.name = tempName;

    let tempImageSrc = firstImage.src;
    firstImage.src = secondImage.src;
    secondImage.src = tempImageSrc;

    resetBoard();
  }, 1000);
}

  function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
  }

  function restart() {
    resetBoard();
    score = 0;
    document.querySelector(".score").textContent = score;

    

    gridContainer.innerHTML = "";
    shuffleCards();
    generateCards();
  }
 function playFlipSound() {
      const flipAudio = document.getElementById('flipSound');
      flipAudio.play();
    }

    function playVictorySound() {
      const victoryAudio = document.getElementById('victorySound');
      victoryAudio.play();
    }

    function playSameCardMusic() {
      const sameCardAudio = document.getElementById('sameCardSound');
      sameCardAudio.play();
    }

    function flipCard() {
      if (lockBoard) return;

      if (this === firstCard) {
        playSameCardMusic();
        return;
      }

      playFlipSound();
      this.classList.add("flipped");

      if (!firstCard) {
        firstCard = this;
        return;
      }

      secondCard = this;
      lockBoard = true;
      checkForMatch();
    }
