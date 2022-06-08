var mapList=[].slice.call(document.querySelectorAll(".map"));
var outlines=document.querySelector(".outlines");
var h1=document.querySelector("h1");
function switchMap(value){
	mapList.map((item)=>{
		item.classList.remove("visible")
	})
	var overlay=document.querySelector("."+value);
	overlay.classList.add("visible");
	
	if(value!="overall"){
		outlines.classList.add("visible");
		h1.textContent=value+" Donors";
	}else{
		outlines.classList.remove("visible");
		h1.textContent="Individual Donors";
	}
}