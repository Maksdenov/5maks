// ============================================
//   КОНФИГУРАЦИЯ
// ============================================

const CONFIG = {
    launchDate: '2025-12-31T23:59:59', // Дата запуска сайта
    birthdayMonth: 3,  // Месяц дня рождения (1-12)
    birthdayDay: 15,   // День рождения
    
    // Количество падающих элементов (уменьшено для производительности)
    particles: {
        winter: 20,   // Было 30
        spring: 15,   // Было 20
        summer: 15,   // Было 25
        autumn: 18    // Было 25
    },
    
    // Задержка перед стартом анимаций (мс)
    animationDelay: 500
};

// ============================================
//   EPIC CINEMATIC PRELOADER
// ============================================

window.addEventListener('load', function() {
    let progress = 0;
    const progressFill = document.getElementById('progress-fill');
    const progressPercent = document.getElementById('progress-percent-cinematic');
    const preloader = document.getElementById('preloader');
    
    const stages = {
        1: document.getElementById('stage-1'),
        2: document.getElementById('stage-2'),
        3: document.getElementById('stage-3'),
        4: document.getElementById('stage-4'),
        5: document.getElementById('stage-5')
    };
    
    // Показываем первую сцену
    stages[1]?.classList.add('active');
    
    const interval = setInterval(() => {
        if (progress < 100) {
            const increment = Math.random() * 8 + 4;
            progress += increment;
            
            if (progress > 100) progress = 100;
            
            // Обновляем прогресс-бар
            if (progressFill) {
                progressFill.style.width = progress + '%';
            }
            if (progressPercent) {
                progressPercent.textContent = Math.floor(progress) + '%';
            }
            
            // Переключаем сцены
            if (progress >= 0 && progress < 20) {
                showStage(1);
            } else if (progress >= 20 && progress < 40) {
                showStage(2);
            } else if (progress >= 40 && progress < 60) {
                showStage(3);
            } else if (progress >= 60 && progress < 80) {
                showStage(4);
            } else if (progress >= 80) {
                showStage(5);
            }
            
        } else {
            clearInterval(interval);
            
            // Финал — исчезновение
            setTimeout(() => {
                if (preloader) {
                    preloader.classList.add('hidden');
                }
            }, 1500);
        }
    }, 100);
    
    function showStage(num) {
        Object.keys(stages).forEach(key => {
            stages[key]?.classList.remove('active');
        });
        stages[num]?.classList.add('active');
    }
});

// ============================================
//   ПЕРЕКЛЮЧАТЕЛЬ ТЕМЫ
// ============================================

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const icon = document.getElementById('theme-icon');
    
    if (document.body.classList.contains('dark-theme')) {
        icon?.classList.remove('fa-moon');
        icon?.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon?.classList.remove('fa-sun');
        icon?.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
}

// ============================================
//   СЧЁТЧИК ПОСЕТИТЕЛЕЙ
// ============================================

function initVisitorCounter() {
    let count = parseInt(localStorage.getItem('visitorCount') || 0) + 1;
    localStorage.setItem('visitorCount', count);
    animateCounter(count);
}

function animateCounter(target) {
    const counter = document.getElementById('visitor-count');
    if (!counter) return;
    
    let current = 0;
    const increment = Math.max(1, target / 50);
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

// ============================================
//   ОПРЕДЕЛЕНИЕ СЕЗОНА И ВРЕМЕНИ СУТОК
// ============================================

function getCurrentSeasonAndTime() {
    const now = new Date();
    const month = now.getMonth(); // 0-11
    const hour = now.getHours(); // 0-23
    
    // Определяем сезон
    let season;
    if (month === 11 || month <= 1) {
        season = 'winter';
    } else if (month >= 2 && month <= 4) {
        season = 'spring';
    } else if (month >= 5 && month <= 7) {
        season = 'summer';
    } else {
        season = 'autumn';
    }
    
    // Определяем время суток
    let timeOfDay;
    if (hour >= 6 && hour < 12) {
        timeOfDay = 'morning';
    } else if (hour >= 12 && hour < 18) {
        timeOfDay = 'day';
    } else if (hour >= 18 && hour < 22) {
        timeOfDay = 'evening';
    } else {
        timeOfDay = 'night';
    }
    
    return { season, timeOfDay, now };
}

function updateSeasonAndTime() {
    const { season, timeOfDay, now } = getCurrentSeasonAndTime();
    
    // Применяем классы к body
    document.body.className = '';
    document.body.classList.add(season, timeOfDay);
    
    // Проверяем специальные события
    checkSpecialEvents(now);
    
    // Добавляем сезонные анимации с задержкой
    setTimeout(() => {
        addSeasonalAnimations(season);
    }, CONFIG.animationDelay);
}

// ============================================
//   СЕЗОННЫЕ АНИМАЦИИ (ОПТИМИЗИРОВАННЫЕ)
// ============================================

function addSeasonalAnimations(season) {
    const container = document.getElementById('season-animations');
    if (!container) return;
    
    container.innerHTML = ''; // Очищаем
    
    const particleCount = CONFIG.particles[season] || 20;
    const createElement = (className, emoji, duration, delay) => {
        const element = document.createElement('div');
        element.classList.add(className);
        element.textContent = emoji;
        element.style.left = Math.random() * 100 + '%';
        element.style.animationDuration = duration + 's';
        element.style.animationDelay = delay + 's';
        // Оптимизация производительности
        element.style.willChange = 'transform, opacity';
        return element;
    };
    
    switch(season) {
        case 'winter':
            for (let i = 0; i < particleCount; i++) {
                const duration = Math.random() * 5 + 8;
                const delay = Math.random() * 3;
                container.appendChild(createElement('snowflake', '❄', duration, delay));
            }
            break;
            
        case 'spring':
            for (let i = 0; i < particleCount; i++) {
                const duration = Math.random() * 6 + 8;
                const delay = Math.random() * 3;
                container.appendChild(createElement('petal', '🌸', duration, delay));
            }
            break;
            
        case 'summer':
            for (let i = 0; i < particleCount; i++) {
                const duration = Math.random() * 8 + 10;
                const delay = Math.random() * 4;
                container.appendChild(createElement('light-particle', '', duration, delay));
            }
            break;
            
        case 'autumn':
            const leafTypes = ['🍂', '🍁', '🍃'];
            for (let i = 0; i < particleCount; i++) {
                const duration = Math.random() * 6 + 10;
                const delay = Math.random() * 3;
                const emoji = leafTypes[Math.floor(Math.random() * leafTypes.length)];
                container.appendChild(createElement('leaf', emoji, duration, delay));
            }
            break;
    }
}

// ============================================
//   СПЕЦИАЛЬНЫЕ СОБЫТИЯ
// ============================================

function checkSpecialEvents(now) {
    const month = now.getMonth() + 1; // 1-12
    const day = now.getDate();
    
    // Новый Год
    if ((month === 12 && day >= 31) || (month === 1 && day <= 7)) {
        document.body.classList.add('special-newyear');
    }
    
    // Хэллоуин
    if (month === 10 && day === 31) {
        document.body.classList.add('special-halloween');
    }
    
    // День Святого Валентина
    if (month === 2 && day === 14) {
        document.body.classList.add('special-valentine');
    }
    
    // День Рождения
    if (month === CONFIG.birthdayMonth && day === CONFIG.birthdayDay) {
        document.body.classList.add('special-birthday');
    }
}

// ============================================
//   ТАЙМЕР ОБРАТНОГО ОТСЧЁТА
// ============================================

function initCountdown() {
    const launchDate = new Date(CONFIG.launchDate).getTime();
    
    const updateTimer = () => {
        const now = new Date().getTime();
        const distance = launchDate - now;
        
        const elements = {
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds')
        };
        
        if (distance < 0) {
            Object.values(elements).forEach(el => {
                if (el) el.textContent = '00';
            });
            return;
        }
        
        const time = {
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000)
        };
        
        Object.keys(time).forEach(key => {
            if (elements[key]) {
                elements[key].textContent = String(time[key]).padStart(2, '0');
            }
        });
    };
    
    updateTimer();
    setInterval(updateTimer, 1000);
}

// ============================================
//   ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ
// ============================================

window.addEventListener('DOMContentLoaded', function() {
    // Загружаем сохранённую тему
    const savedTheme = localStorage.getItem('theme');
    const icon = document.getElementById('theme-icon');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        icon?.classList.remove('fa-moon');
        icon?.classList.add('fa-sun');
    }
    
    // Запускаем все функции
    initVisitorCounter();
    updateSeasonAndTime();
    initCountdown();
    
    // Обновляем сезон каждый час
    setInterval(updateSeasonAndTime, 3600000);
});

// ============================================
//   ОПТИМИЗАЦИЯ ПРОИЗВОДИТЕЛЬНОСТИ
// ============================================

// Отключаем анимации при переключении вкладки
document.addEventListener('visibilitychange', function() {
    const container = document.getElementById('season-animations');
    if (container) {
        if (document.hidden) {
            container.style.display = 'none';
        } else {
            container.style.display = 'block';
        }
    }
});
