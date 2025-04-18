const players = []; // Lege array voor spelers

const playerFiles = {
    AZ: [
        "az-alexandrepenetra.jpeg",
        "az-berkhout.jpeg",
        "az-brunomartinsindi.jpeg",
        "az-dekker.jpeg",
        "az-dewit.jpeg",
        "az-dijkstra.jpeg",
        "az-ernestpoku.jpeg",
        "az-jaydenaddai.jpeg",
        "az-kasius.jpeg",
        "az-maikuma.jpeg",
        "az-mollerwolfe.jpeg",
        "az-rubenvanbommel.jpeg",
        "az-troyparrot.jpeg",
        "az-woutergoes.jpeg"
    ],
    Ajax: [
        "ajax-axceldongen.jpeg",
        "ajax-baas.jpeg",
        "ajax-berghuis.jpeg",
        "ajax-bertrandtraore.jpeg",
        "ajax-boomen.jpeg",
        "ajax-bounida.jpeg",
        "ajax-brianbrobbey.jpeg",
        "ajax-charliesetford.jpeg",
        "ajax-coachfaroli.jpeg",
        "ajax-danielerugani.jpeg",
        "ajax-diesjanse.jpeg",
        "ajax-edvardsen.jpeg",
        "ajax-faberski.jpeg",
        "ajax-fitzjim.jpeg",
        "ajax-gaaei.jpeg",
        "ajax-godts.jpeg",
        "ajax-gorter.jpeg",
        "ajax-hato.jpeg",
        "ajax-jordanhenderson.jpeg",
        "ajax-kaplan.jpeg",
        "ajax-konadu.jpeg",
        "ajax-matheus.jpeg",
        "ajax-mokio.jpeg",
        "ajax-owenwijndal.jpeg",
        "ajax-rasmussen.jpeg",
        "ajax-remkopasveer.jpeg",
        "ajax-rijkhoff.jpeg",
        "ajax-rosa.jpeg",
        "ajax-steur.jpeg",
        "ajax-sutalo.jpeg",
        "ajax-taylor.jpeg",
        "ajax-ugwu.jpeg",
        "ajax-verschuren.jpeg",
        "ajax-woutweghorst.jpeg"
    ],
    Feyenoord: [
        "Feyenoord-QuintenTimber.jpeg",
        "Feyenoord-SantiagoGimenez.jpeg",
        "Feyenoord-DavyKlaassen.jpeg"
    ],
    PSV: [
        "PSV-JohanBakayoko.jpeg",
        "PSV-LuukDeJong.jpeg"
    ],
    Twente: [
        "Twente-MichelVlap.jpeg",
        "Twente-ManfredUgalde.jpeg"
    ],
    Utrecht: [
        "Utrecht-BartoszBrzeczek.jpeg",
        "Utrecht-AnastasiosDouvikas.jpeg"
    ],
    Heerenveen: [
        "Heerenveen-SybVanOttele.jpeg",
        "Heerenveen-ThomHaye.jpeg"
    ],
    Groningen: [
        "GRO-Bacuna.png",
        "GRO-Baron.png",
        "GRO-Blokzijl.png",
        "GRO-Bouland.png",
        "GRO-DeJonge.png",
        "GRO-Ekdal.png",
        "GRO-Emeran.png",
        "GRO-Jurjus.png",
        "GRO-Kwakman.png",
        "GRO-Lukkien.png",
        "GRO-Mariani.png",
        "GRO-Meijster.png",
        "GRO-Oosting.png",
        "GRO-Peersman.png",
        "GRO-Postema.png",
        "GRO-Prins.png",
        "GRO-Rente.png",
        "GRO-Resink.png",
        "GRO-RuiMendes.png",
        "GRO-Schreuders.png",
        "GRO-Seuntjens.png",
        "GRO-Stam.png",
        "GRO-Turay.png",
        "GRO-Vaessen.png",
        "GRO-Valente.png",
        "GRO-VanBergen.png",
        "GRO-Werff.png",
        "GRO-Willumsson.png"
    ],
    Almere: [
        "ALM-Akujobi.png",
        "ALM-AlexBalboa.png",
        "ALM-AlexCarbonell.png",
        "ALM-Bakker.png",
        "ALM-Barbet.png",
        "ALM-Beaumont.png",
        "ALM-CoachRijsdijk.png",
        "ALM-Dors.png",
        "ALM-Foasam.png",
        "ALM-Guillaume.png",
        "ALM-Hansen.png",
        "ALM-Jacobs.png",
        "ALM-JonasWendlinger.png",
        "ALM-keller.png",
        "ALM-Kuiper.png",
        "ALM-Mamengi.png",
        "ALM-Mattoir.png",
        "ALM-Nalic.png",
        "ALM-Poku.png",
        "ALM-Puriel.png",
        "ALM-RitmeesterVanDeKamp.png",
        "ALM-robinet.png",
        "ALM-VanDerWilt.png",
        "ALM-Visus.png",
        "ALM-Zagaritis.png",
        "ALM_Brym.png",
        "ALM_Dankerlui.png",
        "ALM_Haye.png",
        "ALM_Jasmin.png",
        "ALM_Kadile.png",
        "ALM_Lawrence.png",
        "ALM_Martins.png",
        "ALM_Providence.png",
        "ALM_Receveur.png",
        "ALM_Tahiri.png"
    ]
    // Voeg meer clubs en spelers toe op dezelfde manier...
};

// Google Sheets API configuratie
const SPREADSHEET_ID = '19anq-tNavonJtdRdkFKLFxFNYHABHmItjiTddNMJr0Q';
const API_KEY = 'AIzaSyBF-mVtqQLw-YcpQUmCw1PhHw4KXya_g24';
const SHEET_NAME = 'Spelers';
const GITHUB_PAGES_URL = 'https://jerrygits.github.io/KoppenKennis2/images';

// Functie om spelers op te halen uit Google Sheets
async function loadPlayers() {
    const clubSelect = document.getElementById('club');
    const club = clubSelect.value;
    const nameModeButton = document.getElementById('nameModeButton');
    const photoModeButton = document.getElementById('photoModeButton');
    const allPlayersButton = document.getElementById('allPlayersButton');
    const gameModes = document.getElementById('gameModes');

    // Reset de game area en verberg de knoppen
    document.getElementById('gameArea').innerHTML = '';
    document.getElementById('result').classList.add('hidden');
    hideNextButton();

    if (!club) {
        showEredivisieLogo();
        gameModes.classList.add('hidden');
        return;
    }

    try {
        // Haal de data op uit Google Sheets
        const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`);
        const data = await response.json();
        
        // Verwerk de data
        const rows = data.values;
        const headers = rows[0];
        
        const columnIndex = {
            voornaam: headers.indexOf('Voornaam'),
            achternaam: headers.indexOf('Achternaam'),
            club: headers.indexOf('Club'),
            bestandsnaam: headers.indexOf('Bestandsnaam'),
            rugnummer: headers.indexOf('Rugnummer'),
            positie: headers.indexOf('Positie'),
            geboortedatum: headers.indexOf('Geboortedatum')
        };

        // Filter spelers op club en maak player objecten
        players.length = 0;
        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            if (row[columnIndex.club] === club) {
                const bestandsnaam = row[columnIndex.bestandsnaam];
                players.push({
                    name: `${row[columnIndex.voornaam]} ${row[columnIndex.achternaam]}`,
                    image: `${GITHUB_PAGES_URL}/${club.toLowerCase()}/${bestandsnaam}`,
                    rugnummer: row[columnIndex.rugnummer],
                    positie: row[columnIndex.positie],
                    geboortedatum: row[columnIndex.geboortedatum]
                });
            }
        }

        const hasPlayers = players.length > 0;
        
        if (hasPlayers) {
            gameModes.classList.remove('hidden');
            nameModeButton.disabled = false;
            photoModeButton.disabled = false;
            allPlayersButton.disabled = false;
            showClubWelcome(club);
        } else {
            gameModes.classList.add('hidden');
            nameModeButton.disabled = true;
            photoModeButton.disabled = true;
            allPlayersButton.disabled = true;
            showEredivisieLogo();
        }
    } catch (error) {
        console.error('Fout bij het ophalen van de data:', error);
        showEredivisieLogo();
    }
}

function showClubWelcome(club) {
    const gameArea = document.getElementById('gameArea');
    gameArea.innerHTML = `
        <div class="welcome-screen">
            <h2>Welkom bij ${club}</h2>
            <p class="welcome-text">Kies een spelmodus om te beginnen!</p>
        </div>
    `;
    hideNextButton();
}

// Roep de loadPlayers functie aan om de spelers te laden
loadPlayers();

// Toon het Eredivisie-logo bij het laden van de pagina
showEredivisieLogo();

let currentPlayer;
let currentMode;

function showEredivisieLogo() {
    const gameArea = document.getElementById('gameArea');
    gameArea.innerHTML = `
        <div class="welcome-screen">
            <img src="images/logos/eredivisie-logo.png" alt="Eredivisie Logo" class="eredivisie-logo">
            <p class="welcome-text">Selecteer een club om te beginnen!</p>
        </div>
    `;
    hideNextButton();
}

function startNameMode() {
    const nameModeButton = document.getElementById('nameModeButton');
    if (nameModeButton.disabled) return;
    
    currentMode = 'name';
    document.querySelector('.game-content').classList.remove('photo-mode');
    showRandomPlayer();
}

function startPhotoMode() {
    const photoModeButton = document.getElementById('photoModeButton');
    if (photoModeButton.disabled) return;
    
    currentMode = 'photo';
    document.querySelector('.game-content').classList.add('photo-mode');
    showRandomName();
}

function showRandomPlayer() {
    const gameArea = document.getElementById('gameArea');
    currentPlayer = players[Math.floor(Math.random() * players.length)];
    
    // Maak een lijst van 6 willekeurige spelers, inclusief de huidige speler
    let options = [currentPlayer];
    while (options.length < 6) {
        let randomPlayer = players[Math.floor(Math.random() * players.length)];
        if (!options.some(p => p.name === randomPlayer.name)) {
            options.push(randomPlayer);
        }
    }
    options = shuffleArray(options);
    
    gameArea.innerHTML = `
        <div class="game-question">
            <h2 class="question-title">Wie is dit?</h2>
            <img src="${currentPlayer.image}" alt="Voetballer" class="player-photo">
            <div id="result" class="hidden"></div>
        </div>
    `;
    
    // Verplaats de namenlijst naar het rechter paneel
    const rightPanel = document.querySelector('.game-right-panel');
    rightPanel.innerHTML = `
        <div class="name-options">
            ${options.map(player => `
                <div class="name-option" onclick="checkNameGuess('${player.name}')">
                    ${player.name}
                </div>
            `).join('')}
        </div>
        <button id="nextButton" onclick="nextQuestion()">Volgende Vraag</button>
    `;
}

function showRandomName() {
    const gameArea = document.getElementById('gameArea');
    currentPlayer = players[Math.floor(Math.random() * players.length)];
    
    let options = getRandomOptions(currentPlayer);
    
    gameArea.innerHTML = `
        <div>
            <h2 class="question-title">
                <span>Wie van deze 4 spelers is</span>
                <span>${currentPlayer.name}?</span>
            </h2>
        <div class="photo-grid">
            ${options.map(player => `
                <div class="photo-option" onclick="checkPhotoGuess('${player.name}')">
                    <img src="${player.image}" alt="Voetballer">
                </div>
            `).join('')}
        </div>
        </div>
    `;
    
    // Verplaats het resultaat en de volgende knop naar het rechter paneel
    const rightPanel = document.querySelector('.game-right-panel');
    rightPanel.innerHTML = `
        <div id="result-container"></div>
        <button id="nextButton" class="hidden" onclick="nextQuestion()">Volgende Vraag</button>
    `;
    
    hideNextButton();
}

function checkNameGuess(guessedName) {
    const isCorrect = guessedName === currentPlayer.name;
    const result = document.getElementById('result');
    result.className = isCorrect ? 'correct' : 'incorrect';
    result.textContent = isCorrect ? 'Correct!' : 'Helaas, probeer nog eens!';
    result.classList.remove('hidden');
    result.style.display = 'block';
    
    // Speel geluidseffect af
    const sound = isCorrect ? document.getElementById('correctSound') : document.getElementById('incorrectSound');
    sound.currentTime = 0; // Reset het geluid naar het begin
    sound.play();
}

function checkPhotoGuess(guessedName) {
    const isCorrect = guessedName === currentPlayer.name;
    
    // Toon het resultaat in het rechter paneel
    const resultContainer = document.getElementById('result-container');
    resultContainer.innerHTML = `
        <div class="${isCorrect ? 'correct' : 'incorrect'}">
            ${isCorrect ? 'Correct!' : 'Helaas, probeer nog eens!'}
        </div>
    `;
    
    // Speel geluidseffect af
    const sound = isCorrect ? document.getElementById('correctSound') : document.getElementById('incorrectSound');
    sound.currentTime = 0; // Reset het geluid naar het begin
    sound.play();
    
    showNextButton();
}

function showResult(isCorrect) {
    const result = document.getElementById('result');
    result.className = isCorrect ? 'correct' : 'incorrect';
    result.textContent = isCorrect ? 'Correct!' : 'Helaas, probeer nog eens!';
    result.classList.remove('hidden');
    result.style.display = 'block';
    
    showNextButton();
}

function showNextButton() {
    const nextButton = document.getElementById('nextButton');
    if (nextButton) {
        nextButton.classList.remove('hidden');
        nextButton.style.display = 'block';
    }
}

function hideNextButton() {
    const nextButton = document.getElementById('nextButton');
    if (nextButton) {
        nextButton.classList.add('hidden');
        nextButton.style.display = 'none';
    }
}

function nextQuestion() {
    const result = document.getElementById('result');
    if (result) {
        result.classList.add('hidden');
    }
    hideNextButton();
    if (currentMode === 'name') {
        showRandomPlayer();
    } else {
        showRandomName();
    }
}

function getRandomOptions(correctPlayer) {
    let options = [correctPlayer];
    while (options.length < 4) {
        let randomPlayer = players[Math.floor(Math.random() * players.length)];
        if (!options.includes(randomPlayer)) {
            options.push(randomPlayer);
        }
    }
    return shuffleArray(options);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
} 

function parsePlayerName(filename) {
    // Verwijder de extensie en club prefix
    const namePart = filename.split('.')[0].split('-')[1];
    
    // Splits de naam op basis van hoofdletters
    const words = namePart.split(/(?=[A-Z])/);
    
    // Verwerk speciale gevallen
    if (words.length === 1) {
        // Als er maar één woord is, maak de eerste letter hoofdletter
        return words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();
    }
    
    // Verwerk dubbele achternamen (bijv. VanBommel)
    const processedWords = words.map((word, index) => {
        // Als het woord begint met 'Van', 'De', 'Der', 'Den', etc.
        if (word.toLowerCase().startsWith('van') || 
            word.toLowerCase().startsWith('de') || 
            word.toLowerCase().startsWith('der') || 
            word.toLowerCase().startsWith('den')) {
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }
        // Voor andere woorden
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
    
    return processedWords.join(' ');
}

function showAllPlayers() {
    const allPlayersButton = document.getElementById('allPlayersButton');
    if (allPlayersButton.disabled) return;

    // Maak het rechter paneel leeg
    const rightPanel = document.querySelector('.game-right-panel');
    rightPanel.innerHTML = '';

    const gameArea = document.getElementById('gameArea');
    gameArea.innerHTML = `
        <div class="player-gallery">
            ${players.map(player => `
                <div class="player-gallery-item" onclick="showPlayerDetail('${player.name}', '${player.image}')">
                    <img src="${player.image}" alt="${player.name}">
                    <p>${player.name}</p>
                </div>
            `).join('')}
        </div>
    `;
}

function showPlayerDetail(name, image) {
    const currentIndex = players.findIndex(player => player.name === name);
    
    const overlay = document.createElement('div');
    overlay.className = 'player-overlay';
    overlay.innerHTML = `
        <div class="player-overlay-content">
            <button class="close-overlay" onclick="closePlayerDetail()">×</button>
            <button class="nav-arrow prev" onclick="navigatePlayer(-1)">←</button>
            <img src="${image}" alt="${name}">
            <button class="nav-arrow next" onclick="navigatePlayer(1)">→</button>
            <h3>${name}</h3>
        </div>
    `;
    document.body.appendChild(overlay);

    // Voeg keyboard event listener toe
    document.addEventListener('keydown', handleKeyDown);
}

function closePlayerDetail() {
    const overlay = document.querySelector('.player-overlay');
    if (overlay) {
        overlay.remove();
        // Verwijder keyboard event listener
        document.removeEventListener('keydown', handleKeyDown);
    }
}

function navigatePlayer(direction) {
    const currentName = document.querySelector('.player-overlay-content h3').textContent;
    const currentIndex = players.findIndex(player => player.name === currentName);
    const newIndex = (currentIndex + direction + players.length) % players.length;
    
    // Verwijder huidige overlay
    closePlayerDetail();
    
    // Toon nieuwe speler
    showPlayerDetail(players[newIndex].name, players[newIndex].image);
}

function handleKeyDown(event) {
    if (event.key === 'ArrowLeft') {
        navigatePlayer(-1);
    } else if (event.key === 'ArrowRight') {
        navigatePlayer(1);
    } else if (event.key === 'Escape') {
        closePlayerDetail();
    }
}
