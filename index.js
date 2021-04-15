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
  });
});

//for (let index = 0; index < buttons.length; index++) {
//const button = buttons[index];
//}

//const clickOnBtn = () => {
//  const btnElm = document.querySelectorAll('.playground__box');
//  btnElm.classList.add('playground__box--circle');
//};

//btnElm.addEventListerner('click', clickOnBtn);
