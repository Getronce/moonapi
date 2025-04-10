import { handleRegistration } from "../../domain/services/authService.js";
import { validateEmail } from "./../../core/validators/emailValidator.js";

export async function registerController(event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const message = document.getElementById("message");

  const validationError = validateRegistrationData(email, password);
  if (validationError) {
    return (message.textContent = validationError);
  }

  try {
    const response = await handleRegistration(email, password);
    if (response.status === 201) {
      window.location.href = "../pages/login.html";
    } else {
      const data = await response.json();
      message.textContent = data.error;
    }
  } catch (e) {
    message.textContent = "Ошибка регистрации.";
  }
}

function validateRegistrationData(email, password) {
  if (!validateEmail(email)) {
    return "Неверный формат email.";
  }

  if (password.length < 6) {
    return "Пароль должен содержать минимум 6 символов.";
  }

  return null;
}
