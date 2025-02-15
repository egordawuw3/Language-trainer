// Задержка для загрузочного экрана
setTimeout(function() {
    document.getElementById('loading-screen').style.display = 'none';
    document.getElementById('language-screen').style.display = 'flex';
}, 3000); // Задержка 3 секунды

// Кнопка "Погнали" для перехода на главный экран
document.getElementById('start-btn').addEventListener('click', function() {
    window.location.href = 'main.html'; // Переход на новый экран
});
