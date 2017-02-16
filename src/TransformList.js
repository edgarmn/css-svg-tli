const setTListToElements = require("./utils/setTListToElements");
const createTransformString = require("./utils/createTransformString");

function TransformList(type) {
  this._elements = [];
  this._transformString = "";

  this.type = type;
  this.length = 0;
}

TransformList.prototype.appendTo = function() {
  this._elements = [].slice.call(arguments);
  setTListToElements(this);
};

TransformList.prototype.push = function() {
  checkAddedItems(this.type, [].slice.call(arguments));

  const items = cloneItems([].slice.call(arguments));

  [].push.apply(this, items);

  for (let i = 0; i < items.length; i++) {
    items[i]._ownerList = this;
  }

  this._transformString = createTransformString(this);
  setTListToElements(this);
};

TransformList.prototype.insertBefore = function(index) {
  checkAddedItems(this.type, [].slice.call(arguments, 1));

  index !== 0 && index--;

  const items = cloneItems([].slice.call(arguments, 1));

  [].splice.apply(this, [].concat([index, 0], items));

  for (let i = 1; i < items.length; i++) {
    items[i]._ownerList = this;
  }

  this._transformString = createTransformString(this);
  setTListToElements(this);
};

TransformList.prototype.remove = function(index) {
  [].splice.call(this, index, 1);

  this._transformString = createTransformString(this);
  setTListToElements(this);
};

TransformList.prototype.removeRange = function(start, end) {
  if (!end) end = this.length;

  if (start === end) {
    this.remove(start);
    return;
  }

  [].splice.call(this, start, end - start);

  this._transformString = createTransformString(this);
  setTListToElements(this);
};

TransformList.prototype.clear = function() {
  if (this.length === 0) return;

  [].splice.call(this, 0, this.length);

  this._transformString = "";
  setTListToElements(this);
};

function checkAddedItems(listType, items) {
  items.forEach(item => {
    if (listType !== item.type) {
      throw new TypeError("You can't add " + item.type + " item to " + listType + " list");
    }
  });
}

function cloneItems(items) {
  return items.map(item => {return item.clone()});
}

module.exports = TransformList;
