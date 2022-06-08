/*=======================COPYRIGHT PART============================
HTCom YouTube JSPlugin Generator. This JSPlugin is used for YouTube only.
Please visit our site: https://www.videoeffects.org.
This JSPlugin is compatible with YouTube Dark Mode Pro https://chrome.google.com/webstore/detail/youtube-dark-mode-pro/deljjimclpnhngmikaiiodgggdniaooh.
Copyright 2018 by HTCom. Email: myhoangthanh@yahoo.com
It is legal to modify the code below and share it somewhere you want, but you must not remove this copyright part.
==================================================================*/
function applyStyle4Chatter(){
	var iframe = document.getElementsByTagName('iframe');
	if(iframe.length>0)
	if(iframe[0].id==="live-chat-iframe" || iframe[0].id==='chatframe'){
		var css = "html, html *{background-color:transparent !important; color:#eeeeee !important;} #menu.yt-live-chat-text-message-renderer{background:none !important;} *::-webkit-scrollbar {width: 0px !important; background:rgba(0, 0, 0, 0.8) !important;} *::-webkit-scrollbar-thumb {background: rgba(0, 0, 0, 0.15) !important;} #input.yt-live-chat-text-input-field-renderer{background-color:#ffffff5c !important;}";
		var	style = document.createElement('style');
		style.type = 'text/css';
		if (style.styleSheet){
		  style.styleSheet.cssText = css;
		} else {
		  style.appendChild(document.createTextNode(css));
		}

		iframe[0].contentDocument.head.appendChild(style);
	}

	document.addEventListener('keydown', function(kevent){
		if(kevent.altKey&&kevent.code==="Equal"){
			autoScale(true);
			localStorage.setItem('noblack_yt_darkmode', 'true');
		}
		if(kevent.altKey&&kevent.code==="Minus"){
			autoScale(false);
			localStorage.setItem('noblack_yt_darkmode', 'false');
		}
	});
	
	if(document.getElementById('animated-yoodle')!=undefined){
		var img = document.getElementById('animated-yoodle');
		setInterval(function(){img.style.backgroundPosition = '';}, 5000);
	}
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

setTimeout(function(){applyStyle4Chatter();}, 2200);