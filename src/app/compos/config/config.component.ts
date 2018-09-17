import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IFormular } from '../../interface';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  @Input() formulas: IFormular[];
  @Output() newFormulas: EventEmitter<IFormular[]> = new EventEmitter<IFormular[]>();

  constructor(private ps: ProjectsService) { }

  ngOnInit() {
  }

  onConfigSaved(event) {

    if (event.name === this.formulas[0].name) {

      this.ps.updateFomularById(this.formulas[0]).subscribe(
        (res) => this.formulas[0] = res
      );
      console.log('called update by ID...');

    } else {
      this.ps.updateFomularById(this.formulas[1]).subscribe(
        (res) => this.formulas[1] = res
      );
      console.log('called update by ID...');
    }

    // call save config API
    this.newFormulas.emit(this.formulas);
  }

}
