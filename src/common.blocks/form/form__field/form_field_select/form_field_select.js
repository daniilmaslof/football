/**
 * Creates a selector and methods for creating its options and errors.
 */
class SelectForm {
  /**
   * Creates a selector and methods for creating its options and errors.
   *
   * @description maybe add DI for loaderOptions.
   * @param {string} selectId IdDomElement.
   * @param {string} errorMessages Selective error.
   */
  constructor(selectId, errorMessages) {
    this.selectId = selectId;
    this.errorMessages = errorMessages;
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

    const errorMessage = `${error} ${this.errorMessages}`;

    const errorSelect = document.getElementById(`error${this.selectId}`);

    if (errorSelect) {
      if (errorSelect.innerText === errorMessage) return;
      this.clearError();
    }

    const errorDomElement = document.createElement('span');

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