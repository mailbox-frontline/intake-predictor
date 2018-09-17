import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
// tslint:disable-next-line:max-line-length
import { AllProjectsResolver, TechStackResolver, ScoreResolver, ProjectNameResolver, WaitingProjectsResolver, AllFormulasResolver } from './resolvers/projects.resolver';
import { HttpClientModule } from '@angular/common/http';

import {MaterialModule} from './material.module';

import { AppComponent } from './app.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import {PorjectAdjustFormComponent} from './compos/porject-adjust-form/porject-adjust-form.component';
import {NewComponent} from './pages/new/new.component';
import { ScrollTrackerDirective } from './directives/scroll-tracker.directive';
import { ConfigComponent } from './compos/config/config.component';
import { FormulaFormComponent } from './compos/formula-form/formula-form.component';




const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/new',
    pathMatch: 'full',
  }, {
    path: 'projects',
    component: ProjectsComponent,
    resolve: {
      projects: AllProjectsResolver,
      techs: TechStackResolver,
      formulas: AllFormulasResolver,
    }
  }, {
    path: 'new',
    component: NewComponent,
    resolve: {
      waitingProjects: WaitingProjectsResolver,
      techs: TechStackResolver,
      scores: ScoreResolver,
      allProjectNames: ProjectNameResolver,
      formulas: AllFormulasResolver,
    }
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    PorjectAdjustFormComponent,
    NewComponent,
    ScrollTrackerDirective,
    ConfigComponent,
    FormulaFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
