// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {

  // POST/GET/PUT/DELETE - https://bsiexe3kuc.execute-api.us-east-1.amazonaws.com/dev/projects
  // GET/PUT/DELETE - https://bsiexe3kuc.execute-api.us-east-1.amazonaws.com/dev/projects/{id}

  production: false,
  PROJECTS_URL: 'https://bsiexe3kuc.execute-api.us-east-1.amazonaws.com/dev/projects',
  CURRENT_URL: 'https://bsiexe3kuc.execute-api.us-east-1.amazonaws.com/dev/currentProjects',
  WAITING_URL: 'https://bsiexe3kuc.execute-api.us-east-1.amazonaws.com/dev/waitingList',
  PRIORITY_URL: 'https://bsiexe3kuc.execute-api.us-east-1.amazonaws.com/dev/formulasPriority',
  PROBOBILITY_URL: 'https://bsiexe3kuc.execute-api.us-east-1.amazonaws.com/dev/formulasProbobility'

};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
