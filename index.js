// Setting Events
state().rock.el.addEventListener("click", shakeRock);

function state() {
  // 1 - rock, 2 - paper, 3 - scissors
  return {
    rock: {
      el: document.getElementById("rock"),
      icon: "../assets/rock.png",
      state: 1,
    },
    paper: {
      el: document.getElementById("paper"),
      icon: "../assets/paper.png",
      state: 2,
    },
    scissors: {
      el: document.getElementById("scissors"),
      icon: "../assets/scissors.png",
      state: 3,
    },
    player1: {
      currentState: 1,
      el: document.getElementById("player1"),
    },
    player2: {
      currentState: 1,
      el: document.getElementById("player2"),
    },
  };
}
// Events Callbacks
function shakeRock() {
  const player1El = state().player1.el;
  const rockIcon = state().paper.icon;
  shakePlayer(player1El, rockIcon);
}

function shakePlayers() {
  addClass(state().player1.el, "player1-animation");
  addClass(state().player2.el, "player2-animation");
}

function addClass(el, className) {
  el.classList.add(className);
}

function shakePlayer(el, icon) {
  shakePlayers();
  setTimeout(() => {
    el.innerHTML = `
    <img src="${icon}" alt="shake" />
  `;
  }, 2000);
}
function some() {}