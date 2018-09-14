import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IFormular, IConfig } from '../../interface';

@Component({
  selector: 'app-formula-form',
  templateUrl: './formula-form.component.html',
  styleUrls: ['./formula-form.component.css']
})
export class FormulaFormComponent implements OnInit {


  @Input() formula: IFormular;
  @Output() configSaved: EventEmitter<IFormular> = new EventEmitter<IFormular>();
  constructor() { }

  ngOnInit() {
  }

  discardConfig() {
    console.log('discard this change...');
  }
  saveConfig() {
    console.log('saving this config...');
    this.configSaved.emit(this.formula);
  }

}
