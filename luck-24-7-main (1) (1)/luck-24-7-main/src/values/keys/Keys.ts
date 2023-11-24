const Keys = {
  // projectKey: 'RS_P_1697124928177967131',
  // apiKey: 'RS5:4ad054e2db02c36e22dc6d8c22435158',RS_P_1697124928177967131 RS5:4ad054e2db02c36e22dc6d8c22435158
  projectKey: 'RS_P_1697124928177967131',
  apiKey: 'RS5:4ad054e2db02c36e22dc6d8c22435158',
  stripePublisherKey:
    'pk_live_51N68IcSEw5N4WIbeJRGTOPRIrfmlgLbJH6RGzj83fszUCPAA5k8M2uZjb2f2qGAotcJpgsgo9AXCFUTbWGhF3HhV00uNRUL2br',

  stripkey_sceret:
    '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',
};

export default Keys;

import axios from 'axios';

// set API endpoint URLs and parameters
export const apiUrl = `https://api.sports.roanuz.com/v5/cricket/${Keys.projectKey}`;

// configure Axios instance
const apiClient = (token: string) =>
  axios.create({
    baseURL: apiUrl,
    headers: {
      'rs-token': token,
    },
  });

// fetch all associations
// apiClient
//   .get(`/association/list`)
//   .then(response => {
//     // handle successful response
//     const associations = response.data.data;
//     console.log(`Fetched ${associations.length} associations`);

//     // fetch all tournaments for each association
//     associations.forEach(association => {
//       apiClient
//         .get(`/association/${association.key}/featured-tournaments`)
//         .then(response => {
//           // handle successful response
//           const tournaments = response.data.data;
//           console.log(
//             `Fetched ${tournaments.length} tournaments for association ${association.name}`,
//           );

//           // fetch all matches for each tournament
//           tournaments.forEach(tournament => {
//             apiClient
//               .get(`/tournament/${tournament.key}/fixtures`)
//               .then(response => {
//                 // handle successful response
//                 const matches = response.data.data;
//                 console.log(
//                   `Fetched ${matches.length} matches for tournament ${tournament.name}`,
//                 );
//               })
//               .catch(error => {
//                 // handle error response
//                 console.error(
//                   `Error fetching matches for tournament ${tournament.name}: ${error}`,
//                 );
//               });
//           });
//         })
//         .catch(error => {
//           // handle error response
//           console.error(
//             `Error fetching tournaments for association ${association.name}: ${error}`,
//           );
//         });
//     });
//   })
//   .catch(error => {
//     // handle error response
//     console.error(`Error fetching associations: ${error}`);
//   });
