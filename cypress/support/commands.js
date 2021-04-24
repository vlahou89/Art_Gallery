import { auth, handleUserProfile, getCurrentUser, GoogleProvider } from '../../src/firebase/utils';
import "cypress-localstorage-commands";
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", () => {
    const credentials = {
        email: 'user@user.com',
        password: 'useruser',
    }
    cy
        .then(() => auth.setPersistence('local'))
        .then(() => auth.signInWithEmailAndPassword(credentials.email, credentials.password)).then((user) => {
            console.log(user)
            // const idToken = user.signInUserSession.idToken.jwtToken;
            // const accessToken = user.signInUserSession.accessToken.jwtToken;
            // cy.setLocalStorage(makeKey("accessToken"), accessToken);
            // cy.setLocalStorage(makeKey("idToken"), idToken);
            //   cy.setLocalStorage(
            //     `CognitoIdentityServiceProvider.${cognitoUser.pool.clientId}.LastAuthUser`,
            //     cognitoUser.username
            //   );
        });
    cy.saveLocalStorage();
});

Cypress.Commands.add("adminLogin", () => {
    cy.clearLocalStorageSnapshot();
    cy.clearLocalStorage();
    const credentials = {
        email: 'admin@admin.com',
        password: 'adminuser',
    }
    cy.then(() => auth.setPersistence('local'))
        .then(() => auth.signInWithEmailAndPassword(credentials.email, credentials.password)).then((user) => {
            console.log(user)
            // const idToken = user.signInUserSession.idToken.jwtToken;
            // const accessToken = user.signInUserSession.accessToken.jwtToken;
            // cy.setLocalStorage(makeKey("accessToken"), accessToken);
            // cy.setLocalStorage(makeKey("idToken"), idToken);
            //   cy.setLocalStorage(
            //     `CognitoIdentityServiceProvider.${cognitoUser.pool.clientId}.LastAuthUser`,
            //     cognitoUser.username
            //   );
        });
    cy.saveLocalStorage();
});
