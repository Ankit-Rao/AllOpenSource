 
 let output=document.getElementById("myInput");
 let cp=document.getElementById("hi");

 
 var ref = document.querySelector(".btn");
 ref.addEventListener("click",() => {
     let x=Math.floor(Math.random()*255);
     let y=Math.floor(Math.random()*255);
     let z=Math.floor(Math.random()*255);
     let a=Math.random().toFixed(2);
     bgcol1 = `rgba(${x},${y},${z},${a})`;
     x=Math.floor(Math.random()*255);
     y=Math.floor(Math.random()*255);
     z=Math.floor(Math.random()*255);
     a=Math.random().toFixed(2);
     bgcol2 = `rgba(${x},${y},${z},${a})`;
     x=Math.floor(Math.random()*255);
     y=Math.floor(Math.random()*255);
     z=Math.floor(Math.random()*255);
     a=Math.random().toFixed(2);
     bgcol3 = `rgba(${x},${y},${z},${a})`;
     let deg = Math.floor(Math.random()*360);
     let bgcol = `linear-gradient(${deg}deg, ${bgcol1}, ${bgcol2},${bgcol3})`;
     document.querySelector("body").style.background = bgcol ;
     output.value =`linear-gradient(${deg}deg, ${bgcol1}, ${bgcol2},${bgcol3})`;
      
 });
 function Hello() {output.select();
navigator.clipboard.writeText(output.value).then(() => {
                console.log("Text copied to clipboard...")
            }).catch(err => {
                console.log('Something went wrong', err);
            })
}
// -------------------------------------------------------------------
var ref = document.querySelector(".btn1");
ref.addEventListener("click",() => {
    navigator.clipboard.writeText(output.value).then(() => {
        console.log("Text copied to clipboard...")
    }).catch(err => {
        console.log('Something went wrong', err);
    })
    });