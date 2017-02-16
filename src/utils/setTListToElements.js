const setSVGTListToElements = require("./setSVGTListToElements");
const setCSSTListToElements = require("./setCSSTListToElements");

function setTListToElements(list) {
  switch (list.type) {
    case "svg":
      setSVGTListToElements(list);
      break;
    case "css":
      setCSSTListToElements(list);
      break;
  }
}

module.exports = setTListToElements;
