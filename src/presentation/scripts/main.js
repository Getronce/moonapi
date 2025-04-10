import { loadTheme } from "../../core/theme.js";
import { initializeMainPage } from "../controller/mainController.js";

window.onload = () => {
  loadTheme();
  initializeMainPage();
};
