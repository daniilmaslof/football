/**
 * Creates a new EventEmitter. pattern program
 * @class{EventEmitter}
 */
class EventEmitter {
  /**
   * @constructor Create store function which will start after emit event.
   */
  constructor() {
    this.eventListenersStore = {};
  }

  /**
   * Add function which will start after emit event.
   *
   * @param {string}eventName Name event  after emit run fn.
   * @param {Function}fn Which will start after emit event.
   */
  subscribe(eventName, fn) {
    if (!this.eventListenersStore[eventName]) {
      this.eventListenersStore[eventName] = [];
    }
    this.eventListenersStore[eventName].push(fn);
  }

  /**
   * Run all function subscribers with data after occurrence event.
   *
   * @param {string}eventName Run all function  eventListenersStore[eventName].
   * @param {Object}data Send to the function subscribers.
   */
  emit(eventName, data) {
    const event = this.eventListenersStore[eventName];

    if (!event) return;
    event.forEach(fn => fn(data));
  }
}

const eventEmitter = new EventEmitter();

/**
 * Creates LoaderOptions to different select
 * @class{LoaderOptions}
 */
class LoaderOptions {
  /**
   *@constructor
   * create loader options
   * @param {string}select idDomElement
   */
  constructor(select) {
    this.select = select;
    this.request = null;
    this.openXMLHttpRequest = false;
  }

  /**
   * Send get request to the url.
   *
   * @param {string}url Get options by url.
   */
  loadDataOptionsbyXMLHttpRequest(url) {
    if (this.openXMLHttpRequest) {
      this.openXMLHttpRequest = false;
      this.request.abort();
    }
    this.request = new XMLHttpRequest();
    this.openXMLHttpRequest = true;
    this.request.open('GET', url, true);
    this.request.send();
    /**
     * Callback generates run all function when subscribe to event onreadystatechangeOption and onreadystatechangeError.
     *
     * @listens XMLHttpRequest.onreadystatechange
     */
    this.request.onreadystatechange = () => {
      if (this.request.readyState !== 4) {
        return;
      }

      if ((this.request.status >= 200 && this.request.status <= 300) || this.request.status === 304) {
        const obj = {};

        Object.assign(obj, JSON.parse(this.request.responseText));
        Object.defineProperty(obj, 'selectId', {
          value: this.select,
        });
        eventEmitter.emit('onreadystatechangeOption', obj);
      } else {
        const obj = {
          selectId: this.select,
          errorMessage: this.request.status,
        };

        eventEmitter.emit('onreadystatechangeError', obj);
      }
    };
  }
}

/**
 * Remove dom elements whith error message.
 */
function clearError() {
  const error = document.getElementsByClassName('error');

  if (error.length) {
    [...error].forEach(item => item.remove());
  }
}

const DictErrorMessages = new Map();

DictErrorMessages.set(
  'model',
  ` data on the model information could not upload  please try again choose Machine manufacturer`,
);
DictErrorMessages.set(
  'producer',
  'data on the Machine manufacturer  could not upload  please reload page',
);
DictErrorMessages.set(
  'body-types',
  'data on the Body type could not upload  please reload page',
);

/**
 * Create dom elements whith error message.
 *
 * @param {string}selectId IdDomElement.
 * @param {number}errorMessage Error code server.
 */
function createError({selectId, errorMessage}) {
  const form = document.getElementById('createCarForm');
  const select = document.getElementById(selectId);

  select.disabled = true;

  const error = document.createElement('span');

  error.classList.add('error');
  error.innerText = `Ошибка сервера ${errorMessage} ${DictErrorMessages.get(selectId)}`;
  form.appendChild(error);
}

/**
 * Create dom elements(option) whith value = id and  text = name.
 *
 * @param {string}selectId IdDomElement.
 * @param {Array<objects>}results Array model from server.
 */
function createOptions({selectId, results}) {
  const select = document.getElementById(selectId);

  [...select.options].forEach(options => options.remove());
  results.forEach(producer => {
    const option = document.createElement('option');

    option.value = producer.id;
    option.text = producer.name;
    select.options.add(option);
  });
  select.disabled = false;
}

/**
 * Subscribe to data coming from the server and  binding dom with data.
 */
function dataBinding() {
  eventEmitter.subscribe('onreadystatechangeOption', createOptions);
  eventEmitter.subscribe('onreadystatechangeOption', clearError);
  eventEmitter.subscribe('onreadystatechangeError', createError);
}

/**
 * Run after change select producer.
 *
 * @param {number}idProducer Value select Producer.
 */
function loadModels(idProducer) {
  const loaderOptionsModel = new LoaderOptions('model');

  loaderOptionsModel.loadDataOptionsbyXMLHttpRequest(
    `https:/backend-jscamp.saritasa-hosting.com/api/dictionaries/makes/${idProducer}/models`,
  );
}

/**
 * Run after load pages and loads producer.
 */
function onLoad() {
  dataBinding();

  const loaderOptionsProducer = new LoaderOptions('producer');

  loaderOptionsProducer.loadDataOptionsbyXMLHttpRequest(
    'https:/backend-jscamp.saritasa-hosting.com/api/dictionaries/makes',
  );
}