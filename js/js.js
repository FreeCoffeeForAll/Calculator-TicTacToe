const historico = [];

function myFunction(id) {
  //this will send the number for the calculation
    document.calc.result.value += id;
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function clearScreen() {
  //it cleans the screen for next calculation
    document.calc.result.value = "";
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function calculate() {
    try {
      // this calculate 
        var input = eval(document.calc.result.value);
        document.calc.result.value = input;
    } catch (err) {
        document.calc.result.value = "Error";
    }
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var startBtn = document.querySelector('.start-btn');
var cells = Array.from(document.querySelectorAll('.cell'));
var modalBox = document.querySelector('.popup');
var winnerMessage = document.querySelector('.winner-message');

startBtn.addEventListener('click', () => {
  modalBox.style.display = "none";
  startNewGame();
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function startNewGame() {
  cells.map(cell => {
    //it cleans all X and O at the table before play
    cell.classList.remove('x-marker');
    cell.classList.remove('o-marker');
    cell.textContent = "";
    return cell;
  });
}
cells.map(cell => {
  cell.addEventListener('click', putMark);
});

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
var xStep = true;
var clicksCount = 0
function putMark() {
  if (this.textContent === "") {
    ++clicksCount;
    if (xStep) {
      this.classList.add('x-marker');
      this.textContent = "X";
      xStep = false;
    } else {
      this.classList.add('o-marker');
      this.textContent = "O";
      xStep = true;
    }
  }
  
  var winner = getWinner();
  console.log(winner);
  if (winner) {
    window.setTimeout(endGame(winner), 150);
    clicksCount = 0;
  } else if (clicksCount === 9) {
    clicksCount = 0;
    window.setTimeout(endGame(), 150);
  }

}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//This function is intend for letting the user now who is the winner
//it uses the same CSS modal class that used at the begining 
function endGame(flag) {
  if (flag === "x") {
    modalBox.style.display = "block";
    winnerMessage.innerHTML = '<span class="x-marker">Player using X won <br> </span>Woow!'
  } else if (flag === "o") {
    modalBox.style.display = "block";
    winnerMessage.innerHTML = '<span class="o-marker">Player using O won <br> </span>Woow!'
  } else {
    modalBox.style.display = "block";
    winnerMessage.innerHTML = 'Draw!'
  }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//this function will validate user input for having a winner
function getWinner() {
  var cellsD = document.querySelectorAll('.cell');
  var cells = [
    [],
    [],
    []
  ];
  var i;
  for (i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      var el = cellsD[i * 3 + j];
      if (el.classList.contains('x-marker')) {
        cells[i][j] = 'x';
        console.log("cell " + i + " " + j + "x");
      }
      if (el.classList.contains('o-marker')) {
        cells[i][j] = 'o';
        console.log("cell " + i + " " + j + "y");
      }

    }
  }//All possible options for having a winner
  if (
    ((cells[0][0] === cells[1][1]) && (cells[1][1] === cells[2][2])) ||
    ((cells[2][0] === cells[1][1]) && (cells[1][1] === cells[0][2]))
  ) {
    return cells[1][1];
  }

  for (i = 0; i <= 2; i++) {
    if ((cells[0][i] === cells[1][i]) && (cells[1][i] === cells[2][i] && cells[0][i] && cells[1][i] && cells[2][i])) {
      return cells[0][i];
    }
    if ((cells[i][0] === cells[i][1]) && (cells[i][1] === cells[i][2] && cells[i][0] && cells[i][1] && cells[i][2])) {
      return cells[i][0];
    }
  }
}