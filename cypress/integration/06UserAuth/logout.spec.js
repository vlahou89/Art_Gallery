describe('User Logout', () => {

    before(() => {
        cy.login();
    });

    after(() => {
        cy.clearLocalStorageSnapshot();
        cy.clearLocalStorage();
    });

    // it will automatically covers test of header for changes of login and logout button
    it('Visit Home page to check header has My Account and Logout', () => {
        cy.visit("/");
        cy.url().should('eq', `${Cypress.config("baseUrl")}`);
        cy.get('[data-selector="logoutBtn"]').should('be.visible');
        cy.get('[data-selector="myAccount"]').should('be.visible');
    });

    it('Clicking on logout option', () => {
        cy.wait(3000);
        cy.get('[data-selector=logoutBtn]').click();
    });
})