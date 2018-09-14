import { Component, OnInit, Input } from '@angular/core';
import { IConfig, IFormular } from '../../interface';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  @Input() formulas: IFormular[];

  constructor() { }

  ngOnInit() {
  }

  onConfigSaved(event) {

    if (event.name === this.formulas[0].name) {
      this.formulas[0] = event;
      console.log(this.formulas[0]);
    } else {
      this.formulas[1] = event;
      console.log(this.formulas[1]);
    }
  }

}
