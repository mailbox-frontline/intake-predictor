import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProject, IFormular } from '../../interface';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-projects',
  template: `
    <div *ngIf="top5Projects" class="outer">
      <a mat-button [routerLink]="['/new']" ><mat-icon>arrow_back</mat-icon> New Project Page</a>

      <div class="config-title" *ngIf="currentProjects">
        <h2>Current Projects ({{currentProjects.length}})</h2>
      </div>
        <app-porject-adjust-form *ngFor="let project of currentProjects"
            [project]="project"
            [techs]="techs"
            [option1]="option1"
            [option2]="option2"
            [option3]="option3"
            (add2ProjectList)="add2DoneProjectList($event)"
            >
        </app-porject-adjust-form>


      <div class="config-title">
        <h2>Previous Projects ({{top5Projects.length}})</h2>
        <button mat-stroked-button color="warn" *ngIf="hasNewConfig" (click)="applyNewConfig()">
            <mat-icon>autorenew</mat-icon>
            Apply New Config
        </button>
      </div>
      <app-porject-adjust-form *ngFor="let project of top5Projects"
          [project]="project"
          [techs]="techs"
          [option1]="option1"
          [option2]="option2"
          [option3]="option3">
      </app-porject-adjust-form>
      <button mat-stroked-button color="primary" id="load-btn" (click)="loadAllProjects()">{{loadBtnText}}</button>


      <div class="config-title">
        <h2>Formula Configuration</h2>
      </div>
      <app-config [formulas]="formulas" (newFormulas)="onNewFormulas($event)"></app-config>


    </div>
  `,
  styles: [`

    #load-btn{
      margin-top: 10px;
    }
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

  showAll = false;
  loadBtnText = 'Load All';
  top5Projects: IProject[];
  currentProjects: IProject[];
  f: IFormular[];
  techs: string[] = [];
  formulas: IFormular[];
  option1: {} = {};
  option2: {} = {};
  option3: {} = {};
  hasNewConfig = false;
  constructor(private actr: ActivatedRoute, private ps: ProjectsService) {}

  ngOnInit() {
    this.top5Projects = this.actr.snapshot.data.top5Projects || [];
    this.currentProjects = this.actr.snapshot.data.currentProjects || [];
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

  loadAllProjects() {

    if (!this.showAll) {
      this.ps.getAllProjects().subscribe(
        (res) => this.top5Projects = res
      );
      this.showAll = true;
      this.loadBtnText = 'Collapse';
    } else {
      this.loadBtnText = 'Load All';
      this.top5Projects = this.top5Projects.slice(0, 5);
      this.showAll = false;
    }
  }

  add2DoneProjectList(e) {
    this.ps.deleteCurrentById(e).subscribe(
      () => {
        this.currentProjects = this.currentProjects.filter(wp => wp.id !== e.id);
        this.ps.addProjectToProjeclist(e).subscribe(
          (res) => {
            this.top5Projects.unshift(e);
            this.top5Projects.pop();
          }
        );
      }
    );
  }
}
