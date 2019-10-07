var button = document.querySelector(".btn-feedback");
var popup = document.querySelector(".modal");
var close = popup.querySelector(".popup-close");
var form = popup.querySelector(".form-feedback");

var message = popup.querySelector("#feedback-message");
var userName = popup.querySelector("#user-name");
var email = popup.querySelector("#user-email");

var storageName = localStorage.getItem("name");
var storageEmail = localStorage.getItem("email");

var handleClose = function (e) {

  if (e.path.includes(form)) {
    return;
  }

  popup.classList.remove("modal-show");
  document.body.classList.remove("modal-overlay");

  window.removeEventListener("click", handleClose);
};

button.addEventListener("click", function (e) {
  e.preventDefault();
  e.stopPropagation();
  popup.classList.add("modal-show");
  userName.focus();
  document.body.classList.add("modal-overlay");

  window.addEventListener("click", handleClose);
});

close.addEventListener("click", function (e) {
  e.preventDefault();
  popup.classList.remove("modal-show");
  document.body.classList.remove("modal-overlay");

  window.removeEventListener("click", handleClose);
});

if (storageName && !storageEmail) {
  userName.value = storageName;
  email.focus();
} else if (storageName && storageEmail) {
  userName.value = storageName;
  email.value = storageEmail;
  message.focus()
} else {
  userName.focus();
}

form.addEventListener("submit", function (e) {
  if (userName.value && email.value && message.value) {
    localStorage.setItem('name', userName.value);
    localStorage.setItem('email', email.value);

    close.click();
  }
});

window.addEventListener("keydown", function (e) {
  if (e.keyCode === 27) {
    if (popup.classList.contains("modal-show")) {
      e.preventDefault();
      popup.classList.remove("modal-show");
      document.body.classList.remove("modal-overlay");
    }
  }
});
