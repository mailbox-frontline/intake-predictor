import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AllProjectsResolver, TechStackResolver } from './resolvers/projects.resolver';
import { HttpClientModule } from '@angular/common/http';

import {MaterialModule} from './material.module';

import { AppComponent } from './app.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import {PorjectAdjustFormComponent} from './compos/porject-adjust-form/porject-adjust-form.component';
import {NewComponent} from './pages/new/new.component';
import {ConfigComponent} from './pages/config/config.component';




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
      projects: AllProjectsResolver,
      techs: TechStackResolver,
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
    ConfigComponent
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
