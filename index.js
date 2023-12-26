document.getElementById("reset").addEventListener("click", function () {
    location.reload();
})

const gameElements = document.querySelectorAll(".gameElement");
const totalElements = gameElements.length;


function getRandomQuantity(x) {
    return Math.floor(Math.random() * x);
}

const bombPositionIndexes = [];

for (let i = 0; i < 10; i++) {
    let randomNum = getRandomQuantity(totalElements);
    if (!bombPositionIndexes.includes(randomNum)) {
        bombPositionIndexes.push(randomNum);
    }
}
// console.log(bombPositionIndexes);

bombPositionIndexes.forEach(index => {
    gameElements[index].classList.add('hasBomb');
});

gameElements.forEach(element => {
    element.addEventListener('click', handleElementClick);
});


function handleElementClick(event) {
    if (event.currentTarget.classList.contains('opened')) {
        return;
    }

    event.currentTarget.classList.add('opened');

    if (event.currentTarget.classList.contains('hasBomb')) {
        event.currentTarget.innerHTML = '💣';
        alert('Game Over! You clicked on a bomb.');

        gameElements.forEach((element, index) => {
            if (element.classList.contains('hasBomb')) {
                element.innerHTML = '💣';
                element.style.backgroundColor = '#FF965E';
            }
        });

        setTimeout(function () {
            location.reload();
        }, 3000);
    } else {
        updateScore(event.currentTarget);
        checkWin();
    }
}

function updateScore(element) {
    const scoreElement = document.querySelector('.scoreValue');
    let currentScore = parseInt(scoreElement.textContent, 10);
    currentScore++;

    scoreElement.textContent = currentScore < 10 ? `0${currentScore}` : currentScore;

    element.textContent = currentScore;
}

function checkWin() {
    const currentScore = parseInt(document.querySelector('.scoreValue').textContent, 10);

    if (currentScore === 10) {
        alert('Congratulations! You won!');
        location.reload();
    }
}

