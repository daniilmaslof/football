/**
 * Run after load pages and  loginForm addEventListener submit = function submitForm.
 */
function onLoad() {
  const form = document.getElementById('loginForm');

  form.addEventListener('submit', submitForm);
}

const loader = new Loader();

/**
 * Post email and password and create callback login with a positive response and createError with a negative.
 *
 * @param {Object} event Event Submit.
 */
function submitForm(event) {
  event.preventDefault();

  const form = document.getElementById('loginForm');

  const email = form.getElementById('login').value;
  const password = form.getElementById('password').value;

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
  const errorElement = document.createElement('span');

  errorElement.appendChild(
    document.createTextNode(`error: \n\r ${DictMessagesByErrorCode.get(error.code)}`),
  );

  const form = document.getElementById('loginForm');

  form.appendChild(errorElement);
}

/**
 * Store token in local storage and redirect Table .
 *
 * @param {Object} dataResponse Coming from the server and  containing token.
 */
function login(dataResponse) {
  window.localStorage.setItem('token', dataResponse.token);
  window.location.href = 'src/common.blocks/form/form.html';
}
