import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import * as CanvasJS from './canvasjs.min'; 
 
@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html'
})
 
export class DashboardComponent implements OnInit {
	ngOnInit() {
	let dataPoints = []; 
	let chart = new CanvasJS.Chart("chartContainer",{
		exportEnabled: true,
		title:{
			text:"Live machine monitoring"
		},
		data: [{
			type: "spline",
			dataPoints : dataPoints,
		}]
	});
	function updateChart() { 	
$.getJSON("http://127.0.0.1/Sensor_tag_vibrational_analysis/MEAN_application/angular-src/src/app/components/dashboard/x_live_data.json", function(data) { 
console.log(data);
		$.each(data, function(key, value) {
			dataPoints.push({
			x: parseInt(value[0]),
			y: parseInt(value[1])
			}); 
		});
		
		if (dataPoints.length >  20 ) {
      		dataPoints.shift();				
      	}
		chart.render();
		setTimeout(function(){updateChart()}, 1000);
	});
    } 
updateChart();
}
}
