import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { IProject } from '../interface';
import { Observable } from 'rxjs';
import { ProjectsService } from '../services/projects.service';




@Injectable({
  providedIn: 'root'
})
export class AllProjectsResolver implements Resolve<IProject[]> {

  constructor(private ps: ProjectsService) { }

  resolve(): Observable<IProject[]> {
    return this.ps.getAllProjects();
  }
}

@Injectable({
  providedIn: 'root'
})
export class TechStackResolver implements Resolve<string[]> {

  constructor(private ps: ProjectsService) { }

  resolve(): Observable<string[]> {
    return this.ps.getTechStack();
  }
}
