(function(window) {
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

  function TransformItem() {
    this._ownerList = null;
    this._string = "";
  }

  TransformItem.prototype.scale = function(x, y) {
    if (arguments.length === 0) return;

    if (!y) y = x;

    this._string = getItemString("scale", x, y);

    updateTItem(this);

    return this;
  };

  TransformItem.prototype.translate = function(x, y) {
    if (arguments.length === 0) return;

    if (!y) y = x;

    this._string = getItemString("translate", x, y);

    updateTItem(this);

    return this;
  };

  TransformItem.prototype.skewX = function(deg) {
    if (arguments.length === 0) return;

    this._string = getItemString("skewX", deg);

    updateTItem(this);

    return this;
  };

  TransformItem.prototype.skewY = function(deg) {
    if (arguments.length === 0) return;

    this._string = getItemString("skewY", deg);

    updateTItem(this);

    return this;
  };

  TransformItem.prototype.rotate = function() {
    if (arguments.length === 0) return;

    [].splice.call(arguments, 3, arguments.length);
    [].unshift.call(arguments, "rotate");

    this._string = getItemString.apply(undefined, arguments);

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

  function SVGTransformItem() {
    TransformItem.call(this);
  }

  SVGTransformItem.prototype = Object.create(TransformItem.prototype);
  SVGTransformItem.prototype.constructor = SVGTransformItem;

  SVGTransformItem.prototype.type = "svg";

  SVGTransformItem.prototype.clone = function() {
    return TransformItem.prototype.clone.call(this);
  };

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

    this._string = getItemString("skew", x, y);

    updateTItem(this);

    return this;
  };

  CSSTransformItem.prototype.clone = function() {
    return TransformItem.prototype.clone.call(this);
  };

  function getItemString(transformType) {
    return [
      transformType,
      "(",
      [].slice.call(arguments, 1).join(", "),
      ")"
    ].join("");
  }

  function updateTItem(item) {
    if (!item._ownerList) return;

    item._ownerList._transformString = createTransformString(item._ownerList);
    setTListToElements(item._ownerList);
  }

  function createTransformString(list) {
    return [].join.call(list, " ");
  }

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

  function setSVGTListToElements(list) {
    list._elements.forEach(el => {
      el.setAttribute("transform", list._transformString);
    });
  }

  const cssTransforms = [
    "webkitTransform",
    "OTransform",
    "msTransform",
    "MozTransform",
    "transform"
  ];

  function setCSSTListToElements(list) {
    list._elements.forEach(el => {
      cssTransforms.forEach(t => {
        if (el.style[t] !== undefined) {
          el.style[t] = list._transformString;
        }
      });
    });
  }

  window.tLi = {
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
}(window));
