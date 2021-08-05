// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  siteKey: '6LdY0aUaAAAAALWcVqaGtq8tulCykFFDhZ_4HG7X',
  secretKey: '6LdY0aUaAAAAAMR8Sx0_ARaG2la-uD4blkfGQ4wF',
  questions: {
    questionArray: [
      {
        id: 1,
        type: 'radio',
        question: 'Which services you are inerested in?',
        answers: [
          { id: 1, text: 'Web applications (backend and frontend)' },
          { id: 2, text: 'Microservices' },
          { id: 3, text: 'Kubernetes clusters and Docker clusters' },
        ],
      },
      {
        id: 2,
        type: 'check',
        question: 'Which Hosting Plans would you like to subscribe to?',
        answers: [
          { id: 1, text: 'Basic Plan (For basic web applications)' },
          { id: 2, text: 'Professional Plan (For high-traffic web applications)' },
          { id: 3, text: 'Enterprise Plan (For critical web applications)' },
          { id: 4, text: 'Customized (For custom web applications)' },
        ],
      },
      {
        id: 3,
        type: 'radio',
        question: 'Question 3',
        answers: [
          { id: 1, text: 'answer 1' },
          { id: 2, text: 'answer 2' },
          { id: 3, text: 'answer 3' },
        ],
      },
      {
        id: 4,
        type: 'check',
        question: 'Question 4',
        answers: [
          { id: 1, text: 'answer 41' },
          { id: 2, text: 'answer 42' },
          { id: 3, text: 'answer 43' },
        ],
      },
      // {
      //   id: 5,
      //   type: 'text',
      //   question: 'Question 5',
      // },
      // {
      //   id: 6,
      //   type: 'text',
      //   question: 'Question 6',
      // },
      // {
      //   id: 7,
      //   type: 'text',
      //   question: 'Question 7',
      // },
    ],
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
