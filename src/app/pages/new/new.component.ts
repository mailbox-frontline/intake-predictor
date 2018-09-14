import {Component, OnInit, HostListener} from '@angular/core';
import {Chart} from 'chart.js';
import { ActivatedRoute } from '@angular/router';
import { IProject, IScore } from '../../interface';

@Component({selector: 'app-new', templateUrl: './new.component.html', styleUrls: ['./new.component.css']})
export class NewComponent implements OnInit {


  s = []; q = [];
  isFloat = false;
  chart: Chart;
  names: string[];
  labels: string[];
  waitingProjects: IProject[];
  techs: string[] = [];
  score: IScore[];
  constructor(private actr: ActivatedRoute) {}

  ngOnInit() {

    this.waitingProjects = this.actr.snapshot.data.waitingProjects || [];
    this.names = this.actr.snapshot.data.allProjectNames || [];
    this.techs = this.actr.snapshot.data.techs || [];
    this.score = this.actr.snapshot.data.scores || [];
    this.s = this.getChartDataFromScores(this.score);
    this.q = this.getChartDataFromProject(this.waitingProjects);

    this.chart = new Chart('canvas', {
      type: 'scatter',
      data: {
        labels: [['new'], this.names, ['1', '2', '3']],
        datasets: [
          {
            label: 'New Project',
            pointRadius: 5,
            backgroundColor: '#FA1B66',
            data: [{x: 0.9, y: 0.7}],
            pointBackgroundColor: '#FA1B66',
            borderColor: 'rgba(0, 0, 0, 0)',
            pointHoverBorderColor: 'rgba(250, 27, 102, 0.4)',
            pointHoverBorderWidth: 10,
          }, {
            label: 'Previous Projects',
            data: this.s,
            pointBackgroundColor: '#FABE66',
            backgroundColor: '#FABE66',
            borderColor: 'rgba(0, 0, 0, 0)',
            pointHoverBorderColor: 'rgba(250, 190, 102, 0.4)',
            pointHoverBorderWidth: 10,
          }, {
            label: 'Waiting Projects',
            data: this.q,
            pointBackgroundColor: '#835CE7',
            backgroundColor: '#835CE7',
            borderColor: 'rgba(0, 0, 0, 0)',
            pointHoverBorderColor: 'rgba(131, 92, 231, 0.4)',
            pointHoverBorderWidth: 10,
          }
        ]
      },
      options: {
        responsive: true,
        legend: {
          display: true,
          position: 'bottom',
        },
        scales: {
          xAxes: [
            {
              type: 'linear',
              position: 'bottom',
              gridLines: {
                display: false
              },
              scaleLabel: {
                display: true,
                labelString: 'probability'
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                display: false
              },
              scaleLabel: {
                display: true,
                labelString: 'Priority'
              }
            }
          ]
        },
        tooltips: {
          mode: 'nearest',
          callbacks: {
            label: function(tooltipItem, data) {
              const label = data.labels[tooltipItem.datasetIndex][tooltipItem.index];
              return label + ' [ Prob: ' + tooltipItem.xLabel + ', Prio: ' + tooltipItem.yLabel + ' ]';
           }
          }
        }
      }
    });

  }

  getChartDataFromProject(projects: IProject[]) {
    const all = [];
    projects.forEach(s => {
      const a = {};
      a['y'] = s.scores.priority + 0.1;
      a['x'] = s.scores.probability - 0.1;
      all.push(a);
    });

    return all;
  }

  getChartDataFromScores(projects: IScore[]) {
    const all = [];
    projects.forEach(s => {
      const a = {};
      a['y'] = s.priority;
      a['x'] = s.probability;
      all.push(a);
    });

    return all;
  }

  onValChange(value) {
    console.log(value);
    this.waitingProjects.sort((a, b) => {
      if (a.scores[value] > b.scores[value]) { return -1; }
      if (a.scores[value] < b.scores[value]) { return 1; }
      if (a.name > b.name) { return 1; }
      if (a.name < b.name) { return -1; }
    });
  }

  onMouseEnter(index: number) {

    if (this.chart.tooltip._active === undefined) {
      this.chart.tooltip._active = [];
    }
    const activeElements = this.chart.tooltip._active;
    const requestedElem = this.chart.getDatasetMeta(2).data[index];
    for (let i = 0; i < activeElements.length; i++) {
      if (requestedElem._index === activeElements[i]._index) {
         return;
      }
    }

    activeElements.push(requestedElem);
    this.chart.tooltip._active = activeElements;
    this.chart.tooltip.update(true);
    this.chart.draw();
  }

  onMouseLeave(index: number) {
    const activeElements = this.chart.tooltip._active;
   if (activeElements === undefined || activeElements.length === 0) {
     return;
   }
   const requestedElem = this.chart.getDatasetMeta(2).data[index];
   for (let i = 0; i < activeElements.length; i++) {
       if (requestedElem._index === activeElements[i]._index)  {
          activeElements.splice(i, 1);
          break;
       }
   }
   this.chart.tooltip._active = activeElements;
   this.chart.tooltip.update(true);
   this.chart.draw();
  }
}
