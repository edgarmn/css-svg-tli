const createTransformString = require("./createTransformString");
const setTListToElements = require("./setTListToElements");

function updateTItem(item) {
  if (!item._ownerList) return;

  item._ownerList._transformString = createTransformString(item._ownerList);
  setTListToElements(item._ownerList);
}

module.exports = updateTItem;
