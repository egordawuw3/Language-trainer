// Функция для открытия/закрытия бокового меню
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
}


// Функции для других кнопок (замените на логику, которая вам нужна)
function showProfile() {
    alert('Открыть профиль');
}

function showShop() {
    alert('Открыть магазин');
}

function restartQuiz() {
    alert('Перезапустить тест');
}

// Задержка для загрузочного экрана
setTimeout(function() {
    document.getElementById('loading-screen').style.display = 'none';
    document.getElementById('language-screen').style.display = 'flex';
}, 3000); // Задержка 3 секунды

// Кнопка "Погнали" для перехода на главный экран
document.getElementById('start-btn').addEventListener('click', function() {
    window.location.href = 'main.html'; // Переход на новый экран
});
