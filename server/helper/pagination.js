
const Paginate = (query, count) => {
  const limit = parseInt((query.limit || 6), 10);
  let offset = 0;
  const page = parseInt((query.page || 1), 10);
  const numberOfItems = count;
  const pages = Math.ceil(numberOfItems / limit);
  offset = limit * (page - 1);

  return {
    NumberOfItems: numberOfItems,
    Limit: limit,
    Pages: pages,
    CurrentPage: page,
  };
};

export default Paginate;
