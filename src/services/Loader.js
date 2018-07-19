/**
 * Creates LoaderOptions to different select
 */
class Loader {
  /**
   * Create loader.
   */
  constructor() {
    this.controller = null;
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
