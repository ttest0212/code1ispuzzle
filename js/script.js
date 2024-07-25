const correctCodes = {
    'cell-1': 'code1',
    'cell-2': 'code2',
    'cell-3': 'code3',
    'cell-4': 'code4',
    'cell-5': 'code5',
    'cell-6': 'code6',
    'cell-7': 'code7',
    'cell-8': 'code8',
    'cell-9': 'code9',
};

document.querySelectorAll('.cell').forEach(cell => {
    const input = cell.querySelector('input');
    const img = cell.querySelector('img');
    const hint = cell.querySelector('p');

    if (input) {
        input.addEventListener('input', () => {
            if (input.value.toLowerCase() === correctCodes[cell.id].toLowerCase()) {
                if (img) {
                    img.classList.remove('hidden'); // Display the image
                }
                input.style.display = 'none'; // Hide the input field
                hint.style.display = 'none'; // Hide the hint
                checkVictory(); // Check if the puzzle is complete
            }
        });
    }
});

function checkVictory() {
    const allRevealed = Array.from(document.querySelectorAll('.cell img')).every(img => !img.classList.contains('hidden'));
    if (allRevealed) {
        const cell5 = document.getElementById('cell-5');
        const button = document.createElement('button');
        button.textContent = 'Emmm, il manque une pièce on dirait';
        button.addEventListener('click', showCompleteImage);
        cell5.innerHTML = '';
        cell5.appendChild(button);
    }
}

function showCompleteImage() {
    const messageContainer = document.querySelector('.message-container');
    messageContainer.innerHTML = `
        <p>
            <span style="color: yellow;">Note : C'est le destin</span><br>
            "On a parfois l'impression que tout doit être parfait pour que ça marche, mais ce n'est pas toujours le cas. Même si quelque chose semble incomplet ou imparfait, cela peut quand même fonctionner comme c'était destiné à le faire. C'est souvent dans ces imperfections qu'on trouve la vraie beauté. Exactement comme ce QR code : il lui manque une partie, mais il fonctionne toujours."
        </p>
        <button onclick="showFinalImage()">scan moi</button>
    `;
    messageContainer.style.display = 'flex';
    document.getElementById('countdown-container').style.display = 'flex'; // Ensure countdown is visible
}

function showFinalImage() {
    document.body.innerHTML = `
        <div class="container">
            <h1>IN TIME</h1>
            <div class="grid victory"></div>
            <div id="countdown-container" class="countdown-container">
                <div id="countdown-timer" class="countdown-timer"></div>
            </div>
        </div>
    `;
    const victoryGrid = document.querySelector('.grid.victory');
    for (let i = 1; i <= 9; i++) { // De 1 à 9 pour afficher toutes les images
        const img = document.createElement('img');
        img.src = `media/${i}.png`;
        img.classList.add('victory-img');
        victoryGrid.appendChild(img);
    }
    updateCountdown(); // Call updateCountdown to initialize the countdown timer
    setInterval(updateCountdown, 1000); // Continue updating the countdown

    const backgroundMusic = document.getElementById('background-music');
    if (backgroundMusic) {
        backgroundMusic.play();
    }
}

function updateCountdown() {
    const countdownElement = document.getElementById('countdown-timer');
    const targetDate = new Date('2024-07-29T13:00:00+01:00'); // Date cible: 29 juillet 2024 à 13h00 (heure d'Alger)
    const now = new Date();

    const distance = targetDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownElement.textContent = `${days}j ${hours}h ${minutes}m ${seconds}s`;

    if (distance < 0) {
        countdownElement.textContent = "Temps écoulé";
    }
}


setInterval(updateCountdown, 1000); // Update the countdown timer every second

window.onload = function() {
    const backgroundMusic = document.getElementById('background-music');
    const toggleSoundButton = document.getElementById('toggle-sound-button');

    if (backgroundMusic) {
        backgroundMusic.play();
    }

    if (toggleSoundButton) {
        toggleSoundButton.addEventListener('click', function() {
            if (backgroundMusic.paused) {
                backgroundMusic.play();
                toggleSoundButton.textContent = 'Arrêter le son';
            } else {
                backgroundMusic.pause();
                toggleSoundButton.textContent = 'Reprendre le son';
            }
        });
    }
};
