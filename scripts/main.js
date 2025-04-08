let selectedFlag = null;

function initPage() {
    checkAuthStatus();
    loadTheme();
    loadSubscriptions();
}

function checkAuthStatus() {
    const userEmail = localStorage.getItem('userEmail');
    const authContainer = document.getElementById('menu');

    if (userEmail) {
        // Если пользователь авторизован, показываем картинку профиля с ссылкой на личный кабинет
        const profileLink = document.createElement('a');
        profileLink.href = 'profile.html'; // Ссылка на личный кабинет
        const profileImg = document.createElement('img');
        profileImg.src = 'acc.png'; // Картинка профиля
        profileImg.alt = 'Профиль';

        profileLink.appendChild(profileImg);
        authContainer.innerHTML = ''; // Очищаем контейнер, если нужно
        authContainer.appendChild(profileLink);
    } else {
        // Если пользователь не авторизован, показываем текст "Вход/Регистрация"
        authContainer.innerHTML = '<a href="../pages/login.html">Вход/Регистрация</a>';
    }
}

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

function loadTheme() {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

function loadSubscriptions() {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
        return;
    }

    const userSubscriptions = JSON.parse(localStorage.getItem(`subscriptions_${userEmail}`)) || [];

    // Для каждого флага проверяем, можно ли его активировать
    const allFlags = document.querySelectorAll('.flags img');
    allFlags.forEach(flag => {
        const flagId = flag.id; // Используем id флага, например, "france", "uk", "usa"

        // Проверяем, есть ли этот сервер в подписке
        if (!userSubscriptions.includes(flagId)) {
            // Если сервер не в подписке, делаем флаг недоступным
            flag.classList.add('disabled');
            flag.style.pointerEvents = 'none'; // Блокируем взаимодействие с флагом
        } else {
            // Если сервер в подписке, флаг доступен для клика
            flag.classList.remove('disabled');
            flag.style.pointerEvents = 'auto'; // Разблокируем флаг
        }
    });
}



function connect(button) {
    const flags = document.querySelectorAll('.flags img');
    if (button.innerText === "Выберите сервер подключения") {
        return;
    }

    if (button.innerText === "ПОДКЛЮЧИТЬСЯ") {
        button.classList.add('loading');
        button.innerText = "Подключение...";

        flags.forEach(flag => {
            if (!flag.classList.contains('selected-flag')) {
                flag.classList.add('hidden');
                flag.classList.add('disabled2');
            }
        });

        setTimeout(() => {
            button.classList.remove('loading');
            button.classList.add('connected');
            button.innerText = "ПОДКЛЮЧЕНО";
        }, 5000);
    } else if (button.innerText === "ПОДКЛЮЧЕНО") {
        button.classList.add('loading');
        button.innerText = "Отключение...";

        setTimeout(() => {
            button.classList.remove('loading');
            button.classList.remove('connected');
            button.innerText = "ПОДКЛЮЧИТЬСЯ";

            flags.forEach(flag => {
                flag.classList.remove('hidden');
                flag.classList.remove('disabled2');
            });
        }, 3000);
    }
}

function selectFlag(flag) {
    const btn = document.querySelector('.connect-btn');

    if (btn.innerHTML === "ПОДКЛЮЧЕНО") {
        return;
    }
    if (btn.innerHTML === "Подключение...") {
        return;
    }
    if (btn.innerHTML === "Отключение...") {
        return;
    }
    if (flag.classList.contains('disabled2')) {
        return; // Не даем выбрать флаг, если он не доступен
    }

    document.querySelectorAll('.flags img').forEach(f => {
        f.classList.remove('selected-flag');
    });
    flag.classList.add('selected-flag');
    selectedFlag = flag;

    const button = document.querySelector('.connect-btn');
    button.innerText = "ПОДКЛЮЧИТЬСЯ";
}

function reloadPage() {
    location.reload();
}
