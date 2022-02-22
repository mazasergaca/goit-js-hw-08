import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');

const LOCALSTORAGE_KEY = 'feedback-form-state';
let formData = {};

formEl.addEventListener('submit', onSubmitForm);

formEl.addEventListener('input', throttle(onTextInput, 500));

populateTextInput();

function onTextInput(event) {
  formData[event.target.name] = event.target.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formData));
}

function onSubmitForm(event) {
  event.preventDefault();

  if (formEl.email.value === '') {
    alert('Please enter your email');
  } else if (formEl.message.value === '') {
    alert('Please enter your message!');
  } else {
    console.log(formData);
    event.currentTarget.reset();
    localStorage.removeItem(LOCALSTORAGE_KEY);
    formData = {}
  }
}

function populateTextInput() {
  let saveMessage = localStorage.getItem(LOCALSTORAGE_KEY);
  if (saveMessage) {
    Object.entries(JSON.parse(saveMessage)).forEach(([name, value]) => {
      formEl.elements[name].value = value;
      formData = JSON.parse(saveMessage);
    });
  }
}
