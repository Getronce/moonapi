import { initializeProfilePage } from "../controller/profileController.js";
import { loadTheme } from "./../../core/theme.js";
window.onload = () => {
  loadTheme();
  initializeProfilePage();
};
