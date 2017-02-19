# css-svg-tli

Small library for manipulating css or svg transforms.

## usage

```JavaScript

const svgTLi = tLi.svg(); // returns TransformList instance for svg
const cssTLi = tLi.css(); // returns TransformList instance for css

const svgTItem = tLi.svgItem("translate", 25, 25); // returns preconfigured SVGTransformItem
const cssTItem = tLi.cssItem(); // returns CSSTransformItem

// TransformList is an array-like class with several methods:
cssTLi.appendTo(divOne, divTwo); // appends list to one or more elements
// so after appending all changes of list are applied to elements
cssTLi.push(cssTItem.rotate(90), cssTItem.scale(2)); // rotate(90deg) scale(2, 2)
cssTLi.insertBefore(1, cssTItem.translate(100));  // translate(100px, 100px) rotate(90deg) scale(2, 2)
cssTLi[0].translate(60); // translate(60px, 60px) rotate(90deg) scale(2, 2)
cssTLi.remove(0); // rotate(90deg) scale(2, 2)
cssTLi.removeRange(0, 1); // scale(2, 2)
cssTLi.clear();

```

## installation

npm

```
npm install css-svg-tli

```
manual

```html

<script src="tLi.min.js"></script>
<script>
    // use global tLi
</script>

```
