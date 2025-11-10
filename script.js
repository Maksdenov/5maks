// Preloader с прогресс-баром (0-100%)
window.addEventListener('load', function() {
    let progress = 0;
    const progressBar = document.getElementById('progress-bar');
    const progressPercent = document.getElementById('progress-percent');
    const preloader = document.getElementById('preloader');
    
    // Симуляция загрузки с реалистичным прогрессом
    const interval = setInterval(() => {
        if (progress < 100) {
            // Увеличиваем прогресс с разной скоростью для реалистичности
            const increment = Math.random() * 15 + 5; // От 5 до 20
            progress += increment;
            
            if (progress > 100) progress = 100;
            
            progressBar.style.width = progress + '%';
            progressPercent.textContent = Math.floor(progress);
        } else {
            clearInterval(interval);
            
            // Скрываем preloader после завершения
            setTimeout(() => {
                preloader.classList.add('hidden');
            }, 300);
        }
    }, 100); // Обновление каждые 100ms
});

document.addEventListener('DOMContentLoaded', function() {
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
    
    // Анимация счётчика
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
