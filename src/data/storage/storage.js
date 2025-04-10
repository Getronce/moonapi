export function saveUserToLocalStorage(data) {
  localStorage.setItem("userId", data.id);
  localStorage.setItem("userEmail", data.email);
}

export function getUserFromLocalStorageById() {
  return localStorage.getItem("userId");
}

export function getUserFromLocalStorageByEmail() {
  return localStorage.getItem("userEmail");
}
