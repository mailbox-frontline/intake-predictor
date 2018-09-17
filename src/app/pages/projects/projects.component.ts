import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { IProject, IFormular } from '../../interface';
import { ProjectsService } from '../../services/projects.service';


@Component({
  selector: 'app-projects',
  template: `
    <div *ngIf="projects" class="outer">
      <a mat-button [routerLink]="['/new']" ><mat-icon>arrow_back</mat-icon> New Project Page</a>
      <div class="config-title">
        <h2>Formula Configuration</h2>
      </div>
      <app-config [formulas]="formulas" (newFormulas)="onNewFormulas($event)"></app-config>
      <div class="config-title">
        <h2>Total {{projects.length}} Projects</h2>
        <button mat-stroked-button color="warn" *ngIf="hasNewConfig" (click)="applyNewConfig()">
            <mat-icon>autorenew</mat-icon>
            Apply New Config
        </button>
      </div>
      <app-porject-adjust-form *ngFor="let project of projects"
          [project]="project"
          [techs]="techs"
          [option1]="option1"
          [option2]="option2"
          [option3]="option3">
      </app-porject-adjust-form>
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
  f: IFormular[];
  techs: string[] = [];
  formulas: IFormular[];
  option1: {} = {};
  option2: {} = {};
  option3: {} = {};
  hasNewConfig = false;
  constructor(private actr: ActivatedRoute) {}

  ngOnInit() {
    this.projects = this.actr.snapshot.data.projects || [];
    this.techs = this.actr.snapshot.data.techs || [];
    this.formulas = this.actr.snapshot.data.formulas || [];

    this.updateOptions();

    console.log(this.option1);
  }

  onNewFormulas(event) {
    this.hasNewConfig = true;
    this.formulas = event;
    this.updateOptions();
  }

  updateOptions() {
    this.option1['name'] = this.formulas[0].formula[0].title;
    this.option1['options'] = this.formulas[0].formula[0].options.map(o => o.option);
    this.option2['name'] = this.formulas[0].formula[1].title;
    this.option2['options'] = this.formulas[0].formula[1].options.map(o => o.option);
    this.option3['name'] = this.formulas[1].formula[0].title;
    this.option3['options'] = this.formulas[1].formula[0].options.map(o => o.option);
  }

  applyNewConfig() {
    this.hasNewConfig = false;
  }
}
