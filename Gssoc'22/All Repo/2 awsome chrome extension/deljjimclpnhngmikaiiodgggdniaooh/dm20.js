/*=======================COPYRIGHT PART============================
HTCom YouTube JSPlugin Generator. This JSPlugin is used for YouTube only.
Please visit our site: https://www.videoeffects.org.
This JSPlugin is compatible with YouTube Dark Mode Pro https://chrome.google.com/webstore/detail/youtube-dark-mode-pro/deljjimclpnhngmikaiiodgggdniaooh.
Copyright 2018 by HTCom. Email: myhoangthanh@yahoo.com
It is legal to modify the code below and share it somewhere you want, but you must not remove this copyright part.
==================================================================*/

function toggleDarkMode(s) {
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
	forceMasthead2Dark(state);
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

function autoScale(toggle) {
	var players = document.querySelectorAll('#movie_player.html5-video-player');
	var videos = document.querySelectorAll('video');
	if(toggle){
		if (players.length > 0 && videos.length > 0) {
			var player = players[0];
			var video = videos[0];
			var _scaleX = player.offsetWidth / video.offsetWidth;
			var _scaleY = player.offsetHeight / video.offsetHeight;
			var _scale = Math.max(_scaleX, _scaleY);//console.log(_scaleX+", "+_scaleY+","+_scale);
			//console.log(_scale);
			if (_scale > 1.05) {
				video.style.transform = 'scale(' + (_scale+0.04) + ')';//_scale + 0.14
			} else {
				video.style.transform = 'scale(1.363)';//1.51
			}
		}
	}else
		if (videos.length > 0) {
			var video = videos[0];
			video.style.transform = 'scale(1)';
		}
}
document.addEventListener("DOMContentLoaded", function(event) { 
    toggleDarkMode(false);
	var int_ytt_htcom = setInterval(function(){
		if(document.documentElement.getAttribute("dark")==true){
			clearInterval(int_ytt_htcom);
			toggleDarkMode(false); 
		}
	}, 500);
});