let currentSubscriptions = [];
let currentBalance = 0;

function loadTheme() {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

function loadUserData() {
    const userEmail = localStorage.getItem('userEmail');

    if (userEmail) {
        document.getElementById('user-email').textContent = userEmail;

        // Загрузка подписок для текущего пользователя
        const subscriptions = JSON.parse(localStorage.getItem(`subscriptions_${userEmail}`)) || [];
        currentSubscriptions = subscriptions;

        // Обновляем информацию о текущих подписках
        const subscriptionText = subscriptions.length > 0 ? subscriptions.join(', ') : 'Пробный';
        document.getElementById("current-subscription").innerHTML = `Текущая подписка: <strong>Сервер ${subscriptionText}</strong>`;

        // Загрузка баланса для текущего пользователя
        const savedBalance = localStorage.getItem(`balance_${userEmail}`);
        if (savedBalance !== null) {
            currentBalance = parseInt(savedBalance, 10); // Загружаем баланс
        } else {
            currentBalance = 0; // Устанавливаем баланс в 0 для нового пользователя
            localStorage.setItem(`balance_${userEmail}`, currentBalance); // Сохраняем в localStorage
        }
        document.getElementById('user-balance').textContent = currentBalance;
        // Проверка состояния подписок и обновление кнопок
        currentSubscriptions.forEach(server => {
            let button;
            if (server === 'Франция') {
                button = document.querySelector("#server-france .buy-btn");
            } else if (server === 'Великобритания') {
                button = document.querySelector("#server-uk .buy-btn");
            } else if (server === 'США') {
                button = document.querySelector("#server-usa .buy-btn");
            }

            if (button) {
                button.textContent = "Подключено";
                button.style.backgroundColor = "#007fff";
                button.style.cursor = "default";
                button.disabled = true;
            }
        });
    } else {
        // Если email не найден, сбрасываем всё в начальное состояние
        document.getElementById('user-email').textContent = 'Гость';
        currentSubscriptions = [];
        document.getElementById("current-subscription").innerHTML = `Текущая подписка: <strong>Пробный период</strong>`;
        currentBalance = 0; // Баланс по умолчанию
        document.getElementById('user-balance').textContent = currentBalance;
    }
}


function buySubscription(server, button) {
    let cost; // Переменная для стоимости подписки
    if (server === 'Франция') {
        cost = 1000;
    } else if (server === 'Великобритания') {
        cost = 1200;
    } else if (server === 'США') {
        cost = 1500;
    }

    // Проверяем, достаточно ли средств на балансе
    if (currentBalance < cost) {
        alert("Недостаточно средств на балансе для подписки.");
        return; // Прекращаем выполнение, если баланс недостаточен
    }

    // Проверяем, уже ли пользователь подписан
    if (currentSubscriptions.includes(server)) {
        return; // Уже подписан, не делаем ничего
    }

    if (confirm(`Вы хотите подписаться на сервер: ${server}? Это будет стоить ${cost} руб.`)) {
        // Списываем средства с баланса
        currentBalance -= cost;
        const userEmail = localStorage.getItem('userEmail');
        if (userEmail) {
            localStorage.setItem(`balance_${userEmail}`, currentBalance); // Сохраняем обновленный баланс
        }
        document.getElementById('user-balance').textContent = currentBalance; // Обновляем отображение баланса

        // Добавляем сервер в список подписок
        currentSubscriptions.push(server);
        if (userEmail) {
            localStorage.setItem(`subscriptions_${userEmail}`, JSON.stringify(currentSubscriptions));
        }

        // Обновляем информацию о подписках
        const subscriptionText = currentSubscriptions.join(', ');
        document.getElementById("current-subscription").innerHTML = `Текущая подписка: <strong>Сервер ${subscriptionText}</strong>`;

        // Изменяем текст и стиль кнопки
        button.textContent = "Подключено";
        button.style.backgroundColor = "#007fff";
        button.style.cursor = "default";
        button.disabled = true;

        alert(`Вы успешно подписались на сервер ${server}! Баланс: ${currentBalance} руб.`);
    }
}

function addBalance(amount) {
    currentBalance += amount;
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
        localStorage.setItem(`balance_${userEmail}`, currentBalance); // Сохраняем баланс для текущего пользователя
    }
    document.getElementById('user-balance').textContent = currentBalance; // Обновляем отображение баланса
    alert(`Ваш баланс будет пополнен на ${amount} руб. Ваш баланс будет равен: ${currentBalance} руб.`);
}

function openMoonVPN() {
    window.location.href = 'main.html';
}

function logout() {
    // Удаляем данные пользователя из localStorage
    localStorage.removeItem('userEmail');
    // Перенаправляем на главную страницу
    window.location.href = 'main.html';
}