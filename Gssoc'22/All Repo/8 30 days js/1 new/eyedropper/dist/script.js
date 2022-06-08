document.querySelector('.ctn-icon-eyedropper').addEventListener('click', async () => {
	// EyeDropper supported validation
	if ('EyeDropper' in window) {
	  // Create an EyeDropper object
    let eyeDrop = new EyeDropper();
  
    try {
      // Enter eyedropper mode
      const { sRGBHex } = await eyeDrop.open();
      copyText('txt-color', rgbaToHex(sRGBHex || '#cdcdcd'));

      // Wait while DOM loads
      await sleep(300);

      alert(`The color ${rgbaToHex(sRGBHex)} has been copied on clipboard`);
    } catch (error) {
        console.log(error);
      }
	} else {
      // In case the browser is not supported it is showed an alert
      alert('EyeDropper is not supported on this browser, try it on another browser');
    }
});
  
const copyText = (element, color) => {
  try {
    // returns hex color value (#RRGGBB) of the selected pixel
    document.querySelector('.bg').style.setProperty('--bg-palette', color);
    document.querySelector('.txt-color').textContent = color;
  
    // Before we copy, we are gonna select the text.
    let text = document.querySelector(`.${element}`);
    let selection = window.getSelection();
    let range = document.createRange();
    range.selectNodeContents(text);
    selection.removeAllRanges();
    selection.addRange(range);
  
    // Add to clipboard.
    document.execCommand('copy');
  } catch (error) {
      throw error;
    }
}
  
const sleep = number => {
  return new Promise( (res, rej) => setTimeout( () => res(), number));
}

const rgbaToHex = rgba => {

  const match = rgba.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
  
  if (match && match.length === 4) {
    let r = `${match[1]}`.toString(16);
    let g = `${match[2]}`.toString(16);
    let b = `${match[3]}`.toString(16);

    if (r.length == 1) r = '0' + r;
    if (g.length == 1) g = '0' + g;
    if (b.length == 1) b = '0' + b;
  
    return `#${r}${g}${b}`;
    
  } else return rgba;

}