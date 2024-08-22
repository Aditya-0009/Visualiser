import { sleep } from "./helpers/utils.js";

let nBars = 10;

let numbersBars = document.getElementById('numbersBars');
const stage = document.getElementById('stage');
console.log('Stage element:', stage);
stage.style.width = `${nBars * 30}px`;

const selectAlgorithm = document.getElementById('selectAlgorithm');
const generateBtn = document.getElementById('generateBtn');
const solveBtn = document.getElementById('solveBtn');

let bars = [];
let barsDivs = [];

const start = () => {
  console.log('Start function called');
  stage.innerHTML = '';

  bars = Array(nBars).fill(0).map(_ => {
    return {
      width: 20,
      height: Math.floor(Math.random() * 200) + 1
    }
  });

  barsDivs = [];

  for (let i = 0; i < bars.length; i++) {
    const bar = document.createElement('div');
    bar.style.width = `${bars[i].width}px`;
    bar.style.height = `${bars[i].height}px`;
    bar.style.left = `${5 + i * 30}px`;
    bars[i] = { ...bars[i], position: i };
    bar.classList.add('bar');
    barsDivs.push(bar);
    stage.appendChild(bar);
  }
  console.log('Bars:', bars);
  console.log('BarsDivs:', barsDivs);
}

start();

async function swapBars(i, j) {
  console.log(`Swapping bars at positions ${i} and ${j}`);
  const tempLeft = barsDivs[i].style.left;
  barsDivs[i].style.left = barsDivs[j].style.left;
  barsDivs[j].style.left = tempLeft;

  barsDivs[i].classList.add('activate');
  barsDivs[j].classList.add('activate');
  
  await sleep(300);

  barsDivs[i].classList.remove('activate');
  barsDivs[j].classList.remove('activate');

  let temp = barsDivs[i];
  barsDivs[i] = barsDivs[j];
  barsDivs[j] = temp;
}

const solve = async () => {
  const array = bars.map(bar => bar.height);

  const response = await fetch('/sort', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      array: array,
      algorithm: selectAlgorithm.value
    })
  });

  if (response.ok) {
    const swaps = await response.json();
    for (const swap of swaps) {
      await swapBars(swap.firstPosition, swap.lastPosition);
    }
  } else {
    console.error('Failed to sort');
  }
};

generateBtn.addEventListener('click', () => {
  console.log('Generate button clicked');
  nBars = parseInt(numbersBars.value, 10) || 10;
  stage.style.width = `${nBars * 30}px`;
  start();
});

solveBtn.addEventListener('click', () => {
  console.log('Solve button clicked');
  solve();
});
