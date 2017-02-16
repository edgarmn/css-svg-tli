const cssTransforms = [
  "webkitTransform",
  "OTransform",
  "msTransform",
  "MozTransform",
  "transform"
];

function setCSSTListToElements(list) {
  list._elements.forEach(el => {
    cssTransforms.forEach(t => {
      if (el.style[t] !== undefined) {
        el.style[t] = list._transformString;
      }
    });
  });
}

module.exports = setCSSTListToElements;
