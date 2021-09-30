import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public donutColors:any=[
    {
      backgroundColor: []
    }
  ];

  constructor() { 
  	monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  user:any;
  timer:number=60;
  colors=[
  	{'color': 'purple','cant':0},
  	{'color': 'blue','cant':0},
  	{'color': 'green','cant':0},
  	{'color': 'yellow','cant':0},
  	{'color': 'orange','cant':0},
  	{'color': 'red','cant':0},
  	{'color': 'grey', 'cant': 0}
  ];
  randomNumber=Math.round(Math.random()*(60-1)+1);
  clicked:boolean=false;
  chart:boolean=false;
  myColor:string='';

  ngOnInit(): void {
  	this.user = JSON.parse(sessionStorage.getItem('user') || '{}');
  	console.log(sessionStorage.getItem('selectionUser'));
  	if (sessionStorage.getItem('selectionUser')) {
  		this.colors = JSON.parse(sessionStorage.getItem('selectionUser') || '[]').colors;
  		this.myColor = JSON.parse(sessionStorage.getItem('selectionUser') || '[]').myColor;
  		this.clicked = true;
  	}
  	else
  		this.countReverse();
  }

  countReverse() {
  	var count = setInterval(()=>{
  		if (this.clicked) {
  			this.myColor = this.assignColor();
  			this.addNumberToColor();
  			this.makeChart();
  			let selectionUser = {
  				'myColor': this.myColor,
  				'colors': this.colors,
  			}
  			sessionStorage.setItem('selectionUser',JSON.stringify(selectionUser));
  			clearInterval(count);
  		}

  		if (this.randomNumber == this.timer) {
  			this.addNumberToColor();
  			this.randomNumber = Math.round(Math.random()*(60-1)+1);
  			this.timer=60;
  		}
  		else
  			this.timer-=1;
  	},200)
  }

  addNumberToColor() {
	let i = this.colors.findIndex(c=>c['color'] == this.assignColor());
	if (i!=-1)
		this.colors[i]['cant']+=1;
  }

  stopCount() {
  	this.clicked = true;  	
  }

  makeChart() {
  	this.colors.forEach(c=>{
  		this.pieChartLabels.push(c['color']);
  		this.pieChartData.push(c['cant']);
  		this.donutColors[0].backgroundColor.push(c['color']);
  	})
  	this.chart=true;
  }

  assignColor() {
  	switch (true) {
  		case (this.timer>=52):
  			return 'purple'
  			break;

  		case (this.timer<52 && this.timer >=42):
  			return 'blue'
  			break;

  		case (this.timer<42 && this.timer >=32):
  			return 'green'
  			break;
  		
  		case (this.timer<32 && this.timer >=22):
  			return 'yellow'
  			break;

  		case (this.timer<22 && this.timer >=12):
  			return 'orange'
  			break;

  		case (this.timer<12 && this.timer >=0):
  			return 'red'
  			break;

  		default:
  			return 'gray'
  		break;
  	}
  }

}
