function getItem(key) {
  try {
    return localStorage.getItem(key)
  } catch (e) {
    console.error(e);
  }
}

function setItem(key, value) {
  try {
    localStorage.setItem(key, value)
  } catch (e) {
    console.error(e);
  }
}

var button = document.querySelector('.btn-feedback');
var popup = document.querySelector('.modal');
var close = popup.querySelector('.popup-close');
var form = popup.querySelector('.form-feedback');

var message = popup.querySelector('#feedback-message');
var userName = popup.querySelector('#user-name');
var email = popup.querySelector('#user-email');

var storageName = getItem('name');
var storageEmail = getItem('email');

var handleClose = function (e) {
  if (e.path.includes(form)) {
    return;
  }

  popup.classList.remove('modal-show');
  popup.classList.remove('modal-error');
  document.body.classList.remove('modal-overlay');

  window.removeEventListener('click', handleClose);
};

button.addEventListener('click', function (e) {
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
  e.preventDefault();
  e.stopPropagation();
  popup.classList.add('modal-show', 'modal-show-animated');
  popup.addEventListener('animationend', function () {
    popup.classList.remove('modal-show-animated');
  }, {once: true});
  userName.focus();
  document.body.classList.add('modal-overlay');

  window.addEventListener('click', handleClose);
});

close.addEventListener('click', function (e) {
  e.preventDefault();
  popup.classList.remove('modal-show');
  popup.classList.remove('modal-error');
  document.body.classList.remove('modal-overlay');

  window.removeEventListener('click', handleClose);
});


form.addEventListener('submit', function (e) {
  if (!userName.value || !email.value || !message.value) {
    e.preventDefault();
    popup.addEventListener('animationend', function () {
      popup.classList.remove('modal-error');
    }, {once: true});
    popup.classList.add('modal-error');
  } else {
    if (userName.value && email.value && message.value) {
      setItem('name', userName.value);
      setItem('email', email.value);

      close.click();
    }
  }
});

window.addEventListener('keydown', function (e) {
  if (e.keyCode === 27) {
    if (popup.classList.contains('modal-show')) {
      e.preventDefault();
      popup.classList.remove('modal-show');
      popup.classList.remove('modal-error');
      document.body.classList.remove('modal-overlay');
    }
  }
});
