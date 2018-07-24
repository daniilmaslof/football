const modelSelectCarForm = new SelectForm('model');
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
  const producerSelectCarForm = new SelectForm('producer');

  const loaderOptions = new Loader();

  loaderOptions.loadDatabyFetch(
    'https://backend-jscamp.saritasa-hosting.com/api/dictionaries/makes',
    createCallback(producerSelectCarForm.createOptions, producerSelectCarForm.createError),
  );
}
