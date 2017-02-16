describe("TransformList", function() {
  let cssList = createAppendedCSSList();
  let svgList = createAppendedSVGList();

  describe("#appendTo()", function() {
    const rects = [document.createElement("rect"), document.createElement("rect")];

    afterEach(function() {
      svgList = createAppendedSVGList();
    });

    it("should detach from elements if there are and append to new ones", function() {
      svgList.appendTo(rects[0], rects[1]);

      assert.isTrue(Object.is(rects[0], svgList._elements[0]));
      assert.isTrue(Object.is(rects[1], svgList._elements[1]));
    });

    it("should apply transform to all added elements", function() {
      svgList.push(createSVGTItem().rotate(90, 50, 50));

      svgList.appendTo(rects[0], rects[1]);

      assert.equal(rects[0].getAttribute("transform"), svgList._transformString);
      assert.equal(rects[1].getAttribute("transform"), svgList._transformString);
    });
  });

  describe("#push()", function() {
    afterEach(function() {
      svgList = createAppendedSVGList();
    });

    it("should throw TypeError if added CSSTransformItem when list is svg", function() {
      assert.throws(svgList.push.bind(0, createSVGTItem(), createCSSTItem()), TypeError);
    });

    it("should throw TypeError if added SVGTransformItem when list is css", function() {
      assert.throws(cssList.push.bind(0, createCSSTItem(), createSVGTItem()), TypeError);
    });

    it("should add items to list", function() {
      const svgTItems = translateTItems(createSVGTItems(2));
      svgList.push(svgTItems[0], svgTItems[1]);
      assert.equal(svgList[0]._string, svgTItems[0]._string);
      assert.equal(svgList[1]._string, svgTItems[1]._string);
    });

    it("should clone item when adding", function() {
      const tItem = createSVGTItem().translate(50);

      svgList.push(tItem);
      tItem.translate(60);

      assert.equal(svgList[0]._string, "translate(50, 50)");
    });
  });

  describe("#insertBefore()", function() {
    afterEach(function() {
      svgList = createAppendedSVGList();
    });

    it("should throw TypeError if added CSSTransformItem when list is svg", function() {
      assert.throws(svgList.insertBefore.bind(0, createSVGTItem(), createCSSTItem()), TypeError);
    });

    it("should throw TypeError if added SVGTransformItem when list is css", function() {
      assert.throws(cssList.insertBefore.bind(0, createCSSTItem(), createSVGTItem()), TypeError);
    });

    it("should add items before provided index", function() {
      const tItems = translateTItems(createSVGTItems(4));

      svgList.insertBefore(0, tItems[0]);
      svgList.insertBefore(1, tItems[3], tItems[1], tItems[2]);

      assert.equal(svgList[0]._string, tItems[3]._string);
      assert.equal(svgList[1]._string, tItems[1]._string);
      assert.equal(svgList[2]._string, tItems[2]._string);
      assert.equal(svgList[3]._string, tItems[0]._string);
    });

    it("should clone item when adding", function() {
      const tItem = createSVGTItem().translate(50);

      svgList.insertBefore(0, tItem);
      tItem.translate(60);

      assert.equal(svgList[0]._string, "translate(50, 50)");
    });
  });

  describe("#remove()", function() {
    it("should remove item from list by index", function() {
      svgList.push.apply(svgList, translateTItems(createSVGTItems(4)));
      svgList.remove(3);
      assert.isUndefined(svgList[3]);
    });

    after(function() {
      svgList = createAppendedSVGList();
    });
  });

  describe("#removeRange()", function() {
    const svgTItems = translateTItems(createSVGTItems(5));

    beforeEach(function() {
      svgList.push.apply(svgList, svgTItems);
    });

    afterEach(function() {
      svgList = createAppendedSVGList();
    });

    it("should remove items from start to end not including end index", function() {
      svgList.removeRange(0, 2);

      assert.deepPropertyVal(svgList, "0._string", svgTItems[2]._string);
      assert.deepPropertyVal(svgList, "1._string", svgTItems[3]._string);
      assert.deepPropertyVal(svgList, "2._string", svgTItems[4]._string);
    });

    it("should remove from start index to end of list if second index is not provided", function() {
      svgList.removeRange(2);

      assert.equal(svgList.length, 2);
      assert.deepPropertyVal(svgList, "0._string", svgTItems[0]._string);
      assert.deepPropertyVal(svgList, "1._string", svgTItems[1]._string);
    });

    it("should remove one item if indexes are equal", function() {
      svgList.removeRange(2, 2);

      assert.equal(svgList.length, 4);
      assert.deepPropertyVal(svgList, "2._string", svgTItems[3]._string);
      assert.deepPropertyVal(svgList, "3._string", svgTItems[4]._string);
    });
  });

  describe("#clear()", function() {
    it("should delete all properties from list", function() {
      svgList.push.apply(cssList, translateTItems(createCSSTItems(2)));

      svgList.clear();

      assert.notProperty(svgList, 0);
      assert.notProperty(svgList, 1);
    });

    after(function() {
      svgList = createAppendedSVGList();
    });
  });

  describe("all methods", function() {
    it("should apply changes to element (svg)", function() {
      const tItems = translateTItems(createSVGTItems(2));

      assert.isTrue(checkSVGLiChangesApplied(svgList, "push", tItems[0], tItems[1]), "expected changes have been applied to element (push)");
      assert.isTrue(checkSVGLiChangesApplied(svgList, "insertBefore", 1, tItems[0], tItems[1]), "expected changes have been applied to element (insertBefore)");
      assert.isTrue(checkSVGLiChangesApplied(svgList, "remove", 2), "expected changes have been applied to element (remove)");
      assert.isTrue(checkSVGLiChangesApplied(svgList, "removeRange", 0, 1), "expected changes have been applied to element (removeRange)");
      assert.isTrue(checkSVGLiChangesApplied(svgList, "clear"), "expected changes have been applied to element (clear)");
    });

    it("should apply changes to element (css)", function() {
      const tItems = translateTItems(createCSSTItems(2));

      assert.isTrue(checkCSSLiChangesApplied(cssList, "push", tItems[0], tItems[1]), "expected changes have been applied to element (push)");
      assert.isTrue(checkCSSLiChangesApplied(cssList, "insertBefore", 1, tItems[0], tItems[1]), "expected changes have been applied to element (insertBefore)");
      assert.isTrue(checkCSSLiChangesApplied(cssList, "remove", 2), "expected changes have been applied to element (remove)");
      assert.isTrue(checkCSSLiChangesApplied(cssList, "removeRange", 0, 1), "expected changes have been applied to element (removeRange)");
      assert.isTrue(checkCSSLiChangesApplied(cssList, "clear"), "expected changes have been applied to element (clear)");
    });
  });
});

function checkSVGLiChangesApplied(list, methodName) {
  list[methodName].apply(list, [].slice.call(arguments, 2));

  return list._elements[0].getAttribute("transform") === [].map.call(list, list => {return list._string;}).join(" ");
}

function checkCSSLiChangesApplied(list, methodName) {
  list[methodName].apply(list, [].slice.call(arguments, 2));

  return list._elements[0].style.transform === [].map.call(list, list => {return list._string;}).join(" ");
}
