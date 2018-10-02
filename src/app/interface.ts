export interface IProject {
  id: number | string;
  createdAt: number;
  waitingAt: number;
  completeAt: number;
  updatedAt: number;
  name: string;
  businessValue: string;
  visibility: string;
  size: number;
  technologyStack: string[];
  blacklist: string[] | null;
  deployment: string[] | null;
  type: string;
  platform: string[];
  scores: {
    priority: number;
    probability: number;
  };
  result: string;
}

export interface IScore {
  priority: number;
  probability: number;
}

export interface IFormular {
  id: number;
  name: string;
  updateDate: number | string;
  formula: IConfig[];
}
export interface IConfig {
  title: string;
  weight: number;
  options: IOption[];
}

export interface IOption {
  option: string;
  oWeight: number;
}

export class ProjectMaker {
  static create(p: IProject) {
    return {
      id: p.id,
      name: p.name,
      businessValue: p.businessValue,
      visibility: p.visibility,
      size: p.size,
      technologyStack: p.technologyStack,
      blacklist: p.blacklist,
      deployment: p.deployment,
      type: p.type,
      platform: p.platform,
      scores: {
        priority: p.scores.priority,
        probability: p.scores.probability,
      },
      result: p.result
    };
  }
}
