// ============================================
//   EPIC CINEMATIC PRELOADER
// ============================================

window.addEventListener('load', function() {
    let progress = 0;
    const progressFill = document.getElementById('progress-fill');
    const progressPercent = document.getElementById('progress-percent-cinematic');
    const preloader = document.getElementById('preloader');
    
    // Все сцены
    const stages = {
        1: document.getElementById('stage-1'),
        2: document.getElementById('stage-2'),
        3: document.getElementById('stage-3'),
        4: document.getElementById('stage-4'),
        5: document.getElementById('stage-5')
    };
    
    // Показываем первую сцену
    stages[1].classList.add('active');
    
    const interval = setInterval(() => {
        if (progress < 100) {
            // Рандомный прирост для реалистичности
            const increment = Math.random() * 8 + 4;
            progress += increment;
            
            if (progress > 100) progress = 100;
            
            // Обновляем прогресс-бар
            if (progressFill) {
                progressFill.style.width = progress + '%';
            }
            progressPercent.textContent = Math.floor(progress) + '%';
            
            // Переключаем сцены по проценту загрузки
            if (progress >= 0 && progress < 20) {
                showStage(1); // Вспышка света
            } else if (progress >= 20 && progress < 40) {
                showStage(2); // Космос со звёздами
            } else if (progress >= 40 && progress < 60) {
                showStage(3); // Гиперпространство
            } else if (progress >= 60 && progress < 80) {
                showStage(4); // Планета 5Maks
            } else if (progress >= 80) {
                showStage(5); // Взрыв логотипа
            }
            
        } else {
            clearInterval(interval);
            
            // Финал — плавное исчезновение preloader
            setTimeout(() => {
                preloader.classList.add('hidden');
            }, 1500);
        }
    }, 100);
    
    function showStage(num) {
        Object.keys(stages).forEach(key => {
            stages[key].classList.remove('active');
        });
        stages[num].classList.add('active');
    }
});

// ============================================
//   ПЕРЕКЛЮЧАТЕЛЬ ТЕМЫ
// ============================================

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const icon = document.getElementById('theme-icon');
    
    if (document.body.classList.contains('dark-theme')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
}

// Загрузка сохранённой темы
window.addEventListener('DOMContentLoaded', function() {
    const savedTheme = localStorage.getItem('theme');
    const icon = document.getElementById('theme-icon');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
});

// ============================================
//   СЧЁТЧИК ПОСЕТИТЕЛЕЙ
// ============================================

function initVisitorCounter() {
    let count = localStorage.getItem('visitorCount') || 0;
    count = parseInt(count) + 1;
    localStorage.setItem('visitorCount', count);
    
    animateCounter(count);
}

function animateCounter(target) {
    const counter = document.getElementById('visitor-count');
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            counter.textContent = target;
            clearInterval(timer);
        } else {
            counter.textContent = Math.floor(current);
        }
    }, 20);
}

// Запуск счётчика
initVisitorCounter();

// ============================================
//   ДИНАМИЧЕСКИЕ СЕЗОНЫ И ВРЕМЯ СУТОК
// ============================================

function updateSeasonAndTime() {
    const now = new Date();
    const month = now.getMonth(); // 0-11
    const hour = now.getHours(); // 0-23
    
    // Определяем сезон
    let season;
    if (month >= 11 || month <= 1) {
        season = 'winter'; // Декабрь, Январь, Февраль
    } else if (month >= 2 && month <= 4) {
        season = 'spring'; // Март, Апрель, Май
    } else if (month >= 5 && month <= 7) {
        season = 'summer'; // Июнь, Июль, Август
    } else {
        season = 'autumn'; // Сентябрь, Октябрь, Ноябрь
    }
    
    // Определяем время суток
    let timeOfDay;
    if (hour >= 6 && hour < 12) {
        timeOfDay = 'morning'; // Утро 6:00-11:59
    } else if (hour >= 12 && hour < 18) {
        timeOfDay = 'day'; // День 12:00-17:59
    } else if (hour >= 18 && hour < 22) {
        timeOfDay = 'evening'; // Вечер 18:00-21:59
    } else {
        timeOfDay = 'night'; // Ночь 22:00-5:59
    }
    
    // Применяем классы к body
    document.body.className = '';
    document.body.classList.add(season, timeOfDay);
    
    // Добавляем сезонные анимации
    addSeasonalAnimations(season);
    
    // Проверяем специальные события
    checkSpecialEvents(now);
}

// ============================================
//   СЕЗОННЫЕ АНИМАЦИИ
// ============================================

function addSeasonalAnimations(season) {
    const container = document.getElementById('season-animations');
    container.innerHTML = ''; // Очищаем
    
    if (season === 'winter') {
        // Снежинки
        for (let i = 0; i < 30; i++) {
            const snowflake = document.createElement('div');
            snowflake.classList.add('snowflake');
            snowflake.textContent = '❄';
            snowflake.style.left = Math.random() * 100 + '%';
            snowflake.style.animationDuration = (Math.random() * 3 + 2) + 's';
            snowflake.style.animationDelay = Math.random() * 2 + 's';
            container.appendChild(snowflake);
        }
    } else if (season === 'spring') {
        // Лепестки
        for (let i = 0; i < 20; i++) {
            const petal = document.createElement('div');
            petal.classList.add('petal');
            petal.textContent = '🌸';
            petal.style.left = Math.random() * 100 + '%';
            petal.style.animationDuration = (Math.random() * 4 + 3) + 's';
            petal.style.animationDelay = Math.random() * 2 + 's';
            container.appendChild(petal);
        }
    } else if (season === 'summer') {
        // Световые частицы
        for (let i = 0; i < 25; i++) {
            const particle = document.createElement('div');
            particle.classList.add('light-particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 5 + 3) + 's';
            particle.style.animationDelay = Math.random() * 3 + 's';
            container.appendChild(particle);
        }
    } else if (season === 'autumn') {
        // Листья
        for (let i = 0; i < 25; i++) {
            const leaf = document.createElement('div');
            leaf.classList.add('leaf');
            const leafTypes = ['🍂', '🍁', '🍃'];
            leaf.textContent = leafTypes[Math.floor(Math.random() * leafTypes.length)];
            leaf.style.left = Math.random() * 100 + '%';
            leaf.style.animationDuration = (Math.random() * 4 + 3) + 's';
            leaf.style.animationDelay = Math.random() * 2 + 's';
            container.appendChild(leaf);
        }
    }
}

// ============================================
//   СПЕЦИАЛЬНЫЕ СОБЫТИЯ
// ============================================

function checkSpecialEvents(now) {
    const month = now.getMonth() + 1; // 1-12
    const day = now.getDate();
    
    // Новый Год (31 декабря - 7 января)
    if ((month === 12 && day >= 31) || (month === 1 && day <= 7)) {
        document.body.classList.add('special-newyear');
    }
    
    // Хэллоуин (31 октября)
    if (month === 10 && day === 31) {
        document.body.classList.add('special-halloween');
    }
    
    // День Святого Валентина (14 февраля)
    if (month === 2 && day === 14) {
        document.body.classList.add('special-valentine');
    }
    
    // День Рождения (установи свою дату!)
    // Пример: 15 марта
    if (month === 3 && day === 15) {
        document.body.classList.add('special-birthday');
    }
}

// ============================================
//   ТАЙМЕР ОБРАТНОГО ОТСЧЁТА
// ============================================

function initCountdown() {
    // Дата запуска (измени на свою!)
    const launchDate = new Date('2025-12-31T23:59:59').getTime();
    
    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = launchDate - now;
        
        if (distance < 0) {
            clearInterval(timer);
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
    }, 1000);
}

// ============================================
//   ИНИЦИАЛИЗАЦИЯ
// ============================================

window.addEventListener('DOMContentLoaded', function() {
    updateSeasonAndTime();
    initCountdown();
    
    // Обновляем сезон каждый час
    setInterval(updateSeasonAndTime, 3600000);
});
