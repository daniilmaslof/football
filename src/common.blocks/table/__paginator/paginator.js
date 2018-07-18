/**
 * Function callback click paginator child, run load Table by url + number page .
 *
 * @param {string} url Data Table cars .
 */
function clickPaginatorLinks(url) {
  const tblBody = document.querySelector('.table_tbody');

  [...tblBody.childNodes].forEach(row => row.remove());
  document.querySelector('.paginator').remove();
  loadTable(url);
}

/**
 * Create Paginator with paginationData.
 *
 * @param {Object} paginationData Data on the Pagination.
 * @param {Object} paginationData.links Link next and before page.
 * @param {number} paginationData.total_pages Count page Table.
 * @returns {Object} Pagination Dom.
 */
function createPaginator(paginationData) {
  const paginator = document.createElement('div');

  const url = 'http://backend-jscamp.saritasa-hosting.com/api/cars?page=';

  paginator.classList.add('paginator');
  for (let i = 1; i <= paginationData.total_pages; i++) {
    const numberPage = document.createElement('span');

    numberPage.classList.add('page');

    const textNumber = document.createTextNode(i);

    numberPage.addEventListener('click', clickPaginatorLinks.bind(null, url + i));
    numberPage.appendChild(textNumber);
    paginator.appendChild(numberPage);
  }

  if (paginationData.links.next) {
    const arrow = document.createElement('span');

    arrow.addEventListener('click', clickPaginatorLinks.bind(null, paginationData.links.next));
    arrow.classList.add('arrow');
    paginator.appendChild(arrow);
  }

  if (paginationData.links.previous) {
    const arrow = document.createElement('span');

    arrow.addEventListener('click', clickPaginatorLinks.bind(null, paginationData.links.previous));
    arrow.classList.add('arrow');
    arrow.classList.add('arrow--rotate');
    paginator.insertBefore(arrow, paginator.firstChild);
  }

  return paginator;
}
