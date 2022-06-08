# Cat Silhouette - MorphSVG

A Pen created on CodePen.io. Original URL: [https://codepen.io/pyrografix/pen/QjKWme](https://codepen.io/pyrografix/pen/QjKWme).

Cat animation designed for Cat Chow. Uses an inline SVG to create a resolution independent cat. The cat's tail is a stroke. There are several strokes that are invisible. The JS parses the SVG and converts the various tails to objects. TweenMax animates each value of the objects and onUpdate combine the data back together to draw the path's attribute. There is some funkiness to overcome with the ear transform in some browsers. But it looks good in Chrome!