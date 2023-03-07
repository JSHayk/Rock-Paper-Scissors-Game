const state = {
  ways: {
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
  },
  players: {
    player1: {
      currentState: null,
      el: document.getElementById("player1"),
      wins_count: JSON.parse(localStorage.getItem("players_wins")).player1
    },
    player2: {
      currentState: null,
      el: document.getElementById("player2"),
      wins_count: JSON.parse(localStorage.getItem("players_wins")).player2
    },
  },
  status: {
    player1_status: document.getElementById("player1-status"),
    player2_status: document.getElementById("player2-status"),
  },
  modal: {
    el: document.getElementById("modal"),
    title: document.getElementById("modal-title"),
    button: document.getElementById("modal-button")
  }
}

function start() {
  changePlayersStatus();
  // Setting Events
  state.ways.rock.el.addEventListener("click", shakeRock);
  state.ways.paper.el.addEventListener("click", shakePaper);
  state.ways.scissors.el.addEventListener("click", shakeScissors);
  state.modal.button.addEventListener("click", restartGame)
}

function shakeRock() {
  const rock = state.ways.rock;
  runPlayers(rock.icon, rock.state);
  checkPlayers();
}

function shakePaper() {
  const paper = state.ways.paper;
  runPlayers(paper.icon, paper.state);
  checkPlayers();
}

function shakeScissors(){
  const scissors = state.ways.scissors;
  runPlayers(scissors.icon, scissors.state);
  checkPlayers();
}

function runPlayers(icon, setState) {
  const player1 = state.players.player1;
  const player2 = state.players.player2;
  const randomState = Math.ceil(Math.random() * 3);
  const randomIcon = findWay(randomState)
  runPlayer({player: player1, icon, className: "player1-animation", state: setState});
  runPlayer({player: player2, icon: randomIcon, className: "player2-animation", state: randomState});
}

function runPlayer({player, icon, className, state}) {
  shakePlayer(player.el, icon, className);
  changeState(player, state);
}

function checkPlayers() {
  checkWin();
  checkLose();
}

function checkWin() {
  const player1State = state.players.player1.currentState;
  const player2State = state.players.player2.currentState;
  if (player1State === 1 && player2State === 3) {
    console.log("Player1 win rock & scissors!")
  } else if (player1State === 3 && player2State === 2) {
    console.log("Player1 win scissors & paper")
  } else if (player1State === 2 && player2State === 1) {
    console.log("Player1 win paper & rock")
  } else {
    setTimeout(() => {
      standoff();
    }, 2400);
    return;
  }

  const playersWins = JSON.parse(localStorage.getItem("players_wins"));
  localStorage.setItem("players_wins", JSON.stringify({
    ...playersWins,
    player1: playersWins.player1 + 1
  }))
  setTimeout(() => {
    win();
  }, 2400);
}

function checkLose() {
  const player1State = state.players.player1.currentState;
  const player2State = state.players.player2.currentState;
  if (player1State === 1 && player2State === 2) {
    console.log("Player1 lose rock && paper")
  } else if (player1State === 2 && player2State === 3) {
    console.log("Player1 lose paper & scissors")
  } else if (player1State === 3 && player2State === 1) {
    console.log("Player1 lose scissors & rock")
  } else {
    setTimeout(() => {
      standoff();
    }, 2400);
    return;
  }
  const playersWins = JSON.parse(localStorage.getItem("players_wins"));
  localStorage.setItem("players_wins", JSON.stringify({
    ...playersWins,
    player2: playersWins.player2 + 1
  }));
  setTimeout(() => {
    lose();
  }, 2400);
}

function shakePlayer(el, icon, className) {
  setTimeout(() => {
    el.innerHTML = `
    <img src="${icon}" alt="shake" />
  `;
  }, 2000);
  addClass(el, className);
}

function changePlayersStatus(){
  state.status.player1_status.innerHTML = state.players.player1.wins_count;
  state.status.player2_status.innerHTML = state.players.player2.wins_count;
}

function win() {
  const modal = state.modal.el;
  const modalTitle = state.modal.title;
  modalTitle.innerHTML = "Player 1 win";
  show(modal)
}

function lose() {
  const modal = state.modal.el;
  const modalTitle = state.modal.title;
  modalTitle.innerHTML = "Player 1 lose";
  show(modal)
}

function standoff() {
  const modal = state.modal.el;
  const modalTitle = state.modal.title;
  modalTitle.innerHTML = "No One Win!";
  show(modal)
}

function restartGame() {
  location.reload();
}

// Helpers
function changeState(player, newState) {
  player.currentState = newState;
}

function addClass(el, className) {
  el.classList.add(className);
}

function findWay(num) {
  const ways = Object.entries(state.ways);
  const result = ways.filter(item => {
    const [key, value] = item;
    if (value.state === num) {
      return value.icon;
    }
  })
  const way = result[0];
  if (!way) return null;
  const icon = result[0][1].icon;
  return icon;
}

function hide(el) {
  el.classList.add("hide");
  el.classList.remove("show")
}

function show(el) {
  el.classList.add("show");
  el.classList.remove("hide")
}

start();
