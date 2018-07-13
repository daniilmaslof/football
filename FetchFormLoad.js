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
 * Remove dom elements whith error message.
 */
function clearError() {
  const error = document.getElementsByClassName('error');

  if (error.length) {
    [...error].forEach(item => item.remove());
  }
}

/**
 * Create dom elements whith error message.
 *
 * @param {string} selectId IdDomElement.
 * @param {number} errorMessage Error code server.
 */
function createError(selectId, errorMessage) {
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
 * @param {string} selectId IdDomElement.
 * @param {Array<objects>} options Array model from server.
 */
function createOptions(selectId, options) {
  const select = document.getElementById(selectId);

  [...select.options].forEach(option => option.remove());
  options.forEach(producer => {
    const option = document.createElement('option');

    option.value = producer.id;
    option.text = producer.name;
    select.options.add(option);
  });
  select.disabled = false;
}

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
    this.controller = null;
  }

  /**
   * Load data from api by query to  select use Fetch.
   *
   * @param {string} url Select for get data from api.
   */
  loadDataOptionsbyFetch(url) {
    let signalController;

    if (this.controller) {
      this.controller.abort();
      this.controller = null;
    }

    if ('AbortController' in window) {
      this.controller = new AbortController();

      signalController = this.controller.signal;
    }
    fetch(url, {
      signal: signalController,
    })
      .then(response => {
        if ((response.status >= 200 && response.status < 300) || response.status === 304) {
          return response.json();
        }

        throw new Error(response.status);
      })
      .then(response => {
        createOptions(this.select, response.results);
        clearError();
      })
      .catch(error => createError(this.select, error));
  }
}

const loaderOptionsModel = new LoaderOptions('model');

function loadModels(idProducer) {
  loaderOptionsModel.loadDataOptionsbyFetch(
    `https:/backend-jscamp.saritasa-hosting.com/api/dictionaries/makes/${idProducer}/models`,
  );
}

/**
 * Run after load pages and loads producer.
 */
function onLoad() {
  const loaderOptionsProducer = new LoaderOptions('producer');

  loaderOptionsProducer.loadDataOptionsbyFetch(
    'https:/backend-jscamp.saritasa-hosting.com/api/dictionaries/makes',
  );
}
