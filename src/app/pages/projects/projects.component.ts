import {Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { IProject } from '../../interface';


@Component({
  selector: 'app-projects',
  template: `
    <div *ngIf="projects" class="outer">
      <h2>Total {{projects.length}} Projects</h2>
      <app-porject-adjust-form *ngFor="let project of projects" [project]="project"
      [techs]="techs"></app-porject-adjust-form>
    </div>
  `,
  styles: [`
    .outer{
      margin: 20px 15%;
    }
  `]
})
export class ProjectsComponent implements OnInit {

  projects: IProject[];
  techs: string[] = [];

  constructor(private actr: ActivatedRoute) {}

  ngOnInit() {
    this.projects = this.actr.snapshot.data.projects || [];
    this.techs = this.actr.snapshot.data.techs || [];
  }
}
