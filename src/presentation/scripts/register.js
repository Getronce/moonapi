import { loadTheme } from "../../core/theme.js";
import { registerController } from "../controller/registerController.js";

window.onload = () => {
  loadTheme();

  const form = document.getElementById("registration-form");
  form.addEventListener("submit", registerController);
};
