const TransformItem = require("./TransformItem");
const createTItemString = require("./utils/createTItemString");
const updateTItem = require("./utils/updateTItem");

function CSSTransformItem() {
  TransformItem.call(this);
}

CSSTransformItem.prototype = Object.create(TransformItem.prototype);
CSSTransformItem.prototype.constructor = CSSTransformItem;

CSSTransformItem.prototype.type = "css";

CSSTransformItem.prototype.translate = function(x, y) {
  if (typeof x === "number") x += "px";
  if (y && typeof y === "number") y += "px";

  return TransformItem.prototype.translate.apply(this, arguments);
};

CSSTransformItem.prototype.rotate = function(deg) {
  if (typeof deg === "number") deg += "deg";

  return TransformItem.prototype.rotate.call(this, deg);
};

CSSTransformItem.prototype.skewX = function(deg) {
  if (typeof deg === "number") deg += "deg";

  return TransformItem.prototype.skewX.call(this, deg);
};

CSSTransformItem.prototype.skewY = function(deg) {
  if (typeof deg === "number") deg += "deg";

  return TransformItem.prototype.skewY.call(this, deg);
};

CSSTransformItem.prototype.skew = function(x, y) {
  if (typeof x === "number") x += "deg";
  if (y && typeof y === "number") y += "deg";

  if (!y) y = x;

  this._string = createTItemString("skew", x, y);

  updateTItem(this);

  return this;
};

CSSTransformItem.prototype.clone = function() {
  return TransformItem.prototype.clone.call(this);
};

module.exports = CSSTransformItem;
