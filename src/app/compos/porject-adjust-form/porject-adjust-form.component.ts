import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {IProject, IFormular} from '../../interface';
import { CalculatorService, ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-porject-adjust-form',
  templateUrl: './porject-adjust-form.component.html',
  styleUrls: ['./porject-adjust-form.component.css']
})
export class PorjectAdjustFormComponent implements OnInit {

  @Input() project: IProject;
  @Input() techs: string[];
  @Input() option1;
  @Input() option2;
  @Input() option3;
  @Output() saveBtnClicked = new EventEmitter();
  @Output() remove = new EventEmitter();
  @Output() add2Current = new EventEmitter();
  @Output() add2ProjectList = new EventEmitter();
  thistech: string[] = [];
  selected: boolean[] = [];

  deployment: string[] = ['AWS', 'Azure', 'Heroku', 'Other'];
  platform = [
    {
      value: 'Web',
      viewValue: 'Web'
    }, {
      value: 'iOS',
      viewValue: 'iOS'
    }, {
      value: 'Raspberry Pi',
      viewValue: 'Raspberry Pi'
    }, {
      value: 'Jira',
      viewValue: 'Jira'
    }, {
      value: 'Arduino',
      viewValue: 'Arduino'
    }, {
      value: 'Dev-Op',
      viewValue: 'Dev-Op'
    }, {
      value: 'Beacon',
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

  constructor(private cs: CalculatorService, private ps: ProjectsService) {}

  ngOnInit() {
    ({technologyStack: this.thistech} = this.project);
    this.selected = Array(this.techs.length).fill(false);

    this
      .thistech
      .forEach(t => {
        const i = this
          .techs
          .indexOf(t);
        if (i !== -1) {
          this.selected[i] = true;
        }
      });
  }

  onClickChip(e, i) {
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
    const probability = this.cs.probabilityCalculator(this.project);

    this.cs.getPlatformWeights().subscribe(res => {
      let r = 0;
      this.project.platform.forEach(p => r += res[p]);
      const sumValues = Object.values(res).reduce((x, y) => (x as number) + (y as number));
      const z = +((r as number) / (sumValues as number) / 1.5).toFixed(2);

      this.project.scores.priority = +priority.toFixed(2);
      this.project.scores.probability = probability + z;

      this.ps.updateProjectbyId(this.project).subscribe(
        (response) => console.log(response)
      );

      this.saveBtnClicked.emit('saved');

    });
  }

  removeFromWaitingList(e) {
    e.stopPropagation();
    this.remove.emit(this.project);
  }

  addToCurrentList(e) {
    e.stopPropagation();
    this.add2Current.emit(this.project);
  }

  move2ProjectList(e) {
    e.stopPropagation();
    this.add2ProjectList.emit(this.project);
  }

}
