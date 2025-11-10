// Определение текущего сезона и времени суток
function getSeasonAndTime() {
    const now = new Date();
    const month = now.getMonth(); // 0-11
    const hour = now.getHours(); // 0-23
    
    // Определяем сезон
    let season;
    if (month === 11 || month === 0 || month === 1) {
        season = 'winter'; // декабрь, январь, февраль
    } else if (month >= 2 && month <= 4) {
        season = 'spring'; // март, апрель, май
    } else if (month >= 5 && month <= 7) {
        season = 'summer'; // июнь, июль, август
    } else {
        season = 'autumn'; // сентябрь, октябрь, ноябрь
    }
    
    // Определяем время суток
    let timeOfDay;
    if (hour >= 6 && hour < 12) {
        timeOfDay = 'morning'; // утро: 6:00 - 11:59
    } else if (hour >= 12 && hour < 18) {
        timeOfDay = 'day'; // день: 12:00 - 17:59
    } else if (hour >= 18 && hour < 22) {
        timeOfDay = 'evening'; // вечер: 18:00 - 21:59
    } else {
        timeOfDay = 'night'; // ночь: 22:00 - 5:59
    }
    
    return { season, timeOfDay };
}

// Применяем фон на основе сезона и времени
function applySeasonalBackground() {
    const { season, timeOfDay } = getSeasonAndTime();
    const body = document.body;
    
    // Удаляем все предыдущие классы сезонов и времени
    body.classList.remove('winter', 'spring', 'summer', 'autumn', 'morning', 'day', 'evening', 'night');
    
    // Добавляем текущие классы
    body.classList.add(season, timeOfDay);
    
    console.log(`Текущий сезон: ${season}, Время суток: ${timeOfDay}`);
    
    // Запускаем соответствующую анимацию
    createSeasonalAnimation(season);
}

// Создаём анимации для каждого сезона
function createSeasonalAnimation(season) {
    const container = document.getElementById('season-animations');
    container.innerHTML = ''; // Очищаем старые анимации
    
    if (season === 'winter') {
        createSnowflakes(container);
    } else if (season === 'spring') {
        createPetals(container);
    } else if (season === 'summer') {
        createLightParticles(container);
    } else if (season === 'autumn') {
        createLeaves(container);
    }
}

// ЗИМА: Снежинки
function createSnowflakes(container) {
    const symbols = ['❅', '❆', '❄'];
    for (let i = 0; i < 30; i++) {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        snowflake.style.left = Math.random() * 100 + '%';
        snowflake.style.fontSize = (Math.random() * 1.5 + 0.8) + 'em';
        snowflake.style.animationDuration = (Math.random() * 5 + 8) + 's';
        snowflake.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(snowflake);
    }
}

// ВЕСНА: Лепестки сакуры
function createPetals(container) {
    const petals = ['🌸', '🌺', '🌼'];
    for (let i = 0; i < 25; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.textContent = petals[Math.floor(Math.random() * petals.length)];
        petal.style.left = Math.random() * 100 + '%';
        petal.style.fontSize = (Math.random() * 1 + 0.8) + 'em';
        petal.style.animationDuration = (Math.random() * 6 + 10) + 's';
        petal.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(petal);
    }
}

// ЛЕТО: Световые частицы
function createLightParticles(container) {
    for (let i = 0; i < 40; i++) {
        const particle = document.createElement('div');
        particle.className = 'light-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.bottom = '0';
        particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
        particle.style.animationDelay = Math.random() * 8 + 's';
        container.appendChild(particle);
    }
}

// ОСЕНЬ: Падающие листья
function createLeaves(container) {
    const leaves = ['🍂', '🍁'];
    for (let i = 0; i < 30; i++) {
        const leaf = document.createElement('div');
        leaf.className = 'leaf';
        leaf.textContent = leaves[Math.floor(Math.random() * leaves.length)];
        leaf.style.left = Math.random() * 100 + '%';
        leaf.style.fontSize = (Math.random() * 1.2 + 0.9) + 'em';
        leaf.style.animationDuration = (Math.random() * 6 + 8) + 's';
        leaf.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(leaf);
    }
}

// Preloader с прогресс-баром
window.addEventListener('load', function() {
    let progress = 0;
    const progressBar = document.getElementById('progress-bar');
    const progressPercent = document.getElementById('progress-percent');
    const preloader = document.getElementById('preloader');
    
    const interval = setInterval(() => {
        if (progress < 100) {
            const increment = Math.random() * 15 + 5;
            progress += increment;
            
            if (progress > 100) progress = 100;
            
            progressBar.style.width = progress + '%';
            progressPercent.textContent = Math.floor(progress);
        } else {
            clearInterval(interval);
            
            setTimeout(() => {
                preloader.classList.add('hidden');
            }, 300);
        }
    }, 100);
});

document.addEventListener('DOMContentLoaded', function() {
    // Применяем сезонный фон и анимации
    applySeasonalBackground();
    
    // Анимация появления кнопок
    const elements = document.querySelectorAll('.social-link-button');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        setTimeout(() => {
            element.style.transition = 'all 0.5s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Загрузка темы из localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        document.getElementById('theme-icon').className = 'fas fa-sun';
    }

    // Счётчик посетителей
    initVisitorCounter();
});

// Переключение темы
function toggleTheme() {
    const body = document.body;
    const icon = document.getElementById('theme-icon');
    
    body.classList.toggle('dark-theme');
    
    if (body.classList.contains('dark-theme')) {
        icon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    } else {
        icon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    }
}

// Счётчик посетителей
function initVisitorCounter() {
    let count = localStorage.getItem('visitorCount');
    
    if (!count) {
        count = 0;
    }
    
    count = parseInt(count) + 1;
    localStorage.setItem('visitorCount', count);
    
    animateCounter(count);
}

function animateCounter(target) {
    const counterElement = document.getElementById('visitor-count');
    let current = 0;
    const increment = Math.ceil(target / 50);
    const duration = 1500;
    const stepTime = duration / (target / increment);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        counterElement.textContent = current.toLocaleString();
    }, stepTime);
}

// Эффект клика для кнопок
document.querySelectorAll('.social-link-button:not(.disabled-btn)').forEach(button => {
    button.addEventListener('click', function(e) {
        this.style.transform = 'scale(0.97)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 100);
    });
});

// Таймер до 1 января 2026 года
function updateCountdown() {
    const targetDate = new Date('January 1, 2026 00:00:00').getTime();
    const now = new Date().getTime();
    const distance = targetDate - now;
    
    if (distance < 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

updateCountdown();
setInterval(updateCountdown, 1000);
