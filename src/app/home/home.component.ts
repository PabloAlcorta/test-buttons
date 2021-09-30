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
  usersSimulated=[
    {'user':'Michael', 'color':'grey'},
    {'user':'Leslie', 'color':'grey'},
    {'user':'David', 'color':'grey'},
    {'user':'Alison', 'color':'grey'},
    {'user':'Timy', 'color':'grey'},
    {'user':'Harry', 'color':'grey'},
    {'user':'Penny', 'color':'grey'},
    {'user':'Leonard', 'color':'grey'},
    {'user':'Samuel', 'color':'grey'},
    {'user':'Mary', 'color':'grey'},
  ]
  randomNumber=Math.round(Math.random()*(60-1)+1); //Genera el numero aleatorio entre 1 y 60
  clicked:boolean=false; //para indicar que se hizo click ya
  chart:boolean=false; //cuando es true se muestra el grafico
  myColor:string='grey';

  ngOnInit(): void {
  	this.user = JSON.parse(localStorage.getItem('user') || '{}');
  	if (localStorage.getItem('selectionUser')) {
      let usersSaved = JSON.parse(localStorage.getItem('selectionUser') || '[]');
      let i = usersSaved.findIndex((u:any)=>(u.username==this.user.username && u.email == this.user.email))
      if (i!=-1) {
    		this.colors = usersSaved[i].colors;
    		this.myColor = usersSaved[i].myColor;
    		this.clicked = true;
        this.makeChart();        
      }
      else
        this.countReverse();
  	}
  	else {
  		this.countReverse();
    }
  }

  countReverse() {
  	var count = setInterval(()=>{
  		if (this.clicked) {
        let i = this.usersSimulated.findIndex(u=>u.color == 'grey');
        //Si todos seleccionaron color, se le asigna grey
        this.myColor=i != -1 ? this.assignColor(this.timer) : 'grey';
        console.log(this.myColor, i)
        console.log(this.usersSimulated)
  			this.countColorFromUsers();
  			clearInterval(count);
  		}
  		if (this.randomNumber == this.timer) {
  			this.changeUserColor(this.timer);
  			this.randomNumber = Math.round(Math.random()*(60-1)+1);
  			this.timer=60;
  		}
  		else
  			this.timer-=1;
  	},100)
  }

  changeUserColor(time:number) {
    let item = this.usersSimulated[Math.floor(Math.random()*this.usersSimulated.length)];
    if (item.color != 'grey') {
      if (this.usersSimulated.findIndex(u=>u.color == 'grey') != -1)
        this.changeUserColor(time);
      else {
        this.clicked=true;
        this.countColorFromUsers();
      }
    }
    else
      item.color = this.assignColor(time);
  }

  stopCount() {
  	this.clicked = true;
  }

  saveData() {
    let selectionUser = {
      'myColor': this.myColor,
      'colors': this.colors,
      'username': JSON.parse(localStorage.getItem('user') || '[]').username,
      'email': JSON.parse(localStorage.getItem('user') || '[]').email
    }
    let usersSaved = JSON.parse(localStorage.getItem('selectionUser') || '[]');
    usersSaved.push(selectionUser);
    localStorage.setItem('selectionUser',JSON.stringify(usersSaved));
  }

  countColorFromUsers() {
    this.usersSimulated.forEach(u=>{
      let i = this.colors.findIndex(c=>c.color == u.color);
      if (i!=-1)
        this.colors[i].cant+=1;
    })
    let i = this.colors.findIndex(c=>c.color == this.myColor);
    if (i!=-1)
      this.colors[i].cant+=1;
    this.makeChart();
  }

  makeChart() {
    	this.colors.forEach(c=>{
      if (c['cant'] > 0) {
    		this.pieChartLabels.push(c['color']);
    		this.pieChartData.push(c['cant']);
    		this.donutColors[0].backgroundColor.push(c['color']);        
      }
  	})
  	this.chart=true;
    this.saveData();
  }

  assignColor(time:number) {
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
