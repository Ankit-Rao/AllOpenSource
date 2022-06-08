var dms = document.querySelectorAll("input[type=radio]");
var btsave = document.getElementById('btsave');
var txtarea = document.getElementById('customtheme');
var btjssave = document.getElementById('btjssave');
var jswidget = document.getElementById('jswidget');
var spanjswidget = document.getElementById('spanjswidget');
var customjs = document.getElementById('customjs');
var btremove = document.getElementById('btjsremove');
var hidescrollbar = document.getElementById("hidescrollbar");
var pictureinpicture = document.getElementById("pictureinpicture");
var shortcutkey = document.getElementById("shortcutkey");

/*---config----*/
if(localStorage.getItem("youtube_darkmode_pro_jswidget_code")!=null&&localStorage.getItem("youtube_darkmode_pro_jswidget_code")!=undefined)
	customjs.value = localStorage.getItem("youtube_darkmode_pro_jswidget_code");

if(localStorage.getItem("hidescrollbar")=='true')
	hidescrollbar.checked = true;
else
	hidescrollbar.checked = false;
	
chrome.storage.sync.get(['pictureinpicture'], function(items) {
      pictureinpicture.checked = items.pictureinpicture;
});

if(localStorage.getItem("youtube_js_enable")=='true')
	jswidget.checked = true;
else
	jswidget.checked = false;

if(localStorage.getItem("youtube_dark_mode_pro_custom_theme")!=null&&localStorage.getItem("youtube_dark_mode_pro_custom_theme")!=undefined)
	txtarea.value = localStorage.getItem("youtube_dark_mode_pro_custom_theme");

var checkeditem = "default";
if(localStorage.getItem("ydm_pro_file")!=null&&localStorage.getItem("ydm_pro_file")!=undefined)
	checkeditem = localStorage.getItem("ydm_pro_file");
document.getElementById(checkeditem).checked = true;
/*******************/

for(i=0; i<dms.length; i++)
	dms[i].addEventListener("change", function(){
		localStorage.setItem("ydm_pro_file", this.value);
		if(this.value==="custom"){
			btsave.style.display = "";
			txtarea.style.display = "";
			localStorage.setItem("youtube_dark_mode_pro_custom_theme", txtarea.value);
		}else{
			btsave.style.display = "none";
			txtarea.style.display = "none";
		}
		chrome.runtime.sendMessage({"reload_YT_after_changing_theme": true });
	});

hidescrollbar.addEventListener("change", function(){
	localStorage.setItem("hidescrollbar", this.checked);
	chrome.runtime.sendMessage({"reload_YT_after_changing_theme": true });
});

pictureinpicture.addEventListener("change", function(){
	chrome.storage.sync.set({'pictureinpicture': this.checked}, function() {});
	chrome.runtime.sendMessage({"reload_YT_after_changing_theme": true });
});


shortcutkey.addEventListener("change", function(){
	this.checked = true;
	chrome.tabs.create({
        url: "chrome://extensions/shortcuts",
        active: true
    });
});

btsave.addEventListener("click", function(){
	var csstheme = txtarea.value;
	localStorage.setItem("youtube_dark_mode_pro_custom_theme", csstheme);
	btsave.value = "        Saved       ";
	setTimeout(function(){btsave.value = "Save and Apply";}, 3000);
	chrome.runtime.sendMessage({"reload_YT_after_changing_theme": true });
});

var csth = document.getElementById('custom');
if(csth.checked){
	btsave.style.display = "";
	txtarea.style.display = "";
}else{
	btsave.style.display = "none";
	txtarea.style.display = "none";
}

jswidget.addEventListener("change", function(){
	if(jswidget.checked){
		btjssave.style.display = "";
		customjs.style.display = "";
		spanjswidget.style.display = "";
		btremove.style.display = "";
		localStorage.setItem("youtube_darkmode_pro_jswidget_code", customjs.value);
	}else{
		btjssave.style.display = "none";
		customjs.style.display = "none";
		spanjswidget.style.display = "none";
		btremove.style.display = "none";
	}
	localStorage.setItem("youtube_js_enable", jswidget.checked);
	chrome.runtime.sendMessage({"reload_YT_after_changing_theme": true });
});


btjssave.addEventListener("click", function(){
	var js_code = customjs.value;
	localStorage.setItem("youtube_darkmode_pro_jswidget_code", js_code);
	btjssave.value = "        Saved       ";
	setTimeout(function(){btjssave.value = "Save and Install";}, 3000);
	chrome.runtime.sendMessage({"reload_YT_after_changing_theme": true });
});

btremove.addEventListener("click", function(){
	customjs.value = "";
	var js_code = customjs.value;
	localStorage.setItem("youtube_darkmode_pro_jswidget_code", js_code);
	btremove.value = "      Removed     ";
	setTimeout(function(){btremove.value = "Remove All";}, 3000);
	chrome.runtime.sendMessage({"reload_YT_after_changing_theme": true });
});

if(jswidget.checked){
	btjssave.style.display = "";
	customjs.style.display = "";
	spanjswidget.style.display = "";
	btremove.style.display = "";
}else{
	btjssave.style.display = "none";
	customjs.style.display = "none";
	spanjswidget.style.display = "none";
	btremove.style.display = "none";
}