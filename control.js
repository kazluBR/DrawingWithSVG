const lib = "http://www.w3.org/2000/svg";

toolButtons = new Array(4);
colorButtons = new Array(5);
strokeWidthButtons = new Array(5);

var appliance = null;

var points = "";
var x = 0;
var y = 0;

var clicked = false;
var insideArea = false;

var countPolyline = 0;
var countLine = 0;
var countRect = 0;
var countEllipse = 0;

var tool = 1;
var color = "black";
var strokeWidth = 1;

function initialize(){
	toolButtons[1] = document.getElementById('polyline_button');
	toolButtons[2] = document.getElementById('line_button');
	toolButtons[3] = document.getElementById('rect_button');
	toolButtons[4] = document.getElementById('ellipse_button');
	
	colorButtons[1] = document.getElementById('color_black_button');
	colorButtons[2] = document.getElementById('color_red_button');
	colorButtons[3] = document.getElementById('color_blue_button');
	colorButtons[4] = document.getElementById('color_green_button');
	colorButtons[5] = document.getElementById('color_yellow_button');
	
	strokeWidthButtons[1] = document.getElementById('stroke-width_1_button');
	strokeWidthButtons[2] = document.getElementById('stroke-width_2_button');
	strokeWidthButtons[3] = document.getElementById('stroke-width_3_button');
	strokeWidthButtons[4] = document.getElementById('stroke-width_4_button');
	strokeWidthButtons[5] = document.getElementById('stroke-width_5_button');
	
	toolButtons[1].setAttribute("opacity",1);
	colorButtons[1].setAttribute("opacity",1);
	strokeWidthButtons[1].setAttribute("opacity",1);
}

function initPolyline(){
	points = "";
	countPolyline++;
	appliance = document.createElementNS(lib, "polyline");
	appliance.setAttribute("id","polyline"+countPolyline);
	appliance.setAttribute("fill","none");
	appliance.setAttribute("stroke",color);
	appliance.setAttribute("stroke-width",strokeWidth);
	document.getElementById('draw_svg').appendChild(appliance);
}

function initLine(evt){
	countLine++;
	appliance = document.createElementNS(lib, "line");
	appliance.setAttribute("id","line"+countLine);
	appliance.setAttribute("fill","none");
	appliance.setAttribute("stroke",color);
	appliance.setAttribute("stroke-width",strokeWidth);
	appliance.setAttribute("stroke-dasharray","5 3");
	appliance.setAttribute("x1",evt.clientX);
	appliance.setAttribute("y1",evt.clientY);
	appliance.setAttribute("x2",evt.clientX);
	appliance.setAttribute("y2",evt.clientY);
	document.getElementById('draw_svg').appendChild(appliance);
}

function initRect(evt){
	countRect++;
	appliance = document.createElementNS(lib, "rect");
	appliance.setAttribute("id","rect"+countRect);
	appliance.setAttribute("fill","none");
	appliance.setAttribute("stroke",color);
	appliance.setAttribute("stroke-width",strokeWidth);
	appliance.setAttribute("stroke-dasharray","5 3");
	x = evt.clientX;
	y = evt.clientY;
	appliance.setAttribute("x",x);
	appliance.setAttribute("y",y);
	document.getElementById('draw_svg').appendChild(appliance);
}

function initEllipse(evt){
	countEllipse++;
	appliance = document.createElementNS(lib, "ellipse");
	appliance.setAttribute("id","ellipse"+countEllipse);
	appliance.setAttribute("fill","none");
	appliance.setAttribute("stroke",color);
	appliance.setAttribute("stroke-width",strokeWidth);
	appliance.setAttribute("stroke-dasharray","5 3");
	x = evt.clientX;
	y = evt.clientY;
	appliance.setAttribute("cx",x);
	appliance.setAttribute("cy",y);
	document.getElementById('draw_svg').appendChild(appliance);
}

function onMouseDown(evt){
	clicked = true;
	switch (tool){
		case 1:
			initPolyline();
			break;
		case 2:
			initLine(evt);
			break;
		case 3:
			initRect(evt);
			break;
		case 4:
			initEllipse(evt);
			break;
	}
}

function finishLine(){
	appliance.setAttribute("stroke-dasharray","");
}

function finishRect(){
	appliance.setAttribute("fill",color);
	appliance.setAttribute("stroke-dasharray","");
}

function finishEllipse(){
	appliance.setAttribute("fill",color);
	appliance.setAttribute("stroke-dasharray","");
}

function onMouseUp(){
	clicked = false;
	switch (tool){
		case 2:
			finishLine();
			break;
		case 3:
			finishRect();
			break;
		case 4:
			finishEllipse();
			break;
	}
}

function drawPolyline(evt){
	points += evt.clientX + "," + evt.clientY + " ";
	appliance.setAttribute("points",points);
}

function drawLine(evt){
	appliance.setAttribute("x2",evt.clientX);
	appliance.setAttribute("y2",evt.clientY);
}

function drawRect(evt){
	if ((evt.clientY > y) && (evt.clientX > x)){
		appliance.setAttribute("x",x);
		appliance.setAttribute("y",y);
		appliance.setAttribute("height",evt.clientY - y);	
		appliance.setAttribute("width",evt.clientX - x);
	} else if ((evt.clientY > y) && (evt.clientX < x)){
		appliance.setAttribute("x",evt.clientX);
		appliance.setAttribute("y",y);
		appliance.setAttribute("height",evt.clientY - y);	
		appliance.setAttribute("width",x - evt.clientX);
	} else if ((evt.clientY < y) && (evt.clientX > x)){
		appliance.setAttribute("x",x);
		appliance.setAttribute("y",evt.clientY);
		appliance.setAttribute("height",y - evt.clientY);	
		appliance.setAttribute("width",evt.clientX - x);
	} else{
		appliance.setAttribute("x",evt.clientX);
		appliance.setAttribute("y",evt.clientY);
		appliance.setAttribute("height",y - evt.clientY);	
		appliance.setAttribute("width",x - evt.clientX);
	}
}

function drawEllipse(evt){
	if ((evt.clientY > y) && (evt.clientX > x)){
		appliance.setAttribute("ry",evt.clientY - y);	
		appliance.setAttribute("rx",evt.clientX - x);
	} else if ((evt.clientY > y) && (evt.clientX < x)){
		appliance.setAttribute("ry",evt.clientY - y);	
		appliance.setAttribute("rx",x - evt.clientX);
	} else if ((evt.clientY < y) && (evt.clientX > x)){
		appliance.setAttribute("ry",y - evt.clientY);	
		appliance.setAttribute("rx",evt.clientX - x);
	} else{
		appliance.setAttribute("ry",y - evt.clientY);	
		appliance.setAttribute("rx",x - evt.clientX);
	}
}

function draw(evt){
	if (clicked) {
		switch (tool){
			case 1:
				drawPolyline(evt);
				break;
			case 2:
				drawLine(evt);
				break;
			case 3:
				drawRect(evt);
				break;
			case 4:
				drawEllipse(evt);
				break;	
		}			
	}	  
}

function onMouseOver(){
	insideArea = true;
}

function getPosition(evt){
	if (insideArea){
		var x = evt.clientX-2;
		var y = evt.clientY-31;
		document.getElementsByTagName("text")[1].firstChild.nodeValue = x + ", " + y;
	}	
}

function cleanPosition(){
	insideArea = false;
	document.getElementsByTagName("text")[1].firstChild.nodeValue = "";
}

function cleanPolylines(){
	points = "";
	for (i=1;i<=countPolyline;i++){
		appliance = document.getElementById("polyline"+i);
		appliance.setAttribute("points",points);
	}
}

function cleanLines(){
	for (i=1;i<=countLine;i++){
		appliance = document.getElementById("line"+i);
		appliance.setAttribute("x1",0);
		appliance.setAttribute("y1",0);
		appliance.setAttribute("x2",0);
		appliance.setAttribute("y2",0);
	}
}

function cleanRects(){
	for (i=1;i<=countRect;i++){
		appliance = document.getElementById("rect"+i);
		appliance.setAttribute("x",0);
		appliance.setAttribute("y",0);
		appliance.setAttribute("height",0);	
		appliance.setAttribute("width",0);
	}
}

function cleanEllipses(){
	for (i=1;i<=countEllipse;i++){
		appliance = document.getElementById("ellipse"+i);
		appliance.setAttribute("cx",0);
		appliance.setAttribute("cy",0);
		appliance.setAttribute("rx",0);	
		appliance.setAttribute("ry",0);
	}
}

function cleanDraw(){
	cleanPolylines();
	cleanLines();
	cleanRects();
	cleanEllipses();
}

function changeTool(toolNumber){
	toolButtons[tool].setAttribute("opacity",0.25);
	tool = toolNumber;
	toolButtons[tool].setAttribute("opacity",1);
}

function changeColor(colorNumber){
	switch (colorNumber){
		case 1: 
			color = "black";
			break;
		case 2:
			color = "red";
			break;
		case 3:
			color = "blue";
			break;
		case 4:
			color = "green";
			break;
		case 5:
			color = "yellow";
			break;
	}
	for (i=1;i<=5;i++){
		if (i==colorNumber)
			colorButtons[i].setAttribute("opacity",1);
		else
			colorButtons[i].setAttribute("opacity",0.25);
	}
}

function changeStrokeWidth(strokeWidthNumber){
	strokeWidthButtons[strokeWidth].setAttribute("opacity",0.25);
	strokeWidth = strokeWidthNumber;
	strokeWidthButtons[strokeWidth].setAttribute("opacity",1);
}