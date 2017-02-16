describe("SVGTransformItem", function() {
  describe("all methods", function(){
    it("should properly create svg transform item string", function() {
      assert.isTrue(checkSvgStringCorrectness("translate", 40, 40), "expected that created string will be kind of translate(x, y)");
      assert.isTrue(checkSvgStringCorrectness("rotate", 90, 50, 50), "expected that created string will be kind of rotate(deg, cx, cy)");
      assert.isTrue(checkSvgStringCorrectness("scale", 2, 2), "expected that created string will be kind of scale(x, y)");
      assert.isTrue(checkSvgStringCorrectness("skewX", 45)), "expected that created string will be kind of skewX(deg)";
      assert.isTrue(checkSvgStringCorrectness("skewY", 45), "expected that created string will be kind of skewY(deg)");
    });

    describe("when appended to list and if list is also appended to element", function() {
      it("should update element's transform if item is changed (svg list)", function() {
        assert.isTrue(checkIfUpdatingSVGItem("translate", 40, 40), "expected that tItem updated in element (translate)");
        assert.isTrue(checkIfUpdatingSVGItem("rotate", 90, 50, 50), "expected that tItem updated in element (rotate)");
        assert.isTrue(checkIfUpdatingSVGItem("scale", 2, 2), "expected that tItem updated in element (scale)");
        assert.isTrue(checkIfUpdatingSVGItem("skewX", 45)), "expected that tItem updated in element (skewX)";
        assert.isTrue(checkIfUpdatingSVGItem("skewY", 45), "expected that tItem updated in element (skewY)");
      });
    });
  });
});

describe("CSSTransformItem", function() {
  describe("all methods", function(){
    it("should properly create css transform item string", function() {
      assert.isTrue(checkCssStringCorrectness("translate", 40, 40), "expected that created string will be kind of translate(x[px], y[px])");
      assert.isTrue(checkCssStringCorrectness("rotate", 90), "expected that created string will be kind of rotate(deg[deg])");
      assert.isTrue(checkCssStringCorrectness("scale", 2, 2), "expected that created string will be kind of scale(x, y)");
      assert.isTrue(checkCssStringCorrectness("skewX", 45)), "expected that created string will be kind of skewX(deg[deg])";
      assert.isTrue(checkCssStringCorrectness("skewY", 45), "expected that created string will be kind of skewY(deg[deg])");
    });

    describe("when appended to list and if list is also appended to element", function() {
      it("should update element's transform if item is changed (css list)", function() {
        assert.isTrue(checkIfUpdatingCSSItem("translate", 40, 40), "expected that tItem updated in element (translate)");
        assert.isTrue(checkIfUpdatingCSSItem("rotate", 90), "expected that tItem updated in element (rotate)");
        assert.isTrue(checkIfUpdatingCSSItem("scale", 2, 2), "expected that tItem updated in element (scale)");
        assert.isTrue(checkIfUpdatingCSSItem("skewX", 45)), "expected that tItem updated in element (skewX)";
        assert.isTrue(checkIfUpdatingCSSItem("skewY", 45), "expected that tItem updated in element (skewY)");
      });
    });
  });
});

function checkCssStringCorrectness(transformType) {
  const tItem = createCSSTItem();
  let args = [].slice.call(arguments, 1);

  tItem[transformType].apply(tItem, args);

  switch (transformType) {
    case "rotate":
    case "skewX":
    case "skewY":
      args = args.map(arg => {return arg += "deg";});
      break;
    case "translate":
      args = args.map(arg => {return arg += "px";});
      break;
  }

  return tItem._string === [transformType, "(", args.join(", "), ")"].join("");
}

function checkSvgStringCorrectness(transformType) {
  const tItem = createSVGTItem();
  const args = [].slice.call(arguments, 1);

  tItem[transformType].apply(tItem, args);

  return tItem._string === [transformType, "(", args.join(", "), ")"].join("");
}

function checkIfUpdatingSVGItem(transformType) {
  const list = createAppendedSVGList();
  const svgTItems = createSVGTItems(2);
  const args = [].slice.call(arguments, 1);

  svgTItems[0][transformType].apply(svgTItems[0], args);
  svgTItems[1][transformType].apply(svgTItems[1], args);

  list.push(svgTItems[0], svgTItems[1]);

  const newArgs = args.map(arg => {return arg + Math.round(Math.random() * 5);})

  list[1][transformType].apply(list[1], newArgs);

  return list._elements[0].getAttribute("transform") === list[0]._string + " " + list[1]._string;
}

function checkIfUpdatingCSSItem(transformType) {
  const list = createAppendedCSSList();
  const cssTItems = createCSSTItems(2);
  const args = [].slice.call(arguments, 1);

  cssTItems[0][transformType].apply(cssTItems[0], args);
  cssTItems[1][transformType].apply(cssTItems[1], args);

  list.push(cssTItems[0], cssTItems[1]);

  const newArgs = args.map(arg => {
    return parseInt(arg) + Math.round(Math.random() * 5);
  });

  list[1][transformType].apply(list[1], newArgs);
  console.log(list._elements[0].style.transform);
  return list._elements[0].style.transform === list[0]._string + " " + list[1]._string;
}
