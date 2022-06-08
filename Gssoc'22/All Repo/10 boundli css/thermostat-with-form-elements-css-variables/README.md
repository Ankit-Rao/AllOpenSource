# Thermostat with form elements & CSS variables

A Pen created on CodePen.io. Original URL: [https://codepen.io/thebabydino/pen/eGvNjr](https://codepen.io/thebabydino/pen/eGvNjr).

[Watch me code this in ~50 minutes](https://www.youtube.com/watch?v=yhwGL1I9LP0) (you can speed it up if you feel I'm typing/ speaking too slow).  Tested and looks as intended in Chrome/ Opera with Experimental Web Platform Features flag enabled in `chrome://flags/` (or `opera://flags` if you're using Opera) - this gives us support for native conic gradients so we can use CSS variables as stops.

![screenshot of chrome://flags](https://pbs.twimg.com/media/DHHFzoSW0AAMaYI.jpg)

For WebKit browsers not supporting native `conic-gradient()`, the demo is functional, it's just that the `track` is all a dim grey, as it can be seen below:

![screenshot for WebKit browsers without support for native conic-gradient()](https://pbs.twimg.com/media/DKrgsViWAAAxOTg.jpg)

For Firefox, the `conic-gradient()` polyfill kicks in and, while we don't have support for CSS variables this way, the track is an orange to red gradient from start to end.

![screenshot for Firefox - no support for native conic-gradient(), but the polyfill kicks in](https://pbs.twimg.com/media/DKrgueJWsAAjTE_.jpg)

For Edge... sorry, but I'll try when it supports using `calc()` for angle values.

![screenshot for Edge - it's a disaster](https://pbs.twimg.com/media/DKrgvadWkAAraqr.jpg)

If you like this demo in particular and my work in general and you want me to be able to continue putting stuff out, please consider one of the following:

* showing your appreciation with a donation: 

[![donate button](https://liberapay.com/assets/widgets/donate.svg)](https://liberapay.com/anatudor/donate)

* getting me something from my Amazon WishList: [🇺🇸](https://www.amazon.com/gp/registry/wishlist/2Y3C4722GXH0I/) / [🇬🇧](https://www.amazon.co.uk/gp/registry/wishlist/2I25W7U0KADSR/)

* or at least sharing this to show the rest of the world what can be done  on the web these days, using only HTML form elements, CSS and vanilla JavaScript


Thank you!

---

[The original](https://codepen.io/simoberny/pres/wrGoZZ) was made with `div` elements, so my version tried to recreate the visual result with form elements and CSS variables.