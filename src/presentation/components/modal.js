export function showModal(title, message, type = "success") {
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modal-title");
  const modalMessage = document.getElementById("modal-message");
  const modalActionBtn = document.getElementById("modal-action-btn");

  modalTitle.textContent = title;
  modalMessage.textContent = message;

  modalActionBtn.classList.remove("success", "error");

  if (type === "success") {
    modalActionBtn.classList.add("success");
    modalActionBtn.textContent = "Обновить";
  } else if (type === "error") {
    modalActionBtn.classList.add("error");
    modalActionBtn.textContent = "Попробовать снова";
  }

  modal.style.display = "flex";

  modalActionBtn.onclick = function () {
    modal.style.display = "none";
    if (type === "error") {
      console.log("Повторная попытка...");
    } else {
      location.reload();
    }
  };
}
