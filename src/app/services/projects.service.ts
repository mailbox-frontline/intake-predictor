import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {IProject, ProjectMaker, IFormular} from '../interface';
import {throwError, Observable} from 'rxjs';
import {catchError, retry, map, filter} from 'rxjs/operators';
import { resolve } from 'url';

@Injectable({providedIn: 'root'})
export class ProjectsService {

  private BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getAllProjects() {
    return this.http.get < IProject[] > (this.BASE_URL + '/projects').pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  addProjectToProjeclist(project: IProject) {
    return this.http.post < IProject > (this.BASE_URL + '/projects', project ).pipe(
      retry(2),
      catchError(this.handleError));
  }



  getAllFormulas() {
    return this.http.get < IFormular[] > (this.BASE_URL + '/formulas').pipe(
      retry(2),
      catchError(this.handleError)
    );
  }


  getWaitinglist() {
    return this.http.get < IProject[] > (this.BASE_URL + '/waitinglist').pipe(
      retry(2),
      catchError(this.handleError))
      ;
  }


  addNewToWaitinglist(newProject: IProject) {
    return this.http.post < IProject > (this.BASE_URL + '/waitinglist', newProject ).pipe(
      retry(2),
      catchError(this.handleError));
  }

  deleteFromWaitinglistById(p: IProject): Observable<null> {
    return this.http.delete(this.BASE_URL + '/waitinglist/' + p.id).pipe(
      map(res => null),
      catchError(this.handleError));
  }



  addProjectToCurrent(newProject: IProject) {
    return this.http.post < IProject > (this.BASE_URL + '/currentprojects', newProject ).pipe(
      retry(2),
      catchError(this.handleError));
  }

  getAllCurrentProjects() {
    return this.http.get < IProject[] > (this.BASE_URL + '/currentprojects').pipe(
      retry(2),
      catchError(this.handleError));
  }

  deleteCurrentById(p: IProject): Observable<null> {
    return this.http.delete(this.BASE_URL + '/currentprojects/' + p.id).pipe(
      map(res => null),
      catchError(this.handleError));
  }







  updateFomularById(formula: IFormular) {
    return this.http.put<IFormular>(this.BASE_URL + '/formulas/' + formula.id, formula).pipe(
      catchError(this.handleError)
    );
  }



  updateProjectbyId(project: IProject): Observable<IProject> {
    return this.http.put<IProject>(this.BASE_URL + '/projects/' + project.id, project).pipe(
      catchError(this.handleError)
    );
  }




  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
}






@Injectable({providedIn: 'root'})
export class CalculatorService {

  private BLACK_LIST = ['high concurrency', 'wifi indoor positioning', 'raspberry pi', 'socket'];

  constructor(private ps: ProjectsService) {}

  priorityCalculator(project: IProject) {
    let priority, bl;
    const {businessValue, visibility, size, technologyStack} = project;
    const bvValue = this.getBvValuePr(businessValue);
    const vValue = this.getVisiValuePr(visibility);
    const techs = this.gettechValuePr(technologyStack.length);
    const sizeValue = this.getSizeValuePr(size);
    const b = this.howManyInBlacklist(technologyStack, this.BLACK_LIST);

    if (b.length > 0) {
      bl = b.length * (-0.1);
    } else {
      bl = 0;
    }

    priority = bvValue + vValue + techs + sizeValue + bl;
    console.log(`priority: ${bvValue} + ${vValue} + ${techs} + ${sizeValue} + ${bl};`);
    return priority;
  }

  probabilityCalculator = (project: IProject) => {
    let probability: number, bl;
    const {type, technologyStack, size, platform} = project;

    const typeValue = this.getTypeValue(type);
    const techs = this.gettechValuePo(technologyStack.length);
    const sizeValue = this.getSizeValuePo(size);
    const blz = this.howManyInBlacklist(technologyStack, this.BLACK_LIST);
    if (blz.length > 0) {
      bl = blz.length * (-0.1);
    } else {
      bl = 0;
    }

    probability = typeValue + techs + bl + sizeValue;
    return +probability.toFixed(2);
  }


  private getBvValuePr(bv: string) {
    switch (bv) {
      case 'High':
        return 0.5;
      case 'Low':
        return 0.1;
      case 'Medium':
        return 0.3;
      default:
        return 0;
    }
  }

  private getVisiValuePr(v: string) {
    switch (v) {
      case 'High':
        return 0.25;
      case 'Low':
        return 0.05;
      case 'Medium':
        return 0.15;
      default:
        return 0;
    }
  }

  private gettechValuePr(t: number) {
    if (t >= 3 && t < 5) {
      return 0.1;
    } else if (t >= 5 && t < 7) {
      return 0.15;
    } else if (t > 7) {
      return 0.2;
    } else {
      return 0;
    }
  }

  private gettechValuePo(t: number) {
    if (t >= 3 && t < 5) {
      return 0.1;
    } else if (t >= 5 && t < 7) {
      return 0.2;
    } else if (t > 7) {
      return 0.25;
    } else {
      return 0;
    }
  }

  private getSizeValuePr(s: number) {
    switch (s) {
      case 3:
        return 0.2;
      case 5:
        return 0.16;
      case 8:
        return 0.12;
      default:
        return 0.08;
    }
  }

  private getSizeValuePo(s: number) {
    switch (s) {
      case 3:
        return 0.14;
      case 5:
        return 0.2;
      case 8:
        return 0.16;
      default:
        return 0.12;
    }
  }

  private getTypeValue(type: string) {
    switch (type.toLowerCase()) {
      case 'poc':
        return 0.2;
      case 'tool':
        return 0.3;
      case 'prototype':
        return 0.4;
      default:
        return 0;
    }
  }

  getPlatformWeights = () => {

    return this.ps.getAllProjects().pipe(
      map(projects => projects.map(project => project.platform)),
      map(techset => techset.reduce((acc, val) => acc.concat(val))),
      map(arr => arr.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {})),
    );
  }

  private howManyInBlacklist(a: string[], b: string[]) {
    return a.filter(function(i) {return b.indexOf(i) > 0; });
  }




}


