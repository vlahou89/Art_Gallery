describe('User Login', () => {

    before(() => {
        cy.clearLocalStorageSnapshot();
        cy.clearLocalStorage();
    });
    after(() => {
        cy.clearLocalStorageSnapshot();
        cy.clearLocalStorage();
    });

    it('Visit Login page', () => {
        cy.visit("/login")
    });

    it('Login', () => {
        cy.get('[type=email]').type("user@user.com");
        cy.get('[type=password]').type("useruser");
        cy.get('[type=submit]').click();
    });

    it('Checking redirect to home and header is showing logout button', () => {
        cy.wait(5000);
        cy.url().should('eq',`${Cypress.config("baseUrl")}`);
        cy.get('[data-selector="logoutBtn"]').should('be.visible');
    });
})