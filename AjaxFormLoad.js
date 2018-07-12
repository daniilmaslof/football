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
    this.request = null;
    this.openXMLHttpRequest = false;
  }
  /**
   * Create dom elements whith error message.
   *
   * @param {string} urlQuery  Get options by url.
   * @param {Function} callbackAjax Take (data,error) and run resolve(data) or reject(error).
   */
  ajaxGetOptionsData(urlQuery, callbackAjax) {
    this.openXMLHttpRequest = true;
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
        Object.defineProperty(data, 'selectId', {
          value: this.select,
        });
        callbackAjax(data);
      },
      /**
       * Call  reject a function with  xhr.status - HTTP status code.
       *
       * @param {Object} xhr If request unsuccessful  xhr =  XMLHttpRequest.
       */
      error: xhr => {
        const obj = {
          errorMessage: xhr.status,
        };

        Object.defineProperty(obj, 'selectId', {
          value: this.select,
        });
        callbackAjax(null, obj);
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
  data.results.forEach(producer => {
    const option = document.createElement('option');

    clearError();
    option.value = producer.id;
    option.text = producer.name;
    select.options.add(option);
  });
  select.disabled = false;
}
/**
 * bind function resolve reject and run their when run callbackAjax with data or error
 */
class CallbackFuctionHandlers {
  /**
   * Bind function.
   *
   * @param {Function} resolve Run  function with success.
   * @param {Function} reject  Run  function with error.
   */
  constructor(resolve, reject) {
    this.resolve = resolve;
    this.reject = reject;
  }
  /**
   * Launches handlers when called callback.
   *
   * @param {Object} data Success data from the server.
   * @param {Object} error Error code  from the server.
   */
  callbackAjax(data, error) {
    if (data) this.resolve(data);
    else this.reject(error);
  }
}

const callbackCreateHandlers = new CallbackFuctionHandlers(createOptions, createError);

/**
 * Run after change select producer.
 *
 * @param {number}idProducer Value select Producer.
 */
function loadModels(idProducer) {
  const loaderOptionsModel = new LoaderOptions('model');

  loaderOptionsModel.ajaxGetOptionsData(
    `https:/backend-jscamp.saritasa-hosting.com/api/dictionaries/makes/${idProducer}/models`,
    callbackCreateHandlers.callbackAjax.bind(callbackCreateHandlers),
  );
}

/**
 * Run after load pages and loads producer.
 */
function onLoad() {
  const loaderOptionsProducer = new LoaderOptions('producer');

  loaderOptionsProducer.ajaxGetOptionsData(
    'https:/backend-jscamp.saritasa-hosting.com/api/dictionaries/makes',
    callbackCreateHandlers.callbackAjax.bind(callbackCreateHandlers),
  );
}
