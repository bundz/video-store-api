const querystring = require(`query-string`);

const paginate = (count, query) => {
  const pagination = {
    isLastPage: false,
    isFirstPage: false,
    limit: query.limit,
    offset: query.offset,
    count,
    links: {}
  };

  if (query.offset + query.limit >= count) {
    pagination.isLastPage = true;
  } else {
    query.offset = pagination.offset + pagination.limit;
    pagination.links.next = querystring.stringify(query, { arrayFormat: `index` });
  }

  if (pagination.offset === 0) {
    pagination.isFirstPage = true;
  } else {
    query.offset -= pagination.limit;
    pagination.links.prev = querystring.stringify(query, { arrayFormat: `index` });
  }

  return pagination;
};

module.exports = paginate;
