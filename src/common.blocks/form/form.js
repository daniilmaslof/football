const modelSelectCarForm = new SelectForm(
  'model',
  'data on the model information could not upload  please try again choose Machine manufacturer',
);
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
  const callbackCreateHandlers = new CallbackFuctionHandlers(
    modelSelectCarForm.createOptions,
    modelSelectCarForm.createError,
  );

  loaderOptionsModel.loadDataOptionsbyFetch(
    `https://backend-jscamp.saritasa-hosting.com/api/dictionaries/makes/${idProducer}/models`,
    callbackCreateHandlers.callback,
  );
}

/**
 * Run after load pages and loads producer.
 */
function onLoad() {
  const producerSelectCarForm = new SelectForm(
    'producer',
    'data on the Machine manufacturer  could not upload  please reload page',
  );

  const loaderOptions = new Loader();

  const callbackCreateHandlers = new CallbackFuctionHandlers(
    producerSelectCarForm.createOptions,
    producerSelectCarForm.createError,
  );

  loaderOptions.loadDataOptionsbyFetch(
    'https://backend-jscamp.saritasa-hosting.com/api/dictionaries/makes',
    callbackCreateHandlers.callback,
  );
}
