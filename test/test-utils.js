function createSVGList() {
  return tLi.svg();
}

function createSVGTItem() {
  return tLi.svgItem();
}

function createCSSTItem() {
  return tLi.cssItem();
}

function createAppendedSVGList() {
  const list = createSVGList();
  list.appendTo(document.createElement("rect"));
  return list;
}

function createAppendedCSSList() {
  const list = tLi.css();
  list.appendTo(document.createElement("div"));
  return list;
}

function createSVGTItems(amount) {
  return Array.apply(null, Array(amount)).map(() => {return tLi.svgItem();});
}

function createCSSTItems(amount) {
  return Array.apply(null, Array(amount)).map(() => {return tLi.cssItem();});
}

function translateTItems(items) {
  items.forEach(item => item.translate(Math.round(Math.random() * 100), Math.round(Math.random() * 100)));
  return items;
}
