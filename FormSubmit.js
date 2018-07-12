// function AJAXSubmit(form) {
//     if (form.checkValidity()) {
//         let request = new XMLHttpRequest();
//         let data = new FormData(form);
//         request.open('Post', 's.com');
//         request.onreadystatechange = () => {
//             console.log(request.status);
//             if (request.readyState !== 4) {
//                 return;
//             }
//             if (request.status !== 200) {
//
//             } else {
//                 console.log(request.responseText);
//             }
//         };
//         request.send(data);
//     }
// }

class LoaderOptions {
  constructor(select) {
    this.select = select;
    this.request = null;
  }

  loadDataOptions(url) {
    if (this.request) {
      this.request.abort();
      this.request = null;
      console.log(this.request);
    }
    this.request = new XMLHttpRequest();
    this.request.open('GET', url, true);
    this.request.send();
    this.request.onreadystatechange = () => {
      if (this.request.readyState !== 4) {
        return;
      }
      if (this.request.status === 200) {
        createOptions(this.select, JSON.parse(this.request.responseText));
      } else {
        createError(this.select, this.request.status);
      }
    };
  }
}

function createError(select, errorMessage) {
  let form = document.getElementById('createCarForm');

  let error = document.createElement('span');
  error.classList.add('error');
  error.innerText = `Ошибка сервера ${errorMessage} при загрузки ${select}`;
  form.appendChild(error);
}

function createOptions(selectId, options) {
  let select = document.getElementById(selectId);
  options.results.forEach(function (producer) {
    let option = document.createElement('option');
    option.value = producer.id;
    option.text = producer.name;
    select.options.add(option);
  });
  select.disabled = false;
}

const loaderOptionsModel = new LoaderOptions('model');
const loaderOptionsProducer = new LoaderOptions('producer');

function loadModels(id) {
  loaderOptionsModel.loadDataOptions(`https:/backend-jscamp.saritasa-hosting.com/api/dictionaries/makes/${id}/models`);
}

function loadMakes() {
  loaderOptionsProducer.loadDataOptions('https:/backend-jscamp.saritasa-hosting.com/api/dictionaries/makes');
}
