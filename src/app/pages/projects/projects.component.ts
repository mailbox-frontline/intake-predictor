import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { IProject, IFormular } from '../../interface';


@Component({
  selector: 'app-projects',
  template: `
    <div *ngIf="projects" class="outer">
      <a mat-button [routerLink]="['/new']" ><mat-icon>arrow_back</mat-icon> New Project Page</a>
      <div class="config-title">
        <!--<i class="material-icons">settings</i>-->
        <h2>Formula Configuration</h2>
      </div>
      <app-config [formulas]="formulas"></app-config>
      <div class="config-title">
        <!--<i class="material-icons">extension</i>-->
        <h2>Total {{projects.length}} Projects</h2>
        <button mat-stroked-button color="warn">
            <mat-icon>autorenew</mat-icon>
            Apply New Config
        </button>
      </div>
      <app-porject-adjust-form *ngFor="let project of projects" [project]="project"
      [techs]="techs"></app-porject-adjust-form>
    </div>
  `,
  styles: [`
    .outer{
      margin: 20px 15%;
    }

    h2{
      color: #333333;
    }

    .config-title{
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    i{
      color: #f0aa44;
      padding-right: 1rem;
    }
  `]
})
export class ProjectsComponent implements OnInit {

  projects: IProject[];
  techs: string[] = [];

  formulas: IFormular[] = [
    {
      name: 'Priority Formula',
      updateDate: 'Sept 10, 2018',
      formula: [
        {
          title: 'Business Value',
          weight: 0.5,
          options: [
            {
              option: 'Low',
              oWeight: 0.2
            }, {
              option: 'Medium',
              oWeight: 0.6
            }, {
              option: 'High',
              oWeight: 1
            }
          ]
        }, {
          title: 'Visibility',
          weight: 0.25,
          options: [
            {
              option: 'Low',
              oWeight: 0.2
            }, {
              option: 'Medium',
              oWeight: 0.6
            }, {
              option: 'High',
              oWeight: 1
            }
          ]
        }, {
          title: 'Size',
          weight: 0.2,
          options: [
            {
              option: 'less than 1 week',
              oWeight: 1
            }, {
              option: '2-3 weeks',
              oWeight: 0.8
            }, {
              option: '4-5 week',
              oWeight: 0.6
            }, {
              option: '6-8 week',
              oWeight: 0.4
            }
          ]
        }, {
          title: 'Tech',
          weight: 0.2,
          options: [
            {
              option: '>3',
              oWeight: 0.5
            }, {
              option: '>5',
              oWeight: 0.75
            }, {
              option: '>7',
              oWeight: 1
            }
          ]
        }
      ]
    }, {
      name: 'Probobility Formula',
      updateDate: 'Sept 12, 2018',
      formula: [
        {
          title: 'Business Value',
          weight: 0.5,
          options: [
            {
              option: 'Low',
              oWeight: 0.2
            }, {
              option: 'Medium',
              oWeight: 0.6
            }, {
              option: 'High',
              oWeight: 1
            }
          ]
        }, {
          title: 'Visibility',
          weight: 0.25,
          options: [
            {
              option: 'Low',
              oWeight: 0.2
            }, {
              option: 'Medium',
              oWeight: 0.6
            }, {
              option: 'High',
              oWeight: 1
            }
          ]
        }, {
          title: 'Size',
          weight: 0.2,
          options: [
            {
              option: 'less than 1 week',
              oWeight: 1
            }, {
              option: '2-3 weeks',
              oWeight: 0.8
            }, {
              option: '4-5 week',
              oWeight: 0.6
            }, {
              option: '6-8 week',
              oWeight: 0.4
            }
          ]
        }, {
          title: 'Tech',
          weight: 0.2,
          options: [
            {
              option: '>3',
              oWeight: 0.5
            }, {
              option: '>5',
              oWeight: 0.75
            }, {
              option: '>7',
              oWeight: 1
            }
          ]
        }
      ]
    }
  ];

  constructor(private actr: ActivatedRoute) {}

  ngOnInit() {
    this.projects = this.actr.snapshot.data.projects || [];
    this.techs = this.actr.snapshot.data.techs || [];
  }
}
