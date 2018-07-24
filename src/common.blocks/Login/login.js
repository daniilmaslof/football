const loader = new Loader();
const DictMessagesByErrorCode = new Map();

DictMessagesByErrorCode.set(503, 'please repeat request');
DictMessagesByErrorCode.set(404, 'Incorrect login or password');
DictMessagesByErrorCode.set(20, 'Please wait response load');

/**
 * Create dom span with error.
 *
 * @param {Object} error  Error occurred while sending.
 */
function createError(error) {
  const previousErrorElement = document.getElementById(`error`);

  const errorMessage = `error: \n\r ${DictMessagesByErrorCode.get(error.code)}`;

  if (previousErrorElement && previousErrorElement.innerText !== errorMessage) {
    previousErrorElement.remove();
  }

  const currentErrorElement = document.createElement('span');

  currentErrorElement.classList.add('error');
  currentErrorElement.id = 'error';
  currentErrorElement.appendChild(
    document.createTextNode(`error: \n\r ${DictMessagesByErrorCode.get(error.code)}`),
  );

  const form = document.getElementById('loginForm');

  form.appendChild(currentErrorElement);
}

/**
 * Store token in local storage and redirect Table .
 *
 * @param {Object} dataResponse Coming from the server and  containing token.
 */
function login(dataResponse) {
  window.localStorage.setItem('token', dataResponse.token);
  window.location.href = '../table/table.html';
}

/**
 * Post email and password and create callback login with a positive response and createError with a negative.
 *
 * @param {Object} event Event Submit.
 */
function submitForm(event) {
  event.preventDefault();

  const email = document.getElementById('login').value;

  const password = document.getElementById('password').value;

  const data = {
    email,
    password,
  };

  loader.postDatabyFetch(
    'https://backend-jscamp.saritasa-hosting.com/api/auth',
    data,
    createCallback(login, createError),
  );
}

/**
 * Run after load pages and  loginForm addEventListener submit = function submitForm.
 */
function onLoad() {
  const form = document.getElementById('loginForm');

  form.addEventListener('submit', submitForm);
}
