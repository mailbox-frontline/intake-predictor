import {Component, OnInit, Input} from '@angular/core';
import {IProject} from '../../interface';
import { CalculatorService } from '../../services/projects.service';

@Component({
  selector: 'app-porject-adjust-form',
  templateUrl: './porject-adjust-form.component.html',
  styleUrls: ['./porject-adjust-form.component.css']
})
export class PorjectAdjustFormComponent implements OnInit {

  @Input() project: IProject;
  @Input() techs: string[];
  thistech: string[] = [];
  selected: boolean[] = [];

  types: string[] = ['POC', 'Tool', 'Prototype'];
  businessValues: string[] = ['Low', 'Medium', 'High'];
  visibility: string[] = ['Low', 'Medium', 'High'];
  deployment: string[] = ['AWS', 'Azure', 'Heroku', 'Other'];
  platform = [
    {
      value: 'web',
      viewValue: 'Web'
    }, {
      value: 'ios',
      viewValue: 'iOS'
    }, {
      value: 'rpi',
      viewValue: 'Raspberry Pi'
    }, {
      value: 'jira',
      viewValue: 'Jira'
    }, {
      value: 'arduino',
      viewValue: 'Arduino'
    }, {
      value: 'devop',
      viewValue: 'Dev-Op'
    }, {
      value: 'beacon',
      viewValue: 'Beacon'
    }
  ];
  size = [
    {
      value: 3,
      viewValue: 'less than 1 Week'
    }, {
      value: 5,
      viewValue: '2-3 Weeks'
    }, {
      value: 8,
      viewValue: '4-5 Weeks'
    }, {
      value: 13,
      viewValue: '6-8 Weeks'
    }
  ];

  constructor(private cs: CalculatorService) {}

  ngOnInit() {
    ({technologyStack: this.thistech} = this.project);
    this.selected = Array(this.techs.length).fill(false);

    this
      .thistech
      .forEach(t => {
        const i = this
          .techs
          .indexOf(t.toLowerCase());
        if (i !== -1) {
          this.selected[i] = true;
        }
      });
  }

  click(e, i) {

    const selectedChip = e.path[0].textContent;
    if (this.selected[i] === false) {
      this.thistech.push(selectedChip);
    } else {
      this.thistech = this.thistech.filter(item => item !== selectedChip);
    }
    this.selected[i] = !this.selected[i];
  }

  save() {
    this.project.technologyStack = this.thistech;
    const priority = this.cs.priorityCalculator(this.project);
    const possibility = this.cs.possibilityCalculator(this.project);

    this.cs.getPlatformWeights().subscribe(res => {
      let r = 0;
      this.project.platform.forEach(p => r += res[p]);
      const sumValues = Object.values(res).reduce((x, y) => (x as number) + (y as number));
      const z = +((r as number) / (sumValues as number) / 1.5).toFixed(2);

      this.project.scores.priority = +priority.toFixed(2);
      this.project.scores.possibility = possibility + z;

      console.log(`possibolity ${+possibility + z}  = ${+possibility} + ${z}`);
    });
  }

}
