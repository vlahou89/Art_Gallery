describe('Admin Toolbar is visible to user with 3 urls', () => {

    before(() => {
        cy.visit('/');
        cy.adminLogin();
    });

    after(() => {
        cy.clearLocalStorageSnapshot();
        cy.clearLocalStorage();
    });

    it('Check if Admin toolbar is visible with all proper href links and text', () => {
        cy.wait(5000);
        cy.get('[data-selector="adminToolbar"]').should('be.visible');

        cy.get('[data-selector="manageContent"]')
            .should('be.visible')
            .contains("Manage Content")
            .should('have.attr', 'href', '/admin');

        cy.get('[data-selector="staffDetails"]')
            .should('be.visible')
            .contains("Staff Details")
            .should('have.attr', 'href', '/staff');

        cy.get('[data-selector="artistDetails"]')
            .should('be.visible')
            .contains("Artist Details")
            .should('have.attr', 'href', '/artists');

    });
})