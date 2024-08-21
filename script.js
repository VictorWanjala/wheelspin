// Define the winning and losing numbers
const winningNumbers = [1, 3, 5, 7, 9];
const losingNumbers = [2, 4, 6, 8, 10];

const prizes = [
    'Gift Card',
    'Free Merchandise',
    'Extra Spin',
    'Free Merchandise',
    'Free Merchandise',
    'Diary',
    'Free Merchandise',
    'Free Merchandise',
    'Free Merchandise',
    'Free Merchandise'
];

const mysteryPrizes = [
    'Mystery Prize 1: Free Merchandise',
    'Mystery Prize 2: Free Merchandise',
    'Mystery Prize 3: Extra Spin'
];

const losingOutcomes = [
    'Try Again! Better luck next time.',
    'Oops! No prize this time.',
    'No luck this spin. Spin again!'
];

const wheel = document.getElementById('wheel');
const result = document.getElementById('result');
const spinButton = document.getElementById('spin-button');
const userNumberInput = document.getElementById('user-number');

// Function to get a random item from an array
function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Function to spin the wheel
function spinWheel() {
    const userNumber = parseInt(userNumberInput.value, 10);
    
    if (!userNumber || userNumber < 1 || userNumber > 10) {
        result.textContent = 'Please select a number between 1 and 10.';
        return;
    }

    const randomAngle = Math.floor(Math.random() * 3600);
    wheel.style.transform = `rotate(${randomAngle}deg)`;
    setTimeout(() => {
        const degrees = randomAngle % 360;
        const segment = Math.floor(degrees / 36) + 1;
        const prizeIndex = 10 - segment;
        const prize = prizes[prizeIndex];
        
        let outcome;

        if (winningNumbers.includes(userNumber)) {
            outcome = getRandomItem(mysteryPrizes);
        } else if (losingNumbers.includes(userNumber)) {
            outcome = getRandomItem(losingOutcomes);
        } else {
            outcome = 'No prize this time.';
        }

        applyPrizeEffect(outcome);
        result.textContent = `You selected number ${userNumber}. ${outcome}`;
    }, 4000);
}

// Function to apply animations based on the prize
function applyPrizeEffect(prize) {
    if (mysteryPrizes.includes(prize)) {
        wheel.classList.add('mystery-prize-animation');
        wheel.classList.remove('losing-outcome-animation');
    } else if (losingOutcomes.includes(prize)) {
        wheel.classList.add('losing-outcome-animation');
        wheel.classList.remove('mystery-prize-animation');
    } else {
        wheel.classList.remove('mystery-prize-animation', 'losing-outcome-animation');
    }
}

// Add event listener to the spin button
spinButton.addEventListener('click', spinWheel);
