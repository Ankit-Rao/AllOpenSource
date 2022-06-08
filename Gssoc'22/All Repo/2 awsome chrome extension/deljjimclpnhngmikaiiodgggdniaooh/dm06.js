
function applyStyle4Chatter(){
	var iframe = document.getElementsByTagName('iframe');
	if(iframe.length>0)
	if(iframe[0].id==="live-chat-iframe" || iframe[0].id==='chatframe'){
		var darkdefault = document.documentElement.getAttribute("dark");
		var css = 'html{filter:invert(100%);}';
		if(darkdefault==null){//no dark
			css = 'html{filter:invert(0%);} img{ filter: invert(100%); }';
		}
		var style = document.createElement('style');
		style.type = 'text/css';
		if (style.styleSheet){
		  style.styleSheet.cssText = css;
		} else {
		  style.appendChild(document.createTextNode(css));
		}

		iframe[0].contentDocument.head.appendChild(style);
	}
	toggleDarkMode(false);
	document.addEventListener('keydown', function(kevent){
		if(kevent.altKey&&kevent.keyCode==187){
			autoScale(true);
			localStorage.setItem('noblack_yt_darkmode', 'true');
		}
		if(kevent.altKey&&kevent.keyCode==189){
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
	forceMasthead2Dark(s);
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
		var css = "ytd-masthead#masthead{--yt-swatch-primary:rgb(35,35,35) !important;--yt-swatch-primary-darker:rgb(32,32,32) !important; --yt-swatch-text:rgb(255,255,255) !important; --yt-swatch-important-text:rgb(255,255,255) !important;--yt-swatch-input-text:rgba(255,255,255,1) !important;--yt-swatch-textbox-bg:rgba(19,19,19,1) !important;--yt-swatch-logo-override:rgb(255,255,255) !important;--yt-swatch-icon-color:rgba(136,136,136,1) !important;}";
		style.appendChild(document.createTextNode(css));
	}else{
		var css = "ytd-masthead#masthead{--yt-swatch-primary:rgb(255,255,255) !important;--yt-swatch-primary-darker:rgb(230,230,230) !important;--yt-swatch-text:rgba(17,17,17,0.4) !important;--yt-swatch-input-text:rgba(17,17,17,1) !important;--yt-swatch-textbox-bg:rgba(255,255,255,1) !important;--yt-swatch-icon-color:rgba(136,136,136,1) !important;}";
		style.appendChild(document.createTextNode(css));
	}
	document.body.appendChild(style);
}

setTimeout(function(){applyStyle4Chatter();}, 2200);