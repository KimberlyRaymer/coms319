/**
 * @author Mohammed Abdalgader
 * Date march 7th, 2023
 */

//Global Variable to represent our game status!
var scores, roundScore, activePlayer, gamePlaying;


init();

var lastDice;

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        // 1. Random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = './images/' + 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = './images/' + 'dice-' + dice2 + '.png';

        //3. Update the round score IF the rolled number was NOT a 1 OR 6.

        if (dice1 === 6 && dice2 === 6) {
            scores[activePlayer] = 0;
            showNotification("You got two 6s, YOU LOST YOUR ENTIRE SCORE, we will switch player after 5 seconds!!");
            document.querySelector('#score-' + activePlayer).textContent = '0';
            // next player
            nextPlayer();
        } else if (dice1 === 1 && dice2 === 1) {
            showNotification("You got two 1s, YOU LOST ONLY YOUR CURRENT SCORE, we will switch player after 5 seconds!!");
            // next player
            nextPlayer();
        } else {
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
<<<<<<< HEAD
        } else {
            // show notification and wait 5 seconds
            showNotification("You got two 6s, we will switch player after 2 seconds!!")
            //Next player
            nextPlayer();
=======

>>>>>>> fd4c3c6782166d10d700812187dd648ff9e2a00b
        }

    }
});

function showNotification(message) {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);

    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.innerText = message;
    document.body.appendChild(notification);
    // thanks prof. Abraham Netzahualcoy I learned promises from him
    // I found it very useful!!!
    return new Promise(function (resolve) {
        setTimeout(function () {
            notification.remove();
            overlay.remove();
            resolve();
        }, 2000);
    });
}


document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;
        var winningScore;

        // Undefined, 0, null or "" are COERCED to false
        // Anything else is COERCED to true
        if (input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }

        // Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //Next player
            nextPlayer();
        }
    }
});


function nextPlayer() {
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');


    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}

// new game btn.
document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}
