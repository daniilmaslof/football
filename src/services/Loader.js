/**
 * Loader post and get data use fetch.
 */
class Loader {
  /**
   * Create loader.
   */
  constructor() {
    this.controller = null;
  }

  /**
   * Create Fetch post query and resolve reject response.
   *
   * @param {string} url  Post data on url.
   * @param {Object} data In the format json  post data on url.
   * @param {Function} callback Take (Response data,error) and run resolve(Response) or reject(error).
   */
  postDatabyFetch(url, data, callback) {
    let signalController;

    if (this.controller) {
      this.controller.abort();
      this.controller = null;
    }

    if ('AbortController' in window) {
      this.controller = new AbortController();

      signalController = this.controller.signal;
    }
    fetch('https://backend-jscamp.saritasa-hosting.com/api/auth', {
      signal: signalController,
      method: 'post',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Token ${window.localStorage.getItem('token')}`,
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if ((response.status >= 200 && response.status < 300) || response.status === 304) {
          return response.json();
        }

        const error = new Error('Request failed');

        error.code = response.status;
        throw error;
      })
      .then(response => {
        callback(response);
      })
      .catch(error => callback(null, error));
  }

  /**
   * Create Fetch query and resolve reject response.
   *
   * @param {string} url  Get options by url.
   * @param {Function} callback Take (data,error) and run resolve(data) or reject(error).
   */
  loadDatabyFetch(url, callback) {
    if (this.controller) {
      this.controller.abort();
      this.controller = null;
    }

    if ('AbortController' in window) {
      this.controller = new AbortController();
    }
    fetch(url, {
      signal: this.controller.signal,
      headers: {
        Authorization: `Token ${window.localStorage.getItem('token')}`,
      },
    })
      .then(response => {
        if ((response.status >= 200 && response.status < 300) || response.status === 304) {
          return response.json();
        }

        const error = new Error('Request failed');

        error.code = response.status;
        throw error;
      })
      .then(response => {
        callback(response);
      })
      .catch(error => callback(null, error));
  }
}

/**
 * Bind function.
 *
 * @param {Function} resolve Run  function with success.
 * @param {Function} reject  Run  function with error.
 * @returns {Function} - Function Callback.
 */
function createCallback(resolve, reject) {
  /**
   * Launches handlers when called callback.
   *
   * @param {Object} data Success data from the server.
   * @param {Object} error Error code  from the server.
   */
  return function(data, error) {
    if (error) reject(error);
    else resolve(data);
  };
}
