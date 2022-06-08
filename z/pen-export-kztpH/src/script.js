$( document ).ready(function() {

function collectData( table, colors ) {
// to change the table of data into a jason object
     var  trs = table.rows;//contains the table rows
     var  trl = trs.length;//the number of table rows
     var  i = 0;//counter1
     var  j = 0;//counter2
     var  keys = [];//holds the value of th TH's
     var  obj = [];
     var  ret = [];//the return value
     var  dataTest = "";//a place holder to convert to a number (for values)
  
    for (; i < trl; i++) {
      //loop through the table rows
        if (i == 0) {
          //if its the first row i.e. TH's
            for (; j < trs[i].children.length + 1; j++) {
              //loop through all the TH's + one more for color
              if(j == 2)
                //if it is color
                {
                  keys.push("color");
                  //the key is color
                }
              else {
                keys.push(trs[i].children[j].innerHTML);
                //add the value to the array.
              }
            }
        } else {
            obj = {};
            for (j = 0; j < trs[i].children.length + 1; j++) {
              // for all the TR's
              if(keys[j] == "data"){
                //if it is the data value
                dataTest = trs[i].children[j].innerHTML;
                //grab the value as a string 
                dataTest = parseFloat(dataTest);
                //convert it to a number
                obj[keys[j]] = dataTest;
                //add it to obj
              }
              else if(keys[j] == "color") {
                // if it is on the color value
                obj[keys[j]] = colors[i-1];
                //find the correct color from the color array
              }
              else{
                obj[keys[j]] = trs[i].children[j].innerHTML;
                // grab the lable
              }
            }
            ret.push(obj);
          // add obj to ret
        }
    }
    
    return ret;
};
//$(document).ready(function () {
var colors = ["#3D96AE","#4573A7","#80699B","#AA4643","#89A54E"]; 
// an array to hold all the colors fot the pie chart
var data = collectData(document.getElementById('info'),colors);
//the table data as a json object
var placeholder = $("#placeholder");
//the div placeholder for the pie chart

    var options = {
   //the peramaters for the pie chart
            series: {
                pie: {
                    show: true,
                    radius: 86/100,
                    innerRadius: 0.4,//for donut
                    tilt:1,
                    label: {
                          show: false,
                          radius: 65/100,
                          background: { 
                              opacity: 0.7,
                              color: "#0000000",
                          },
                     },
                     stroke: {
                     //border width and color
                          color: "#0000000",
                          width: 0,
                     }
                }
            },
            legend: {
                show: false,
            },
            grid: {
                hoverable: true,
                clickable: true
            }

         };
 var plot = $.plot(placeholder, data, options);
// draw the pie chart in the placeholder div using data with the peramerters of options.
  
//Animation fun. Could be plugin. Isn't.
var explodeTo = null;//where the segment should move to
    function animateExplode(plot, duration) {
        var start = (new Date()).valueOf();
        var end = start + duration;
        explodePump(plot, start, end);
    }
    function explodePump(plot, start, end) {
        var now = Math.min(end, (new Date()).valueOf());
        clearTimeout(explodeTo);
        var ss = plot.getData();
        var p = (now - start) / (end - start);
        p = Math.pow(p, 1/3);
        
        for( var i = 0; i < ss.length; i++ ) {
            ss[i].explode = (1-p)*(ss[i].explodeFrom || 0) + p*(ss[i].explodeTo || 0);					
        }
        plot.draw();
        if( now < end ) {
            explodeTo = setTimeout(function() { explodePump(plot, start, end)}, 0);
        }
    } 
 
     placeholder.bind("plothover ", function(event, pos, obj) {
       if(!obj || obj === undefined)
         {return true;}
       // when mouse is over a segment.
      var html = [];//used for the inner circle
      
      html.push("<div id=\"showInteractive2\" style=\";;padding-top: 50px;background-color:", obj.series.color, "\">",
                  "<span style=\"font-weight:bold;font-size:25px;color:white;\">", obj.series.label, " <br/>&#163;", obj.series.data[0][1], "</span>",
                  "</div>");     
      //change the inner circle style to represent the segment the user is over
      $("#showInteractive").html(html.join('')); 
      //replace the HTML of the DIV
       
        var s = obj.series;    
        
        var ss = plot.getData();
       
        for( var i = 0; i < ss.length; i++ ) {
          // loop through the segments
            //if( ss[i] != s ) {
              //if its not the segment the user is over
                ss[i].explodeFrom = ss[i].explode;
                ss[i].explodeTo = 0;
               // ss[i].exploded = false;
              // move it back into the pie.
            //}
        }
        
        s.exploded = true;
       //set the segment the user is over to move out of the pie
        s.explodeFrom = s.explode;
        s.explodeTo = s.exploded ? 0.15 : 0;
        // how far it should move out
        animateExplode(plot, 200);
       //call the annimation (plot, timer)
       return true;
     });
  
  $("#placeholder").mouseleave(function() {
  //    placeholder.bind("mouseleave",function(){
        var ss = plot.getData();
        for( var i = 0; i < ss.length; i++ ) {
          //loop through the segments
                ss[i].explodeFrom = ss[i].explode;
                ss[i].explodeTo = 0;
                ss[i].exploded = false;
          // move them back into the pie.
        }
    animateExplode(plot, 200);
    //run the annimation
         var html = [];
         html.push("<div style=\";height: 140px;width: 190px;border-radius:100%;padding-top: 50px;background-color:", "White", "\">",
                  "<span style=\"font-weight:bold;font-size:25px;color:black;\">", "Total", " <br/>&#163;", "27,500", "</span>",
                  "</div>");
      //set the inner circle back to the default (Total)
      $("#showInteractive").html(html.join('')); 
    //replace the HTML of the DIV
});

 });


//////////////////////////////////////////////////////////////////////////////////
////    Modified jquery.flot.pie.js that supports exploded slices 
//// might be best to seperate this to a seperate javascipt file

(function($) {

	// Maximum redraw attempts when fitting labels within the plot

	var REDRAW_ATTEMPTS = 10;

	// Factor by which to shrink the pie when fitting labels within the plot

	var REDRAW_SHRINK = 0.95;

	function init(plot) {

		var canvas = null,
			target = null,
			maxRadius = null,
			centerLeft = null,
			centerTop = null,
			processed = false,
			ctx = null;

		// interactive variables

		var highlights = [];

		// add hook to determine if pie plugin in enabled, and then perform necessary operations

		plot.hooks.processOptions.push(function(plot, options) {
			if (options.series.pie.show) {

				options.grid.show = false;

				// set labels.show

				if (options.series.pie.label.show == "auto") {
					if (options.legend.show) {
						options.series.pie.label.show = false;
					} else {
						options.series.pie.label.show = true;
					}
				}

				// set radius

				if (options.series.pie.radius == "auto") {
					if (options.series.pie.label.show) {
						options.series.pie.radius = 3/4;
					} else {
						options.series.pie.radius = 1;
					}
				}

				// ensure sane tilt

				if (options.series.pie.tilt > 1) {
					options.series.pie.tilt = 1;
				} else if (options.series.pie.tilt < 0) {
					options.series.pie.tilt = 0;
				}
			}
		});

		plot.hooks.bindEvents.push(function(plot, eventHolder) {
			var options = plot.getOptions();
			if (options.series.pie.show) {
				if (options.grid.hoverable) {
					eventHolder.unbind("mousemove").mousemove(onMouseMove);
				}
				if (options.grid.clickable) {
					eventHolder.unbind("click").click(onClick);
				}
			}
		});

		plot.hooks.processDatapoints.push(function(plot, series, data, datapoints) {
			var options = plot.getOptions();
			if (options.series.pie.show) {
				processDatapoints(plot, series, data, datapoints);
			}
		});

		plot.hooks.drawOverlay.push(function(plot, octx) {
			var options = plot.getOptions();
			if (options.series.pie.show) {
				drawOverlay(plot, octx);
			}
		});

		plot.hooks.draw.push(function(plot, newCtx) {
			var options = plot.getOptions();
			if (options.series.pie.show) {
				draw(plot, newCtx);
			}
		});

		function processDatapoints(plot, series, datapoints) {
			if (!processed)	{
				processed = true;
				canvas = plot.getCanvas();
				target = $(canvas).parent();
				options = plot.getOptions();
				plot.setData(combine(plot.getData()));
			}
		}

		function combine(data) {

			var total = 0,
				combined = 0,
				numCombined = 0,
				color = options.series.pie.combine.color,
				newdata = [];

			// Fix up the raw data from Flot, ensuring the data is numeric

			for (var i = 0; i < data.length; ++i) {

				var value = data[i].data;

				// If the data is an array, we'll assume that it's a standard
				// Flot x-y pair, and are concerned only with the second value.

				// Note how we use the original array, rather than creating a
				// new one; this is more efficient and preserves any extra data
				// that the user may have stored in higher indexes.

				if ($.isArray(value) && value.length == 1) {
    				value = value[0];
				}

				if ($.isArray(value)) {
					// Equivalent to $.isNumeric() but compatible with jQuery < 1.7
					if (!isNaN(parseFloat(value[1])) && isFinite(value[1])) {
						value[1] = +value[1];
					} else {
						value[1] = 0;
					}
				} else if (!isNaN(parseFloat(value)) && isFinite(value)) {
					value = [1, +value];
				} else {
					value = [1, 0];
				}

				data[i].data = [value];
			}

			// Sum up all the slices, so we can calculate percentages for each

			for (var i = 0; i < data.length; ++i) {
				total += data[i].data[0][1];
			}

			// Count the number of slices with percentages below the combine
			// threshold; if it turns out to be just one, we won't combine.

			for (var i = 0; i < data.length; ++i) {
				var value = data[i].data[0][1];
				if (value / total <= options.series.pie.combine.threshold) {
					combined += value;
					numCombined++;
					if (!color) {
						color = data[i].color;
					}
				}
			}

			for (var i = 0; i < data.length; ++i) {				
				var value = data[i].data[0][1];
				if (numCombined < 2 || value / total > options.series.pie.combine.threshold) {
					newdata.push({
						data: [[1, value]],
						color: data[i].color,
						label: data[i].label,
						explode: data[i].explode,
						angle: value * Math.PI * 2 / total,
						percent: value / (total / 100)
					});
				}
			}

			if (numCombined > 1) {
				newdata.push({
					data: [[1, combined]],
					color: color,
					label: options.series.pie.combine.label,
					angle: combined * Math.PI * 2 / total,
					percent: combined / (total / 100)
				});
			}

			return newdata;
		}

		function draw(plot, newCtx) {

			if (!target) {
				return; // if no series were passed
			}

			var canvasWidth = plot.getPlaceholder().width(),
				canvasHeight = plot.getPlaceholder().height(),
				legendWidth = target.children().filter(".legend").children().width() || 0;

			ctx = newCtx;

			// WARNING: HACK! REWRITE THIS CODE AS SOON AS POSSIBLE!

			// When combining smaller slices into an 'other' slice, we need to
			// add a new series.  Since Flot gives plugins no way to modify the
			// list of series, the pie plugin uses a hack where the first call
			// to processDatapoints results in a call to setData with the new
			// list of series, then subsequent processDatapoints do nothing.

			// The plugin-global 'processed' flag is used to control this hack;
			// it starts out false, and is set to true after the first call to
			// processDatapoints.

			// Unfortunately this turns future setData calls into no-ops; they
			// call processDatapoints, the flag is true, and nothing happens.

			// To fix this we'll set the flag back to false here in draw, when
			// all series have been processed, so the next sequence of calls to
			// processDatapoints once again starts out with a slice-combine.
			// This is really a hack; in 0.9 we need to give plugins a proper
			// way to modify series before any processing begins.

			processed = false;

			// calculate maximum radius and center point

			maxRadius =  Math.min(canvasWidth, canvasHeight / options.series.pie.tilt) / 2;
			centerTop = canvasHeight / 2 + options.series.pie.offset.top;
			centerLeft = canvasWidth / 2;

			if (options.series.pie.offset.left == "auto") {
				if (options.legend.position.match("w")) {
					centerLeft += legendWidth / 2;
				} else {
					centerLeft -= legendWidth / 2;
				}
			} else {
				centerLeft += options.series.pie.offset.left;
			}

			if (centerLeft < maxRadius) {
				centerLeft = maxRadius;
			} else if (centerLeft > canvasWidth - maxRadius) {
				centerLeft = canvasWidth - maxRadius;
			}

			var slices = plot.getData(),
				attempts = 0;

			// Keep shrinking the pie's radius until drawPie returns true,
			// indicating that all the labels fit, or we try too many times.

			do {
				if (attempts > 0) {
					maxRadius *= REDRAW_SHRINK;
				}
				attempts += 1;
				clear();
				if (options.series.pie.tilt <= 0.8) {
					drawShadow();
				}
			} while (!drawPie() && attempts < REDRAW_ATTEMPTS)

			if (attempts >= REDRAW_ATTEMPTS) {
				clear();
				target.prepend("<div class='error'>Could not draw pie with labels contained inside canvas</div>");
			}

			if (plot.setSeries && plot.insertLegend) {
				plot.setSeries(slices);
				plot.insertLegend();
			}

			// we're actually done at this point, just defining internal functions at this point

			function clear() {
				ctx.clearRect(0, 0, canvasWidth, canvasHeight);
				target.children().filter(".pieLabel, .pieLabelBackground").remove();
			}

			function drawShadow() {

				var shadowLeft = options.series.pie.shadow.left;
				var shadowTop = options.series.pie.shadow.top;
				var edge = 10;
				var alpha = options.series.pie.shadow.alpha;
				var radius = options.series.pie.radius > 1 ? options.series.pie.radius : maxRadius * options.series.pie.radius;

				if (radius >= canvasWidth / 2 - shadowLeft || radius * options.series.pie.tilt >= canvasHeight / 2 - shadowTop || radius <= edge) {
					return;	// shadow would be outside canvas, so don't draw it
				}

				ctx.save();
				ctx.translate(shadowLeft,shadowTop);
				ctx.globalAlpha = alpha;
				ctx.fillStyle = "#000";

				// center and rotate to starting position

				ctx.translate(centerLeft,centerTop);
				ctx.scale(1, options.series.pie.tilt);

				//radius -= edge;

				for (var i = 1; i <= edge; i++) {
					ctx.beginPath();
					ctx.arc(0, 0, radius, 0, Math.PI * 2, false);					
					ctx.fill();
					radius -= i;
				}

				ctx.restore();
			}

			function drawPie() {

				var startAngle = Math.PI * options.series.pie.startAngle;
				var radius = options.series.pie.radius > 1 ? options.series.pie.radius : maxRadius * options.series.pie.radius;

				// center and rotate to starting position

				ctx.save();
				ctx.translate(centerLeft,centerTop);
				ctx.scale(1, options.series.pie.tilt);
				//ctx.rotate(startAngle); // start at top; -- This doesn't work properly in Opera

				// draw slices

				ctx.save();
				var currentAngle = startAngle;
				for (var i = 0; i < slices.length; ++i) {
					slices[i].startAngle = currentAngle;					
					drawSlice(slices[i].angle, slices[i].color, true, slices[i].explode || 0 );
				}
				ctx.restore();

				// draw slice outlines

				if (options.series.pie.stroke.width > 0) {
					ctx.save();
					
					currentAngle = startAngle;
					for (var i = 0; i < slices.length; ++i) {	
						ctx.lineWidth = options.series.pie.stroke.width;// + Math.round(0.5*radius*(slices[i].explode || 0));		
						drawSlice(slices[i].angle, options.series.pie.stroke.color, false, slices[i].explode || 0 );
					}
					ctx.restore();
				}

				// draw donut hole

				drawDonutHole(ctx);

				ctx.restore();

				// Draw the labels, returning true if they fit within the plot

				if (options.series.pie.label.show) {
					return drawLabels();
				} else return true;

				function drawSlice(angle, color, fill, explode) {
					
					explode = radius * (explode || 0);
					
					if (angle <= 0 || isNaN(angle)) {
						return;
					}

					if (fill) {
						ctx.fillStyle = color;
					} else {
						ctx.strokeStyle = color;
						ctx.lineJoin = "round";
					}											

					ctx.beginPath();
					if (Math.abs(angle - Math.PI * 2) > 0.000000001) {
						ctx.moveTo(0, 0); // Center of the pie
					}

					//ctx.arc(0, 0, radius, 0, angle, false); // This doesn't work properly in Opera
					
					var x = Math.cos(currentAngle + angle / 2)*explode;								
					var y = Math.sin(currentAngle + angle / 2)*explode;								
					
					ctx.moveTo(x, y);					
					ctx.arc(x, y, radius, currentAngle, currentAngle + angle / 2, false);					
					ctx.arc(x, y, radius, currentAngle + angle / 2, currentAngle + angle, false);
					ctx.closePath();
					//ctx.rotate(angle); // This doesn't work properly in Opera
					currentAngle += angle;

					if (fill) {
						ctx.fill();
					} else {
						ctx.stroke();
					}
				}

				function drawLabels() {

					var currentAngle = startAngle;
					var radius = options.series.pie.label.radius > 1 ? options.series.pie.label.radius : maxRadius * options.series.pie.label.radius;

					for (var i = 0; i < slices.length; ++i) {
						if (slices[i].percent >= options.series.pie.label.threshold * 100) {
							if (!drawLabel(slices[i], currentAngle, i, slices[i].explode || 0)) {
								return false;
							}
						}
						currentAngle += slices[i].angle;
					}

					return true;

					function drawLabel(slice, startAngle, index, explode) {

						if (slice.data[0][1] == 0) {
							return true;
						}
						
						explode = radius * (explode || 0);

						// format label text

						var lf = options.legend.labelFormatter, text, plf = options.series.pie.label.formatter;

						if (lf) {
							text = lf(slice.label, slice);
						} else {
							text = slice.label;
						}

						if (plf) {
							text = plf(text, slice);
						}

						var halfAngle = ((startAngle + slice.angle) + startAngle) / 2;
						var x = centerLeft + Math.round(Math.cos(halfAngle) * (radius + explode));
						var y = centerTop + Math.round(Math.sin(halfAngle) * (radius + explode)) * options.series.pie.tilt;

						var html = "<span class='pieLabel' id='pieLabel" + index + "' style='position:absolute;top:" + y + "px;left:" + x + "px;'>" + text + "</span>";
						target.append(html);

						var label = target.children("#pieLabel" + index);
						var labelTop = (y - label.height() / 2);
						var labelLeft = (x - label.width() / 2);

						label.css("top", labelTop);
						label.css("left", labelLeft);

						// check to make sure that the label is not outside the canvas

						if (0 - labelTop > 0 || 0 - labelLeft > 0 || canvasHeight - (labelTop + label.height()) < 0 || canvasWidth - (labelLeft + label.width()) < 0) {
							return false;
						}

						if (options.series.pie.label.background.opacity != 0) {

							// put in the transparent background separately to avoid blended labels and label boxes

							var c = options.series.pie.label.background.color;

							if (c == null) {
								c = slice.color;
							}

							var pos = "top:" + labelTop + "px;left:" + labelLeft + "px;";
							$("<div class='pieLabelBackground' style='position:absolute;width:" + label.width() + "px;height:" + label.height() + "px;" + pos + "background-color:" + c + ";'></div>")
								.css("opacity", options.series.pie.label.background.opacity)
								.insertBefore(label);
						}

						return true;
					} // end individual label function
				} // end drawLabels function
			} // end drawPie function
		} // end draw function

		// Placed here because it needs to be accessed from multiple locations

		function drawDonutHole(layer) {
			if (options.series.pie.innerRadius > 0) {

				// subtract the center

				layer.save();
				var innerRadius = options.series.pie.innerRadius > 1 ? options.series.pie.innerRadius : maxRadius * options.series.pie.innerRadius;
				layer.globalCompositeOperation = "destination-out"; // this does not work with excanvas, but it will fall back to using the stroke color
				layer.beginPath();
				layer.fillStyle = options.series.pie.stroke.color;
				layer.arc(0, 0, innerRadius, 0, Math.PI * 2, false);
				layer.fill();
				layer.closePath();
				layer.restore();

				// add inner stroke

				layer.save();
				layer.beginPath();
				layer.strokeStyle = options.series.pie.stroke.color;
				layer.arc(0, 0, innerRadius, 0, Math.PI * 2, false);
				layer.stroke();
				layer.closePath();
				layer.restore();

				// TODO: add extra shadow inside hole (with a mask) if the pie is tilted.
			}
		}

		//-- Additional Interactive related functions --

		function isPointInPoly(poly, pt) {
			for(var c = false, i = -1, l = poly.length, j = l - 1; ++i < l; j = i)
				((poly[i][1] <= pt[1] && pt[1] < poly[j][1]) || (poly[j][1] <= pt[1] && pt[1]< poly[i][1]))
				&& (pt[0] < (poly[j][0] - poly[i][0]) * (pt[1] - poly[i][1]) / (poly[j][1] - poly[i][1]) + poly[i][0])
				&& (c = !c);
			return c;
		}

		function findNearbySlice(mouseX, mouseY) {

			var slices = plot.getData(),
				options = plot.getOptions(),
				radius = options.series.pie.radius > 1 ? options.series.pie.radius : maxRadius * options.series.pie.radius,
				x, y;

			for (var i = 0; i < slices.length; ++i) {

				var s = slices[i];

				if (s.pie.show) {

					ctx.save();
					ctx.beginPath();
					ctx.moveTo(0, 0); // Center of the pie
					//ctx.scale(1, options.series.pie.tilt);	// this actually seems to break everything when here.
					ctx.arc(0, 0, radius, s.startAngle, s.startAngle + s.angle / 2, false);
					ctx.arc(0, 0, radius, s.startAngle + s.angle / 2, s.startAngle + s.angle, false);
					ctx.closePath();
					x = mouseX - centerLeft;
					y = mouseY - centerTop;

					if (ctx.isPointInPath) {
						if (ctx.isPointInPath(mouseX - centerLeft, mouseY - centerTop)) {
							ctx.restore();
							return {
								datapoint: [s.percent, s.data],
								dataIndex: 0,
								series: s,
								seriesIndex: i
							};
						}
					} else {

						// excanvas for IE doesn;t support isPointInPath, this is a workaround.

						var p1X = radius * Math.cos(s.startAngle),
							p1Y = radius * Math.sin(s.startAngle),
							p2X = radius * Math.cos(s.startAngle + s.angle / 4),
							p2Y = radius * Math.sin(s.startAngle + s.angle / 4),
							p3X = radius * Math.cos(s.startAngle + s.angle / 2),
							p3Y = radius * Math.sin(s.startAngle + s.angle / 2),
							p4X = radius * Math.cos(s.startAngle + s.angle / 1.5),
							p4Y = radius * Math.sin(s.startAngle + s.angle / 1.5),
							p5X = radius * Math.cos(s.startAngle + s.angle),
							p5Y = radius * Math.sin(s.startAngle + s.angle),
							arrPoly = [[0, 0], [p1X, p1Y], [p2X, p2Y], [p3X, p3Y], [p4X, p4Y], [p5X, p5Y]],
							arrPoint = [x, y];

						// TODO: perhaps do some mathmatical trickery here with the Y-coordinate to compensate for pie tilt?

						if (isPointInPoly(arrPoly, arrPoint)) {
							ctx.restore();
							return {
								datapoint: [s.percent, s.data],
								dataIndex: 0,
								series: s,
								seriesIndex: i
							};
						}
					}

					ctx.restore();
				}
			}

			return null;
		}

		function onMouseMove(e) {
			triggerClickHoverEvent("plothover", e);
		}

		function onClick(e) {
			triggerClickHoverEvent("plotclick", e);
		}

		// trigger click or hover event (they send the same parameters so we share their code)

		function triggerClickHoverEvent(eventname, e) {

			var offset = plot.offset();
			var canvasX = parseInt(e.pageX - offset.left);
			var canvasY =  parseInt(e.pageY - offset.top);
			var item = findNearbySlice(canvasX, canvasY);

			//if (options.grid.autoHighlight) {

				// clear auto-highlights

				//for (var i = 0; i < highlights.length; ++i) {
					//var h = highlights[i];
					//if (h.auto == eventname && !(item && h.series == item.series)) {
						//unhighlight(h.series);
					//}
				//}
			//}

			// highlight the slice

			//if (item) {
			//	highlight(item.series, eventname);
			//}

			// trigger any hover bind events

			var pos = { pageX: e.pageX, pageY: e.pageY };
			target.trigger(eventname, [pos, item]);
		}

		//function highlight(s, auto) {
			//if (typeof s == "number") {
			//	s = series[s];
			//}

			//var i = indexOfHighlight(s);

			//if (i == -1) {
			//	highlights.push({ series: s, auto: auto });
			//	plot.triggerRedrawOverlay();
			//} else if (!auto) {
			//	highlights[i].auto = false;
			//}
		//}

		//function unhighlight(s) {
			//if (s == null) {
			//	highlights = [];
			//	plot.triggerRedrawOverlay();
		//	}

			//if (typeof s == "number") {
			//	s = series[s];
			//}

			//var i = indexOfHighlight(s);

			//if (i != -1) {
			//	highlights.splice(i, 1);
			//	plot.triggerRedrawOverlay();
			//}
	//	}

		//function indexOfHighlight(s) {
			//for (var i = 0; i < highlights.length; ++i) {
				//var h = highlights[i];
				//if (h.series == s)
				//	return i;
			//}
			//return -1;
		//}

		function drawOverlay(plot, octx) {

			var options = plot.getOptions();

			var radius = options.series.pie.radius > 1 ? options.series.pie.radius : maxRadius * options.series.pie.radius;

			octx.save();
			octx.translate(centerLeft, centerTop);
			octx.scale(1, options.series.pie.tilt);

			for (var i = 0; i < highlights.length; ++i) {
				drawHighlight(highlights[i].series);
			}

			drawDonutHole(octx);

			octx.restore();

			function drawHighlight(series) {
				
				if (series.angle <= 0 || isNaN(series.angle)) {
					return;
				}
				
				var explode = radius * (series.explode || 0);

				//octx.fillStyle = parseColor(options.series.pie.highlight.color).scale(null, null, null, options.series.pie.highlight.opacity).toString();
				octx.fillStyle = "rgba(255, 255, 255, " + options.series.pie.highlight.opacity + ")"; // this is temporary until we have access to parseColor
				octx.beginPath();
				if (Math.abs(series.angle - Math.PI * 2) > 0.000000001) {
					octx.moveTo(0, 0); // Center of the pie
				}
				
				var x = Math.cos(series.startAngle + series.angle / 2)*explode;								
				var y = Math.sin(series.startAngle + series.angle / 2)*explode;												
				octx.moveTo(x, y);
				
				octx.arc(x, y, radius, series.startAngle, series.startAngle + series.angle / 2, false);
				octx.arc(x, y, radius, series.startAngle + series.angle / 2, series.startAngle + series.angle, false);
				octx.closePath();
				octx.fill();
			}
		}
	} // end init (plugin body)

	// define pie specific options and their default values

	var options = {
		series: {
			pie: {
				show: false,
				radius: "auto",	// actual radius of the visible pie (based on full calculated radius if <=1, or hard pixel value)
				innerRadius: 0, /* for donut */
				startAngle: 3/2,
				tilt: 1,
				shadow: {
					left: 5,	// shadow left offset
					top: 15,	// shadow top offset
					alpha: 0.02	// shadow alpha
				},
				offset: {
					top: 0,
					left: "auto"
				},
				stroke: {
					color: "#fff",
					width: 1
				},
				label: {
					show: "auto",
					formatter: function(label, slice) {
						return "<div style='font-size:x-small;text-align:center;padding:2px;color:" + slice.color + ";'>" + label + "<br/>" + Math.round(slice.percent) + "%</div>";
					},	// formatter function
					radius: 1,	// radius at which to place the labels (based on full calculated radius if <=1, or hard pixel value)
					background: {
						color: null,
						opacity: 0
					},
					threshold: 0	// percentage at which to hide the label (i.e. the slice is too narrow)
				},
				combine: {
					threshold: -1,	// percentage at which to combine little slices into one larger slice
					color: null,	// color to give the new slice (auto-generated if null)
					label: "Other"	// label to give the new slice
				},
				highlight: {
					//color: "#fff",		// will add this functionality once parseColor is available
					opacity: 0.5
				}
			}
		}
	};

	$.plot.plugins.push({
		init: init,
		options: options,
		name: "pie",
		version: "1.1"
	});

})(jQuery);