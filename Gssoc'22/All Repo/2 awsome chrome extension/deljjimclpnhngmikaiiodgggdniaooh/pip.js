/*=======================COPYRIGHT PART============================
HTCom YouTube JSPlugin Generator. This JSPlugin is used for YouTube only.
Please visit our site: https://www.videoeffects.org.
This JSPlugin is compatible with YouTube Dark Mode Pro https://chrome.google.com/webstore/detail/youtube-dark-mode-pro/deljjimclpnhngmikaiiodgggdniaooh.
Copyright 2018 by HTCom. Email: myhoangthanh@yahoo.com
It is legal to modify the code below and share it somewhere you want, but you must not remove this copyright part.
==================================================================*/
function __requestPiP(){
	var videos = document.getElementsByTagName("video");
	var video = videos[0];
	video.requestPictureInPicture();
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
			var _scale = Math.max(_scaleX, _scaleY);
			if (_scale > 1.05) {
				video.style.transform = 'scale(' + (_scale+0.04) + ')';
			} else {
				video.style.transform = 'scale(1.363)';
			}
		}
	}else
		if (videos.length > 0) {
			var video = videos[0];
			video.style.transform = 'scale(1)';
		}
}

setTimeout(function(){
	chrome.storage.sync.get(['pictureinpicture'], function(items) {
      if(items.pictureinpicture==true){
		 window.addEventListener("keydown", function(event){
			if(event.keyCode == 120)
				__requestPiP();
		}, false);
		
		var players = document.querySelectorAll("video");
		if(players.length>=1){
			var player = players[0].parentElement;
			var popouticon = document.createElement("span");
			popouticon.setAttribute("id", "yttheme-popouticon");
			popouticon.setAttribute("title", "Launch video in Picture in Picture");
			player.appendChild(popouticon);
			player.addEventListener("mouseover", function(){
				popouticon.style.display = "block";
			});
			player.addEventListener("mouseout", function(){
				popouticon.style.display = "none";
			});
			popouticon.addEventListener("click", function(event){
				__requestPiP();
				event.stopPropagation();
			}, true);
		}
	  }
	});
	
	window.addEventListener("keydown", function(event){
		if(event.altKey && event.which == 187)
			autoScale(true);
		if(event.altKey && event.which == 189)
			autoScale(false);
	}, false);
}, 1000);