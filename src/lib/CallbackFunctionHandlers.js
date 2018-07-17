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
    this.callback = this.callback.bind(this);
  }

  /**
   * Launches handlers when called callback.
   *
   * @param {Object} data Success data from the server.
   * @param {Object} error Error code  from the server.
   */
  callback(data, error) {
    if (data) this.resolve(data);
    else this.reject(error);
  }
}