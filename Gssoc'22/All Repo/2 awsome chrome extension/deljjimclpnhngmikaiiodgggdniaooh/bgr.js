chrome.runtime.onInstalled.addListener(function (object) {

var isenable = false;

chrome.browserAction.onClicked.addListener(function(tab){
	var cssfile = "default.css";
	var jsfile = "default.js";
	var global = "global.css";
	var custom = false;
	var csscode = "";
	var jscode = "";
	var jscustom = false;
	
	if(localStorage.getItem("ydm_pro_file")!=null&&localStorage.getItem("ydm_pro_file")!=undefined){
		if(localStorage.getItem("ydm_pro_file")!=="custom")
			cssfile = localStorage.getItem("ydm_pro_file")+".css";
		else{
			csscode = localStorage.getItem("youtube_dark_mode_pro_custom_theme")+` ytd-playlist-panel-renderer#playlist #items-stamp, ytd-mini-guide-renderer, ytd-mini-guide-renderer ytd-mini-guide-entry-renderer, ytd-rich-metadata-row-renderer .ytd-rich-metadata-renderer, ytd-section-list-renderer, #secondary, #creator-page, #creator-page .ytg-fl.account-container, #yt-masthead-container, body #footer-container, #yt-picker-language-footer, #yt-picker-country-footer, #yt-picker-safetymode-footer, #masthead-search-term, #guide-container, #yt-masthead-creation-clickcard, #yt-masthead-notifications-clickcard, #yt-masthead-notifications-content, #yt-masthead-notifications-content *, .yt-masthead-account-picker, .yt-masthead-account-picker *, ytd-post-renderer, #embed-panel, paper-dialog[role=dialog], #star-survey, #inline-survey-compact-video-renderer, ytd-post-renderer.ytd-rich-item-renderer, paper-listbox#menu, #tabs-inner-container{background:var(--bgr-theme-color) !important;} .exp-kevlar-settings .account-page #creator-sidebar .creator-sidebar-item.selected>a, #yt-picker-language-button, #yt-picker-country-button, #yt-picker-safetymode-button, .footer-history.yt-uix-sessionlink, .yt-google-help-link, #creator-page-content .account-content option{background-color:transparent !important;} #creator-sidebar .creator-sidebar-section a:hover{color:gray !important;background-color:transparent !important;} .social-connector, .desktop-notifications .browser, button.yt-uix-button.yt-uix-button-size-default, input[type=text], select, option, span.yt-uix-form-input-select-content, .sbdd_b .sbsb_a ul.sbsb_b{background-color:var(--bgr-theme-color) !important;} .yt-uix-button {background-color:transparent !important;} *::-webkit-scrollbar {width: 4px;  height: 5px; background-color: var(--bgr-theme-color);} *::-webkit-scrollbar-thumb { background: gray; } div.gstl_50.sbdd_a, div.gstl_50.sbdd_a * , #primary{background:var(--bgr-theme-color) !important; 	color:var(--text-color) !important;} #card-title{background-color:var(--bgr-theme-color);} ytd-search-refinement-card-renderer{border:rgba(255,255,255,.1) !important;} #right-arrow, #left-arrow{background-color:var(--narrow-color) !important;}#right-arrow svg, #left-arrow svg{fill:var(--color-text-inside-button) !important;} paper-listbox#menu .iron-selected, paper-listbox#menu paper-item.yt-dropdown-menu:hover{ background-color:black !important; }
			#chips-wrapper #left-arrow, #chips-wrapper #right-arrow{background:none !important; background-color:transparent !important;}
			yt-chip-cloud-chip-renderer[chip-style="STYLE_HOME_FILTER"][selected]{
				background-color:var(--bgr-theme-color) !important;
			}
			#logo svg g g path[fill=white]{fill:white !important;}
			#chips-wrapper.ytd-feed-filter-chip-bar-renderer, tp-yt-paper-listbox{background-color:var(--bgr-theme-color) !important;}
			:root{
				--yt-spec-brand-background-primary:var(--bgr-theme-color) !important;
			}
			iron-selector#chips, #secondary #scroll-container, #left-arrow #left-arrow-button, #left-arrow:after, #right-arrow #right-arrow-button, #right-arrow:before{background-color:var(--bgr-theme-color) !important;background-image:none !important;}
			#primary #primary-inner #clarify-box .ytd-watch-flexy{background: transparent !important;}`;
			csscode = csscode.replace('div.gstl_50.sbdd_a{filter:invert(85%);}', '').replace('div.gstl_50.sbdd_a *{color:black !important;}', '');
			custom = true;
		}
		jsfile = localStorage.getItem("ydm_pro_file")+".js";
	}
	if(localStorage.getItem("hidescrollbar")=='true')
		global = "global2.css";
	else
		global = "global.css";
	if(localStorage.getItem("youtube_js_enable")=='true'){
		jscustom = true;
		jscode = localStorage.getItem("youtube_darkmode_pro_jswidget_code");
	};
	
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
		var isyoutube = (tabs[0].url.indexOf('https://www.youtube.com')===0);
		var isyoutubered = (tabs[0].url.indexOf('https://www.youtube.com/red')===0);
		if(isyoutube){
			if (isenable){
				chrome.browserAction.setIcon({
					path:{
						"38": "disable.png"
					}
				});
				chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
			}
			else{
				chrome.browserAction.setIcon({
					path:{
						"38": "enable.png"
					}
				});
				if(!isyoutubered){
					if(!custom)
						chrome.tabs.insertCSS(tabs[0].id, {file:cssfile});
					else
						chrome.tabs.insertCSS(tabs[0].id, {code:csscode});
					chrome.tabs.insertCSS(tabs[0].id, {file:global});
					chrome.tabs.executeScript({
					  file: jsfile,
					  allFrames: false
					});
					if(jscustom)
						chrome.tabs.executeScript({code: jscode, allFrames: false});
				}
			}
			isenable = !isenable;
			localStorage['YT_DARKER_MODE']=isenable;
		}
	});
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	var cssfile = "default.css";
	var jsfile = "default.js";
	var global = "global.css";
	var custom = false;
	var csscode = "";
	var jscode = "";
	var jscustom = false;
	
	if(localStorage.getItem("ydm_pro_file")!=null&&localStorage.getItem("ydm_pro_file")!=undefined){
		if(localStorage.getItem("ydm_pro_file")!=="custom")
			cssfile = localStorage.getItem("ydm_pro_file")+".css";
		else{
			csscode = localStorage.getItem("youtube_dark_mode_pro_custom_theme")+` ytd-playlist-panel-renderer#playlist #items-stamp, ytd-mini-guide-renderer, ytd-mini-guide-renderer ytd-mini-guide-entry-renderer, ytd-rich-metadata-row-renderer .ytd-rich-metadata-renderer, ytd-section-list-renderer, #secondary, #creator-page, #creator-page .ytg-fl.account-container, #yt-masthead-container, body #footer-container, #yt-picker-language-footer, #yt-picker-country-footer, #yt-picker-safetymode-footer, #masthead-search-term, #guide-container, #yt-masthead-creation-clickcard, #yt-masthead-notifications-clickcard, #yt-masthead-notifications-content, #yt-masthead-notifications-content *, .yt-masthead-account-picker, .yt-masthead-account-picker *, #embed-panel, paper-dialog[role=dialog], #star-survey, #inline-survey-compact-video-renderer, ytd-post-renderer.ytd-rich-item-renderer, paper-listbox#menu, #tabs-inner-container{background:var(--bgr-theme-color) !important;} .exp-kevlar-settings .account-page #creator-sidebar .creator-sidebar-item.selected>a, #yt-picker-language-button, #yt-picker-country-button, #yt-picker-safetymode-button, .footer-history.yt-uix-sessionlink, .yt-google-help-link, #creator-page-content .account-content option{background-color:transparent !important;} #creator-sidebar .creator-sidebar-section a:hover{color:gray !important;background-color:transparent !important;} .social-connector, .desktop-notifications .browser, button.yt-uix-button.yt-uix-button-size-default, input[type=text], select, option, span.yt-uix-form-input-select-content, .sbdd_b .sbsb_a ul.sbsb_b{background-color:var(--bgr-theme-color) !important;} .yt-uix-button {background-color:transparent !important;} *::-webkit-scrollbar {width: 4px;  height: 5px; background-color: var(--bgr-theme-color);} *::-webkit-scrollbar-thumb { background: gray; } div.gstl_50.sbdd_a, div.gstl_50.sbdd_a *, #primary{background:var(--bgr-theme-color) !important; 	color:var(--text-color) !important;} #card-title{background-color:var(--bgr-theme-color);} ytd-search-refinement-card-renderer{border:rgba(255,255,255,.1) !important;} #right-arrow, #left-arrow{background-color:var(--narrow-color) !important;}#right-arrow svg, #left-arrow svg{fill:var(--color-text-inside-button) !important;} paper-listbox#menu .iron-selected, paper-listbox#menu paper-item.yt-dropdown-menu:hover{ background-color:black !important; }
			#chips-wrapper #left-arrow, #chips-wrapper #right-arrow{background:none !important; background-color:transparent !important;}
			yt-chip-cloud-chip-renderer[chip-style="STYLE_HOME_FILTER"][selected]{
				background-color:var(--bgr-theme-color) !important;
			}
			#logo svg g g path[fill=white]{fill:white !important;}
			#chips-wrapper.ytd-feed-filter-chip-bar-renderer, tp-yt-paper-listbox{background-color:var(--bgr-theme-color) !important;}
			:root{
				--yt-spec-brand-background-primary:var(--bgr-theme-color) !important;
			}
			iron-selector#chips, #secondary #scroll-container, #left-arrow #left-arrow-button, #left-arrow:after, #right-arrow #right-arrow-button, #right-arrow:before{background-color:var(--bgr-theme-color) !important;background-image:none !important;}
			#primary #primary-inner #clarify-box .ytd-watch-flexy{background: transparent !important;}`;
			csscode = csscode.replace('div.gstl_50.sbdd_a{filter:invert(85%);}', '').replace('div.gstl_50.sbdd_a *{color:black !important;}', '');
			custom = true;
		}
		jsfile = localStorage.getItem("ydm_pro_file")+".js";
	}
	if(localStorage.getItem("hidescrollbar")=='true')
		global = "global2.css";
	else
		global = "global.css";
	if(localStorage.getItem("youtube_js_enable")=='true'){
		jscustom = true;
		jscode = localStorage.getItem("youtube_darkmode_pro_jswidget_code");
	};
	
	if(changeInfo.status==='loading'){
		if(localStorage['YT_DARKER_MODE'])
			isenable=JSON.parse(localStorage['YT_DARKER_MODE']);
		var isyoutube = (tab.url.indexOf('https://www.youtube.com')===0);
		var isyoutubered = (tab.url.indexOf('https://www.youtube.com/red')===0);
		
		if(isyoutube){	
			if (isenable){
				chrome.browserAction.setIcon({
					path:{
						"38": "enable.png"
					}
				});
				if(!isyoutubered){
					if(!custom)
						chrome.tabs.insertCSS(tabId, {file:cssfile});
					else
						chrome.tabs.insertCSS(tabId, {code:csscode});
					chrome.tabs.insertCSS(tabId, {file:global});
					chrome.tabs.executeScript({
						 file: jsfile,
						 allFrames: false
					});
					if(jscustom)
						chrome.tabs.executeScript({code: jscode, allFrames: false});
				}
			}
			else{
				chrome.browserAction.setIcon({
					path:{
						"38": "disable.png"
					}
				});
			}
		}
	}
}); 

chrome.runtime.onMessage.addListener(function sendResponse(request, sender, response){
	if (request.reload_YT_after_changing_theme !== undefined) {
		reloadYouTube();
	}
});

function reloadYouTube(){
	chrome.tabs.query({ url: ['*://*.youtube.com/*'] }, function (tabs) {
		var c = `location.reload(true);`; //`window.location='';`;
		for (i = 0; i < tabs.length; i++) {
			chrome.tabs.executeScript(tabs[i].id, { code: c });
		}
	});
}

function setRatingTime(){
	var d = (new Date()).getTime();
	chrome.storage.local.set({"yttheme_time_installed": d}, function(){});
}

chrome.runtime.onStartup.addListener(function(){
	chrome.storage.local.get("yttheme_time_installed", function(e){
		if(e["yttheme_time_installed"]!==undefined){
			var curr = (new Date()).getTime();
			var installed = e["yttheme_time_installed"];
			var time_diff = curr - installed;
			if(time_diff>2*24*60*60*1000){
				chrome.storage.local.remove("yttheme_time_installed", function(){});
			}
		}
	});
});

