import { validateEmail } from "../../core/validators/emailValidator.js";
import { saveUserToLocalStorage } from "../../data/storage/storage.js";
import { handleLogin } from "../../domain/services/authService.js";

export async function loginController(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const message = document.getElementById("message");

  const validationError = validateRegistrationData(email, password);
  if (validationError) {
    message.textContent = validationError;
    return;
  }

  try {
    const response = await handleLogin(email, password);

    if (response.status === 200) {
      const data = await response.json();
      saveUserToLocalStorage(data);
      window.location.href = "../pages/profile.html";
    } else {
      const data = await response.json();
      message.textContent = data.error;
    }
  } catch (e) {
    message.textContent = "Ошибка регистрации.";
  }
}

function validateRegistrationData(email, password) {
  console.log("Validating registration data...");
  if (!validateEmail(email)) {
    return "Неверный формат email.";
  }

  if (password.length < 6) {
    return "Пароль должен содержать минимум 6 символов.";
  }

  return null;
}
