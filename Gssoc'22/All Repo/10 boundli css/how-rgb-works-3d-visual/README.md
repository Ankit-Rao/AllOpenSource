# how RGB works (3D visual)

A Pen created on CodePen.io. Original URL: [https://codepen.io/thebabydino/pen/LRXjAy](https://codepen.io/thebabydino/pen/LRXjAy).

Pure CSS 3D structure and breathing animation. Uses CSS 3D transforms and CSS keyframe animations (the custom easing is an approximation of [easeInOutCubic](http://easings.net/#easeInOutCubic)). JS used only for interaction (drag, works for both mouse and touch). Live coded in 45 minutes on the 19th of October 2016. Inspired by [this Bees & Bombs creation](https://www.instagram.com/p/BLt8JDGhU98/). 

Should look like in the image below, with a "breathing" animation: 

![capture](https://pbs.twimg.com/tweet_video_thumb/CvKU9fnXgAURDOO.jpg) 

Initially had the idea of using CSS variables for this and doing:

``` CSS
&:nth-child(#{$idx}) {
  /* other styles */
  --r: $r;
  --g: $g;
  --b: $b;
}
```

And then using the `--r`, `--g` and `--b` variables to create the `rgb()` value in the general class:

``` CSS
color: rgb(var(--r), var(--g), var(--b));
```

Sadly, this doesn't work due to [a preprocessor issue](https://github.com/sass/sass/issues/2175) (Sass in my case, but [LESS and Stylus do the same](https://twitter.com/kizmarh/status/788795199199870980)). 

A workaround would be string interpolation (`color: #{'rgb(var(--r), var(--g), var(--b))'};`), which is ugly and would basically turn my `rgb()` value into a string, making it unusable later in functions like `darken()` or `mix()` or `lighten()` and so on... 

Another workaround would be putting at least the first `var()` call inside a `calc()`, but this would slash support even further. Not only it's not supported in Edge (because of no CSS variables support), but now it's not supported in Firefox either as `calc()` inside `rgb()` is only supported in WebKit browsers. So no Firefox and no Edge even with CSS variables support. 

**BUT**...

The whole thing looks broken in Edge anyway (reducing the number of cubes per edge does fix the CSS animation though and mouse drag appears to work... still, no luck with touch) and Firefox still has the same old 3D order issues, so... it still only works in WebKit browsers. So I don't know.

---

If the work I've been putting out since early 2012 has helped you in any way or you just like it and you wish me to be able to continue putting out stuff, please consider one of the following:

* being a cool cat 😼🎩 and becoming a patron on Patreon

[![become a patron button](https://assets.codepen.io/2017/btn_patreon.png)](https://www.patreon.com/anatudor)

* making a one time donation via Ko-fi

[![ko-fi](https://assets.codepen.io/2017/btn_kofi.svg)](https://ko-fi.com/anatudor)

* getting me something off my Amazon WishList 

[🎁 🇺🇸](https://www.amazon.com/gp/registry/wishlist/2Y3C4722GXH0I/) / [🎁 🇬🇧](https://www.amazon.co.uk/gp/registry/wishlist/2I25W7U0KADSR/)

* or at least sharing this to show the rest of the world what can be done with CSS these days

Thank you!