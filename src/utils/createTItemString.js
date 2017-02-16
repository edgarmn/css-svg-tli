function createTItemString(transformType) {
  return [
    transformType,
    "(",
    [].slice.call(arguments, 1).join(", "),
    ")"
  ].join("");
}

module.exports = createTItemString;
