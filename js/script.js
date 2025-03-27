const startTimerFirst = () => {
    let timerElement = document.getElementById('timer1');
    let firstScreen = document.getElementById('first-screen');
    let secondScreen = document.getElementById('main-screen');
    let timeLeft = 5;

    let countdown = setInterval(() => {
        if (timeLeft > 0) {
            timerElement.textContent = timeLeft;
        } else if (timeLeft === 0) {
            timerElement.textContent = 'Blocks Lab';
        } else {
            clearInterval(countdown);
            firstScreen.style.display = 'none';
            secondScreen.style.display = 'inherit';
            startCountdown();
            initializeObjects();
            setInterval(moveObjects, 20);
        }
        timeLeft--;
    }, 1000);
};

startTimerFirst();




const surface = document.getElementById('surface');
const objectList = document.getElementById('object-list');
const createButton = document.getElementById('create-button');
const colorPicker = document.getElementById('color');
const yourObjectSection = document.getElementById('your-object');
const yourObjectName = document.getElementById('your-object-name');
const yourObjectHealth = document.getElementById('your-object-health');

const createBox = document.getElementById('create-object');
const afterCreateBox = document.getElementById('after-create-object');

let objects = [];

function createObject(name, health, color, isUserObject = false) {
    const obj = {
        name,
        health,
        color,
        x: Math.random() * (surface.clientWidth - 30),
        y: Math.random() * (surface.clientHeight - 30),
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2
    };

    objects.push(obj);
    updateObjectList();
    renderObject(obj, isUserObject);
}

function renderObject(obj, isUserObject = false) {
    const div = document.createElement('div');
    div.className = 'object';
    div.style.backgroundColor = obj.color;
    div.style.left = `${obj.x}px`;
    div.style.top = `${obj.y}px`;

    const nameTag = document.createElement('div');
    nameTag.style.position = 'absolute';
    nameTag.style.bottom = '100%';
    if (isUserObject) {
        nameTag.style.color = '#c9e60d';
    }
    else {
        nameTag.style.color = '#fff';
    }

    nameTag.style.fontSize = '10px';
    nameTag.textContent = obj.name;
    div.appendChild(nameTag);

    surface.appendChild(div);
    obj.element = div;
}

function updateObjectList() {
    objectList.innerHTML = '';
    objects.forEach(obj => {
        // const p = document.createElement('p');
        // p.textContent = `${obj.name} - Health: ${obj.health} - Type: Random`;
        // objectList.appendChild(p);

        const objectContainer = document.createElement('div');

        objectContainer.className = 'object-container';

        objectContainer.innerHTML = `
        <p id="object-name" class="object-name">
            ${obj.name}
        </p>
        <div class="object-health-block">
            <p>Health:</p>
            <div class="object-health-info">
                <p id="object-health" class="object-health">
                    ${obj.health}%
                </p>
                <img src="./pixel_heart.png" alt="" class="heart-icon">
            </div>
        </div>
        <p id="object-type" class="object-type">
            Venom
        </p>
        `;
        objectList.appendChild(objectContainer);
    });

    objectList.scrollTop = objectList.scrollHeight;
}

function moveObjects() {
    objects.forEach(obj => {
        obj.x += obj.vx;
        obj.y += obj.vy;

        if (obj.x <= 0 || obj.x >= surface.clientWidth - 30) obj.vx *= -1;
        if (obj.y <= 0 || obj.y >= surface.clientHeight - 30) obj.vy *= -1;

        obj.element.style.left = `${obj.x}px`;
        obj.element.style.top = `${obj.y}px`;
    });
}



createButton.addEventListener('click', () => {
    const color = colorPicker.value;
    createObject('Your', 1000, color, true);
    createBox.style.display = 'none';
    afterCreateBox.style.display = 'inherit';
    createButton.style.display = 'none';
    yourObjectSection.style.display = 'block';
    yourObjectName.textContent = 'Your';
    yourObjectHealth.textContent = '1000%';
});

// Initial objects
function initializeObjects() {
    for (let i = 0; i < 3; i++) {
        createObject(`Block${i + 1}`, Math.floor(Math.random() * 901) + 100, getRandomColor());
    }
    let count = 3;
    const interval = setInterval(() => {
        if (count >= 80) {
            clearInterval(interval);
            return;
        }
        createObject(`Block${count + 1}`, Math.floor(Math.random() * 901) + 100, getRandomColor());
        count++;
    }, 1500);
}

function getRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

function startCountdown() {
    const timerElement = document.getElementById('timer');
    let timeParts = timerElement.textContent.split(':').map(Number);

    // Конвертируем время в секунды
    let totalSeconds = timeParts[0] * 3600 + timeParts[1] * 60 + timeParts[2];

    // Функция обновления таймера
    function updateTimer() {
        if (totalSeconds > 0) {
            totalSeconds--;

            // Вычисляем часы, минуты и секунды
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            // Форматируем в "HH:MM:SS"
            timerElement.textContent =
                `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        } else {
            // Останавливаем таймер, если время вышло
            clearInterval(timerInterval);
        }
    }

    // Запускаем таймер на обновление каждую секунду
    const timerInterval = setInterval(updateTimer, 1000);

    // Первоначальное обновление
    updateTimer();
}

const infoButton = document.getElementById('info-button');
const infoBox = document.getElementById('info-box');
const closeButton = document.getElementById('close-info');

infoButton.addEventListener('click', () => {
    infoBox.style.display = 'inherit';
});

closeButton.addEventListener('click', () => {
    infoBox.style.display = 'none';
});

document.getElementById('frame').addEventListener('click', async () => {
    // Проверяем, установлен ли кошелек
    if (window.solana && window.solana.isPhantom) {
        try {
            const resp = await window.solana.connect();
            console.log('Wallet connected:', resp.publicKey.toString());
        } catch (err) {
            console.error('Connection to wallet failed:', err.message);
        }
    } else {
        // Если кошелек не установлен
        window.open('https://phantom.app/', '_blank');
    }
});