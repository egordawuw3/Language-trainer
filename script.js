let selectedLanguage = '';
let selectedLevel = '';
let currentQuestion = 0;
let score = 0;
const achievements = [];
let timer;
let hintsAvailable = 3;
let timePerQuestion = 10; // Время на вопрос по умолчанию
let userProgress = JSON.parse(localStorage.getItem('userProgress')) || {};
let userLevel = userProgress.userLevel || 1; // Уровень пользователя
let userXP = userProgress.userXP || 0; // Опыт пользователя
let coins = userProgress.coins || 0; // Монеты пользователя
const xpToNextLevel = 100; // Опыт, необходимый для перехода на следующий уровень
const dailyTasks = [
    { description: "Пройти 5 вопросов", target: 5, progress: 0, reward: 10 },
    { description: "Заработать 20 XP", target: 20, progress: 0, reward: 15 },
    { description: "Использовать подсказку", target: 1, progress: 0, reward: 5 }
];

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

// Выбор языка
function chooseLanguage(lang) {
    selectedLanguage = lang;
    document.getElementById('language-choice').classList.add('hidden');
    document.getElementById('level-choice').classList.remove('hidden');
}

// Выбор уровня
function chooseLevel(level) {
    selectedLevel = level;
    document.getElementById('level-choice').classList.add('hidden');
    document.getElementById('quiz-section').classList.remove('hidden');
    loadQuestions();
}

// Загрузка вопросов
function loadQuestions() {
    const quizQuestions = questions[selectedLanguage][selectedLevel];
    if (quizQuestions && quizQuestions.length > 0) {
        showQuestion(quizQuestions);
        startTimer();
    } else {
        document.getElementById('result').textContent = "Вопросы для этого уровня пока недоступны.";
    }
}

// Показ вопроса
function showQuestion(quizQuestions) {
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const writingElement = document.getElementById('writing');
    // Очищаем предыдущие элементы
    optionsElement.innerHTML = '';
    writingElement.innerHTML = '';
    const currentQ = quizQuestions[currentQuestion];
    questionElement.textContent = currentQ.question;

    switch (currentQ.type) {
        case "multiple-choice":
            currentQ.answers.forEach((answer, index) => {
                const button = document.createElement('button');
                button.textContent = answer;
                button.onclick = () => checkAnswer(index + 1, quizQuestions);
                optionsElement.appendChild(button);
            });
            break;

        case "multiple-correct":
            currentQ.answers.forEach((answer, index) => {
                const checkbox = document.createElement('input');
                checkbox.type = "checkbox";
                checkbox.id = `option-${index}`;
                const label = document.createElement('label');
                label.textContent = answer;
                label.htmlFor = `option-${index}`;
                optionsElement.appendChild(checkbox);
                optionsElement.appendChild(label);
            });
            const submitButton = document.createElement('button');
            submitButton.textContent = "Отправить";
            submitButton.onclick = () => {
                const selected = [];
                currentQ.answers.forEach((_, index) => {
                    if (document.getElementById(`option-${index}`).checked) {
                        selected.push(index + 1);
                    }
                });
                checkAnswer(selected, quizQuestions);
            };
            optionsElement.appendChild(submitButton);
            break;

        case "grammar":
            const input = document.createElement('input');
            input.type = "text";
            input.placeholder = "Введите исправленный текст...";
            writingElement.appendChild(input);
            const submitButtonGrammar = document.createElement('button');
            submitButtonGrammar.textContent = "Отправить";
            submitButtonGrammar.onclick = () => checkAnswer(input.value.trim(), quizQuestions);
            writingElement.appendChild(submitButtonGrammar);
            break;
    }
    updateProgressBar();
}

// Проверка ответа
function checkAnswer(answer, quizQuestions) {
    const resultElement = document.getElementById('result');
    clearInterval(timer); // Сбрасываем таймер
    const currentQ = quizQuestions[currentQuestion];
    let isCorrect = false;

    if (currentQ.type === "grammar") {
        isCorrect = answer === currentQ.correctAnswer;
    } else if (currentQ.type === "multiple-correct") {
        isCorrect = JSON.stringify(answer) === JSON.stringify(currentQ.correct);
    } else {
        isCorrect = answer === currentQ.correct;
    }

    if (isCorrect) {
        resultElement.textContent = "Правильно! 🎉";
        score++;
        userXP += 10; // Начисляем 10 XP за правильный ответ
        coins += 5; // Начисляем 5 монет за правильный ответ
        shootConfetti();
        checkLevelUp(); // Проверяем, не повысился ли уровень
        // Обновляем прогресс ежедневных заданий
        dailyTasks[0].progress++; // Пройти вопрос
        dailyTasks[1].progress += 10; // Заработать XP
        checkDailyTasks();
    } else {
        resultElement.textContent = "Неправильно 😢";
    }

    // Переход к следующему вопросу
    currentQuestion++;
    if (currentQuestion < quizQuestions.length) {
        setTimeout(() => {
            showQuestion(quizQuestions);
            resultElement.textContent = ""; // Очищаем результат
            startTimer(); // Запускаем таймер для следующего вопроса
        }, 1000); // Задержка 1 секунда перед следующим вопросом
    } else {
        resultElement.textContent += " Тест завершен!";
        document.getElementById('score').textContent = `Твой результат: ${score} из ${quizQuestions.length}`;
        document.getElementById('quiz-section').classList.add('hidden');
        document.getElementById('results-section').classList.remove('hidden');
        checkAchievements();
        saveProgress();
    }
}

// Обновление прогресс-бара
function updateProgressBar() {
    const quizQuestions = questions[selectedLanguage][selectedLevel];
    const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
    document.getElementById('progress').style.width = `${progress}%`;
}

// Конфетти для правильных ответов
function shootConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

// Таймер
function startTimer() {
    let timeLeft = timePerQuestion;
    const timerElement = document.getElementById('timer');
    timerElement.textContent = `Осталось времени: ${timeLeft} сек.`;
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Осталось времени: ${timeLeft} сек.`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            checkAnswer(null, questions[selectedLanguage][selectedLevel]);
        }
    }, 1000);
}

// Проверка повышения уровня
function checkLevelUp() {
    if (userXP >= xpToNextLevel) {
        userLevel++; // Повышаем уровень
        userXP = 0; // Сбрасываем XP
        alert(`Поздравляем! Вы достигли уровня ${userLevel}! 🎉`);
        updateProfile(); // Обновляем профиль
    }
}

// Проверка выполнения ежедневных заданий
function checkDailyTasks() {
    dailyTasks.forEach(task => {
        if (task.progress >= task.target) {
            coins += task.reward;
            alert(`Задание "${task.description}" выполнено! Вы получили ${task.reward} монет.`);
            task.progress = 0; // Сбрасываем прогресс
        }
    });
    updateProfile();
}

// Обновление прогресса ежедневных заданий
function updateDailyTasks() {
    const tasksList = document.getElementById('daily-tasks-list');
    tasksList.innerHTML = dailyTasks.map(task => `
  <div class="task">
   <p>${task.description}</p>
   <progress value="${task.progress}" max="${task.target}"></progress>
   <p>Награда: ${task.reward} монет</p>
  </div>
 `).join('');
}

// Показ ежедневных заданий
function showDailyTasks() {
    document.getElementById('quiz-section').classList.add('hidden');
    document.getElementById('results-section').classList.add('hidden');
    document.getElementById('profile-section').classList.add('hidden');
    document.getElementById('shop-section').classList.add('hidden');
    document.getElementById('daily-tasks-section').classList.remove('hidden');
    document.getElementById('daily-tasks-section').classList.add('fullscreen');
    updateDailyTasks();
}

// Закрытие ежедневных заданий
function closeDailyTasks() {
    document.getElementById('daily-tasks-section').classList.add('hidden');
    document.getElementById('daily-tasks-section').classList.remove('fullscreen');
}

// Покупка подсказки
function buyHint() {
    if (coins >= 10) {
        coins -= 10;
        hintsAvailable++;
        alert("Вы купили подсказку! Теперь у вас " + hintsAvailable + " подсказок.");
        updateProfile();
    } else {
        alert("Недостаточно монет!");
    }
}

// Разблокировка уровня
function unlockLevel(level) {
    if (coins >= 50) {
        coins -= 50;
        alert("Уровень " + level + " разблокирован!");
        updateProfile();
    } else {
        alert("Недостаточно монет!");
    }
}

// Показ магазина
function showShop() {
    document.getElementById('quiz-section').classList.add('hidden');
    document.getElementById('results-section').classList.add('hidden');
    document.getElementById('profile-section').classList.add('hidden');
    document.getElementById('daily-tasks-section').classList.add('hidden');
    document.getElementById('shop-section').classList.remove('hidden');
    document.getElementById('shop-section').classList.add('fullscreen');
}

// Закрытие магазина
function closeShop() {
    document.getElementById('shop-section').classList.add('hidden');
    document.getElementById('shop-section').classList.remove('fullscreen');
}

// Проверка достижений
function checkAchievements() {
    const quizQuestions = questions[selectedLanguage][selectedLevel];
    if (score === quizQuestions.length) {
        achievements.push(`🎖️ Мастер ${selectedLevel}`);
        alert("Поздравляем! Вы достигли нового уровня!");
    }
    if (score >= 5) {
        achievements.push("🏅 Стратег");
        alert("Вы заработали новое достижение: Стратег!");
    }
    showAchievements();
}

// Показ достижений
function showAchievements() {
    const achievementsList = document.getElementById('achievements-list');
    achievementsList.innerHTML = achievements.map(achievement => `
  <div class="achievement">${achievement}</div>
 `).join('');
    document.getElementById('achievements-section').classList.remove('hidden');
}

// Сохранение прогресса
function saveProgress() {
    userProgress[selectedLanguage] = userProgress[selectedLanguage] || {};
    userProgress[selectedLanguage][selectedLevel] = {
        score,
        achievements
    };
    userProgress.userLevel = userLevel;
    userProgress.userXP = userXP;
    userProgress.coins = coins;
    localStorage.setItem('userProgress', JSON.stringify(userProgress));
    updateProfile();
}

// Перезапуск теста
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById('results-section').classList.add('hidden');
    document.getElementById('quiz-section').classList.remove('hidden');
    loadQuestions();
}

// Переключение темы
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Показ профиля
function showProfile() {
    document.getElementById('quiz-section').classList.add('hidden');
    document.getElementById('results-section').classList.add('hidden');
    document.getElementById('profile-section').classList.remove('hidden');
    document.getElementById('profile-section').classList.add('fullscreen');
    updateProfile();
}

// Закрытие профиля
function closeProfile() {
    document.getElementById('profile-section').classList.add('hidden');
    document.getElementById('profile-section').classList.remove('fullscreen');
}

// Обновление профиля
let progressChart = null; // Добавляем переменную для хранения текущего графика

function updateProfile() {
    const profileName = document.getElementById('profile-name');
    const profileLevel = document.getElementById('profile-level');
    const profileXP = document.getElementById('profile-xp');
    const profileCoins = document.getElementById('profile-coins');
    const profileAchievementsList = document.getElementById('profile-achievements-list');
    const progressChartCanvas = document.getElementById('progress-chart');

    // Имя пользователя
    profileName.textContent = "Гость";

    // Уровень и опыт
    profileLevel.textContent = userLevel;
    profileXP.textContent = `${userXP}/${xpToNextLevel}`;

    // Монеты
    profileCoins.textContent = coins;

    // Достижения
    const allAchievements = Object.values(userProgress).flatMap(lang =>
        Object.values(lang).flatMap(level => level.achievements)
    );
    profileAchievementsList.innerHTML = allAchievements.map(achievement => `
  <div class="achievement">${achievement}</div>
 `).join('');

    // График прогресса
    if (progressChartCanvas) {
        // Уничтожаем предыдущий график, если он существует
        if (progressChart) {
            progressChart.destroy();
        }

        const ctx = progressChartCanvas.getContext('2d');
        progressChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Опыт', 'Монеты', 'Достижения'],
                datasets: [{
                    label: 'Прогресс',
                    data: [userXP, coins, allAchievements.length],
                    backgroundColor: ['#38a169', '#2f855a', '#2d3748'],
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

// Сброс прогресса
function resetProgress() {
    localStorage.removeItem('userProgress');
    userProgress = {};
    userLevel = 1;
    userXP = 0;
    coins = 0;
    updateProfile();
    alert("Прогресс сброшен!");
}

// Социальные функции
function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Я выучил ${score} слов в языковом тренажёре! Попробуйте и вы: ${url}`);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank');
}

function shareOnTwitter() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Я выучил ${score} слов в языковом тренажёре! Попробуйте и вы: ${url}`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
}

// При загрузке страницы
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
}

// Загружаем прогресс
if (localStorage.getItem('userProgress')) {
    userProgress = JSON.parse(localStorage.getItem('userProgress'));
    userLevel = userProgress.userLevel || 1;
    userXP = userProgress.userXP || 0;
    coins = userProgress.coins || 0;
}

// Вспомогательная функция для перемешивания массива
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
