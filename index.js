'use strict';

let player = 'circle';

const btnElm = document.querySelectorAll('.playground__box');

const imgElm = document.querySelector('.circle');

btnElm.forEach((button) => {
  button.addEventListener('click', (event) => {
    if (player === 'circle') {
      button.classList.add('playground__box--circle');
      imgElm.src = 'images/cross.svg';
      player = 'cross';
      button.disabled = true;
    } else if (player === 'cross') {
      button.classList.add('playground__box--cross');
      imgElm.src = 'images/circle.svg';
      player = 'circle';
      button.disabled = true;
    }

    if (isWinningMove(event.target) === true) {
      if (getSymbol(event.target) === 'circle') {
        setTimeout(() => {
          let message = confirm('Vyhrálo kolečko. Hrát znovu?');
          if (message === true) {
            location.reload();
          }
        }, 150);
      } else if (getSymbol(event.target) === 'cross') {
        setTimeout(() => {
          let message = confirm('Vyhrál křížek. Hrát znovu?');
          if (message === true) {
            location.reload();
          }
        }, 150);
      }
    }
  });
});

const boardSize = 10;
const fields = document.querySelectorAll('.playground__box');

const getPosition = (field) => {
  let fieldIndex = 0;
  while (fieldIndex < fields.length) {
    if (field === fields[fieldIndex]) {
      break;
    }
    fieldIndex++;
  }

  return {
    row: Math.floor(fieldIndex / boardSize),
    column: fieldIndex % boardSize,
  };
};

const getField = (row, column) => fields[row * boardSize + column];

const getSymbol = (field) => {
  if (field.classList.contains('playground__box--cross')) {
    return 'cross';
  } else if (field.classList.contains('playground__box--circle')) {
    return 'circle';
  }
};

const symbolsToWin = 5;
const isWinningMove = (field) => {
  const origin = getPosition(field);
  const symbol = getSymbol(field);

  let i;

  let inRow = 1; // Jednička pro právě vybrané políčko
  // Koukni doleva
  i = origin.column;
  while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
    inRow++;
    i--;
  }

  // Koukni doprava
  i = origin.column;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(origin.row, i + 1))
  ) {
    inRow++;
    i++;
  }

  if (inRow >= symbolsToWin) {
    return true;
  }

  let inColumn = 1;
  // Koukni nahoru
  i = origin.row;
  while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
    inColumn++;
    i--;
  }

  // Koukni dolu
  i = origin.row;
  while (
    i < boardSize - 1 &&
    symbol === getSymbol(getField(i + 1, origin.column))
  ) {
    inColumn++;
    i++;
  }

  if (inColumn >= symbolsToWin) {
    return true;
  }

  return false;
};
