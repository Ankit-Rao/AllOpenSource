function toggleDarkMode(s) {
	try{
		if (s == true) {
			document.documentElement.removeAttribute("style");
			document.documentElement.setAttribute("style", "font-size: 10px; font-family: Roboto, Arial, sans-serif; background-color: rgb(19, 19, 19);");
			document.documentElement.setAttribute("dark", "true");

			var masthead = document.getElementById('masthead');
			if(masthead!=null&&masthead!=undefined){
				masthead.setAttribute("style", "--yt-swatch-primary:rgb(35,35,35); --yt-swatch-primary-darker:rgb(32,32,32); --yt-swatch-text:rgb(255,255,255); --yt-swatch-important-text:rgb(255,255,255); --yt-swatch-input-text:rgba(255,255,255,1); --yt-swatch-textbox-bg:rgba(19,19,19,1); --yt-swatch-logo-override:rgb(255,255,255); --yt-swatch-icon-color:rgba(136,136,136,1);");
				masthead.setAttribute("dark", "");
			}
		} else {
			document.documentElement.removeAttribute("style");
			document.documentElement.setAttribute("style", "font-size: 10px; font-family: Roboto, Arial, sans-serif; background-color: rgb(255, 255, 255);");
			document.documentElement.removeAttribute("dark");

			var masthead = document.getElementById('masthead');
			if(masthead!=null&&masthead!=undefined){
				masthead.setAttribute("style", "--yt-swatch-primary:rgb(255,255,255); --yt-swatch-primary-darker:rgb(230,230,230); --yt-swatch-text:rgba(17,17,17,0.4); --yt-swatch-input-text:rgba(17,17,17,1); --yt-swatch-textbox-bg:rgba(255,255,255,1); --yt-swatch-icon-color:rgba(136,136,136,1)");
				masthead.removeAttribute("dark");
			}
		}
		forceMasthead2Dark(s);
	}catch(e){}
}

function forceMasthead2Dark(s){
	var _mh = document.getElementById('forceMasthead2Dark');
	if(_mh!=null){
		_mh.remove();
	}
	var style = document.createElement('style');
	style.setAttribute('id', 'forceMasthead2Dark');
	style.type = "text/css";
	if(s==true){
		var css = `
			ytd-masthead#masthead{
				--yt-swatch-primary:rgb(35,35,35) !important; 
				--yt-swatch-primary-darker:rgb(32,32,32) !important; 
				--yt-swatch-text:rgb(255,255,255) !important; 
				--yt-swatch-important-text:rgb(255,255,255) !important; 
				--yt-swatch-input-text:rgba(255,255,255,1) !important; 
				--yt-swatch-textbox-bg:rgba(19,19,19,1) !important; 
				--yt-swatch-logo-override:rgb(255,255,255) !important; 
				--yt-swatch-icon-color:rgba(136,136,136,1) !important;
			}
			paper-button, ytd-guide-entry-renderer[active], ytd-topbar-logo-renderer#logo{filter:hue-rotate(45deg) !important;}
		`;
		style.appendChild(document.createTextNode(css));
	}else{
		var css = `
			ytd-masthead#masthead{
				--yt-swatch-primary:rgb(255,255,255) !important; 
				--yt-swatch-primary-darker:rgb(230,230,230) !important; 
				--yt-swatch-text:rgba(17,17,17,0.4) !important; 
				--yt-swatch-input-text:rgba(17,17,17,1) !important; 
				--yt-swatch-textbox-bg:rgba(255,255,255,1) !important; 
				--yt-swatch-icon-color:rgba(136,136,136,1) !important;
			}
		`;
		style.appendChild(document.createTextNode(css));
	}
	document.body.appendChild(style);
}

document.addEventListener("DOMContentLoaded", function(event) { 
    toggleDarkMode(true);
	var int_ytt_htcom = setInterval(function(){
		if(document.documentElement.getAttribute("dark")!=true){
			clearInterval(int_ytt_htcom);
			toggleDarkMode(true); 
		}
	}, 500);
});