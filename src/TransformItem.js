const createTItemString = require("./utils/createTItemString");
const updateTItem = require("./utils/updateTItem");

function TransformItem() {
  this._ownerList = null;
  this._string = "";
}

TransformItem.prototype.scale = function(x, y) {
  if (arguments.length === 0) return;

  if (!y) y = x;

  this._string = createTItemString("scale", x, y);

  updateTItem(this);

  return this;
};

TransformItem.prototype.translate = function(x, y) {
  if (arguments.length === 0) return;

  if (!y) y = x;

  this._string = createTItemString("translate", x, y);

  updateTItem(this);

  return this;
};

TransformItem.prototype.skewX = function(deg) {
  if (arguments.length === 0) return;

  this._string = createTItemString("skewX", deg);

  updateTItem(this);

  return this;
};

TransformItem.prototype.skewY = function(deg) {
  if (arguments.length === 0) return;

  this._string = createTItemString("skewY", deg);

  updateTItem(this);

  return this;
};

TransformItem.prototype.rotate = function() {
  if (arguments.length === 0) return;

  [].splice.call(arguments, 3, arguments.length);
  [].unshift.call(arguments, "rotate");

  this._string = createTItemString.apply(undefined, arguments);

  updateTItem(this);

  return this;
};

TransformItem.prototype.clone = function() {
  const clone = new this.constructor();
  clone._string = this._string;
  return clone;
};

TransformItem.prototype.toString = function() {
  return this._string;
};

module.exports = TransformItem;
