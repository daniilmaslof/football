/**
 * Function callback click paginator child, run load Table by query containing link options &page = numberPage.
 *
 * @param {number} numberPage Page Table cars.
 */
function clickPaginatorLinks(numberPage) {
  const Url = new URL(url);

  Url.searchParams.delete('page');
  Url.searchParams.append('page', numberPage);

  url = Url.toString();

  TableCars.loadTable(Url);
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

  paginator.classList.add('paginator');
  for (let i = 1; i <= paginationData.total_pages; i++) {
    const numberPage = document.createElement('button');

    if (paginationData.current_page === i) {
      numberPage.classList.add('active');
      numberPage.disabled = true;
    }
    numberPage.classList.add('paginator-page');

    const textNumber = document.createTextNode(i);

    numberPage.addEventListener('click', clickPaginatorLinks.bind(null, i));
    numberPage.appendChild(textNumber);
    paginator.appendChild(numberPage);
  }

  if (paginationData.links.next) {
    const arrow = document.createElement('button');

    const numberPageNext = paginationData.links.next.slice(
      paginationData.links.next.indexOf('=') + 1,
      paginationData.links.next.length,
    );

    arrow.addEventListener('click', clickPaginatorLinks.bind(null, numberPageNext));
    arrow.classList.add('paginator-arrow');
    paginator.appendChild(arrow);
  }

  if (paginationData.links.previous) {
    const arrow = document.createElement('button');

    const numberPagePrevious = paginationData.links.previous.slice(
      paginationData.links.previous.indexOf('=') + 1,
      paginationData.links.previous.length,
    );

    arrow.addEventListener('click', clickPaginatorLinks.bind(null, numberPagePrevious));
    arrow.classList.add('paginator-arrow');
    arrow.classList.add('paginator-arrow--rotate');
    paginator.insertBefore(arrow, paginator.firstChild);
  }

  return paginator;
}
