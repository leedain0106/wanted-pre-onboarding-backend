module.exports.makeOffset = (page, limit) => {
  page = Math.round(page ? page : 1);
  return ((page - 1) * limit);
}

module.exports.checkHasNextPage = (totalCount, offset, limit) => {
  return ((totalCount - (offset + limit)) > 0);
}