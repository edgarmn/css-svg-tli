function createTransformString(list) {
  return [].join.call(list, " ");
}

module.exports = createTransformString;
