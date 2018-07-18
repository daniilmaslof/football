const DictMessagesByErrorCode = new Map();

DictMessagesByErrorCode.set(503, {
  model:
    'data on the model information could not upload  please try again choose Machine manufacturer',
  producer: 'data on the Machine manufacturer  could not upload  please reload page',
  'body-types': 'data on the Body type could not upload  please reload page',
});
DictMessagesByErrorCode.set(20, 'Please wait response load');

/**
 * Creates a selector and methods for creating its options and errors.
 */
class SelectForm {
  /**
   * Creates a selector and methods for creating its options and errors.
   *
   * @description maybe add DI for loaderOptions.
   * @param {string} selectId IdDomElement.
   */
  constructor(selectId) {
    this.selectId = selectId;
    this.clearError = this.clearError.bind(this);
    this.createError = this.createError.bind(this);
    this.createOptions = this.createOptions.bind(this);
  }

  /**
   * Remove dom elements whith error message.
   */
  clearError() {
    const error = document.getElementById(`error${this.selectId}`);

    if (error) {
      error.remove();
    }
  }

  /**
   * Create dom elements whith error message.
   *
   * @param {number} error Error code server.
   */
  createError(error) {
    const select = document.getElementById(this.selectId);

    select.disabled = true;

    let errorMessage = null;

    const errorSelect = document.getElementById(`error${this.selectId}`);

    if (errorSelect && errorSelect.innerText !== errorMessage) {
      this.clearError();
    }

    const errorDomElement = document.createElement('span');

    if (error.code === 503) {
      const errorsMessagesForAllSelects = DictMessagesByErrorCode.get(error.code);

      errorMessage = errorsMessagesForAllSelects[this.selectId];
    } else errorMessage = `${error.message} ${DictMessagesByErrorCode.get(error.code)}`;

    errorDomElement.id = `error${this.selectId}`;
    errorDomElement.classList.add('error');
    errorDomElement.innerText = errorMessage;
    select.parentNode.appendChild(errorDomElement);
  }

  /**
   * Create dom elements(option) whith value = id and  text = name.
   *
   * @param {Array<objects>} options Array model from server.
   */
  createOptions(options) {
    const select = document.getElementById(this.selectId);

    [...select.options].forEach(option => option.remove());
    options.results.forEach(optionData => {
      const option = document.createElement('option');

      option.value = optionData.id;
      option.text = optionData.name;
      select.options.add(option);
    });
    this.clearError();
    select.disabled = false;
  }
}