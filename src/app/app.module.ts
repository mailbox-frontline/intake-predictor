import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
// tslint:disable-next-line:max-line-length
import { AllProjectsResolver, TechStackResolver, ScoreResolver, ProjectNameResolver, WaitingProjectsResolver } from './resolvers/projects.resolver';
import { HttpClientModule } from '@angular/common/http';

import {MaterialModule} from './material.module';

import { AppComponent } from './app.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import {PorjectAdjustFormComponent} from './compos/porject-adjust-form/porject-adjust-form.component';
import {NewComponent} from './pages/new/new.component';
import {ConfigComponent} from './pages/config/config.component';
import { ScrollTrackerDirective } from './directives/scroll-tracker.directive';




const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/projects',
    pathMatch: 'full',
  }, {
    path: 'projects',
    component: ProjectsComponent,
    resolve: {
      projects: AllProjectsResolver,
      techs: TechStackResolver,
    }
  }, {
    path: 'new',
    component: NewComponent,
    resolve: {
      waitingProjects: WaitingProjectsResolver,
      techs: TechStackResolver,
      scores: ScoreResolver,
      allProjectNames: ProjectNameResolver,
    }
  }, {
    path: 'config',
    component: ConfigComponent,
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    PorjectAdjustFormComponent,
    NewComponent,
    ConfigComponent,
    ScrollTrackerDirective
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
