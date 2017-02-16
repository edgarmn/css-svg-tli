const TransformItem = require("./TransformItem.js");

function SVGTransformItem() {
  TransformItem.call(this);
}

SVGTransformItem.prototype = Object.create(TransformItem.prototype);
SVGTransformItem.prototype.constructor = SVGTransformItem;

SVGTransformItem.prototype.type = "svg";

SVGTransformItem.prototype.clone = function() {
  return TransformItem.prototype.clone.call(this);
};

module.exports = SVGTransformItem;
