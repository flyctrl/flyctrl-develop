---
title: media对各种设备的判断
tags:
  - media
id: 180
categories:
  - HTML5/CSS3
date: 2015-07-12 21:35:53
---

```css
@media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
/* Smartphones (portrait and landscape) */
}

@media only screen and (min-width : 321px) {
/* Smartphones (landscape) */
}

@media only screen and (max-width : 320px) {
/* Smartphones (portrait) */
}

@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) {
/* iPads (portrait and landscape) */
}

@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : landscape) {
/* iPads (landscape) */
}

@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : portrait) {
/* iPads (portrait) */
}

@media only screen and (-webkit-min-device-pixel-ratio : 1.5),only screen and (min-device-pixel-ratio : 1.5) {
/* iPhone 4 */
}

@media screen and (max-width : 640px) {
/*640px */
}

@media screen and (max-width : 800px) {
/* 800px */
}

@media screen and (max-width : 1024px) {
/* 1024px */
}

@media only screen and (min-width : 1224px) {
/* Desktops and laptops */
}

@media only screen and (min-width : 1824px) {
/* Large screens */
}

@media only screen and (min-width: 320px) {

/* Small screen, non-retina */

}

@media
only screen and (-webkit-min-device-pixel-ratio: 2) and (min-width: 320px),
only screen and ( min--moz-device-pixel-ratio: 2) and (min-width: 320px),
only screen and ( -o-min-device-pixel-ratio: 2/1) and (min-width: 320px),
only screen and ( min-device-pixel-ratio: 2) and (min-width: 320px),
only screen and ( min-resolution: 192dpi) and (min-width: 320px),
only screen and ( min-resolution: 2dppx) and (min-width: 320px) {

/* Small screen, retina, stuff to override above media query */

}

@media only screen and (min-width: 700px) {

/* Medium screen, non-retina */

}

@media
only screen and (-webkit-min-device-pixel-ratio: 2) and (min-width: 700px),
only screen and ( min--moz-device-pixel-ratio: 2) and (min-width: 700px),
only screen and ( -o-min-device-pixel-ratio: 2/1) and (min-width: 700px),
only screen and ( min-device-pixel-ratio: 2) and (min-width: 700px),
only screen and ( min-resolution: 192dpi) and (min-width: 700px),
only screen and ( min-resolution: 2dppx) and (min-width: 700px) {

/* Medium screen, retina, stuff to override above media query */

}

@media only screen and (min-width: 1300px) {

/* Large screen, non-retina */

}

@media
only screen and (-webkit-min-device-pixel-ratio: 2) and (min-width: 1300px),
only screen and ( min--moz-device-pixel-ratio: 2) and (min-width: 1300px),
only screen and ( -o-min-device-pixel-ratio: 2/1) and (min-width: 1300px),
only screen and ( min-device-pixel-ratio: 2) and (min-width: 1300px),
only screen and ( min-resolution: 192dpi) and (min-width: 1300px),
only screen and ( min-resolution: 2dppx) and (min-width: 1300px) {

/* Large screen, retina, stuff to override above media query */

}
```
当然更好的方法是分离css文件,更易于维护
```html
<link rel="stylesheet" media="screen and (min-device-width : 320px) and (max-device-width: 480px)" href="iphone.css" />
<link rel="stylesheet" media="screen and (min-device-width : 768px) and (max-device-width : 1024px)" href="ipad.css" />
```
最后不要忘了加上viewport
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```