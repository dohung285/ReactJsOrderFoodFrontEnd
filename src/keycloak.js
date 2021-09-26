import Keycloak from 'keycloak-js';

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
// const keycloak = Keycloak({
//   url: 'http://10.30.1.40:8080/auth',
//   realm: 'cybertaxv2',
//   clientId: 'taxfrontend',
// });

// export default keycloak;

// const keycloakConfig = {
//   url: 'http://10.30.1.40:8080/auth',
//   realm: 'cybertaxv2',
//   clientId: 'taxfrontend'
// }

const keycloakConfig = {
  url: 'http://localhost:8080/auth',
  realm: 'orderfood',
  clientId: 'orderfoodfrontend',
  // clientSecret: 'c4327533-29c5-4faf-a596-36584cc3691b'
  onLoad: 'login-required',

}


const keycloak = new Keycloak(keycloakConfig);

export default keycloak
