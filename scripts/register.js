function loadTheme() {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (localStorage.getItem(`user_${email}`)) {
        // Если пользователь с таким email уже зарегистрирован
        document.getElementById('message').textContent = 'Этот email уже зарегистрирован!';
        return;
    }

    // Сохраняем учетные данные
    const userData = {
        email: email,
        password: password,
        balance: 0, // Начальный баланс
        subscriptions: [] // Начальные подписки
    };

    localStorage.setItem(`user_${email}`, JSON.stringify(userData));

    // Перенаправляем на страницу входа
    alert('Регистрация успешно завершена! Теперь войдите в систему.');
    window.location.href = 'login.html';
});