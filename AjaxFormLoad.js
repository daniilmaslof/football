/**
 * Creates LoaderOptions to different select
 */
class LoaderOptions {
  /**
   * Create loader options.
   *
   * @param {string} select IdDomElement.
   */
  constructor(select) {
    this.select = select;
    this.openXMLHttpRequest = false;
    this.xhr = null;
  }

  /**
   * Create dom elements whith error message.
   *
   * @param {string} urlQuery  Get options by url.
   * @param {Function} callbackAjax Take (data,error) and run resolve(data) or reject(error).
   */
  ajaxGetOptionsData(urlQuery, callbackAjax) {
    $.ajax({
      method: 'GET',
      dataType: 'json',
      url: urlQuery,
      /**
       * Call  a function resolve with data.
       *
       * @param {Object} data If request success  data =  options get downloaded from api.
       */
      success: data => {
        this.openXMLHttpRequest = false;
        callbackAjax({ selectId: this.select, options: data.results });
      },
      /**
       * Call  reject a function with  xhr.status - HTTP status code.
       *
       * @param {Object} xhr If request unsuccessful  xhr =  XMLHttpRequest.
       */
      error: xhr => {
        this.openXMLHttpRequest = false;
        callbackAjax(null, { selectId: this.select, errorMessage: xhr.status });
      },
      beforeSend: xhr => {
        if (this.openXMLHttpRequest) {
          this.xhr.abort();
        }
        this.xhr = xhr;
        this.openXMLHttpRequest = true;
      },
    });
  }
}

/**
 * Remove dom elements whith error message.
 */
function clearError() {
  const error = document.getElementsByClassName('error');

  if (error.length) {
    Array.from(error).forEach(item => item.remove());
  }
}

const DictErrorMessages = new Map();

DictErrorMessages.set(
  'model',
  `data on the model information could not upload  please try again choose Machine manufacturer`,
);
DictErrorMessages.set(
  'producer',
  'data on the Machine manufacturer  could not upload  please reload page',
);
DictErrorMessages.set('body-types', 'data on the Body type could not upload  please reload page');

/**
 * Create dom elements whith error message.
 *
 * @param {Object} data Tuple<string,number>(selectId,errorMessage).
 * @param {string} data.selectId IdDomElement.
 * @param {number} data.errorMessage Error code server.
 */
function createError(data) {
  const form = document.getElementById('createCarForm');
  const select = document.getElementById(data.selectId);

  select.disabled = true;

  const error = document.createElement('span');

  error.classList.add('error');
  error.innerText = `Ошибка сервера ${data.errorMessage} ${DictErrorMessages.get(data.selectId)}`;
  form.appendChild(error);
}

/**
 * Create dom elements(option) whith value = id and  text = name.
 *
 * @param {Object} data Tuple<string,Array>(selectId,results).
 * @param {string} data.selectId IdDomElement.
 * @param {Array<objects>} data.results Array model from server.
 */
function createOptions(data) {
  const select = document.getElementById(data.selectId);

  [...select.options].forEach(option => option.remove());
  data.options.forEach(optionData => {
    const option = document.createElement('option');

    option.value = optionData.id;
    option.text = optionData.name;
    select.options.add(option);
  });
  clearError();
  select.disabled = false;
}

/**
 * bind function resolve reject and run their when run callbackAjax with data or error
 */
class CallbackFuctionHandlers {
  callbackAjax(data, error) {
    if (data) this.resolve(data);
    else this.reject(error);
  }

  /**
   * Bind function.
   *
   * @param {Function} resolve Run  function with success.
   * @param {Function} reject  Run  function with error.
   */
  constructor(resolve, reject) {
    this.resolve = resolve;
    this.reject = reject;
    this.callbackAjax = this.callbackAjax.bind(this);
  }

  /**
   * Launches handlers when called callback.
   *
   * @param {Object} data Success data from the server.
   * @param {Object} error Error code  from the server.
   */
}

const callbackCreateHandlers = new CallbackFuctionHandlers(createOptions, createError);
const loaderOptionsModel = new LoaderOptions('model');

/**
 * Run after change select producer.
 *
 * @param {number}idProducer Value select Producer.
 */
function loadModels(idProducer) {
  loaderOptionsModel.ajaxGetOptionsData(
    `https://backend-jscamp.saritasa-hosting.com/api/dictionaries/makes/${idProducer}/models`,
    callbackCreateHandlers.callbackAjax,
  );
}

/**
 * Run after load pages and loads producer.
 */
function onLoad() {
  const loaderOptionsProducer = new LoaderOptions('producer');

  loaderOptionsProducer.ajaxGetOptionsData(
    'https://backend-jscamp.saritasa-hosting.com/api/dictionaries/makes',
    callbackCreateHandlers.callbackAjax,
  );
}
