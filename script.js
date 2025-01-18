// Глобальные переменные и состояние
const state = {
    selectedLanguage: '',
    selectedLevel: '',
    currentQuestion: 0,
    score: 0,
    timer: null,
    timePerQuestion: 50,
    isDarkTheme: localStorage.getItem('theme') === 'dark',
    hintsAvailable: 3,
    xpBoosterActive: false,
    coins: parseInt(localStorage.getItem('coins')) || 0,
    dailyTasks: [
    { description: "Пройти 5 вопросов", target: 5, progress: 0, reward: 10 },
    { description: "Заработать 20 XP", target: 20, progress: 0, reward: 15 },
    { description: "Использовать подсказку", target: 1, progress: 0, reward: 5 }
    ],
    userProfile: {
        level: parseInt(localStorage.getItem('userLevel')) || 1,
        xp: parseInt(localStorage.getItem('userXP')) || 0,
        totalQuestions: parseInt(localStorage.getItem('totalQuestions')) || 0,
        correctAnswers: parseInt(localStorage.getItem('correctAnswers')) || 0,
        achievements: JSON.parse(localStorage.getItem('achievements')) || []
    },
    xpToNextLevel: 100,
    hints: {
        regular: 3,
        fiftyFifty: 2,
        skipQuestion: 1,
        extraTime: 3
    },
    achievements: [
        { id: 'first_win', name: 'Первая победа', description: 'Ответьте правильно на первый вопрос', icon: '🎯' },
        { id: 'perfect_score', name: 'Идеальный результат', description: 'Получите 100% за тест', icon: '🏆' },
        { id: 'speed_demon', name: 'Быстрый как молния', description: 'Ответьте на вопрос за 5 секунд', icon: '⚡' },
        { id: 'rich_student', name: 'Богатый студент', description: 'Накопите 1000 монет', icon: '💰' },
        { id: 'speed_master', name: 'Мастер скорости', description: 'Ответьте на все вопросы за половину времени', icon: '⚡' },
        { id: 'daily_hero', name: 'Ежедневный герой', description: 'Выполните все ежедневные задания', icon: '🌟' },
        { id: 'hint_master', name: 'Мастер подсказок', description: 'Используйте все типы подсказок', icon: '💡' }
    ]
};

// База вопросов
const questions = {
    english: {
        A1: [
            {
                type: "multiple-choice",
                question: "Как сказать 'яблоко' на английском?",
                answers: ["apple", "banana", "orange", "grape"],
                correct: 1
            },
            {
                type: "multiple-choice",
                question: "Как сказать 'книга' на английском?",
                answers: ["book", "pen", "desk", "chair"],
                correct: 1
            },
            {
                type: "grammar",
                question: "Исправьте ошибку: 'She go to school.'",
                correctAnswer: "She goes to school."
            },
            {
                type: "multiple-choice",
                question: "Как сказать 'собака' на английском?",
                answers: ["dog", "cat", "bird", "fish"],
                correct: 1
            },
            {
                type: "multiple-choice",
                question: "Как сказать 'дом' на английском?",
                answers: ["house", "apartment", "building", "room"],
                correct: 1
            }
        ],
        A2: [
            {
                type: "multiple-choice",
                question: "Как сказать 'завтрак' на английском?",
                answers: ["breakfast", "lunch", "dinner", "snack"],
                correct: 1
            },
            {
                type: "grammar",
                question: "Исправьте ошибку: 'I am go to the park.'",
                correctAnswer: "I am going to the park."
            },
            {
                type: "multiple-choice",
                question: "Как сказать 'погода' на английском?",
                answers: ["weather", "season", "temperature", "climate"],
                correct: 1
            },
            {
                type: "grammar",
                question: "Исправьте ошибку: 'She don't like coffee.'",
                correctAnswer: "She doesn't like coffee."
            },
            {
                type: "multiple-choice",
                question: "Как сказать 'работа' на английском?",
                answers: ["job", "work", "office", "career"],
                correct: 2
            }
        ],
        B1: [
            {
                type: "multiple-choice",
                question: "Выбери правильную форму: 'I ___ (to live) in London for 5 years.'",
                answers: ["have lived", "lived", "had lived"],
                correct: 1
            },
            {
                type: "grammar",
                question: "Исправьте ошибку: 'If I was you, I would go.'",
                correctAnswer: "If I were you, I would go."
            },
            {
                type: "multiple-choice",
                question: "Выбери правильную форму: 'By the time we arrived, the movie ___ (to start).'",
                answers: ["had started", "started", "has started"],
                correct: 1
            },
            {
                type: "multiple-choice",
                question: "Выбери правильную форму: 'She ___ (to live) here since 2010.'",
                answers: ["has lived", "lived", "had lived"],
                correct: 1
            },
            {
                type: "grammar",
                question: "Исправьте ошибку: 'The book was wrote by him.'",
                correctAnswer: "The book was written by him."
            }
        ],
        B2: [
            {
                type: "multiple-choice",
                question: "Выбери правильную форму: 'I wish I ___ (to be) there yesterday.'",
                answers: ["was", "were", "had been"],
                correct: 3
            },
            {
                type: "grammar",
                question: "Исправьте ошибку: 'He said he will come tomorrow.'",
                correctAnswer: "He said he would come tomorrow."
            },
            {
                type: "multiple-choice",
                question: "Выбери правильную форму: 'This is the best movie I ___ (to see).'",
                answers: ["have ever seen", "had ever seen", "saw"],
                correct: 1
            },
            {
                type: "grammar",
                question: "Исправьте ошибку: 'She has been working here since 5 years.'",
                correctAnswer: "She has been working here for 5 years."
            },
            {
                type: "multiple-choice",
                question: "Выбери правильную форму: 'If he ___ (to call), tell him I'm busy.'",
                answers: ["calls", "will call", "called"],
                correct: 1
            }
        ],
        C1: [
            {
                type: "multiple-choice",
                question: "Выбери правильную форму: 'If I ___ (to know), I would tell you.'",
                answers: ["knew", "know", "had known"],
                correct: 1
            },
            {
                type: "grammar",
                question: "Исправьте ошибку: 'If I was you, I would go.'",
                correctAnswer: "If I were you, I would go."
            },
            {
                type: "multiple-choice",
                question: "Выбери правильную форму: 'By the time we arrived, the movie ___ (to start).'",
                answers: ["had started", "started", "has started"],
                correct: 1
            },
            {
                type: "multiple-choice",
                question: "Выбери правильную форму: 'She ___ (to live) here since 2010.'",
                answers: ["has lived", "lived", "had lived"],
                correct: 1
            },
            {
                type: "grammar",
                question: "Исправьте ошибку: 'The book was wrote by him.'",
                correctAnswer: "The book was written by him."
            }
        ],
        C2: [
            {
                type: "multiple-choice",
                question: "Выбери правильную форму: 'Had I known, I ___ (to tell) you.'",
                answers: ["would have told", "would tell", "told"],
                correct: 1
            },
            {
                type: "grammar",
                question: "Исправьте ошибку: 'The meeting was hold in the main hall.'",
                correctAnswer: "The meeting was held in the main hall."
            },
            {
                type: "multiple-choice",
                question: "Выбери правильную форму: 'No sooner ___ (to arrive) than the meeting started.'",
                answers: ["had I arrived", "I arrived", "did I arrive"],
                correct: 1
            },
            {
                type: "grammar",
                question: "Исправьте ошибку: 'He speaks English as if he is a native speaker.'",
                correctAnswer: "He speaks English as if he were a native speaker."
            },
            {
                type: "multiple-choice",
                question: "Выбери правильную форму: 'Hardly ___ (to finish) the report when the boss called.'",
                answers: ["had I finished", "I finished", "did I finish"],
                correct: 1
            }
        ]
    },
    bulgarian: {
        A1: [
            {
                type: "multiple-choice",
                question: "Как сказать 'яблоко' на болгарском?",
                answers: ["ябълка", "круша", "слива", "праскова"],
                correct: 1
            },
            {
                type: "multiple-choice",
                question: "Как сказать 'книга' на болгарском?",
                answers: ["книга", "молив", "стол", "столче"],
                correct: 1
            },
            {
                type: "grammar",
                question: "Исправьте ошибку: 'Той отиде на училище.'",
                correctAnswer: "Той отива на училище."
            },
            {
                type: "multiple-choice",
                question: "Как сказать 'дом' на болгарском?",
                answers: ["къща", "апартамент", "сграда", "стая"],
                correct: 1
            },
            {
                type: "multiple-choice",
                question: "Как сказать 'машина' на болгарском?",
                answers: ["кола", "автобус", "влак", "колело"],
                correct: 1
            }
        ],
        A2: [
            {
                type: "multiple-choice",
                question: "Как сказать 'завтрак' на болгарском?",
                answers: ["закуска", "обяд", "вечеря", "мезе"],
                correct: 1
            },
            {
                type: "grammar",
                question: "Исправьте ошибку: 'Тя отиде на работа.'",
                correctAnswer: "Тя отива на работа."
            },
            {
                type: "multiple-choice",
                question: "Как сказать 'погода' на болгарском?",
                answers: ["време", "сезон", "температура", "климат"],
                correct: 1
            },
            {
                type: "grammar",
                question: "Исправьте ошибку: 'Те не харесва кафе.'",
                correctAnswer: "Те не харесват кафе."
            },
            {
                type: "multiple-choice",
                question: "Как сказать 'работа' на болгарском?",
                answers: ["работа", "длъжност", "офис", "кариера"],
                correct: 1
            }
        ],
        B1: [
            {
                type: "multiple-choice",
                question: "Выбери правильную форму: 'Ако аз ___ (знаех), щях да ти кажа.'",
                answers: ["знаех", "знаеше", "знаел"],
                correct: 2
            },
            {
                type: "grammar",
                question: "Исправьте ошибку: 'Ако бях ти, щях да отида.'",
                correctAnswer: "Ако бях ти, щях да отида."
            },
            {
                type: "multiple-choice",
                question: "Выбери правильную форму: 'Когато той дойде, аз ___ (вече да съм излязъл).'",
                answers: ["вече бях излязъл", "вече съм излязъл", "вече щях да съм излязъл"],
                correct: 1
            },
            {
                type: "grammar",
                question: "Исправьте ошибку: 'Тя каза, че ще дойде утре.'",
                correctAnswer: "Тя каза, че ще дойде утре."
            },
            {
                type: "multiple-choice",
                question: "Выбери правильную форму: 'Това е най-добрият филм, който ___ (виждам).'",
                answers: ["съм виждал", "бях виждал", "видях"],
                correct: 1
            }
        ],
        B2: [
            {
                type: "multiple-choice",
                question: "Выбери правильную форму: 'Ако той ___ (се обади), кажи му, че съм зает.'",
                answers: ["се обади", "ще се обади", "се обаждаше"],
                correct: 1
            },
            {
                type: "grammar",
                question: "Исправьте ошибку: 'Той работи тук от 5 години.'",
                correctAnswer: "Той работи тук от 5 години."
            },
            {
                type: "multiple-choice",
                question: "Выбери правильную форму: 'Това е най-добрият филм, който ___ (виждам).'",
                answers: ["съм виждал", "бях виждал", "видях"],
                correct: 1
            },
            {
                type: "grammar",
                question: "Исправьте ошибку: 'Тя каза, че ще дойде утре.'",
                correctAnswer: "Тя каза, че ще дойде утре."
            },
            {
                type: "multiple-choice",
                question: "Выбери правильную форму: 'Ако той ___ (се обади), кажи му, че съм зает.'",
                answers: ["се обади", "ще се обади", "се обаждаше"],
                correct: 1
            }
        ],
        C1: [
            {
                type: "multiple-choice",
                question: "Выбери правильную форму: 'Ако аз ___ (знаех), щях да ти кажа.'",
                answers: ["знаех", "знаеше", "знаел"],
                correct: 2
            },
            {
                type: "grammar",
                question: "Исправьте ошибку: 'Ако бях ти, щях да отида.'",
                correctAnswer: "Ако бях ти, щях да отида."
            },
            {
                type: "multiple-choice",
                question: "Выбери правильную форму: 'Когато той дойде, аз ___ (вече да съм излязъл).'",
                answers: ["вече бях излязъл", "вече съм излязъл", "вече щях да съм излязъл"],
                correct: 1
            },
            {
                type: "grammar",
                question: "Исправьте ошибку: 'Тя каза, че ще дойде утре.'",
                correctAnswer: "Тя каза, че ще дойде утре."
            },
            {
                type: "multiple-choice",
                question: "Выбери правильную форму: 'Това е най-добрият филм, който ___ (виждам).'",
                answers: ["съм виждал", "бях виждал", "видях"],
                correct: 1
            }
        ],
        C2: [
            {
                type: "multiple-choice",
                question: "Выбери правильную форму: 'Ако бях знаел, щях да ти ___ (кажа).'",
                answers: ["кажа", "кажех", "бях казал"],
                correct: 3
            },
            {
                type: "grammar",
                question: "Исправьте ошибку: 'Той каза, че ще дойде утре.'",
                correctAnswer: "Той каза, че ще дойде утре."
            },
            {
                type: "multiple-choice",
                question: "Выбери правильную форму: 'Когато той дойде, аз ___ (вече да съм излязъл).'",
                answers: ["вече бях излязъл", "вече съм излязъл", "вече щях да съм излязъл"],
                correct: 1
            },
            {
                type: "grammar",
                question: "Исправьте ошибку: 'Тя каза, че ще дойде утре.'",
                correctAnswer: "Тя каза, че ще дойде утре."
            },
            {
                type: "multiple-choice",
                question: "Выбери правильную форму: 'Това е най-добрият филм, който ___ (виждам).'",
                answers: ["съм виждал", "бях виждал", "видях"],
                correct: 1
            }
        ]
    }
};

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    updateSectionStyles();
    
    // Показываем начальную секцию
    const sections = document.querySelectorAll('section');
    sections.forEach(section => section.classList.add('hidden'));
    
    const languageSection = document.getElementById('language-choice');
    if (languageSection) {
        languageSection.classList.remove('hidden');
        requestAnimationFrame(() => {
            languageSection.style.opacity = '1';
            languageSection.style.transform = 'translateY(0)';
        });
    }
    
    loadSavedHints();
});

// Обновляем функцию hideAllSections
function hideAllSections() {
    const sections = [
        'language-choice',
        'level-choice',
        'quiz-section',
        'results-section',
        'profile-section',
        'shop-section',
        'daily-tasks-section'
    ];
    
    sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element && !element.classList.contains('hidden')) {
            // Сначала запускаем анимацию
            element.style.opacity = '0';
            element.style.transform = 'translateY(-20px)';
            
            // После завершения анимации скрываем элемент
            setTimeout(() => {
                element.classList.add('hidden');
            }, 300);
        }
    });
}

// Общая функция для показа секции
function showSection(sectionId) {
    // Сначала скрываем все секции
    hideAllSections();
    
    // Ждем завершения анимации скрытия
    setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
            // Сначала убираем класс hidden
            section.classList.remove('hidden');
            
            // Устанавливаем начальное состояние для анимации
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            
            // Запускаем анимацию появления
            requestAnimationFrame(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            });
        }
    }, 300);
}

// Обновляем функции переключения разделов
function chooseLanguage(lang) {
    state.selectedLanguage = lang;
    showSection('level-choice');
}

function chooseLevel(level) {
    state.selectedLevel = level;
    showSection('quiz-section');
    setTimeout(() => {
    loadQuestions();
    }, 300);
}

function showProfile() {
    showSection('profile-section');
    setTimeout(() => {
        const profileSection = document.getElementById('profile-section');
        const accuracy = state.userProfile.totalQuestions > 0 
            ? Math.round((state.userProfile.correctAnswers / state.userProfile.totalQuestions) * 100) 
            : 0;
        
        // Фильтруем только полученные достижения
        const unlockedAchievements = state.achievements.filter(achievement => 
            state.userProfile.achievements.includes(achievement.id)
        );
        
        profileSection.innerHTML = `
            <div class="profile-header">
                <h2>👤 Профиль</h2>
                <button onclick="toggleTheme()" class="theme-button">
                    ${state.isDarkTheme ? '☀️ Светлая тема' : '🌙 Тёмная тема'}
                </button>
            </div>
            
            <div class="profile-stats">
                <div class="stat-card">
                    <div class="stat-icon">👑</div>
                    <div class="stat-info">
                        <h3>Уровень ${state.userProfile.level}</h3>
                        <div class="xp-progress">
                            <div class="xp-bar" style="width: ${(state.userProfile.xp / state.xpToNextLevel) * 100}%"></div>
                        </div>
                        <p>${state.userProfile.xp}/${state.xpToNextLevel} XP</p>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">📊</div>
                    <div class="stat-info">
                        <h3>Статистика</h3>
                        <p>Всего вопросов: ${state.userProfile.totalQuestions}</p>
                        <p>Правильных ответов: ${state.userProfile.correctAnswers}</p>
                        <p>Точность: ${accuracy}%</p>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">💰</div>
                    <div class="stat-info">
                        <h3>Монеты</h3>
                        <p>${state.coins} монет</p>
                    </div>
                </div>
            </div>
            
            ${unlockedAchievements.length > 0 ? `
                <div class="achievements-section">
                    <h3>🏆 Полученные достижения</h3>
                    <div class="achievements-grid">
                        ${unlockedAchievements.map(achievement => `
                            <div class="achievement-card">
                                <div class="achievement-icon">${achievement.icon}</div>
                                <h4>${achievement.name}</h4>
                                <p>${achievement.description}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
        `;
    }, 300);
}

function showShop() {
    showSection('shop-section');
    setTimeout(() => {
        const shopSection = document.getElementById('shop-section');
        shopSection.innerHTML = `
            <div class="shop-header">
                <h2>🛍️ Магазин</h2>
                <p class="coins-balance">💰 ${state.coins} монет</p>
            </div>
            <div class="shop-items">
                <div class="shop-item">
                    <h3>💡 Подсказка</h3>
                    <p>Поможет с трудным вопросом</p>
                    <p class="price">10 монет</p>
                    <button onclick="buyHint()" class="shop-button" ${state.coins < 10 ? 'disabled' : ''}>
                        ${state.coins < 10 ? 'Недостаточно монет' : 'Купить'}
                    </button>
                </div>
                <div class="shop-item">
                    <h3>⚡️ Бустер XP</h3>
                    <p>Удвоенный опыт на 1 час</p>
                    <p class="price">30 монет</p>
                    <button onclick="buyXPBooster()" class="shop-button" ${state.coins < 30 ? 'disabled' : ''}>
                        ${state.coins < 30 ? 'Недостаточно монет' : 'Купить'}
                    </button>
                </div>
                <div class="shop-item">
                    <h3>⏭️ Пропуск вопроса</h3>
                    <p>Пропустить сложный вопрос</p>
                    <p class="price">15 монет</p>
                    <button onclick="buySkip()" class="shop-button" ${state.coins < 15 ? 'disabled' : ''}>
                        ${state.coins < 15 ? 'Недостаточно монет' : 'Купить'}
                    </button>
                </div>
                <div class="shop-item">
                    <h3>⏰ Дополнительное время</h3>
                    <p>+30 секунд на вопрос</p>
                    <p class="price">20 монет</p>
                    <button onclick="buyExtraTime()" class="shop-button" ${state.coins < 20 ? 'disabled' : ''}>
                        ${state.coins < 20 ? 'Недостаточно монет' : 'Купить'}
                    </button>
                </div>
            </div>
        `;
    }, 300);
}

function showDailyTasks() {
    showSection('daily-tasks-section');
    setTimeout(() => {
        // Обновляем содержимое заданий после появления секции
        const tasksSection = document.getElementById('daily-tasks-section');
        // ... остальной код обновления заданий ...
    }, 300);
}

// Обновляем стили для секций
function updateSectionStyles() {
    const style = document.createElement('style');
    style.textContent = `
        section {
            transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
            opacity: 1;
            transform: translateY(0);
        }

        section.hidden {
            display: none;
        }

        /* Добавляем состояния для анимации */
        section:not(.hidden) {
            display: block;
        }

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes slideOut {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(-20px);
            }
        }
    `;
    document.head.appendChild(style);
}

// Загрузка вопросов
function loadQuestions() {
    const quizQuestions = questions[state.selectedLanguage][state.selectedLevel];
    if (quizQuestions && quizQuestions.length > 0) {
        state.currentQuestion = 0;
        state.score = 0;
        showQuestion(quizQuestions);
        startTimer();
    } else {
        document.getElementById('result').textContent = "Вопросы для этого уровня пока недоступны.";
    }
}

// Скрытие всех секций
function hideAllSections() {
    const sections = [
        'language-choice',
        'level-choice',
        'quiz-section',
        'results-section',
        'profile-section',
        'shop-section',
        'daily-tasks-section'
    ];
    
    sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
            // Добавляем проверку, чтобы не скрывать уже скрытые секции
            if (!element.classList.contains('hidden')) {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    element.classList.add('hidden');
                }, 300);
            }
        }
    });
}

// Функция переключения темы
function toggleTheme() {
    state.isDarkTheme = !state.isDarkTheme;
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', state.isDarkTheme ? 'dark' : 'light');
    updateThemeButton();
}

// Обновление кнопки темы
function updateThemeButton() {
    const themeButton = document.querySelector('button[onclick="toggleTheme()"]');
    if (themeButton) {
        themeButton.innerHTML = state.isDarkTheme ? '☀️ Светлая тема' : '🌙 Тёмная тема';
    }
}

// Обновление отображения монет
function updateCoinsDisplay() {
    const coinsDisplays = document.querySelectorAll('.coins-balance');
    coinsDisplays.forEach(display => {
        display.textContent = `💰 ${state.coins} монет`;
    });
}

// Показ вопроса
function showQuestion(quizQuestions) {
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const writingElement = document.getElementById('writing');
    const resultElement = document.getElementById('result');
    
    // Очищаем предыдущие элементы
    optionsElement.innerHTML = '';
    writingElement.innerHTML = '';
    resultElement.textContent = '';
    
    const currentQ = quizQuestions[state.currentQuestion];
    
    // Анимация появления вопроса
    questionElement.style.opacity = '0';
    questionElement.textContent = currentQ.question;
    setTimeout(() => {
        questionElement.style.opacity = '1';
    }, 100);

    switch (currentQ.type) {
        case "multiple-choice":
            // Перемешиваем варианты ответов
            const shuffledAnswers = shuffleArray([...currentQ.answers]);
            shuffledAnswers.forEach((answer, index) => {
                const button = document.createElement('button');
                button.textContent = answer;
                button.className = 'option-button';
                button.style.opacity = '0';
                button.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    button.style.opacity = '1';
                    button.style.transform = 'translateY(0)';
                }, 150 + index * 100);
                
                button.onclick = () => checkAnswer(currentQ.answers.indexOf(answer) + 1, quizQuestions);
                optionsElement.appendChild(button);
            });
            break;

        case "grammar":
            const inputContainer = document.createElement('div');
            inputContainer.className = 'input-container';
            
            const input = document.createElement('input');
            input.type = "text";
            input.placeholder = "Введите исправленный текст...";
            input.className = 'grammar-input';
            
            const submitButton = document.createElement('button');
            submitButton.textContent = "Проверить";
            submitButton.className = 'submit-button';
            
            inputContainer.appendChild(input);
            inputContainer.appendChild(submitButton);
            writingElement.appendChild(inputContainer);
            
            input.focus();
            
            submitButton.onclick = () => checkAnswer(input.value.trim(), quizQuestions);
            input.onkeypress = (e) => {
                if (e.key === 'Enter') {
                    checkAnswer(input.value.trim(), quizQuestions);
                }
            };
            break;
    }
    
    updateProgressBar();

    // Добавляем панель подсказок
    const hintsPanel = document.createElement('div');
    hintsPanel.className = 'hints-panel';
    hintsPanel.innerHTML = `
        <button onclick="useFiftyFifty()" class="hint-button" ${state.hints.fiftyFifty > 0 ? '' : 'disabled'}>
            💫 50/50 (${state.hints.fiftyFifty})
        </button>
        <button onclick="useSkipQuestion()" class="hint-button" ${state.hints.skipQuestion > 0 ? '' : 'disabled'}>
            ⏭️ Пропустить (${state.hints.skipQuestion})
        </button>
        <button onclick="useExtraTime()" class="hint-button" ${state.hints.extraTime > 0 ? '' : 'disabled'}>
            ⏰ +30 сек (${state.hints.extraTime})
        </button>
    `;
    
    document.getElementById('quiz-section').insertBefore(hintsPanel, optionsElement);
}

// Проверка ответа
function checkAnswer(answer, quizQuestions) {
    const resultElement = document.getElementById('result');
    clearInterval(state.timer);
    const currentQ = quizQuestions[state.currentQuestion];
    let isCorrect = false;

    if (currentQ.type === "grammar") {
        isCorrect = answer.toLowerCase() === currentQ.correctAnswer.toLowerCase();
    } else {
        isCorrect = answer === currentQ.correct;
    }

    // Обновляем статистику
    updateStatistics(isCorrect);

    if (isCorrect) {
        // Увеличиваем счет и монеты
        state.score++;
        state.coins += 5;
        updateCoinsDisplay();
        
        // Добавляем XP
        updateXP(10);
        
        resultElement.innerHTML = `
            <div class="result-message correct-answer">
                <span class="emoji">🎉</span>
                Отлично! Правильный ответ!
                <span class="points">+10 XP • +5 монет</span>
            </div>
        `;
        
        // Эффект конфетти
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    } else {
        resultElement.innerHTML = `
            <div class="result-message wrong-answer">
                <span class="emoji">😢</span>
                Не совсем так...
                <div class="correct-text">
                    Правильный ответ:<br>
                    ${currentQ.correctAnswer || quizQuestions[state.currentQuestion].answers[currentQ.correct - 1]}
                </div>
            </div>
        `;
    }

    // Проверяем достижения
    checkAchievements();

    // Сохраняем прогресс
    localStorage.setItem('coins', state.coins);
    localStorage.setItem('score', state.score);

    // Переход к следующему вопросу
        setTimeout(() => {
        state.currentQuestion++;
        if (state.currentQuestion < quizQuestions.length) {
            showQuestion(quizQuestions);
    } else {
            showFinalResults();
        }
    }, 2000);
}

// Показ магазина
function showShop() {
    showSection('shop-section');
    setTimeout(() => {
        const shopSection = document.getElementById('shop-section');
        shopSection.innerHTML = `
            <div class="shop-header">
                <h2>🛍️ Магазин</h2>
                <p class="coins-balance">💰 ${state.coins} монет</p>
            </div>
            <div class="shop-items">
                <div class="shop-item">
                    <h3>💡 Подсказка</h3>
                    <p>Поможет с трудным вопросом</p>
                    <p class="price">10 монет</p>
                    <button onclick="buyHint()" class="shop-button" ${state.coins < 10 ? 'disabled' : ''}>
                        ${state.coins < 10 ? 'Недостаточно монет' : 'Купить'}
                    </button>
                </div>
                <div class="shop-item">
                    <h3>⚡️ Бустер XP</h3>
                    <p>Удвоенный опыт на 1 час</p>
                    <p class="price">30 монет</p>
                    <button onclick="buyXPBooster()" class="shop-button" ${state.coins < 30 ? 'disabled' : ''}>
                        ${state.coins < 30 ? 'Недостаточно монет' : 'Купить'}
                    </button>
                </div>
                <div class="shop-item">
                    <h3>⏭️ Пропуск вопроса</h3>
                    <p>Пропустить сложный вопрос</p>
                    <p class="price">15 монет</p>
                    <button onclick="buySkip()" class="shop-button" ${state.coins < 15 ? 'disabled' : ''}>
                        ${state.coins < 15 ? 'Недостаточно монет' : 'Купить'}
                    </button>
                </div>
                <div class="shop-item">
                    <h3>⏰ Дополнительное время</h3>
                    <p>+30 секунд на вопрос</p>
                    <p class="price">20 монет</p>
                    <button onclick="buyExtraTime()" class="shop-button" ${state.coins < 20 ? 'disabled' : ''}>
                        ${state.coins < 20 ? 'Недостаточно монет' : 'Купить'}
                    </button>
                </div>
            </div>
        `;
    }, 300);
}

// Вспомогательная функция для перемешивания массива
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Обновление прогресс-бара
function updateProgressBar() {
    const progressBar = document.getElementById('progress');
    const quizQuestions = questions[state.selectedLanguage][state.selectedLevel];
    const progress = ((state.currentQuestion + 1) / quizQuestions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

// Показ финальных результатов
function showFinalResults() {
    const quizSection = document.getElementById('quiz-section');
    const resultsSection = document.getElementById('results-section');
    
    quizSection.classList.add('hidden');
    resultsSection.classList.remove('hidden');
    
    // Сохраняем финальные результаты
    const totalQuestions = questions[state.selectedLanguage][state.selectedLevel].length;
    const accuracy = Math.round((state.score / totalQuestions) * 100);
    const earnedCoins = state.score * 5;
    const earnedXP = state.score * 10;
    
    const finalScore = document.getElementById('final-score');
    finalScore.innerHTML = `
        <div class="result-message correct-answer">
            <span class="emoji">🎉</span>
            <h2>Отличная работа!</h2>
            
            <div class="results-stats">
                <div class="result-stat">
                    <div class="stat-icon">✅</div>
                    <div class="stat-info">
                        <h3>Правильных ответов</h3>
                        <p class="stat-value">${state.score} из ${totalQuestions}</p>
                    </div>
                </div>
                
                <div class="result-stat">
                    <div class="stat-icon">⭐️</div>
                    <div class="stat-info">
                        <h3>Точность</h3>
                        <p class="stat-value">${accuracy}%</p>
                    </div>
                </div>
                
                <div class="result-stat">
                    <div class="stat-icon">💰</div>
                    <div class="stat-info">
                        <h3>Заработано монет</h3>
                        <p class="stat-value">+${earnedCoins}</p>
                    </div>
                </div>
                
                <div class="result-stat">
                    <div class="stat-icon">📈</div>
                    <div class="stat-info">
                        <h3>Опыт</h3>
                        <p class="stat-value">+${earnedXP} XP</p>
                    </div>
                </div>
            </div>
            
            <div class="results-buttons">
                <button onclick="restartQuiz()" class="restart-button">
                    🔄 Пройти ещё раз
                </button>
                <button onclick="showProfile()" class="profile-button">
                    👤 Перейти в профиль
                </button>
            </div>
        </div>
    `;
    
    // Эффект конфетти
    confetti({
        particleCount: 200,
        spread: 90,
        origin: { y: 0.3 }
    });
}

// Запуск таймера
function startTimer() {
    const timerElement = document.getElementById('timer');
    let timeLeft = state.timePerQuestion;
    
    timerElement.innerHTML = `
        <div class="timer-container">
            <div class="timer-bar"></div>
            <span class="timer-text">${timeLeft}</span>
        </div>
    `;
    
    const timerBar = timerElement.querySelector('.timer-bar');
    const timerText = timerElement.querySelector('.timer-text');
    
    state.timer = setInterval(() => {
        timeLeft--;
        timerText.textContent = timeLeft;
        timerBar.style.width = `${(timeLeft / state.timePerQuestion) * 100}%`;
        
        if (timeLeft <= 5) {
            timerBar.classList.add('timer-warning');
        }
        
        if (timeLeft <= 0) {
            clearInterval(state.timer);
            checkAnswer(null, questions[state.selectedLanguage][state.selectedLevel]);
        }
    }, 1000);
}

// Перезапуск теста
function restartQuiz() {
    // Сбрасываем состояние
    state.currentQuestion = 0;
    state.score = 0;
    
    // Скрываем все секции
    hideAllSections();
    
    // Показываем секцию выбора языка
    const languageSection = document.getElementById('language-choice');
    languageSection.classList.remove('hidden');
    languageSection.style.opacity = '1';
    languageSection.style.transform = 'translateY(0)';
    
    // Сбрасываем выбранный язык и уровень
    state.selectedLanguage = '';
    state.selectedLevel = '';
}

// Покупка подсказки
function buyHint() {
    if (state.coins >= 10) {
        state.coins -= 10;
        state.hints.regular++;
        updateCoinsDisplay();
        showNotification('💡 Подсказка куплена!', 'success');
        localStorage.setItem('coins', state.coins);
        localStorage.setItem('hints', JSON.stringify(state.hints));
        showShop(); // Обновляем отображение магазина
    } else {
        showNotification('Недостаточно монет!', 'error');
    }
}

// Покупка бустера опыта
function buyXPBooster() {
    if (state.coins >= 30) {
        state.coins -= 30;
        state.xpBoosterActive = true;
        updateCoinsDisplay();
        showNotification('⚡️ Бустер XP активирован на 1 час!', 'success');
        localStorage.setItem('coins', state.coins);
        showShop(); // Обновляем отображение магазина
        
        // Сохраняем время активации бустера
        const boosterEndTime = Date.now() + 3600000; // 1 час
        localStorage.setItem('xpBoosterEndTime', boosterEndTime);
        
        setTimeout(() => {
            state.xpBoosterActive = false;
            showNotification('Действие бустера XP закончилось', 'info');
            localStorage.removeItem('xpBoosterEndTime');
        }, 3600000);
    } else {
        showNotification('Недостаточно монет!', 'error');
    }
}

// Показ ежедневных заданий
function showDailyTasks() {
    hideAllSections();
    const tasksSection = document.getElementById('daily-tasks-section');
    
    // Очищаем секцию перед добавлением нового содержимого
    tasksSection.innerHTML = `
        <div class="tasks-header">
            <div class="tasks-title">
                <h2>📅 Ежедневные задания</h2>
                <p class="tasks-subtitle">Выполняйте задания и получайте награды</p>
            </div>
            <div class="coins-display">
                <p class="coins-balance">💰 ${state.coins}</p>
                <p class="coins-label">монет</p>
            </div>
        </div>
        <div class="tasks-container">
            ${state.dailyTasks.map(task => `
                <div class="task-card">
                    <div class="task-info">
                        <h4>${task.description}</h4>
                        <p class="task-reward">Награда: ${task.reward} монет</p>
                    </div>
                    <div class="task-progress">
                        <div class="progress-bar">
                            <div class="progress" style="width: ${(task.progress / task.target) * 100}%"></div>
                        </div>
                        <p class="progress-text">${task.progress}/${task.target}</p>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    // Показываем секцию с анимацией
    tasksSection.classList.remove('hidden');
    requestAnimationFrame(() => {
        tasksSection.style.opacity = '1';
        tasksSection.style.transform = 'translateY(0)';
    });
}

// Создаем контейнер для уведомлений, если его еще нет
function createNotificationContainer() {
    let container = document.querySelector('.notification-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'notification-container';
        document.body.appendChild(container);
    }
    return container;
}

// Обновленная функция показа уведомлений
function showNotification(message, type = 'info') {
    const container = createNotificationContainer();
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    container.appendChild(notification);
    
    // Анимация появления
    requestAnimationFrame(() => {
        notification.classList.add('show');
    });
    
    // Автоматическое удаление
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
            // Если в контейнере больше нет уведомлений, удаляем его
            if (container.children.length === 0) {
                container.remove();
            }
        }, 300);
    }, 3000);
}

// Обновленная функция показа достижений
function showAchievementNotification(achievement) {
    const container = createNotificationContainer();
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
        <div class="achievement-icon">${achievement.icon}</div>
        <div class="achievement-info">
            <h4>🏆 Новое достижение!</h4>
            <h4>${achievement.name}</h4>
            <p>${achievement.description}</p>
        </div>
    `;
    
    container.appendChild(notification);
    
    // Звуковой эффект
    const audio = new Audio('achievement.mp3');
    audio.play().catch(() => {});
    
    // Анимация появления
    requestAnimationFrame(() => {
        notification.classList.add('show');
    });
    
    // Эффект конфетти
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { x: 1, y: 0 }
    });
    
    // Автоматическое удаление
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
            if (container.children.length === 0) {
                container.remove();
            }
        }, 500);
    }, 5000);
}

// Обновление прогресса заданий
function updateTaskProgress(taskType) {
    state.dailyTasks.forEach(task => {
        switch(taskType) {
            case 'question':
                if (task.description.includes('вопросов')) {
                    task.progress = Math.min(task.progress + 1, task.target);
                }
                break;
            case 'xp':
                if (task.description.includes('XP')) {
                    task.progress = Math.min(task.progress + 10, task.target);
                }
                break;
            case 'hint':
                if (task.description.includes('подсказку')) {
                    task.progress = Math.min(task.progress + 1, task.target);
                }
                break;
        }

        // Проверяем завершение задания
        if (task.progress === task.target) {
            state.coins += task.reward;
            showNotification(`Задание выполнено! +${task.reward} монет`, 'success');
            updateCoinsDisplay();
            localStorage.setItem('coins', state.coins);
        }
    });

    // Обновляем отображение заданий если они открыты
    const tasksSection = document.getElementById('daily-tasks-section');
    if (!tasksSection.classList.contains('hidden')) {
        showDailyTasks(); // Обновляем отображение
    }
}

// Использование подсказки
function useHint() {
    if (state.hintsAvailable > 0) {
        state.hintsAvailable--;
        const currentQ = questions[state.selectedLanguage][state.selectedLevel][state.currentQuestion];
        
        let hintText = '';
        if (currentQ.type === 'multiple-choice') {
            const correctAnswer = currentQ.answers[currentQ.correct - 1];
            hintText = `Подсказка: Правильный ответ начинается с "${correctAnswer[0]}"`;
        } else {
            hintText = `Подсказка: Обратите внимание на форму глагола`;
        }
        
        showNotification(hintText, 'info');
        updateTaskProgress('hint');
    } else {
        showNotification('У вас нет доступных подсказок!', 'error');
    }
}

// Показ профиля
function showProfile() {
    showSection('profile-section');
    setTimeout(() => {
        const profileSection = document.getElementById('profile-section');
        const accuracy = state.userProfile.totalQuestions > 0 
            ? Math.round((state.userProfile.correctAnswers / state.userProfile.totalQuestions) * 100) 
            : 0;
        
        // Фильтруем только полученные достижения
        const unlockedAchievements = state.achievements.filter(achievement => 
            state.userProfile.achievements.includes(achievement.id)
        );
        
        profileSection.innerHTML = `
            <div class="profile-header">
                <h2>👤 Профиль</h2>
                <button onclick="toggleTheme()" class="theme-button">
                    ${state.isDarkTheme ? '☀️ Светлая тема' : '🌙 Тёмная тема'}
                </button>
            </div>
            
            <div class="profile-stats">
                <div class="stat-card">
                    <div class="stat-icon">👑</div>
                    <div class="stat-info">
                        <h3>Уровень ${state.userProfile.level}</h3>
                        <div class="xp-progress">
                            <div class="xp-bar" style="width: ${(state.userProfile.xp / state.xpToNextLevel) * 100}%"></div>
                        </div>
                        <p>${state.userProfile.xp}/${state.xpToNextLevel} XP</p>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">📊</div>
                    <div class="stat-info">
                        <h3>Статистика</h3>
                        <p>Всего вопросов: ${state.userProfile.totalQuestions}</p>
                        <p>Правильных ответов: ${state.userProfile.correctAnswers}</p>
                        <p>Точность: ${accuracy}%</p>
                    </div>
                </div>
                
                <div class="stat-card">
                    <div class="stat-icon">💰</div>
                    <div class="stat-info">
                        <h3>Монеты</h3>
                        <p>${state.coins} монет</p>
                    </div>
                </div>
            </div>
            
            ${unlockedAchievements.length > 0 ? `
                <div class="achievements-section">
                    <h3>🏆 Полученные достижения</h3>
                    <div class="achievements-grid">
                        ${unlockedAchievements.map(achievement => `
                            <div class="achievement-card">
                                <div class="achievement-icon">${achievement.icon}</div>
                                <h4>${achievement.name}</h4>
                                <p>${achievement.description}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
        `;
    }, 300);
}

// Проверка достижений
function checkAchievements() {
    const achievements = state.achievements;
    const userAchievements = state.userProfile.achievements;
    
    // Первая победа
    if (!userAchievements.includes('first_win') && state.userProfile.correctAnswers > 0) {
        unlockAchievement('first_win');
    }
    
    // Идеальный результат
    if (!userAchievements.includes('perfect_score') && 
        state.score === questions[state.selectedLanguage][state.selectedLevel].length) {
        unlockAchievement('perfect_score');
    }
    
    // Богатый студент
    if (!userAchievements.includes('rich_student') && state.coins >= 1000) {
        unlockAchievement('rich_student');
    }
}

// Разблокировка достижения
function unlockAchievement(achievementId) {
    if (!state.userProfile.achievements.includes(achievementId)) {
        state.userProfile.achievements.push(achievementId);
        const achievement = state.achievements.find(a => a.id === achievementId);
        showAchievementNotification(achievement);
        localStorage.setItem('achievements', JSON.stringify(state.userProfile.achievements));
    }
}

// Обновление XP и уровня
function updateXP(amount) {
    state.userProfile.xp += amount;
    
    while (state.userProfile.xp >= state.xpToNextLevel) {
        state.userProfile.xp -= state.xpToNextLevel;
        state.userProfile.level++;
        showNotification(`🎉 Поздравляем! Вы достигли ${state.userProfile.level} уровня!`, 'success');
    }
    
    localStorage.setItem('userLevel', state.userProfile.level);
    localStorage.setItem('userXP', state.userProfile.xp);
}

// Функции для подсказок
function useFiftyFifty() {
    if (state.hints.fiftyFifty > 0) {
        state.hints.fiftyFifty--;
        const buttons = document.querySelectorAll('.option-button');
        const currentQ = questions[state.selectedLanguage][state.selectedLevel][state.currentQuestion];
        const correctAnswer = currentQ.correct;
        
        let removed = 0;
        buttons.forEach((button, index) => {
            if (index + 1 !== correctAnswer && removed < 2) {
                button.style.display = 'none';
                removed++;
            }
        });
        
        showNotification('50/50 подсказка использована!', 'info');
        checkHintAchievement('fiftyFifty');
    } else {
        showNotification('У вас нет подсказок 50/50!', 'error');
    }
}

function useSkipQuestion() {
    if (state.hints.skipQuestion > 0) {
        state.hints.skipQuestion--;
        state.currentQuestion++;
        showQuestion(questions[state.selectedLanguage][state.selectedLevel]);
        showNotification('Вопрос пропущен!', 'info');
        checkHintAchievement('skipQuestion');
    } else {
        showNotification('У вас нет подсказок для пропуска!', 'error');
    }
}

function useExtraTime() {
    if (state.hints.extraTime > 0) {
        state.hints.extraTime--;
        clearInterval(state.timer);
        state.timePerQuestion += 30; // Добавляем 30 секунд
        startTimer();
        showNotification('Добавлено 30 секунд!', 'info');
        checkHintAchievement('extraTime');
    } else {
        showNotification('У вас нет подсказок дополнительного времени!', 'error');
    }
}

// Функция проверки достижений за использование подсказок
function checkHintAchievement(hintType) {
    const usedHints = JSON.parse(localStorage.getItem('usedHints') || '[]');
    if (!usedHints.includes(hintType)) {
        usedHints.push(hintType);
        localStorage.setItem('usedHints', JSON.stringify(usedHints));
        
        if (usedHints.length === Object.keys(state.hints).length) {
            unlockAchievement('hint_master');
        }
    }
}

// Добавляем новую функцию для покупки пропуска вопроса
function buySkip() {
    if (state.coins >= 15) {
        state.coins -= 15;
        state.hints.skipQuestion++;
        updateCoinsDisplay();
        showNotification('⏭️ Пропуск вопроса куплен!', 'success');
        localStorage.setItem('coins', state.coins);
        localStorage.setItem('hints', JSON.stringify(state.hints));
        showShop(); // Обновляем отображение магазина
    } else {
        showNotification('Недостаточно монет!', 'error');
    }
}

// Добавляем новую функцию для покупки дополнительного времени
function buyExtraTime() {
    if (state.coins >= 20) {
        state.coins -= 20;
        state.hints.extraTime++;
        updateCoinsDisplay();
        showNotification('⏰ Дополнительное время куплено!', 'success');
        localStorage.setItem('coins', state.coins);
        localStorage.setItem('hints', JSON.stringify(state.hints));
        showShop(); // Обновляем отображение магазина
    } else {
        showNotification('Недостаточно монет!', 'error');
    }
}

// Добавляем функции в глобальную область видимости
window.buySkip = buySkip;
window.buyExtraTime = buyExtraTime;

// Добавляем функцию для загрузки сохраненных подсказок при старте
function loadSavedHints() {
    const savedHints = localStorage.getItem('hints');
    if (savedHints) {
        state.hints = JSON.parse(savedHints);
    }
    
    // Проверяем активный бустер XP
    const boosterEndTime = localStorage.getItem('xpBoosterEndTime');
    if (boosterEndTime) {
        const timeLeft = boosterEndTime - Date.now();
        if (timeLeft > 0) {
            state.xpBoosterActive = true;
            setTimeout(() => {
                state.xpBoosterActive = false;
                showNotification('Действие бустера XP закончилось', 'info');
                localStorage.removeItem('xpBoosterEndTime');
            }, timeLeft);
        } else {
            localStorage.removeItem('xpBoosterEndTime');
        }
    }
}

// Добавляем вызов функции загрузки при инициализации
document.addEventListener('DOMContentLoaded', function() {
    // ... существующий код ...
    loadSavedHints();
});

// Добавляем все функции в глобальную область видимости
window.buyHint = buyHint;
window.buyXPBooster = buyXPBooster;
window.buySkip = buySkip;
window.buyExtraTime = buyExtraTime;

// Добавляем функционал для меню
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('.main-content');

menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    mainContent.classList.toggle('sidebar-open');
    
    // Меняем иконку
    const menuIcon = menuToggle.querySelector('.menu-icon');
    if (sidebar.classList.contains('open')) {
        menuIcon.textContent = '×';
        menuToggle.style.left = '290px'; // Для десктопа
    } else {
        menuIcon.textContent = '☰';
        menuToggle.style.left = '1rem';
    }
});

// Закрываем меню при клике вне его на мобильных устройствах
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
            sidebar.classList.remove('open');
            mainContent.classList.remove('sidebar-open');
            menuToggle.querySelector('.menu-icon').textContent = '☰';
            menuToggle.style.left = '1rem';
        }
    }
});

// Обновляем позицию кнопки при изменении размера окна
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        menuToggle.style.left = '1rem';
    } else if (sidebar.classList.contains('open')) {
        menuToggle.style.left = '290px';
    }
});

// Добавим функции для работы со статистикой
function updateStatistics(isCorrect) {
    // Обновляем общую статистику
    state.userProfile.totalQuestions++;
    if (isCorrect) {
        state.userProfile.correctAnswers++;
    }

    // Сохраняем в localStorage
    localStorage.setItem('totalQuestions', state.userProfile.totalQuestions);
    localStorage.setItem('correctAnswers', state.userProfile.correctAnswers);

    // Обновляем отображение если открыт профиль
    updateProfileStats();
}

function updateProfileStats() {
    const profileSection = document.getElementById('profile-section');
    if (!profileSection.classList.contains('hidden')) {
        const accuracy = state.userProfile.totalQuestions > 0 
            ? Math.round((state.userProfile.correctAnswers / state.userProfile.totalQuestions) * 100) 
            : 0;

        // Обновляем статистику в профиле
        const statsHtml = `
            <div class="stats-container">
                <div class="stat-card">
                    <div class="stat-icon">📊</div>
                    <div class="stat-info">
                        <h3>Статистика</h3>
                        <p>Всего вопросов: ${state.userProfile.totalQuestions}</p>
                        <p>Правильных ответов: ${state.userProfile.correctAnswers}</p>
                        <p>Точность: ${accuracy}%</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">⭐️</div>
                    <div class="stat-info">
                        <h3>Уровень ${state.userProfile.level}</h3>
                        <div class="xp-progress">
                            <div class="xp-bar" style="width: ${(state.userProfile.xp / state.xpToNextLevel) * 100}%"></div>
                        </div>
                        <p>${state.userProfile.xp}/${state.xpToNextLevel} XP</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">💰</div>
                    <div class="stat-info">
                        <h3>Монеты</h3>
                        <p>${state.coins} монет</p>
                    </div>
                </div>
            </div>
        `;

        // Обновляем секцию статистики
        const statsSection = profileSection.querySelector('.profile-stats');
        if (statsSection) {
            statsSection.innerHTML = statsHtml;
        }
    }
}
