const TransformList = require("./TransformList");
const CSSTransformItem = require('./CSSTransformItem');
const SVGTransformItem = require('./SVGTransformItem');

module.exports = {
  svg: function() {
    return new TransformList("svg");
  },
  css: function() {
    return new TransformList("css");
  },
  cssItem: function(transformType) {
    if (!transformType) return new CSSTransformItem();

    const item = new CSSTransformItem();
    item[transformType].apply(item, [].slice.call(arguments, 1));

    return item;
  },
  svgItem: function(transformType) {
    if (!transformType) return new SVGTransformItem();

    const item = new SVGTransformItem();
    item[transformType].apply(item, [].slice.call(arguments, 1));

    return item;
  }
};
