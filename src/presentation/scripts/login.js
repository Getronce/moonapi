import { loadTheme } from "../../core/theme.js";
import { loginController } from "../controller/loginController.js";

window.onload = () => {
  loadTheme();

  const form = document.getElementById("login-form");
  form.addEventListener("submit", loginController);
};
