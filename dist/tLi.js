"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (f) {
  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object" && typeof module !== "undefined") {
    module.exports = f();
  } else if (typeof define === "function" && define.amd) {
    define([], f);
  } else {
    var g;if (typeof window !== "undefined") {
      g = window;
    } else if (typeof global !== "undefined") {
      g = global;
    } else if (typeof self !== "undefined") {
      g = self;
    } else {
      g = this;
    }g.tLi = f();
  }
})(function () {
  var define, module, exports;return function e(t, n, r) {
    function s(o, u) {
      if (!n[o]) {
        if (!t[o]) {
          var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw f.code = "MODULE_NOT_FOUND", f;
        }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
          var n = t[o][1][e];return s(n ? n : e);
        }, l, l.exports, e, t, n, r);
      }return n[o].exports;
    }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
      s(r[o]);
    }return s;
  }({ 1: [function (require, module, exports) {
      var TransformItem = require("./TransformItem");
      var createTItemString = require("./utils/createTItemString");
      var updateTItem = require("./utils/updateTItem");

      function CSSTransformItem() {
        TransformItem.call(this);
      }

      CSSTransformItem.prototype = Object.create(TransformItem.prototype);
      CSSTransformItem.prototype.constructor = CSSTransformItem;

      CSSTransformItem.prototype.type = "css";

      CSSTransformItem.prototype.translate = function (x, y) {
        if (typeof x === "number") x += "px";
        if (y && typeof y === "number") y += "px";

        return TransformItem.prototype.translate.call(this, x, y);
      };

      CSSTransformItem.prototype.rotate = function (deg) {
        if (typeof deg === "number") deg += "deg";

        return TransformItem.prototype.rotate.call(this, deg);
      };

      CSSTransformItem.prototype.skewX = function (deg) {
        if (typeof deg === "number") deg += "deg";

        return TransformItem.prototype.skewX.call(this, deg);
      };

      CSSTransformItem.prototype.skewY = function (deg) {
        if (typeof deg === "number") deg += "deg";

        return TransformItem.prototype.skewY.call(this, deg);
      };

      CSSTransformItem.prototype.skew = function (x, y) {
        if (typeof x === "number") x += "deg";
        if (y && typeof y === "number") y += "deg";

        if (!y) y = x;

        this._string = createTItemString("skew", x, y);

        updateTItem(this);

        return this;
      };

      CSSTransformItem.prototype.clone = function () {
        return TransformItem.prototype.clone.call(this);
      };

      module.exports = CSSTransformItem;
    }, { "./TransformItem": 3, "./utils/createTItemString": 6, "./utils/updateTItem": 11 }], 2: [function (require, module, exports) {
      var TransformItem = require("./TransformItem.js");

      function SVGTransformItem() {
        TransformItem.call(this);
      }

      SVGTransformItem.prototype = Object.create(TransformItem.prototype);
      SVGTransformItem.prototype.constructor = SVGTransformItem;

      SVGTransformItem.prototype.type = "svg";

      SVGTransformItem.prototype.clone = function () {
        return TransformItem.prototype.clone.call(this);
      };

      module.exports = SVGTransformItem;
    }, { "./TransformItem.js": 3 }], 3: [function (require, module, exports) {
      var createTItemString = require("./utils/createTItemString");
      var updateTItem = require("./utils/updateTItem");

      function TransformItem() {
        this._ownerList = null;
        this._string = "";
      }

      TransformItem.prototype.scale = function (x, y) {
        if (arguments.length === 0) return;

        if (!y) y = x;

        this._string = createTItemString("scale", x, y);

        updateTItem(this);

        return this;
      };

      TransformItem.prototype.translate = function (x, y) {
        if (arguments.length === 0) return;

        if (!y) y = x;

        this._string = createTItemString("translate", x, y);

        updateTItem(this);

        return this;
      };

      TransformItem.prototype.skewX = function (deg) {
        if (arguments.length === 0) return;

        this._string = createTItemString("skewX", deg);

        updateTItem(this);

        return this;
      };

      TransformItem.prototype.skewY = function (deg) {
        if (arguments.length === 0) return;

        this._string = createTItemString("skewY", deg);

        updateTItem(this);

        return this;
      };

      TransformItem.prototype.rotate = function () {
        if (arguments.length === 0) return;

        [].splice.call(arguments, 3, arguments.length);
        [].unshift.call(arguments, "rotate");

        this._string = createTItemString.apply(undefined, arguments);

        updateTItem(this);

        return this;
      };

      TransformItem.prototype.clone = function () {
        var clone = new this.constructor();
        clone._string = this._string;
        return clone;
      };

      TransformItem.prototype.toString = function () {
        return this._string;
      };

      module.exports = TransformItem;
    }, { "./utils/createTItemString": 6, "./utils/updateTItem": 11 }], 4: [function (require, module, exports) {
      var setTListToElements = require("./utils/setTListToElements");
      var createTransformString = require("./utils/createTransformString");

      function TransformList(type) {
        this._elements = [];
        this._transformString = "";

        this.type = type;
        this.length = 0;
      }

      TransformList.prototype.appendTo = function () {
        this._elements = [].slice.call(arguments);
        setTListToElements(this);
      };

      TransformList.prototype.push = function () {
        checkAddedItems(this.type, [].slice.call(arguments));

        var items = cloneItems([].slice.call(arguments));

        [].push.apply(this, items);

        for (var i = 0; i < items.length; i++) {
          items[i]._ownerList = this;
        }

        this._transformString = createTransformString(this);
        setTListToElements(this);
      };

      TransformList.prototype.insertBefore = function (index) {
        checkAddedItems(this.type, [].slice.call(arguments, 1));

        index !== 0 && index--;

        var items = cloneItems([].slice.call(arguments, 1));

        [].splice.apply(this, [].concat([index, 0], items));

        for (var i = 1; i < items.length; i++) {
          items[i]._ownerList = this;
        }

        this._transformString = createTransformString(this);
        setTListToElements(this);
      };

      TransformList.prototype.remove = function (index) {
        [].splice.call(this, index, 1);

        this._transformString = createTransformString(this);
        setTListToElements(this);
      };

      TransformList.prototype.removeRange = function (start, end) {
        if (!end) end = this.length;

        if (start === end) {
          this.remove(start);
          return;
        }

        [].splice.call(this, start, end - start);

        this._transformString = createTransformString(this);
        setTListToElements(this);
      };

      TransformList.prototype.clear = function () {
        if (this.length === 0) return;

        [].splice.call(this, 0, this.length);

        this._transformString = "";
        setTListToElements(this);
      };

      function checkAddedItems(listType, items) {
        items.forEach(function (item) {
          if (listType !== item.type) {
            throw new TypeError("You can't add " + item.type + " item to " + listType + " list");
          }
        });
      }

      function cloneItems(items) {
        return items.map(function (item) {
          return item.clone();
        });
      }

      module.exports = TransformList;
    }, { "./utils/createTransformString": 7, "./utils/setTListToElements": 10 }], 5: [function (require, module, exports) {
      var TransformList = require("./TransformList");
      var CSSTransformItem = require('./CSSTransformItem');
      var SVGTransformItem = require('./SVGTransformItem');

      module.exports = {
        svg: function svg() {
          return new TransformList("svg");
        },
        css: function css() {
          return new TransformList("css");
        },
        cssItem: function cssItem(transformType) {
          if (!transformType) return new CSSTransformItem();

          var item = new CSSTransformItem();
          item[transformType].apply(item, [].slice.call(arguments, 1));

          return item;
        },
        svgItem: function svgItem(transformType) {
          if (!transformType) return new SVGTransformItem();

          var item = new SVGTransformItem();
          item[transformType].apply(item, [].slice.call(arguments, 1));

          return item;
        }
      };
    }, { "./CSSTransformItem": 1, "./SVGTransformItem": 2, "./TransformList": 4 }], 6: [function (require, module, exports) {
      function createTItemString(transformType) {
        return [transformType, "(", [].slice.call(arguments, 1).join(", "), ")"].join("");
      }

      module.exports = createTItemString;
    }, {}], 7: [function (require, module, exports) {
      function createTransformString(list) {
        return [].join.call(list, " ");
      }

      module.exports = createTransformString;
    }, {}], 8: [function (require, module, exports) {
      var cssTransforms = ["webkitTransform", "OTransform", "msTransform", "MozTransform", "transform"];

      function setCSSTListToElements(list) {
        list._elements.forEach(function (el) {
          cssTransforms.forEach(function (t) {
            if (el.style[t] !== undefined) {
              el.style[t] = list._transformString;
            }
          });
        });
      }

      module.exports = setCSSTListToElements;
    }, {}], 9: [function (require, module, exports) {
      function setSVGTListToElements(list) {
        list._elements.forEach(function (el) {
          el.setAttribute("transform", list._transformString);
        });
      }

      module.exports = setSVGTListToElements;
    }, {}], 10: [function (require, module, exports) {
      var setSVGTListToElements = require("./setSVGTListToElements");
      var setCSSTListToElements = require("./setCSSTListToElements");

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
    }, { "./setCSSTListToElements": 8, "./setSVGTListToElements": 9 }], 11: [function (require, module, exports) {
      var createTransformString = require("./createTransformString");
      var setTListToElements = require("./setTListToElements");

      function updateTItem(item) {
        if (!item._ownerList) return;

        item._ownerList._transformString = createTransformString(item._ownerList);
        setTListToElements(item._ownerList);
      }

      module.exports = updateTItem;
    }, { "./createTransformString": 7, "./setTListToElements": 10 }] }, {}, [5])(5);
});