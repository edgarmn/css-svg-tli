function setSVGTListToElements(list) {
  list._elements.forEach(el => {
    el.setAttribute("transform", list._transformString);
  });
}

module.exports = setSVGTListToElements;
