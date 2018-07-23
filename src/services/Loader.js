const modelSelectCarForm = new SelectForm('car_model_id');
/**
 Maybe add DI for loaderOptions.
 */
const loaderOptionsModel = new Loader();

/**
 * Run after change select producer.
 *
 * @param {number} idProducer Value select Producer.
 */
function loadModels(idProducer) {
  loaderOptionsModel.loadDatabyFetch(
    `https://backend-jscamp.saritasa-hosting.com/api/dictionaries/makes/${idProducer}/models`,
    createCallback(modelSelectCarForm.createOptions, modelSelectCarForm.createError),
  );
}

/**
 * Run after load pages and loads producer.
 */
function onLoad() {
  const producerSelectCarForm = new SelectForm('make_id');

  const loaderOptions = new Loader();

  const url = new URL(window.location.href);

  if (url.searchParams.get('id')) loadCar(url.searchParams.get('id'));
  else
    loaderOptions.loadDatabyFetch(
      'https://backend-jscamp.saritasa-hosting.com/api/dictionaries/makes',
      createCallback(producerSelectCarForm.createOptions, producerSelectCarForm.createError),
    );
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
    createCallback(createFormWithData, createErrorCarDidNotLoad));
}

const linkSelects = {
  make_id: () => `https://backend-jscamp.saritasa-hosting.com/api/dictionaries/makes`,
  car_model_id: id =>
    `https://backend-jscamp.saritasa-hosting.com/api/dictionaries/makes/${id}/models`,
  body_type_id: () => `https://backend-jscamp.saritasa-hosting.com/api/dictionaries/body-types`,
};

/**
 * Create Form with data about the car.
 *
 * @param {number} data  From api.
 */
function createFormWithData(data) {
  const car = new Car(data);
  const form = document.getElementById('createCarForm');
  const formField = form.querySelectorAll('.form_field');

  [...formField].forEach(domElement => {
    if (car[domElement.id].edit) {
      const loaderOptions = new Loader();
      const selectCarForm = new SelectForm(domElement.id, car[domElement.id].value);

      loaderOptions.loadDatabyFetch(
        linkSelects[domElement.id](car.make_id.value),
        createCallback(selectCarForm.createOptions, selectCarForm.createError),
      );
    } else domElement.value = car[domElement.id].value;
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

  errorElement.appendChild(document.createTextNode(`car dont upload,please reload page${error}`));

  errorElement.classList.add('error');
  form.parentNode.appendChild(errorElement);
  form.remove();
}
