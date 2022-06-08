var svg = document.querySelector("svg");
var map = document.querySelector(".map");

var zoomLevels = [1, 2, 4];
var zoomLevel = 0;
var cursorPoint = svg.createSVGPoint();

document.addEventListener("click", onZoom);

function onZoom(e) {
  zoomLevel++;
  zoomLevel = zoomLevel % zoomLevels.length;
  cursorPoint = getCursorPoint(e);
  if (zoomLevel === 0) {
    // attempting to reset transform - even tried clearing the data-svg-origin that gets added.
    TweenMax.to(map, .5, {
      attr: {
        style: "transform-origin: 0px 0px 0px; transform: matrix(1, 0, 0, 1, 0, 0);"
      },
      ease: Quint.easeOut
    });
  } else {
    // sets scale
    TweenMax.to(map, .5, {
      scale: zoomLevels[zoomLevel],
      svgOrigin: (cursorPoint.x) + "px " + (cursorPoint.y) + "px",
      ease: Quint.easeOut
    });
  }

}

function getCursorPoint(e) {
  if (e.touches) {
    cursorPoint.x = e.touches[0].clientX;
    cursorPoint.y = e.touches[0].clientY;
  } else {
    cursorPoint.x = e.clientX;
    cursorPoint.y = e.clientY;
  }
  return cursorPoint.matrixTransform(svg.getScreenCTM().inverse());
}