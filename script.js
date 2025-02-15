// Забавяне за зареждане на екрана
setTimeout(function() {
    document.getElementById('loading-screen').style.display = 'none';
    document.getElementById('language-screen').style.display = 'flex';
}, 3000); 

// Бутон "Да вървим", за да отидете на главния екран
document.getElementById('start-btn').addEventListener('click', function() {
    window.location.href = 'main.html'; 
});
