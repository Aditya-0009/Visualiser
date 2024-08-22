import { sleep } from "./helpers/utils.js";

let nBars = 10;
let sortingSpeed = 500; // Default sorting speed

let numbersBars = document.getElementById('numbersBars');
const stage = document.getElementById('stage');
stage.style.width = `${nBars * 35}px`; // Adjust width for larger bars

const selectAlgorithm = document.getElementById('selectAlgorithm');
const generateBtn = document.getElementById('generateBtn');
const solveBtn = document.getElementById('solveBtn');
const comparisonDiv = document.getElementById('comparison'); // New element for comparison
const speedSlider = document.getElementById('speedSlider');
const speedValue = document.getElementById('speedValue');

// Function to update the speed based on slider value
speedSlider.addEventListener('input', () => {
  sortingSpeed = parseInt(speedSlider.value, 10);
  speedValue.textContent = `${sortingSpeed}ms`;
});

let bars = [];
let barsDivs = [];

const start = () => {
  stage.innerHTML = '';

  bars = Array(nBars).fill(0).map(_ => {
    return {
      width: 30, // Increased bar width
      height: Math.floor(Math.random() * 200) + 1
    }
  });

  barsDivs = [];

  for (let i = 0; i < bars.length; i++) {
    const bar = document.createElement('div');
    bar.style.width = `${bars[i].width}px`;
    bar.style.height = `${bars[i].height}px`;
    bar.style.left = `${5 + i * 35}px`; // Adjust left position for larger bars

    const barNumber = document.createElement('div');
    barNumber.className = 'bar-number';
    barNumber.textContent = bars[i].height;
    bar.appendChild(barNumber);

    bars[i] = { ...bars[i], position: i };
    bar.classList.add('bar');
    barsDivs.push(bar);
    stage.appendChild(bar);
  }
  stage.style.background = '#ffafcc'; // Ensure background color is consistent
}

start();

async function swapBars(i, j) {
  console.log(`Swapping bars at positions ${i} and ${j}`);
  const tempLeft = barsDivs[i].style.left;
  barsDivs[i].style.left = barsDivs[j].style.left;
  barsDivs[j].style.left = tempLeft;

  barsDivs[i].classList.add('activate');
  barsDivs[j].classList.add('activate');
  
  await sleep(sortingSpeed); // Adjust sorting speed
  
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
      const firstValue = array[swap.firstPosition];
      const secondValue = array[swap.lastPosition];
      const comparisonText = `${firstValue} ${swap.comparisonOperator} ${secondValue}`;
      comparisonDiv.textContent = `Comparing: ${comparisonText}`;
      await sleep(sortingSpeed); // Adjust sorting speed
      await swapBars(swap.firstPosition, swap.lastPosition);
    }
  } else {
    console.error('Failed to sort');
  }
};

generateBtn.addEventListener('click', () => {
  nBars = parseInt(numbersBars.value, 10) || 10;
  stage.style.width = `${nBars * 35}px`; // Adjust width for new number of bars
  start();
});

solveBtn.addEventListener('click', () => {
  solve();
});
