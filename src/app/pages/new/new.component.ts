import {Component, OnInit} from '@angular/core';
import {Chart} from 'chart.js';
import { ActivatedRoute } from '@angular/router';
import { IProject } from '../../interface';

@Component({selector: 'app-new', templateUrl: './new.component.html', styleUrls: ['./new.component.css']})
export class NewComponent implements OnInit {

  chart: Chart;
  projects: IProject[];
  techs: string[] = [];
  constructor(private actr: ActivatedRoute) {}

  ngOnInit() {

    this.projects = this.actr.snapshot.data.projects || [];
    this.techs = this.actr.snapshot.data.techs || [];

    this.chart = new Chart('canvas', {
      type: 'scatter',
      data: {
        labels: ['Project 1', 'Project 2', 'Project 3'],
        datasets: [
          {
            label: 'Scatter Dataset',
            data: [
              {
                x: -10,
                y: 0
              }, {
                x: 0,
                y: 10
              }, {
                x: 10,
                y: 5
              }
            ]
          }
        ]
      },
      options: {
        scales: {
          xAxes: [
            {
              type: 'linear',
              position: 'bottom',
              gridLines: {
                display: false
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                display: false
              }
            }
          ]
        },
        tooltips: {
          callbacks: {
            label: function(tooltipItem, data) {
              const label = data.labels[tooltipItem.index];
              return label + ' (' + tooltipItem.xLabel + ', ' + tooltipItem.yLabel + ')';
           }
          }
        }
      }
    });
  }

}
