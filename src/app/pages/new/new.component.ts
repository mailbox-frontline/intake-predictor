import {Component, OnInit, HostListener} from '@angular/core';
import {Chart} from 'chart.js';
import { ActivatedRoute } from '@angular/router';
import { IProject, IScore, IFormular } from '../../interface';
import { UUID } from 'angular2-uuid';
import { ProjectsService, CalculatorService } from '../../services/projects.service';
import { MatSnackBar } from '@angular/material';

@Component({selector: 'app-new', templateUrl: './new.component.html', styleUrls: ['./new.component.css']})
export class NewComponent implements OnInit {


  newProject: IProject;
  editingIndexInQas: number;
  editingPreAnswer = false;
  hasError = false;
  allDone = false;
  inputPlaceholder = 'Project Name';
  questionsSet = [];
  newProjectAnswers = [];
  answerInput;
  qas = [];
  currentQuestion;
  editingQuestion;
  editingAnswers;
  currentAnswer;
  currentAnswerSaved = false;
  selectedP: boolean[] = [];
  selectedt: boolean[] = [];
  newProjectPlatform: string[] = [];
  newProjectTechs: string[] = [];

  s = []; q = [];
  newProjectScore = [];
  showConversation = false;
  isFloat = false;
  hasNewProject = false;
  chart: Chart;
  names: string[];
  labels: string[];
  waitingProjects: IProject[];
  techs: string[] = [];
  waitingListNames: string[] = [];
  score: IScore[];
  formulas: IFormular[];
  option1: {} = {};
  option2: {} = {};
  option3: {} = {};

  constructor(private actr: ActivatedRoute,
              private ps: ProjectsService,
              public snackBar: MatSnackBar,
              private cs: CalculatorService) {}

  ngOnInit() {
    this.formulas = this.actr.snapshot.data.formulas || [];
    this.waitingProjects = this.actr.snapshot.data.watinglist || [];
    this.names = this.actr.snapshot.data.allProjectNames || [];
    this.techs = this.actr.snapshot.data.techs || [];
    this.score = this.actr.snapshot.data.scores || [];
    this.selectedP = Array(7).fill(false);
    this.selectedt = Array(this.techs.length).fill(false);


    if (this.waitingProjects) {
      this.waitingListNames = this.waitingProjects.map(wp => wp.name);
      this.q = this.getChartDataFromProject(this.waitingProjects);
    }

    this.s = this.getChartDataFromScores(this.score);

    this.chart = new Chart('canvas', {
      type: 'scatter',
      data: {
        labels: [['new'], this.names, this.waitingListNames],
        datasets: [
          {
            label: 'New Project',
            pointRadius: 5,
            backgroundColor: '#FA1B66',
            data: this.newProjectScore,
            pointBackgroundColor: '#FA1B66',
            borderColor: 'rgba(0, 0, 0, 0)',
            pointHoverBorderColor: 'rgba(250, 27, 102, 0.4)',
            pointHoverBorderWidth: 10,
          }, {
            label: 'Previous Projects',
            data: this.s,
            pointBackgroundColor: '#FABE66',
            backgroundColor: '#FABE66',
            borderColor: 'rgba(0, 0, 0, 0)',
            pointHoverBorderColor: 'rgba(250, 190, 102, 0.4)',
            pointHoverBorderWidth: 10,
          }, {
            label: 'Waiting Projects',
            data: this.q,
            pointBackgroundColor: '#835CE7',
            backgroundColor: '#835CE7',
            borderColor: 'rgba(0, 0, 0, 0)',
            pointHoverBorderColor: 'rgba(131, 92, 231, 0.4)',
            pointHoverBorderWidth: 10,
          }
        ]
      },
      options: {
        responsive: true,
        legend: {
          display: true,
          position: 'bottom',
        },
        scales: {
          xAxes: [
            {
              type: 'linear',
              position: 'bottom',
              gridLines: {
                display: false
              },
              scaleLabel: {
                display: true,
                labelString: 'probability'
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                display: false
              },
              scaleLabel: {
                display: true,
                labelString: 'Priority'
              }
            }
          ]
        },
        tooltips: {
          mode: 'nearest',
          callbacks: {
            label: function(tooltipItem, data) {
              const label = data.labels[tooltipItem.datasetIndex][tooltipItem.index];
              return label + ' [ Prob: ' + tooltipItem.xLabel + ', Prio: ' + tooltipItem.yLabel + ' ]';
           }
          }
        }
      }
    });

    this.updateOptions();

  }

  getChartDataFromProject(projects: IProject[]) {
    const all = [];
    projects.forEach(p => {
      const a = {};
      a['y'] = (p.scores.priority + 0.1).toFixed(2);
      a['x'] = (p.scores.probability - 0.1).toFixed(2);
      all.push(a);
    });

    return all;
  }

  updateOptions() {
    this.option1['name'] = this.formulas[0].formula[0].title;
    this.option1['options'] = this.formulas[0].formula[0].options.map(o => o.option);
    this.option2['name'] = this.formulas[0].formula[1].title;
    this.option2['options'] = this.formulas[0].formula[1].options.map(o => o.option);
    this.option3['name'] = this.formulas[1].formula[0].title;
    this.option3['options'] = this.formulas[1].formula[0].options.map(o => o.option);
  }

  getChartDataFromScores(projects: IScore[]) {
    const all = [];
    projects.forEach(p => {
      const a = {};
      a['y'] = p.priority;
      a['x'] = p.probability;
      all.push(a);
    });

    return all;
  }

  onValChange(value) {

    this.waitingProjects.sort((a, b) => {
      if (a.scores[value] > b.scores[value]) { return -1; }
      if (a.scores[value] < b.scores[value]) { return 1; }
      if (a.name > b.name) { return 1; }
      if (a.name < b.name) { return -1; }
    });
  }

  onMouseEnter(index: number) {

    if (this.chart.tooltip._active === undefined) {
      this.chart.tooltip._active = [];
    }
    const activeElements = this.chart.tooltip._active;
    const requestedElem = this.chart.getDatasetMeta(2).data[index];


    for (let i = 0; i < activeElements.length; i++) {
      if (requestedElem._index === activeElements[i]._index) {
         return;
      }
    }

    activeElements.push(requestedElem);
    this.chart.tooltip._active = activeElements;
    this.chart.tooltip.update(true);
    this.chart.draw();
  }

  onMouseLeave(index: number) {
    const activeElements = this.chart.tooltip._active;
   if (activeElements === undefined || activeElements.length === 0) {
     return;
   }
   const requestedElem = this.chart.getDatasetMeta(2).data[index];
   for (let i = 0; i < activeElements.length; i++) {
       if (requestedElem._index === activeElements[i]._index)  {
          activeElements.splice(i, 1);
          break;
       }
   }
   this.chart.tooltip._active = activeElements;
   this.chart.tooltip.update(true);
   this.chart.draw();
  }

  updateTheChart() {
    this.chart.update();
  }

  startNewProject() {

    this.questionsSet = [
      {
        'question': `what's new project name?`,
        'optionType': 'input',
      },
      {
        'question': `What's the time freame give to this project?`,
        'optionType': 'radio',
        'options': ['less than 1 week', '2-3 weeks', '4-5 weeks', '6-8 weeks'],
      },
      {
        'question': `What's the platform?`,
        'optionType': 'platform',
        'options': ['Web', 'iOS', 'Respberry Pi', 'Jira', 'Arduino', 'Dev-Op', 'Beacon'],
      },
      {
        'question': `What's the type of this project?`,
        'optionType': 'radio',
        'options': ['POC', 'Tool', 'Prototype'],
      },
      {
        'question': `What's the Business Value?`,
        'optionType': 'radio',
        'options': ['Low', 'Medium', 'High'],
      },
      {
        'question': `What's the Visibility?`,
        'optionType': 'radio',
        'options': ['Low', 'Medium', 'High'],
      },
      {
        'question': `What are techs involed in this project?`,
        'optionType': 'techs',
        'options': this.techs,
      },
    ];

    this.showConversation = true;
    this.currentQuestion = this.questionsSet.shift();
  }

  evaluateNewProject(project: IProject) {

    if (project !== undefined) {
      this.hasNewProject = true;

      const priority = this.cs.priorityCalculator(project);
      const probability = this.cs.probabilityCalculator(project);

      console.log('probability ' + probability);


      this.cs.getPlatformWeights().subscribe(res => {
        let r = 0;
        project.platform.forEach(p => r += res[p]);

        console.log('r: ' + r);
        console.log(res);
        const sumValues = Object.values(res).reduce((a, b) => (a as number) + (b as number));
        console.log('sumvalue: ' + sumValues);
        const z = +((r as number) / (sumValues as number) / 1.5).toFixed(2);

        console.log('z: ' + z);

        project.scores.priority = +priority.toFixed(2);
        project.scores.probability = probability + z;

        const {priority: x, probability: y} = project.scores;
        this.newProjectScore.push({x, y});

        console.log(this.newProject);
        this.chart.update();
      });
    }
  }

  removeNewFromChart() {
    this.hasNewProject = false;
    this.newProjectScore.pop();
    this.chart.update();
  }

  addNewToWaitingList() {
    if (this.newProject === undefined) {
      return;
    }

    this.waitingListNames.unshift(this.newProject.name);
    const {priority: x , probability: y} = this.newProject.scores;
    this.q.unshift({x: x.toFixed(2), y: y.toFixed(2)});

    // waitinglist API
    this.ps.addNewToWaitinglist(this.newProject).subscribe(
      (res) => this.waitingProjects.unshift(res)
    );

    this.removeNewFromChart();
    this.refrechNewproject();

  }

  removeProjectFromWaiting(event) {

    this.ps.deleteFromWaitinglistById(event).subscribe(
      () => this.waitingProjects = this.waitingProjects.filter(wp => wp.id !== event.id)
    );

    console.log(this.waitingProjects);

    this.waitingListNames.shift();
    this.q.shift();
    this.chart.update();
  }

  add2CurrentList(event) {
    event.startDate = Date.now();
    this.ps.addProjectToCurrent(event).subscribe(
      (res => this.removeProjectFromWaiting(res))
    );

    this.openSnackBar('Successfully start this project, please go to [All Projects] page to check', 'OK');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  saveEdit() {
    if (this.editingAnswers === undefined || this.editingAnswers === '' || this.editingAnswers === []) {
      this.hasError = true;
      return;
    }

    this.hasError = false;
    this.qas[this.editingIndexInQas].a = this.editingAnswers;
    this.newProjectAnswers[this.editingIndexInQas] = this.editingAnswers;
    this.editingAnswers = '';
    this.editingPreAnswer = false;

    console.log(this.newProjectAnswers);
  }

  saveAnswer() {

    console.log(this.currentAnswer);
    if (this.currentAnswer === undefined || this.currentAnswer === '' || this.currentAnswer === []) {
      this.hasError = true;
      return;
    }

    this.hasError = false;

    this.currentQuestion['a'] = this.currentAnswer;
    this.qas.push(this.currentQuestion);
    this.newProjectAnswers.push(this.currentAnswer);
    this.currentAnswerSaved = !this.currentAnswerSaved;

    this.currentAnswer = '';
    this.currentQuestion = this.questionsSet.shift();
    this.currentAnswerSaved = !this.currentAnswerSaved;


    console.log(this.newProjectAnswers);

  }

  addNewProject() {

    const size = this.sizeMacine(this.newProjectAnswers[1]);

    this.newProject = {
      'id': UUID.UUID(),
      'startDate': null,
      'completeDate': null,
      'name': this.newProjectAnswers[0],
      'businessValue': this.newProjectAnswers[4],
      'visibility': this.newProjectAnswers[5],
      'size': size,
      'technologyStack': this.newProjectTechs,
      'blacklist': null,
      'deployment': null,
      'type': this.newProjectAnswers[3],
      'platform': this.newProjectPlatform,
      'scores': {
        'priority': null,
        'probability': null,
      },
      'result': null
    };

    this.evaluateNewProject(this.newProject);
    this.chart.update();
  }

  sizeMacine(size: string) {
    switch (size) {
      case 'less than 1 week':
        return 3;
        case '2-3 weeks':
        return 5;
        case '4-5 weeks':
        return 8;
        case '6-8 weeks':
        return 13;
    }
  }

  selectPlatform(e, i) {
    const selectedChip = e.path[0].textContent;
    if (this.selectedP[i] === false) {
      this.newProjectPlatform.push(selectedChip);
    } else {
      this.newProjectPlatform = this.newProjectPlatform.filter(item => item !== selectedChip);
    }
    this.selectedP[i] = !this.selectedP[i];
    this.currentAnswer = this.newProjectPlatform;
  }

  editPlatform(e, i) {
    const selectedChip = e.path[0].textContent;
    if (this.selectedP[i] === false) {
      this.newProjectPlatform.push(selectedChip);
    } else {
      this.newProjectPlatform = this.newProjectPlatform.filter(item => item !== selectedChip);
    }
    this.selectedP[i] = !this.selectedP[i];
    this.editingAnswers = this.newProjectPlatform;
  }

  selectTechs(e, i) {
    const selectedChip = e.path[0].textContent;
    if (this.selectedt[i] === false) {
      this.newProjectTechs.push(selectedChip);
    } else {
      this.newProjectTechs = this.newProjectTechs.filter(item => item !== selectedChip);
    }
    this.selectedt[i] = !this.selectedt[i];
    this.currentAnswer = this.newProjectTechs;
  }

  editTechs(e, i) {
    const selectedChip = e.path[0].textContent;
    if (this.selectedt[i] === false) {
      this.newProjectTechs.push(selectedChip);
    } else {
      this.newProjectTechs = this.newProjectTechs.filter(item => item !== selectedChip);
    }
    this.selectedt[i] = !this.selectedt[i];
    this.editingAnswers = this.newProjectTechs;
  }

  refrechNewproject() {
    this.showConversation = false;
    this.currentQuestion = null;
    this.qas = [];
    this.newProject = {
      'id': UUID.UUID(),
      'startDate': null,
      'completeDate': null,
      'name': null,
      'businessValue': null,
      'visibility': null,
      'size': null,
      'technologyStack': null,
      'blacklist': null,
      'deployment': null,
      'type': null,
      'platform': null,
      'scores': {
        'priority': null,
        'probability': null,
      },
      'result': null
    };


  }

  onAnswerClicked(i: number) {
    this.editingPreAnswer = true;
    this.editingIndexInQas = i;
    this.editingQuestion = this.qas[i];
    console.log(this.qas[i]);
  }
}
