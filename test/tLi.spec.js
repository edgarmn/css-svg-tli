describe("tLi", function() {
  it("should be object {svg(), css(), cssItem(), svgItem()}", function() {
    assert.isObject(tLi);
    assert.property(tLi, "svg");
    assert.property(tLi, "css");
    assert.property(tLi, "cssItem");
    assert.property(tLi, "svgItem");
  });

  describe("#svg()", function() {
    it("should return TransformList for svg", function() {
      const svgList = tLi.svg();
      assert.equal(svgList.constructor.name, "TransformList");
      assert.equal(svgList.type, "svg");
    });
  });

  describe("#css()", function() {
    it("should return TransformList for css", function() {
      const cssList = tLi.css();
      assert.equal(cssList.constructor.name, "TransformList");
      assert.equal(cssList.type, "css");
    })
  });

  describe("#cssItem()", function() {
    it("should accept transform type and create configured item", function() {
      const item = tLi.cssItem("translate", 50, 100);
      assert.equal(item._string, "translate(50px, 100px)");
    });

    it("should return css transform item", function() {;
      assert.equal(tLi.cssItem().constructor.name, "CSSTransformItem");
    });
  });

  describe("#svgItem()", function() {
    it("should accept transform type and create configured item", function() {
      const item = tLi.svgItem("translate", 50, 100);
      assert.equal(item._string, "translate(50, 100)");
    });

    it("should return svg transform item", function() {;
      assert.equal(tLi.svgItem().constructor.name, "SVGTransformItem");
    });
  });
});
