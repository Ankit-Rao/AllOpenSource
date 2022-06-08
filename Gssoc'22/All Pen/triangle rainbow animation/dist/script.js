var columns=10;
var rows=10;
var numCells=rows*columns;
var numTriangles=numCells*2;
var numPoints=(rows+1)*(columns+1);
var mesh;
var meshWidth;
var meshHeight;
var points=[];
var triangles=[];
var amountThreshold=.5;
var amountX;
var amountY;
var halfAmountX;
var halfAmountY;
var minDelay=.1;
var maxDelay=7;
var delayRange=maxDelay-minDelay;
var minDuration=1.1;
var maxDuration=2;
var durationRange=maxDuration-minDuration;
window.onload = function () {
    mesh=document.getElementById("mesh");
    meshWidth=mesh.getAttribute("width");
    meshHeight=mesh.getAttribute("height");
    amountX=(meshWidth/columns)*amountThreshold;
    amountY=(meshHeight/rows)*amountThreshold;
    halfAmountX=amountX*.5;
    halfAmountY=amountY*.5;
    createPoints();
    createTriangles();
    draw();
    TweenMax.ticker.addEventListener("tick", draw, this, true, 1);
};
function createPoints(){
    for(var i=0;i<numPoints;i++){
        var c=i%(columns+1);
        var r=parseInt((i/numPoints)*(rows+1));
        var x=meshWidth*(c/(columns));
        var y=meshWidth*(r/(rows));
        var fixedX=x==0||x==meshWidth?true:false;
        var fixedY=y==0||y==meshHeight?true:false;
        var targetX=fixedX?x:((Math.random()*amountX)-halfAmountX)+x;
        var targetY=fixedY?y:((Math.random()*amountY)-halfAmountY)+y;
        var point= {x:targetX,y:targetY,originX:x,originY:y,fixedX:fixedX,fixedY:fixedY};
        points.push(point);
        if(!point.fixedX||!point.fixedY){
            tweenPoint(point);
        }

    }
}
function createTriangles(){
    var columnOffset=columns+1;
    for(var i=0;i<numCells;i++){
        var c=i%columns;
        var r=parseInt((i/numCells)*rows);
        var tlIndex=c+(r*columnOffset);
        var trIndex=c+(r*columnOffset)+1;
        var blIndex=tlIndex+columnOffset;
        var brIndex=trIndex+columnOffset;
        var tl=points[tlIndex];
        var tr=points[trIndex];
        var bl=points[blIndex];
        var br=points[brIndex];
        var points1=[tl.x,tl.y,tr.x,tr.y,bl.x,bl.y];
        var points2=[tr.x,tr.y,br.x,br.y,bl.x,bl.y];
        var triangle1=addElement("polygon",mesh,{points:points1.toString(),fill:randomColor()});
        var triangle2=addElement("polygon",mesh,{points:points2.toString(),fill:randomColor()});
        triangles.push({triangle:triangle1,points:[tl,tr,bl]});
        triangles.push({triangle:triangle2,points:[tr,br,bl]});
    }
}
function tweenPoint(point){
    var targetX=point.fixedX?point.originX:((Math.random()*amountX)-halfAmountX)+point.originX;
    var targetY=point.fixedY?point.originY:((Math.random()*amountY)-halfAmountY)+point.originY;
    TweenMax.to(point,minDuration+(Math.random()*durationRange),{delay:minDelay+(Math.random()*delayRange),x:targetX,y:targetY,ease:Elastic.easeOut,onComplete:tweenPoint,onCompleteParams:[point]})
}
function draw(){
    for(var i=0;i<numTriangles;i++){
        var triangle=triangles[i].triangle;
        var points=triangles[i].points;
        var p1=points[0];
        var p2=points[1];
        var p3=points[2];
        var pointList=[p1.x,p1.y,p2.x,p2.y,p3.x,p3.y];
        triangle.setAttribute("points",pointList);
    }
}
function addElement(type,parent,attributes){
    var element=document.createElementNS("http://www.w3.org/2000/svg",type);
    for (var property in attributes) {
        element.setAttribute(property,attributes[property]);
    }
    parent.appendChild(element);
    return element;
}
function randomColor(){
    return "#"+Math.floor(Math.random()*16777215).toString(16);
}