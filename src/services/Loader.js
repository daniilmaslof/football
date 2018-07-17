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
  loadDataOptionsbyFetch(url, callback) {
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

        const error = new Error('Request failed');

        error.status = response.status;
        throw error;
      })
      .then(response => {
        callback(response);
      })
      .catch(error => callback(null, error));
  }
}
