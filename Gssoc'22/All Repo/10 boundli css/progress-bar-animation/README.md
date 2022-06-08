# <progress> bar animation

A Pen created on CodePen.io. Original URL: [https://codepen.io/thebabydino/pen/OpEyrL](https://codepen.io/thebabydino/pen/OpEyrL).

[Watch what I did here](https://www.youtube.com/watch?v=Nhh1Ow_OZHo) in 9 minutes. If you like my work, please consider one of the following:

* getting me something from [my Amazon WishList](https://www.amazon.com/gp/registry/wishlist/2Y3C4722GXH0I/)

* or this [t-shirt](http://merchdome.com/ACCEPT-Girlieshirt-Restless-and-Wild-Since-1982_1)  (size S) that I couldn't find on Amazon, but I absolutely love

* or at least share this to show the world what can be done on the web today

Thank you!

---

Changes:

* switch from using `div` elements to build the progress bar to using a `progress` and an `output`

* styling these new elements for a crossbrowser look, which is a bit different than for divs

* removing the manually added prefixes and switching to `-prefix-free` in the CSS settings ([the why behind](https://codepen.io/thebabydino/full/pjxVWp/))

* switching to recreating the animation with [`requestAnimationFrame` instead of `setInterval`](https://www.paulirish.com/2011/requestanimationframe-for-smart-animating/)