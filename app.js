const boxes = document.querySelectorAll('td');
const table = document.querySelector('table');

const scoreJ1 = document.querySelector('.player1');
const scoreJ2 = document.querySelector('.player2');

const scoreContainer = document.querySelector('.score_container');
const startContainer = document.querySelector('.button_container_prerequisite');
const buttonPart = document.querySelector('.button_container_part');

const game = document.querySelector('.game');

let playerPoint1 = 0;
let playerPoint2 = 0;

let J1 = true;
let J2 = false;

let displaysScoreOnlyGameJ1 = 1;
let displaysScoreOnlyGameJ2 = 1;

let Pseudo1 = 'Joueur 1';
let Pseudo2 = 'Joueur 2';

const start = document.querySelector('.start');

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

start.addEventListener('click', () => {
    reset();

    table.style.display = 'initial';
    buttonPart.style.display = 'block';
    scoreContainer.style.display = 'block';
    game.style.display = 'block';

    startContainer.style.display = 'none';

    scoreJ1.innerHTML = 'Score du ' + Pseudo1 + ' : <strong>' + playerPoint1 + '</strong>';
    scoreJ2.innerHTML = 'Score du ' + Pseudo2 + ' : <strong>' + playerPoint2 + '</strong>';

    launch();
});

addPseudos();

function launch() {
    boxes.forEach(box => {
        box.addEventListener('click', () => {
    
            if(J1 === true) {
                if (box.innerHTML === '') {
                    box.innerHTML = 'X';
                    J1 = false;
                    J2 = true;
                }
            }
            else if(J2 === true) {
                if (box.innerHTML === '') {
                    box.innerHTML = 'O';
                    J1 = true;
                    J2 = false;
                }
            }
    
            winOrLose('X');
            winOrLose('O');
            rePlay();
            diplayScoreAndReset();
        });
    });
}

function winOrLose(id) {
    
    let isWinner = winningCombos.some(combo => {
        return combo.every(index => {
            return boxes[index].textContent === id;
        });
    });

    if(isWinner) {

        if(id === 'X') {
            game.innerHTML = Pseudo1 + ' à Gagné !';
            
            if(displaysScoreOnlyGameJ1 === 1) {
                game.classList.toggle('active');
                playerPoint1++;
                displaysScoreOnlyGameJ1++;
            }
        }
        else {
            game.innerHTML = Pseudo2 + ' à Gagné !';
    
            if(displaysScoreOnlyGameJ2 === 1) {
                game.classList.toggle('active');
                playerPoint2++;
                displaysScoreOnlyGameJ2++;
            }
        }
        J1 = null;
        J2 = null;
    }

    let allFilled = true;

    boxes.forEach(box => {
    if (box.innerHTML === '') {
        allFilled = false;
    }
    });

    if (allFilled) {
        game.classList.toggle('active');
        game.innerHTML = 'Égalité !';
    }   
}

function rePlay() {
    const replayBtn = document.querySelector('.replay');

    replayBtn.addEventListener('click', () => {
        if (game.classList[1] === 'active') {
            game.classList.toggle('active');
        }

        J1 = true;
        J2 = false;

        displaysScoreOnlyGameJ1 = 1;
        displaysScoreOnlyGameJ2 = 1;

        for(let i = 0; i < boxes.length; i++) {
            boxes[i].innerHTML = '';
        }

        game.innerHTML = 'Partie en cours...';
    });
}

function diplayScoreAndReset() {
    let resetScore = document.querySelector('.resetScore');

    resetScore.addEventListener('click', () => {
        reset();

        Pseudo1 = 'Joueur 1';
        Pseudo2 = 'Joueur 2';

        table.style.display = 'none';
    });

    scoreJ1.innerHTML = 'Score du ' + Pseudo1 + ' : <strong>' + playerPoint1 + '</strong>';
    scoreJ2.innerHTML = 'Score du ' + Pseudo2 + ' : <strong>' + playerPoint2 + '</strong>';
}

function reset() {
    startContainer.style.display = 'block';

    buttonPart.style.display = 'none';
    scoreContainer.style.display = 'none';
    game.style.display = 'none';

    if (game.classList[1] === 'active') {
        game.classList.toggle('active');
    }

    J1 = true;
    J2 = false;

    displaysScoreOnlyGameJ1 = 1;
    displaysScoreOnlyGameJ2 = 1;

    for(let i = 0; i < boxes.length; i++) {
        boxes[i].innerHTML = '';
    }

    game.innerHTML = 'Partie en cours...';

    playerPoint1 = 0;
    playerPoint2 = 0;

    scoreJ1.innerHTML = 'Score du ' + Pseudo1 + ' : <strong>' + playerPoint1 + '</strong>';
    scoreJ2.innerHTML = 'Score du ' + Pseudo2 + ' : <strong>' + playerPoint2 + '</strong>';
}

function addPseudos() {
    const pseudoPlayers = document.querySelector('.pseudo_players');

    pseudoPlayers.addEventListener('click', () => {
        Pseudo1 = prompt("Pseudo du joueur 1 :");
        Pseudo2 = prompt("Pseudo du joueur 2 :");

        if(Pseudo1 === null || Pseudo2 === null) {
            Pseudo1 = 'Joueur 1';
            Pseudo2 = 'Joueur 2';
        }
    });
}