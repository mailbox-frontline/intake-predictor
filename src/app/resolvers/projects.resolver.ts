import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { IProject, IScore, IFormular } from '../interface';
import { Observable } from 'rxjs';
import { ProjectsService } from '../services/projects.service';
import { map, reduce, flatMap, concatAll } from 'rxjs/operators';




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
export class Top5ProjectsResolver implements Resolve<IProject[]> {

  constructor(private ps: ProjectsService) { }

  resolve(): Observable<IProject[]> {
    return this.ps.getAllProjects().pipe(
      map(projects => projects.slice(0, 5))
    );
  }
}
@Injectable({
  providedIn: 'root'
})
export class CurrentProjectsResolver implements Resolve<IProject[]> {

  constructor(private ps: ProjectsService) { }

  resolve(): Observable<IProject[]> {
    return this.ps.getAllCurrentProjects();
  }
}



@Injectable({
  providedIn: 'root'
})
export class TechStackResolver implements Resolve<string[]> {

  constructor(private ps: ProjectsService) { }

  resolve(): Observable<string[]> {
    return this.ps.getAllProjects().pipe(
      map(projects => projects.map(p => p.technologyStack)),
      map(array => [].concat.apply([], array)),
      map(a => Array.from(new Set(a)) as string[])
    );
  }
}

@Injectable({
  providedIn: 'root'
})
export class ScoreResolver implements Resolve<IScore[]> {

  constructor(private ps: ProjectsService) { }

  resolve(): Observable<IScore[]> {
    return this.ps.getAllProjects().pipe(
      map(projects => projects.map(project => project.scores))
    );
  }
}

@Injectable({
  providedIn: 'root'
})
export class ProjectNameResolver implements Resolve<string[]> {

  constructor(private ps: ProjectsService) { }

  resolve(): Observable<string[]> {
    return this.ps.getAllProjects().pipe(
      map((projects => projects.map(project => project.name))),
    );
  }
}


@Injectable({
  providedIn: 'root'
})
export class WaitingProjectsResolver implements Resolve<IProject[]> {

  constructor(private ps: ProjectsService) { }

  resolve(): Observable<IProject[]> {
    return this.ps.getAllProjects().pipe(
      map(projects => projects.slice(8, 12))
    );
  }
}

@Injectable({
  providedIn: 'root'
})
export class AllFormulasResolver implements Resolve<IFormular[]> {

  constructor(private ps: ProjectsService) { }

  resolve(): Observable<IFormular[]> {
    return this.ps.getAllFormulas();
  }
}

@Injectable({
  providedIn: 'root'
})
export class WaitinglistResolver implements Resolve<IProject[]> {

  constructor(private ps: ProjectsService) { }

  resolve(): Observable<IProject[]> {
    return this.ps.getWaitinglist();
  }
}

