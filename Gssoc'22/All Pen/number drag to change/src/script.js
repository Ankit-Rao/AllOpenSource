var numerals = document.createElement("canvas");
var display = document.querySelector(".display");
var numberWidth = 350;
var numberHeight = 500;
var ratio = 50 / 35;
var numeralContext;
var displayContext;
var DOMURL = window.URL || window.webkitURL || window;
var value = 0;
var vy = 0;
var y = 0;
var posY = 0;
var oldY =0;
var isDown = false;
var dragMultiplier;
var padding;

function onResize(e) {
	numberWidth = window.innerWidth / 2;
	numberHeight = numberWidth * ratio;
    dragMultiplier = numberWidth/100000;
    padding = Math.round(numberWidth * 0.1);
	if (hiDPI()) {
		numberWidth *= 2;
		numberHeight *= 2;
	}
	numerals.setAttribute("width", Math.floor(numberWidth));
	numerals.setAttribute("height", Math.floor(numberHeight * 10));
	display.setAttribute("width", Math.floor(numberWidth) * 2);
	display.setAttribute("height", Math.floor(numberHeight));
	numeralContext = numerals.getContext("2d");
	displayContext = display.getContext("2d");
	drawNumerals();
}

function drawNumerals() {
	var svgData = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="' + numberWidth + '" height="' + (numberHeight * 10) + '" viewBox="0 0 70 1000"><path fill="#FFF"  d="M7.5 32.6C7.5 15.6 19.6 5 35.1 5s27.4 10.4 27.4 27.4v35c0 17-12.1 27.6-27.6 27.6C19.4 95 7.5 84.6 7.5 67.6v-35zm20.6 35.5c0 5.2 2.8 8.1 6.9 8.1 4.1 0 6.9-2.9 6.9-8.1V31.9c0-5.2-2.7-8.1-6.9-8.1-4.1 0-6.9 2.9-6.9 8.1v36.2zm4.4 36.9h18v90H29.3v-65.4l-16.1 10.8-9.6-14.1L32.5 105zm29.8 124.6c0 8.7-3.5 16.5-11.4 26.1l-17.1 20.9h28.5V295H7.7v-14.6l29.8-38c2.3-2.9 3.8-5.7 3.8-10.1 0-5.3-2.9-8.2-6.7-8.2S28 227 28 232.3v4.4H7.7V233c0-17.2 12-28 27.4-28 15 0 27.2 10 27.2 24.6zM26.9 341.3h6.9c4.1 0 6.2-2.4 6.2-6.9V330c0-4.5-2.2-6.9-5.6-6.9-3.4 0-5.6 2.4-5.6 6.9v2.5H9.4v-3.6c0-14 11.4-23.9 25.8-23.9s25.5 9.4 25.5 23v2.5c0 7.5-3.4 13.9-8.9 18.3 6.3 4.2 10.1 10.7 10.1 18.6v3.8c0 14-12.3 23.9-27 23.9-14.8 0-26.8-9.9-26.8-24.3v-5.1h19.4v3.1c0 5.2 2.8 8.1 6.9 8.1 4.1 0 6.9-2.9 6.9-8.1V365c0-4.9-2.3-8.1-7.5-8.1h-6.9v-15.6zm8.7 135.1H4.1v-16.7L35 405h20.6v55.3h10.3v16.1H55.6V495h-20v-18.6zm0-16.1v-27.5l-15 27.5h15zM9.3 505h50.1v18.4H28.3v13.7c2.9-2.4 6.7-4.2 11.5-4.2 12.7 0 22.1 9.1 22.1 23.3v11.4c0 16.9-11.7 27.4-27.4 27.4C19.2 595 8 584.7 8 567.9v-2h20.3v2.5c0 4.9 2.5 7.6 6.3 7.6s6.3-2.7 6.3-7.6v-10.1c0-4.9-2.5-7.6-6.3-7.6-5.3 0-6.3 5.7-6.3 5.7h-19V505zM6.5 664.1c0-7.7 1.6-15.1 5.2-21.8L30.6 605h22.8l-17.2 31.3c1.6-.5 3.3-.9 5.3-.9 12.7 0 22.1 9.3 22.1 24.6v6.3C63.5 684 51 695 34.9 695S6.5 684.2 6.5 666.6v-2.5zm20.9 3c0 5.7 3 8.9 7.6 8.9s7.6-3.2 7.6-8.9v-6.3c0-5.7-3-8.9-7.6-8.9s-7.6 3.2-7.6 8.9v6.3zm10.7 57.2H9.3V705h51.4v15.4L35.6 795H13.1l25-70.7zm25.6 144.3c0 15.5-13 26.4-28.9 26.4-15.8 0-28.5-10.6-28.5-26.1v-1.3c0-8.2 3.9-15.4 10-20.1-5-4.2-8.1-10.3-8.1-17.4v-1.3c0-14 11.9-23.9 27-23.9s26.7 9.6 26.7 23.6v1.2c0 7-3.1 13.1-8.2 17.4 6.3 4.7 10.1 11.7 10.1 20.1v1.4zm-36.8-.5c0 6 3.2 9.4 8.1 9.4s8.1-3.4 8.1-9.4v-3.8c0-6-3.3-9.4-8.1-9.4s-8.1 3.4-8.1 9.4v3.8zm1.9-35.6c0 4.9 2.5 7.5 6.2 7.5s6.3-2.6 6.3-7.5V830c0-4.9-2.5-7.5-6.3-7.5s-6.2 2.6-6.2 7.5v2.5zm34.7 103.4c0 7.7-1.6 15.1-5.2 21.8L39.4 995H16.6l17.2-31.2c-1.6.5-3.3.8-5.3.8-12.7 0-22.1-9.3-22.1-24.6v-6.3C6.5 916 19 905 35.1 905s28.4 10.8 28.4 28.4v2.5zm-20.9-3c0-5.7-3-8.9-7.6-8.9s-7.6 3.2-7.6 8.9v6.3c0 5.7 3 8.9 7.6 8.9s7.6-3.2 7.6-8.9v-6.3z"/></svg>';
	var img = new Image();
	img.onload = function () {
		numeralContext.clearRect(0, 0, numberWidth * 2, numberHeight * 10);
		displayContext.clearRect(0, 0, numberWidth * 2, numberHeight);
		numeralContext.drawImage(img, 0, 0);
		DOMURL.revokeObjectURL(window.URL || window.webkitURL || window);
		setValue(value);
	}
	img.src = "data:image/svg+xml," + encodeURIComponent(svgData);
}

function setValue(newValue) {
	if (newValue) {
		value = newValue;
	}
	value = Math.min(Math.max(0, value), 99);
	var tens = Math.floor(value / 10);
	var ones = value - (tens * 10);
	var offset = value % 10;
	if (offset > 9) {
		offset = (offset - 9);
	} else {
		offset = 0;
	}
	displayContext.clearRect(0, 0, numberWidth * 2, numberHeight);
	displayContext.drawImage(numerals, padding, -numberHeight * (tens + offset));
	displayContext.drawImage(numerals, numberWidth-padding, -numberHeight * ones);
	if (ones > 9) {
		displayContext.drawImage(numerals, numberWidth-padding, (-numberHeight * ones) + (numberHeight * 10));
	}
}

window.addEventListener("resize", onResize);
onResize();

function hiDPI() {
	var mediaQuery = "(-webkit-min-device-pixel-ratio: 1.5),\
            (min--moz-device-pixel-ratio: 1.5),\
            (-o-min-device-pixel-ratio: 3/2),\
            (min-resolution: 1.5dppx)";
	if (window.devicePixelRatio > 1)
		return true;
	if (window.matchMedia && window.matchMedia(mediaQuery).matches)
		return true;
	return false;
};


////////////////////////////////////////////////////////////////

window.addEventListener("mousedown", onStartDrag, false);
document.addEventListener('touchstart', onStartDrag, false);


function onStartDrag(e) {
    isDown=true;
    posY = oldY = getY(e);
    document.addEventListener('touchmove', onDrag, false);
    document.addEventListener('mousemove', onDrag, false);

    window.addEventListener("mouseup", onStopDrag, false);
    document.addEventListener('touchend', onStopDrag, false);
};

function onStopDrag(e) {
    isDown=false;
    document.removeEventListener('touchmove', onDrag, false);
    document.removeEventListener('mousemove', onDrag, false);

    window.removeEventListener("mouseup", onStopDrag, false);
    document.removeEventListener('touchend', onStopDrag, false);
};


function onDrag(e) {
    e.preventDefault();
    posY = getY(e);
    vy = (posY-oldY)*dragMultiplier;
    oldY = posY;
};

function getY(e){
    return e.touches? e.touches[0].clientY:e.clientY;
}

TweenMax.ticker.addEventListener("tick", onUpdate);

function onUpdate(){
    if(!isDown){
        vy*=.87;
    }
    y-=vy;
    setValue(y);
}
