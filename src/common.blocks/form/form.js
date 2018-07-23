const linkSelects = {
  makeId: () => `https://backend-jscamp.saritasa-hosting.com/api/dictionaries/makes`,
  carModelId: id =>
    `https://backend-jscamp.saritasa-hosting.com/api/dictionaries/makes/${id}/models`,
  bodyTypeId: () => `https://backend-jscamp.saritasa-hosting.com/api/dictionaries/body-types`,
};
/**
 Maybe add DI for loader.
 */
const loaderOptionsModel = new Loader();

/**
 * Create SelectForm(idSelect) and load option there.
 *
 * @param {Loader} loader For download options for a particular select.
 * @param {string} selectId Dom id select.
 * @param {number} idProducer Value select Producer.
 */
function loadOptionInSelect(loader, selectId, idProducer = null) {
  const selectCarForm = new SelectForm(selectId);

  loader.loadDatabyFetch(
    linkSelects[selectCarForm.selectId](idProducer),
    createCallback(selectCarForm.createOptions, selectCarForm.createError),
  );
}

/**
 * Run after change select producer.
 *
 * @param {number} idProducer Value select Producer.
 */
function loadModels(idProducer) {
  loadOptionInSelect(loaderOptionsModel, 'carModelId', idProducer);
  // const modelSelectCarForm = new SelectForm('carModelId');
  //
  // loaderOptionsModel.loadDatabyFetch(
  //   linkSelects[modelSelectCarForm.selectId](idProducer),
  //   createCallback(modelSelectCarForm.createOptions, modelSelectCarForm.createError),
  // );
}

/**
 * Run after load pages and loads producer.
 */
function onLoad() {
  const loaderOptionsBody = new Loader();

  const loaderOptionsMake = new Loader();

  const url = new URL(window.location.href);

  if (url.searchParams.get('id')) {
    loadCar(url.searchParams.get('id'));
  } else {
    loadOptionInSelect(loaderOptionsMake, 'makeId');
    loadOptionInSelect(loaderOptionsBody, 'bodyTypeId');
  }
}

/**
 * Load Car and run function createFormWithData on end load.
 *
 * @param {number} id  Id Car.
 */
function loadCar(id) {
  const loaderCar = new Loader();
  loaderCar.loadDatabyFetch(
    `https://backend-jscamp.saritasa-hosting.com//api/cars/${parseInt(id, 10)}`,
    createCallback(createFormWithData, createErrorCarDidNotLoad),
  );
}

/**
 * Create Form with data about the car.
 *
 * @param {number} data  From api.
 */
function createFormWithData(data) {
  const car = new Car(data);
  const form = document.getElementById('createCarForm');
  const formFieldsDom = form.querySelectorAll('.form-field');

  [...formFieldsDom].forEach(domField => {
    if (car[domField.name].edit) {
      const loaderOptions = new Loader();
      const selectCarForm = new SelectForm(domField.id, car[domField.name].value);

      loaderOptions.loadDatabyFetch(
        linkSelects[domField.name](car.makeId.value),
        createCallback(selectCarForm.createOptions, selectCarForm.createError),
      );
    } else {
      domField.value = car[domField.name].value;
    }
  });
}

/**
 * Create Error with data about the car didn`t upload.
 *
 * @param {Error} error Error hat served as a didn`t upload  .
 */
function createErrorCarDidNotLoad(error) {
  const form = document.getElementById('createCarForm');
  const errorElement = document.createElement('span');

  errorElement.appendChild(document.createTextNode(`car dont upload,please reload page. ${error}`));

  errorElement.classList.add('error');
  form.appendChild(errorElement);
}
