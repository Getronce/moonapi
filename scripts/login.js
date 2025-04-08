function loadTheme() {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.querySelector('input[type="text"]').value;
    const password = document.querySelector('input[type="password"]').value;

    // Проверяем учетные данные
    const userData = JSON.parse(localStorage.getItem(`user_${email}`));

    if (userData && userData.password === password) {
        // Учетные данные совпали
        localStorage.setItem('userEmail', email); // Сохраняем текущего пользователя
        alert('Вы успешно вошли в систему!');
        window.location.href = 'account.html';
    } else {
        // Учетные данные не совпали
        alert('Неправильный email или пароль!');
    }
});