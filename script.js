// Глобални променливи и състояние
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
        { id: 'first_win', name: 'Първа победа', description: 'Отговорете правилно на първия въпрос', icon: '🎯' },
        { id: 'perfect_score', name: 'Идеален резултат', description: 'Получете 100% за тест', icon: '🏆' },
        { id: 'speed_demon', name: 'Бърз като мълния', description: 'Отговорете на въпрос за 5 секунди', icon: '⚡' },
        { id: 'rich_student', name: 'Богат студент', description: 'Натрупайте 1000 монети', icon: '💰' },
        { id: 'speed_master', name: 'Майстор на скоростта', description: 'Отговорете на всички въпроси за половината време', icon: '⚡' },
        { id: 'hint_master', name: 'Майстор на подсказките', description: 'Използвайте всички видове подсказки', icon: '💡' }
    ]
};

// База с въпроси
const questions = {
  german: {
        A1: [
            {
                type: "multiple-choice",
                question: "Как се казва 'ябълка' на немски?",
                answers: ["Apfel", "Banane", "Orange", "Traube"],
                correct: 1
            },
            {
                type: "multiple-choice",
                question: "Как се казва 'книга' на немски?",
                answers: ["Buch", "Stift", "Tisch", "Stuhl"],
                correct: 1
            },
            {
                type: "grammar",
                question: "Поправете грешката: 'Sie geht zu Schule.'",
                correctAnswer: "Sie geht zur Schule."
            },
            {
                type: "multiple-choice",
                question: "Как се казва 'куче' на немски?",
                answers: ["Hund", "Katze", "Vogel", "Fisch"],
                correct: 1
            },
            {
                type: "multiple-choice",
                question: "Как се казва 'къща' на немски?",
                answers: ["Haus", "Wohnung", "Gebäude", "Zimmer"],
                correct: 1
            }
        ],
        A2: [
            {
                type: "multiple-choice",
                question: "Как се казва 'закуска' на немски?",
                answers: ["Frühstück", "Mittagessen", "Abendessen", "Snack"],
                correct: 1
            },
            {
                type: "grammar",
                question: "Поправете грешката: 'Ich bin gehe in den Park.'",
                correctAnswer: "Ich gehe in den Park."
            },
            {
                type: "multiple-choice",
                question: "Как се казва 'време' (метеорологично) на немски?",
                answers: ["Wetter", "Jahreszeit", "Temperatur", "Klima"],
                correct: 1
            },
            {
                type: "grammar",
                question: "Поправете грешката: 'Sie magt kein Kaffee.'",
                correctAnswer: "Sie mag keinen Kaffee."
            },
            {
                type: "multiple-choice",
                question: "Как се казва 'работа' на немски?",
                answers: ["Job", "Arbeit", "Büro", "Karriere"],
                correct: 2
            }
        ],
        B1: [
            {
                type: "multiple-choice",
                question: "Изберете правилната форма: 'Ich ___ (wohnen) seit 5 Jahren in London.'",
                answers: ["habe gewohnt", "wohnte", "hatte gewohnt"],
                correct: 1
            },
            {
                type: "grammar",
                question: "Поправете грешката: 'Wenn ich du wäre, würde ich gehen.'",
                correctAnswer: "Wenn ich du wäre, würde ich gehen."
            },
            {
                type: "multiple-choice",
                question: "Изберете правилната форма: 'Als wir ankamen, ___ (beginnen) der Film.'",
                answers: ["hatte begonnen", "begann", "hat begonnen"],
                correct: 1
            },
            {
                type: "multiple-choice",
                question: "Изберете правилната форма: 'Sie ___ (wohnen) hier seit 2010.'",
                answers: ["hat gewohnt", "wohnte", "hatte gewohnt"],
                correct: 1
            },
            {
                type: "grammar",
                question: "Поправете грешката: 'Das Buch wurde geschrieben von ihm.'",
                correctAnswer: "Das Buch wurde von ihm geschrieben."
            }
        ],
        B2: [
            {
                type: "multiple-choice",
                question: "Изберете правилната форма: 'Ich wünschte, ich ___ (sein) gestern dort.'",
                answers: ["wäre", "war", "wäre gewesen"],
                correct: 3
            },
            {
                type: "grammar",
                question: "Поправете грешката: 'Er sagte, er wird morgen kommen.'",
                correctAnswer: "Er sagte, er würde morgen kommen."
            },
            {
                type: "multiple-choice",
                question: "Изберете правилната форма: 'Das ist der beste Film, den ich ___ (sehen).'",
                answers: ["je gesehen habe", "je gesehen hatte", "sah"],
                correct: 1
            },
            {
                type: "grammar",
                question: "Поправете грешката: 'Sie arbeitet hier seit 5 Jahren.'",
                correctAnswer: "Sie arbeitet hier seit 5 Jahren."
            },
            {
                type: "multiple-choice",
                question: "Изберете правилната форма: 'Wenn er ___ (anrufen), sag ihm, dass ich beschäftigt bin.'",
                answers: ["anruft", "anrufen wird", "anrief"],
                correct: 1
            }
        ],
        C1: [
            {
                type: "multiple-choice",
                question: "Изберете правилната форма: 'Wenn ich ___ (wissen), hätte ich es dir gesagt.'",
                answers: ["wüsste", "weiß", "gewusst hätte"],
                correct: 1
            },
            {
                type: "grammar",
                question: "Поправете грешката: 'Wenn ich du wäre, würde ich gehen.'",
                correctAnswer: "Wenn ich du wäre, würde ich gehen."
            },
            {
                type: "multiple-choice",
                question: "Изберете правилната форма: 'Als wir ankamen, ___ (beginnen) der Film.'",
                answers: ["hatte begonnen", "begann", "hat begonnen"],
                correct: 1
            },
            {
                type: "multiple-choice",
                question: "Изберете правилната форма: 'Sie ___ (wohnen) hier seit 2010.'",
                answers: ["hat gewohnt", "wohnte", "hatte gewohnt"],
                correct: 1
            },
            {
                type: "grammar",
                question: "Поправете грешката: 'Das Buch wurde geschrieben von ihm.'",
                correctAnswer: "Das Buch wurde von ihm geschrieben."
            }
        ],
        C2: [
            {
                type: "multiple-choice",
                question: "Изберете правилната форма: 'Hätte ich es gewusst, ___ (sagen) ich es dir.'",
                answers: ["hätte gesagt", "würde sagen", "sagte"],
                correct: 1
            },
            {
                type: "grammar",
                question: "Поправете грешката: 'Das Treffen wurde gehalten im Hauptsaal.'",
                correctAnswer: "Das Treffen fand im Hauptsaal statt."
            },
            {
                type: "multiple-choice",
                question: "Изберете правилната форма: 'Kaum ___ (ankommen), begann das Treffen.'",
                answers: ["war ich angekommen", "kam ich an", "bin ich angekommen"],
                correct: 1
            },
            {
                type: "grammar",
                question: "Поправете грешката: 'Er spricht Deutsch, als ob er ist ein Muttersprachler.'",
                correctAnswer: "Er spricht Deutsch, als ob er ein Muttersprachler wäre."
            },
            {
                type: "multiple-choice",
                question: "Изберете правилната форма: 'Kaum ___ (beenden) ich den Bericht, rief der Chef an.'",
                answers: ["hatte ich beendet", "beendete ich", "habe ich beendet"],
                correct: 1
            }
        ]
    },
        english: {
        A1: [
            {
                type: "multiple-choice",
                question: "Как да кажем 'ябълка' на английски?",
                answers: ["apple", "banana", "orange", "grape"],
                correct: 1
            },
            {
                type: "multiple-choice",
                question: "Как да кажем 'книга' на английски?",
                answers: ["book", "pen", "desk", "chair"],
                correct: 1
            },
            {
                type: "grammar",
                question: "Поправете грешката: 'She go to school.'",
                correctAnswer: "She goes to school."
            },
            {
                type: "multiple-choice",
                question: "Как да кажем 'куче' на английски?",
                answers: ["dog", "cat", "bird", "fish"],
                correct: 1
            },
            {
                type: "multiple-choice",
                question: "Как да кажем 'къща' на английски?",
                answers: ["house", "apartment", "building", "room"],
                correct: 1
            }
        ],
        A2: [
            {
                type: "multiple-choice",
                question: "Как да кажем 'закуска' на английски?",
                answers: ["breakfast", "lunch", "dinner", "snack"],
                correct: 1
            },
            {
                type: "grammar",
                question: "Поправете грешката: 'I am go to the park.'",
                correctAnswer: "I am going to the park."
            },
            {
                type: "multiple-choice",
                question: "Как да кажем 'погода' на английски?",
                answers: ["weather", "season", "temperature", "climate"],
                correct: 1
            },
             {
                type: "grammar",
                question: "Поправете грешката: 'She don't like coffee.'",
                correctAnswer: "She doesn't like coffee."
            },
            {
                type: "multiple-choice",
                 question: "Как да кажем 'работа' на английски?",
                answers: ["job", "work", "office", "career"],
                correct: 2
            }
        ],
        B1: [
            {
                type: "multiple-choice",
                question: "Изберете правилната форма: 'I ___ (to live) in London for 5 years.'",
                answers: ["have lived", "lived", "had lived"],
                correct: 1
            },
            {
                type: "grammar",
                question: "Поправете грешката: 'If I was you, I would go.'",
                correctAnswer: "If I were you, I would go."
            },
            {
                type: "multiple-choice",
                question: "Изберете правилната форма: 'By the time we arrived, the movie ___ (to start).'",
                answers: ["had started", "started", "has started"],
                correct: 1
            },
           {
                type: "multiple-choice",
                question: "Изберете правилната форма: 'She ___ (to live) here since 2010.'",
                answers: ["has lived", "lived", "had lived"],
                correct: 1
            },
            {
                type: "grammar",
                question: "Поправете грешката: 'The book was wrote by him.'",
                correctAnswer: "The book was written by him."
            }
        ],
        B2: [
            {
                type: "multiple-choice",
                 question: "Изберете правилната форма: 'I wish I ___ (to be) there yesterday.'",
                answers: ["was", "were", "had been"],
                correct: 3
            },
             {
                type: "grammar",
                question: "Поправете грешката: 'He said he will come tomorrow.'",
                correctAnswer: "He said he would come tomorrow."
            },
            {
                 type: "multiple-choice",
                 question: "Изберете правилната форма: 'This is the best movie I ___ (to see).'",
                answers: ["have ever seen", "had ever seen", "saw"],
                correct: 1
            },
            {
                 type: "grammar",
                question: "Поправете грешката: 'She has been working here since 5 years.'",
                correctAnswer: "She has been working here for 5 years."
            },
            {
                 type: "multiple-choice",
                  question: "Изберете правилната форма: 'If he ___ (to call), tell him I'm busy.'",
                 answers: ["calls", "will call", "called"],
                correct: 1
            }
        ],
        C1: [
             {
                 type: "multiple-choice",
                question: "Изберете правилната форма: 'If I ___ (to know), I would tell you.'",
                answers: ["knew", "know", "had known"],
                 correct: 1
            },
            {
                type: "grammar",
                question: "Поправете грешката: 'If I was you, I would go.'",
                correctAnswer: "If I were you, I would go."
            },
             {
                  type: "multiple-choice",
                 question: "Изберете правилната форма: 'By the time we arrived, the movie ___ (to start).'",
                answers: ["had started", "started", "has started"],
                correct: 1
            },
            {
                 type: "multiple-choice",
                 question: "Изберете правилната форма: 'She ___ (to live) here since 2010.'",
                 answers: ["has lived", "lived", "had lived"],
                correct: 1
            },
            {
                 type: "grammar",
                question: "Поправете грешката: 'The book was wrote by him.'",
                correctAnswer: "The book was written by him."
            }
        ],
        C2: [
            {
                 type: "multiple-choice",
                question: "Изберете правилната форма: 'Had I known, I ___ (to tell) you.'",
                 answers: ["would have told", "would tell", "told"],
                correct: 1
            },
             {
                type: "grammar",
                question: "Поправете грешката: 'The meeting was hold in the main hall.'",
                correctAnswer: "The meeting was held in the main hall."
            },
             {
                 type: "multiple-choice",
                question: "Изберете правилната форма: 'No sooner ___ (to arrive) than the meeting started.'",
                answers: ["had I arrived", "I arrived", "did I arrive"],
                 correct: 1
             },
             {
                  type: "grammar",
                question: "Поправете грешката: 'He speaks English as if he is a native speaker.'",
                 correctAnswer: "He speaks English as if he were a native speaker."
            },
             {
                  type: "multiple-choice",
                question: "Изберете правилната форма: 'Hardly ___ (to finish) the report when the boss called.'",
                 answers: ["had I finished", "I finished", "did I finish"],
                correct: 1
            }
        ]
    },
    bulgarian: {
        A1: [
            {
                type: "multiple-choice",
                question: "Как се казва 'ябълка' на български?",
                answers: ["ябълка", "банан", "портокал", "грозде"],
                correct: 1
            },
            {
                type: "multiple-choice",
                question: "Как се казва 'книга' на български?",
                answers: ["книга", "химикалка", "бюро", "стол"],
                correct: 1
            },
            {
                type: "grammar",
                question: "Поправете грешката: 'Тя отиде в училище.'",
                correctAnswer: "Тя отива в училище."
            },
             {
                type: "multiple-choice",
                question: "Как се казва 'куче' на български?",
                answers: ["куче", "котка", "птица", "риба"],
                correct: 1
            },
            {
                type: "multiple-choice",
                question: "Как се казва 'къща' на български?",
                answers: ["къща", "апартамент", "сграда", "стая"],
                correct: 1
            }
        ],
        A2: [
            {
                type: "multiple-choice",
                question: "Как се казва 'закуска' на български?",
                answers: ["закуска", "обяд", "вечеря", "мезе"],
                correct: 1
            },
            {
                type: "grammar",
                question: "Поправете грешката: 'Аз съм отива в парка.'",
                correctAnswer: "Аз отивам в парка."
            },
            {
                type: "multiple-choice",
                question: "Как се казва 'време' (метеорологично) на български?",
                answers: ["време", "сезон", "температура", "климат"],
                correct: 1
            },
            {
                type: "grammar",
                question: "Поправете грешката: 'Тя не харесвам кафе.'",
                correctAnswer: "Тя не харесва кафе."
            },
            {
                type: "multiple-choice",
                question: "Как се казва 'работа' на български?",
                answers: ["работа", "занятие", "офис", "кариера"],
                correct: 1
            }
        ],
        B1: [
             {
                type: "multiple-choice",
                question: "Изберете правилната форма: 'Аз ___ (живея) в Лондон от 5 години.'",
                answers: ["живея", "съм живял", "бях живял"],
                correct: 1
            },
             {
                type: "grammar",
                 question: "Поправете грешката: 'Ако бях ти, щях да отида.'",
                correctAnswer: "Ако бях на твое място, щях да отида."
            },
            {
                type: "multiple-choice",
                question: "Изберете правилната форма: 'Когато пристигнахме, филмът ___ (започне).'",
                answers: ["беше започнал", "започна", "е започнал"],
                correct: 1
            },
             {
                 type: "multiple-choice",
                question: "Изберете правилната форма: 'Тя ___ (живея) тук от 2010.'",
                answers: ["живее", "е живяла", "беше живяла"],
                correct: 1
            },
             {
                 type: "grammar",
                question: "Поправете грешката: 'Книгата беше написана от него.'",
                correctAnswer: "Книгата беше написана от него."
            }
        ],
        B2: [
            {
               type: "multiple-choice",
                question: "Изберете правилната форма: 'Иска ми се да бях ___ (съм) там вчера.'",
                 answers: ["съм бил", "бил", "да съм била"],
                correct: 3
            },
            {
                 type: "grammar",
                question: "Поправете грешката: 'Той каза, че ще дойде утре.'",
                 correctAnswer: "Той каза, че ще дойде утре."
            },
            {
                 type: "multiple-choice",
                question: "Изберете правилната форма: 'Това е най-добрият филм, който ___ (виждам).'",
                 answers: ["съм виждал", "бях виждал", "виждах"],
                correct: 1
            },
            {
                 type: "grammar",
                question: "Поправете грешката: 'Тя работи тук от 5 години.'",
                correctAnswer: "Тя работи тук от 5 години."
            },
            {
                 type: "multiple-choice",
                 question: "Изберете правилната форма: 'Ако той ___ (се обади), кажи му, че съм зает.'",
                answers: ["се обади", "ще се обади", "се обаждаше"],
                correct: 1
            }
        ],
         C1: [
             {
                 type: "multiple-choice",
                question: "Изберете правилната форма: 'Ако ___ (знаех), щях да ти кажа.'",
                answers: ["знаех", "зная", "бях знаел"],
                 correct: 1
            },
             {
                type: "grammar",
                 question: "Поправете грешката: 'Ако бях ти, щях да отида.'",
                correctAnswer: "Ако бях на твое място, щях да отида."
            },
            {
                 type: "multiple-choice",
                question: "Изберете правилната форма: 'Когато пристигнахме, филмът ___ (започне).'",
                 answers: ["беше започнал", "започна", "е започнал"],
                correct: 1
            },
             {
                 type: "multiple-choice",
                question: "Изберете правилната форма: 'Тя ___ (живея) тук от 2010.'",
                 answers: ["живее", "е живяла", "беше живяла"],
                 correct: 1
            },
             {
                  type: "grammar",
                question: "Поправете грешката: 'Книгата беше написана от него.'",
                correctAnswer: "Книгата беше написана от него."
            }
        ],
        C2: [
            {
                  type: "multiple-choice",
                 question: "Изберете правилната форма: 'Ако бях знаел, щях да ти ___ (кажа).'",
                answers: ["кажа", "кажа,бих казал", "бях казал"],
                correct: 1
            },
             {
                type: "grammar",
                 question: "Поправете грешката: 'Срещата беше проведена в главната зала.'",
                correctAnswer: "Срещата се проведе в главната зала."
            },
            {
                  type: "multiple-choice",
                question: "Изберете правилната форма: 'Едва бяхме ___ (пристигам), когато срещата започна.'",
                answers: ["пристигнали", "пристигнахме", "пристигнали бяхме"],
                 correct: 1
            },
            {
                 type: "grammar",
                 question: "Поправете грешката: 'Той говори английски, сякаш е роден говорител.'",
                 correctAnswer: "Той говори английски, сякаш е роден говорител."
            },
            {
                 type: "multiple-choice",
                  question: "Изберете правилната форма: 'Едва ___ (завърша) отчета, шефът се обади.'",
                answers: ["бях завършил", "завърших", "завършвах"],
                 correct: 1
            }
        ]
    }
};

// Инициализация при зареждане на страницата
document.addEventListener('DOMContentLoaded', function() {
    updateSectionStyles();

    // Показваме началната секция
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

// Обновяваме функцията hideAllSections
function hideAllSections() {
    const sections = [
        'language-choice',
        'level-choice',
        'quiz-section',
        'results-section',
        'profile-section',
        'shop-section'
    ];

    sections.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element && !element.classList.contains('hidden')) {
            // Първо стартираме анимацията
            element.style.opacity = '0';
            element.style.transform = 'translateY(-20px)';

            // След края на анимацията скриваме елемента
            setTimeout(() => {
                element.classList.add('hidden');
            }, 300);
        }
    });
}

// Обща функция за показване на секция
function showSection(sectionId) {
    // Първо скриваме всички секции
    hideAllSections();

    // Изчакваме края на анимацията за скриване
    setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
            // Първо премахваме класа hidden
            section.classList.remove('hidden');

            // Задаваме начално състояние за анимацията
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';

            // Стартираме анимацията за показване
            requestAnimationFrame(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            });
        }
    }, 300);
}

// Обновяваме функциите за превключване на раздели
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

        // Филтрираме само получените постижения
        const unlockedAchievements = state.achievements.filter(achievement =>
            state.userProfile.achievements.includes(achievement.id)
        );

        profileSection.innerHTML = `
            <div class="profile-header">
                <h2>👤 Профил</h2>
                <button onclick="toggleTheme()" class="theme-button">
                    ${state.isDarkTheme ? '☀️ Светла тема' : '🌙 Тъмна тема'}
                </button>
            </div>

            <div class="profile-stats">
                <div class="stat-card">
                    <div class="stat-icon">👑</div>
                    <div class="stat-info">
                        <h3>Ниво ${state.userProfile.level}</h3>
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
                        <p>Общо въпроси: ${state.userProfile.totalQuestions}</p>
                        <p>Правилни отговори: ${state.userProfile.correctAnswers}</p>
                        <p>Точност: ${accuracy}%</p>
                    </div>
                </div>

                <div class="stat-card">
                    <div class="stat-icon">💰</div>
                    <div class="stat-info">
                        <h3>Монети</h3>
                        <p>${state.coins} монети</p>
                    </div>
                </div>
            </div>

            ${unlockedAchievements.length > 0 ? `
                <div class="achievements-section">
                    <h3>🏆 Получени постижения</h3>
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
                <p class="coins-balance">💰 ${state.coins} монети</p>
            </div>
            <div class="shop-items">
                <div class="shop-item">
                    <h3>💡 Подсказка</h3>
                    <p>Помага с труден въпрос</p>
                    <p class="price">10 монети</p>
                    <button onclick="buyHint()" class="shop-button" ${state.coins < 10 ? 'disabled' : ''}>
                        ${state.coins < 10 ? 'Няма достатъчно монети' : 'Купи'}
                    </button>
                </div>
                            `;
                        }, 300);
                    }


                    // Обновяваме стиловете за секциите
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

                            /* Добавяме състояния за анимация */
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

                    // Зареждане на въпроси
                    function loadQuestions() {
                        const quizQuestions = questions[state.selectedLanguage][state.selectedLevel];
                        if (quizQuestions && quizQuestions.length > 0) {
                            state.currentQuestion = 0;
                            state.score = 0;
                            showQuestion(quizQuestions);
                            startTimer();
                        } else {
                            document.getElementById('result').textContent = "Въпросите за това ниво все още не са налични.";
                        }
                    }

                    // Скриване на всички секции
                    function hideAllSections() {
                        const sections = [
                            'language-choice',
                            'level-choice',
                            'quiz-section',
                            'results-section',
                            'profile-section',
                            'shop-section'
                        ];

                        sections.forEach(section => {
                            const element = document.getElementById(section);
                            if (element) {
                                // Добавяме проверка, за да не скриваме вече скрити секции
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

                    // Функция за превключване на темата
                    function toggleTheme() {
                        state.isDarkTheme = !state.isDarkTheme;
                        document.body.classList.toggle('dark-theme');
                        localStorage.setItem('theme', state.isDarkTheme ? 'dark' : 'light');
                        updateThemeButton();
                    }

                    // Обновяване на бутона за темата
                    function updateThemeButton() {
                        const themeButton = document.querySelector('button[onclick="toggleTheme()"]');
                        if (themeButton) {
                            themeButton.innerHTML = state.isDarkTheme ? '☀️ Светла тема' : '🌙 Тъмна тема';
                        }
                    }

                    // Обновяване на показването на монетите
                    function updateCoinsDisplay() {
                        const coinsDisplays = document.querySelectorAll('.coins-balance');
                        coinsDisplays.forEach(display => {
                            display.textContent = `💰 ${state.coins} монети`;
                        });
                    }

                    // Показване на въпрос
                    function showQuestion(quizQuestions) {
                        const questionElement = document.getElementById('question');
                        const optionsElement = document.getElementById('options');
                        const writingElement = document.getElementById('writing');
                        const resultElement = document.getElementById('result');

                        // Изчистваме предишните елементи
                        optionsElement.innerHTML = '';
                        writingElement.innerHTML = '';
                        resultElement.textContent = '';

                        const currentQ = quizQuestions[state.currentQuestion];

                        // Анимация за поява на въпроса
                        questionElement.style.opacity = '0';
                        questionElement.textContent = currentQ.question;
                        setTimeout(() => {
                            questionElement.style.opacity = '1';
                        }, 100);

                        switch (currentQ.type) {
                            case "multiple-choice":
                                // Разбъркваме вариантите за отговор
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
                                input.placeholder = "Въведете поправения текст...";
                                input.className = 'grammar-input';

                                const submitButton = document.createElement('button');
                                submitButton.textContent = "Провери";
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

                        // Добавяме панел с подсказки
                        const hintsPanel = document.createElement('div');
                        hintsPanel.className = 'hints-panel';
                        hintsPanel.innerHTML = `
                            <button onclick="useFiftyFifty()" class="hint-button" ${state.hints.fiftyFifty > 0 ? '' : 'disabled'}>
                                💫 50/50 (${state.hints.fiftyFifty})
                            </button>
                            <button onclick="useSkipQuestion()" class="hint-button" ${state.hints.skipQuestion > 0 ? '' : 'disabled'}>
                                ⏭️ Пропусни (${state.hints.skipQuestion})
                            </button>
                            <button onclick="useExtraTime()" class="hint-button" ${state.hints.extraTime > 0 ? '' : 'disabled'}>
                                ⏰ +30 сек (${state.hints.extraTime})
                            </button>
                        `;

                        document.getElementById('quiz-section').insertBefore(hintsPanel, optionsElement);
                    }

                    // Проверка на отговора
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

    // Обновяваме статистиката
    updateStatistics(isCorrect);

    // Пусни звуков ефект в зависимост от отговора
    const correctSound = document.getElementById('correct-sound');
    const wrongSound = document.getElementById('wrong-sound');

    if (isCorrect) {
        // Увеличаваме резултата и монетите
        state.score++;
        state.coins += 5;
        updateCoinsDisplay();

        // Добавяме XP
        updateXP(10);

        resultElement.innerHTML = `
            <div class="result-message correct-answer">
                <span class="emoji">🎉</span>
                Отлично! Правилен отговор!
                <span class="points">+10 XP • +5 монети</span>
            </div>
        `;

        // Пусни звук за правилен отговор
        correctSound.currentTime = 0; // Рестартиране на звука
        correctSound.play();

        // Ефект на конфети
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    } else {
        resultElement.innerHTML = `
            <div class="result-message wrong-answer">
                <span class="emoji">😢</span>
                Не е съвсем така...
                <div class="correct-text">
                    Правилният отговор е:<br>
                    ${currentQ.correctAnswer || quizQuestions[state.currentQuestion].answers[currentQ.correct - 1]}
                </div>
            </div>
        `;

        // Пусни звук за грешен отговор
        wrongSound.currentTime = 0; // Рестартиране на звука
        wrongSound.play();
    }

    // Проверяваме за постижения
    checkAchievements();

    // Запазваме прогреса
    localStorage.setItem('coins', state.coins);
    localStorage.setItem('score', state.score);

    // Преминаваме към следващия въпрос
    setTimeout(() => {
        state.currentQuestion++;
        if (state.currentQuestion < quizQuestions.length) {
            showQuestion(quizQuestions);
        } else {
            showFinalResults();
        }
    }, 2000);
}

                    // Показване на магазина
                    function showShop() {
                        showSection('shop-section');
                        setTimeout(() => {
                            const shopSection = document.getElementById('shop-section');
                            shopSection.innerHTML = `
                                <div class="shop-header">
                                    <h2>🛍️ Магазин</h2>
                                    <p class="coins-balance">💰 ${state.coins} монети</p>
                                </div>
                                <div class="shop-items">
                                    <div class="shop-item">
                                        <h3>💡 Подсказка</h3>
                                        <p>Помага с труден въпрос</p>
                                        <p class="price">10 монети</p>
                                        <button onclick="buyHint()" class="shop-button" ${state.coins < 10 ? 'disabled' : ''}>
                                            ${state.coins < 10 ? 'Няма достатъчно монети' : 'Купи'}
                                        </button>
                                    </div>
                                </div>
                            `;
                        }, 300);
                    }

                    // Помощна функция за разбъркване на масив
                    function shuffleArray(array) {
                        for (let i = array.length - 1; i > 0; i--) {
                            const j = Math.floor(Math.random() * (i + 1));
                            [array[i], array[j]] = [array[j], array[i]];
                        }
                        return array;
                    }

                    // Обновяване на прогрес бара
                    function updateProgressBar() {
                        const progressBar = document.getElementById('progress');
                        const quizQuestions = questions[state.selectedLanguage][state.selectedLevel];
                        const progress = ((state.currentQuestion + 1) / quizQuestions.length) * 100;
                        progressBar.style.width = `${progress}%`;
                    }

                    // Показване на финалните резултати
                    function showFinalResults() {
                        const quizSection = document.getElementById('quiz-section');
                        const resultsSection = document.getElementById('results-section');

                        quizSection.classList.add('hidden');
                        resultsSection.classList.remove('hidden');

                        // Запазваме финалните резултати
                        const totalQuestions = questions[state.selectedLanguage][state.selectedLevel].length;
                        const accuracy = Math.round((state.score / totalQuestions) * 100);
                        const earnedCoins = state.score * 5;
                        const earnedXP = state.score * 10;

                        const finalScore = document.getElementById('final-score');
                        finalScore.innerHTML = `
                            <div class="result-message correct-answer">
                                <span class="emoji">🎉</span>
                                <h2>Отлична работа!</h2>

                                <div class="results-stats">
                                    <div class="result-stat">
                                        <div class="stat-icon">✅</div>
                                        <div class="stat-info">
                                            <h3>Правилни отговори</h3>
                                            <p class="stat-value">${state.score} от ${totalQuestions}</p>
                                        </div>
                                    </div>

                                    <div class="result-stat">
                                        <div class="stat-icon">⭐️</div>
                                        <div class="stat-info">
                                            <h3>Точност</h3>
                                            <p class="stat-value">${accuracy}%</p>
                                        </div>
                                    </div>

                                    <div class="result-stat">
                                        <div class="stat-icon">💰</div>
                                        <div class="stat-info">
                                            <h3>Спечелени монети</h3>
                                            <p class="stat-value">+${earnedCoins}</p>
                                        </div>
                                    </div>

                                    <div class="result-stat">
                                        <div class="stat-icon">📈</div>
                                        <div class="stat-info">
                                            <h3>Опит</h3>
                                            <p class="stat-value">+${earnedXP} XP</p>
                                        </div>
                                    </div>
                                </div>

                                <div class="results-buttons">
                                    <button onclick="restartQuiz()" class="restart-button">
                                        🔄 Опитай пак
                                    </button>
                                    <button onclick="showProfile()" class="profile-button">
                                        👤 Към профила
                                    </button>
                                </div>
                            </div>
                        `;

                        // Ефект на конфети
                        confetti({
                            particleCount: 200,
                            spread: 90,
                            origin: { y: 0.3 }
                        });
                    }

                    // Стартиране на таймера
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

                    // Рестартиране на теста
                    function restartQuiz() {
                        // Нулираме състоянието
                        state.currentQuestion = 0;
                        state.score = 0;

                        // Скриваме всички секции
                        hideAllSections();

                        // Показваме секцията за избор на език
                        const languageSection = document.getElementById('language-choice');
                        languageSection.classList.remove('hidden');
                        languageSection.style.opacity = '1';
                        languageSection.style.transform = 'translateY(0)';

                        // Нулираме избрания език и ниво
                        state.selectedLanguage = '';
                        state.selectedLevel = '';
                    }

                    // Покупка на подсказка
                    function buyHint() {
                        if (state.coins >= 10) {
                            state.coins -= 10;
                            state.hints.regular++;
                            updateCoinsDisplay();
                            showNotification('💡 Подсказка закупена!', 'success');
                            localStorage.setItem('coins', state.coins);
                            localStorage.setItem('hints', JSON.stringify(state.hints));
                            showShop(); // Обновяваме показването на магазина
                        } else {
                            showNotification('Няма достатъчно монети!', 'error');
                        }
                    }

                    // Покупка на XP бустер
                    function buyXPBooster() {
                        if (state.coins >= 30) {
                            state.coins -= 30;
                            state.xpBoosterActive = true;
                            updateCoinsDisplay();
                            showNotification('⚡️ XP бустер активиран за 1 час!', 'success');
                            localStorage.setItem('coins', state.coins);
                            showShop(); // Обновяваме показването на магазина

                            // Запазваме времето за активация на бустера
                            const boosterEndTime = Date.now() + 3600000; // 1 час
                            localStorage.setItem('xpBoosterEndTime', boosterEndTime);

                            setTimeout(() => {
                                state.xpBoosterActive = false;
                                showNotification('Действието на XP бустера изтече', 'info');
                                localStorage.removeItem('xpBoosterEndTime');
                            }, 3600000);
                        } else {
                            showNotification('Няма достатъчно монети!', 'error');
                        }
                    }

                    // Създаваме контейнер за уведомления, ако все още не съществува
                    function createNotificationContainer() {
                        let container = document.querySelector('.notification-container');
                        if (!container) {
                            container = document.createElement('div');
                            container.className = 'notification-container';
                            document.body.appendChild(container);
                        }
                        return container;
                    }

                    // Обновена функция за показване на уведомления
                    function showNotification(message, type = 'info') {
                        const container = createNotificationContainer();
                        const notification = document.createElement('div');
                        notification.className = `notification ${type}`;
                        notification.textContent = message;

                        container.appendChild(notification);

                        // Анимация за появяване
                        requestAnimationFrame(() => {
                            notification.classList.add('show');
                        });

                        // Автоматично изтриване
                        setTimeout(() => {
                            notification.classList.remove('show');
                            setTimeout(() => {
                                notification.remove();
                                // Ако в контейнера няма повече уведомления, изтриваме го
                                if (container.children.length === 0) {
                                    container.remove();
                                }
                            }, 300);
                        }, 3000);
                    }

                    // Обновена функция за показване на постижения
                    function showAchievementNotification(achievement) {
                        const container = createNotificationContainer();
                        const notification = document.createElement('div');
                        notification.className = 'achievement-notification';
                        notification.innerHTML = `
                            <div class="achievement-icon">${achievement.icon}</div>
                            <div class="achievement-info">
                                <h4>🏆 Ново постижение!</h4>
                                <h4>${achievement.name}</h4>
                                <p>${achievement.description}</p>
                            </div>
                        `;

                        container.appendChild(notification);

                        // Звуков ефект
                        const audio = new Audio('achievement.mp3');
                        audio.play().catch(() => {});

                        // Анимация за появяване
                        requestAnimationFrame(() => {
                            notification.classList.add('slideIn');
                        });

                        // Ефект на конфети
                        confetti({
                            particleCount: 100,
                            spread: 70,
                            origin: { x: 1, y: 0 }
                        });

                        // Автоматично изтриване
                        setTimeout(() => {
                            notification.classList.remove('slideIn');
                            setTimeout(() => {
                                notification.remove();
                                if (container.children.length === 0) {
                                    container.remove();
                                }
                            }, 500);
                        }, 5000);
                    }


                    // Използване на подсказка
                    function useHint() {
                        if (state.hintsAvailable > 0) {
                            state.hintsAvailable--;
                            const currentQ = questions[state.selectedLanguage][state.selectedLevel][state.currentQuestion];

                            let hintText = '';
                            if (currentQ.type === 'multiple-choice') {
                                const correctAnswer = currentQ.answers[currentQ.correct - 1];
                                hintText = `Подсказка: Правилният отговор започва с "${correctAnswer[0]}"`;
                            } else {
                                hintText = `Подсказка: Обърнете внимание на формата на глагола`;
                            }

                            showNotification(hintText, 'info');

                        } else {
                            showNotification('Нямате налични подсказки!', 'error');
                        }
                    }

                    // Показване на профила
                    function showProfile() {
                        showSection('profile-section');
                        setTimeout(() => {
                            const profileSection = document.getElementById('profile-section');
                            const accuracy = state.userProfile.totalQuestions > 0
                                ? Math.round((state.userProfile.correctAnswers / state.userProfile.totalQuestions) * 100)
                                : 0;

                            // Филтрираме само получените постижения
                            const unlockedAchievements = state.achievements.filter(achievement =>
                                state.userProfile.achievements.includes(achievement.id)
                            );

                            profileSection.innerHTML = `
                                <div class="profile-header">
                                    <h2>👤 Профил</h2>
                                    <button onclick="toggleTheme()" class="theme-button">
                                        ${state.isDarkTheme ? '☀️ Светла тема' : '🌙 Тъмна тема'}
                                    </button>
                                </div>

                                <div class="profile-stats">
                                    <div class="stat-card">
                                        <div class="stat-icon">👑</div>
                                        <div class="stat-info">
                                            <h3>Ниво ${state.userProfile.level}</h3>
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
                                            <p>Общо въпроси: ${state.userProfile.totalQuestions}</p>
                                            <p>Правилни отговори: ${state.userProfile.correctAnswers}</p>
                                            <p>Точност: ${accuracy}%</p>
                                        </div>
                                    </div>

                                    <div class="stat-card">
                                        <div class="stat-icon">💰</div>
                                        <div class="stat-info">
                                            <h3>Монети</h3>
                                            <p>${state.coins} монети</p>
                                        </div>
                                    </div>
                                </div>

                                ${unlockedAchievements.length > 0 ? `
                                    <div class="achievements-section">
                                        <h3>🏆 Получени постижения</h3>
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

                    // Проверка на постижения
                    function checkAchievements() {
                        const achievements = state.achievements;
                        const userAchievements = state.userProfile.achievements;

                        // Първа победа
                        if (!userAchievements.includes('first_win') && state.userProfile.correctAnswers > 0) {
                            unlockAchievement('first_win');
                        }

                        // Идеален резултат
                        if (!userAchievements.includes('perfect_score') &&
                            state.score === questions[state.selectedLanguage][state.selectedLevel].length) {
                            unlockAchievement('perfect_score');
                        }

                        // Богат студент
                        if (!userAchievements.includes('rich_student') && state.coins >= 1000) {
                            unlockAchievement('rich_student');
                        }
                    }

                    // Отключване на постижение
                    function unlockAchievement(achievementId) {
                        if (!state.userProfile.achievements.includes(achievementId)) {
                            state.userProfile.achievements.push(achievementId);
                            const achievement = state.achievements.find(a => a.id === achievementId);
                            showAchievementNotification(achievement);
                            localStorage.setItem('achievements', JSON.stringify(state.userProfile.achievements));
                        }
                    }

                    // Обновяване на XP и нивото
                    function updateXP(amount) {
                        state.userProfile.xp += amount;

                        while (state.userProfile.xp >= state.xpToNextLevel) {
                            state.userProfile.xp -= state.xpToNextLevel;
                            state.userProfile.level++;
                            showNotification(`🎉 Поздравления! Вие достигнахте ниво ${state.userProfile.level}!`, 'success');
                        }

                        localStorage.setItem('userLevel', state.userProfile.level);
                        localStorage.setItem('userXP', state.userProfile.xp);
                    }

                    // Функции за подсказки
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

                            showNotification('50/50 подсказка използвана!', 'info');
                            checkHintAchievement('fiftyFifty');
                        } else {
                            showNotification('Нямате 50/50 подсказки!', 'error');
                        }
                    }

                    function useSkipQuestion() {
                        if (state.hints.skipQuestion > 0) {
                            state.hints.skipQuestion--;
                            state.currentQuestion++;
                            showQuestion(questions[state.selectedLanguage][state.selectedLevel]);
                            showNotification('Въпросът е пропуснат!', 'info');
                            checkHintAchievement('skipQuestion');
                        } else {
                            showNotification('Нямате подсказки за пропускане на въпрос!', 'error');
                        }
                    }

                    function useExtraTime() {
                        if (state.hints.extraTime > 0) {
                            state.hints.extraTime--;
                            clearInterval(state.timer);
                            state.timePerQuestion += 30; // Добавяме 30 секунди
                            startTimer();
                            showNotification('Добавени са 30 секунди!', 'info');
                            checkHintAchievement('extraTime');
                        } else {
                            showNotification('Нямате подсказки за удължаване на времето!', 'error');
                        }
                    }

                    // Функция за проверка на постижения за използване на подсказки
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

                    // Добавяме нова функция за закупуване на пропускане на въпрос
                    function buySkip() {
                        if (state.coins >= 20) {
                            state.coins -= 20;
                            state.hints.skipQuestion++;
                            updateCoinsDisplay();
                            showNotification('⏭️ Пропускане на въпрос закупено!', 'success');
                            localStorage.setItem('coins', state.coins);
                            localStorage.setItem('hints', JSON.stringify(state.hints));
                            showShop(); // Обновяваме показването на магазина
                        } else {
                            showNotification('Няма достатъчно монети!', 'error');
                        }
                    }

                    // Добавяме нова функция за закупуване на допълнително време
                    function buyExtraTime() {
                        if (state.coins >= 25) {
                            state.coins -= 25;
                            state.hints.extraTime++;
                            updateCoinsDisplay();
                            showNotification('⏰ Допълнително време закупено!', 'success');
                            localStorage.setItem('coins', state.coins);
                            localStorage.setItem('hints', JSON.stringify(state.hints));
                            showShop(); // Обновяваме показването на магазина
                        } else {
                            showNotification('Няма достатъчно монети!', 'error');
                        }
                    }

                    // Добавяме функция за купуване на 50/50
                    function buyFiftyFifty() {
                        if (state.coins >= 15) {
                            state.coins -= 15;
                            state.hints.fiftyFifty++;
                            updateCoinsDisplay();
                            showNotification('💫 50/50 закупена!', 'success');
                            localStorage.setItem('coins', state.coins);
                            localStorage.setItem('hints', JSON.stringify(state.hints));
                            showShop(); // Обновяваме показването на магазина
                        } else {
                            showNotification('Няма достатъчно монети!', 'error');
                        }
                    }

                    // Добавяме функциите в глобалния scope
                    window.buySkip = buySkip;
                    window.buyExtraTime = buyExtraTime;
                    window.buyFiftyFifty = buyFiftyFifty;

                    // Добавяме функция за зареждане на запазените подсказки при стартиране
                    function loadSavedHints() {
                        const savedHints = localStorage.getItem('hints');
                        if (savedHints) {
                            state.hints = JSON.parse(savedHints);
                        }

                        // Проверяваме за активен XP бустер
                        const boosterEndTime = localStorage.getItem('xpBoosterEndTime');
                        if (boosterEndTime) {
                            const timeLeft = boosterEndTime - Date.now();
                            if (timeLeft > 0) {
                                state.xpBoosterActive = true;
                                setTimeout(() => {
                                    state.xpBoosterActive = false;
                                    showNotification('Действието на XP бустера изтече', 'info');
                                    localStorage.removeItem('xpBoosterEndTime');
                                }, timeLeft);
                            } else {
                                localStorage.removeItem('xpBoosterEndTime');
                            }
                        }
                    }

                    // Добавяме извикване на функцията за зареждане при инициализация
                    document.addEventListener('DOMContentLoaded', function() {
                        // ... съществуващ код ...
                        loadSavedHints();
                    });

                    // Добавяме всички функции в глобалния scope
                    window.buyHint = buyHint;
                    window.buyXPBooster = buyXPBooster;
                    window.buySkip = buySkip;
                    window.buyExtraTime = buyExtraTime;

                    // Добавяме функционалност за менюто
                    const menuToggle = document.getElementById('menu-toggle');
                    const sidebar = document.querySelector('.sidebar');
                    const mainContent = document.querySelector('.main-content');

                    menuToggle.addEventListener('click', () => {
                        sidebar.classList.toggle('open');
                        mainContent.classList.toggle('sidebar-open');

                        // Променяме иконката
                        const menuIcon = menuToggle.querySelector('.menu-icon');
                        if (sidebar.classList.contains('open')) {
                            menuIcon.textContent = '×';
                            menuToggle.style.left = '290px'; // За десктоп
                        } else {
                            menuIcon.textContent = '☰';
                            menuToggle.style.left = '1rem';
                        }
                    });

                    // Затваряме менюто при клик извън него на мобилни устройства
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

                    // Обновяваме позицията на бутона при промяна на размера на прозореца
                    window.addEventListener('resize', () => {
                        if (window.innerWidth <= 768) {
                            menuToggle.style.left = '1rem';
                        } else if (sidebar.classList.contains('open')) {
                            menuToggle.style.left = '290px';
                        }
                    });

                    // Добавяме функции за работа със статистиката
                    function updateStatistics(isCorrect) {
                        // Обновяваме общата статистика
                        state.userProfile.totalQuestions++;
                        if (isCorrect) {
                            state.userProfile.correctAnswers++;
                        }

                        // Запазваме в localStorage
                        localStorage.setItem('totalQuestions', state.userProfile.totalQuestions);
                        localStorage.setItem('correctAnswers', state.userProfile.correctAnswers);

                        // Обновяваме отображение если открыт профиль
                        // Обновяваме отображение если открыт профиль
                                    updateProfileStats();
                                }

                                function updateProfileStats() {
                                    const profileSection = document.getElementById('profile-section');
                                    if (!profileSection.classList.contains('hidden')) {
                                        const accuracy = state.userProfile.totalQuestions > 0
                                            ? Math.round((state.userProfile.correctAnswers / state.userProfile.totalQuestions) * 100)
                                            : 0;

                                        // Обновяваме статистиката в профила
                                        const statsHtml = `
                                            <div class="stats-container">
                                                <div class="stat-card">
                                                    <div class="stat-icon">📊</div>
                                                    <div class="stat-info">
                                                        <h3>Статистика</h3>
                                                        <p>Общо въпроси: ${state.userProfile.totalQuestions}</p>
                                                        <p>Правилни отговори: ${state.userProfile.correctAnswers}</p>
                                                        <p>Точност: ${accuracy}%</p>
                                                    </div>
                                                </div>
                                                <div class="stat-card">
                                                    <div class="stat-icon">⭐️</div>
                                                    <div class="stat-info">
                                                        <h3>Ниво ${state.userProfile.level}</h3>
                                                        <div class="xp-progress">
                                                            <div class="xp-bar" style="width: ${(state.userProfile.xp / state.xpToNextLevel) * 100}%"></div>
                                                        </div>
                                                        <p>${state.userProfile.xp}/${state.xpToNextLevel} XP</p>
                                                    </div>
                                                </div>
                                                <div class="stat-card">
                                                    <div class="stat-icon">💰</div>
                                                    <div class="stat-info">
                                                        <h3>Монети</h3>
                                                        <p>${state.coins} монети</p>
                                                    </div>
                                                </div>
                                            </div>
                                        `;

                                        // Обновяваме секцията със статистика
                                        const statsSection = profileSection.querySelector('.profile-stats');
                                        if (statsSection) {
                                            statsSection.innerHTML = statsHtml;
                                        }
                                    }
                                }
