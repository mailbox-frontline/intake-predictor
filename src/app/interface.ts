export interface IProject {
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
    possibility: number;
  };
  result: string;
}
