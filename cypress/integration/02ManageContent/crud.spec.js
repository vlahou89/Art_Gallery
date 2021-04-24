describe('Testing Insert, Update, Delete, List on Manage Content', () => {
    let documentID;
    before(() => {
        cy.visit('/');
        cy.adminLogin();
    });

    after(() => {
        cy.clearLocalStorageSnapshot();
        cy.clearLocalStorage();
    });

    it('Check if page has title and its on correct location', () => {
        cy.wait(5000);
        cy.get('[data-selector="manageContent"]').click();
        cy.url().should('eq', `${Cypress.config("baseUrl")}admin`);

        cy.get('[data-selector="manage-content-title"')
            .should('be.visible')
            .should('have.text', 'Manage Content');
    });

    context('Create Flow', () => {
        it('Opening creation form', () => {
            cy.get('[data-selector="addItem"]').click();
            cy.get('[data-selector="addNewProductForm"]').should('be.visible');
        });

        // TODO: when I get time to implement validations I will implement its test cases
        // it('Checking validation', () => {
        //     cy.get('[data-selector=submitBtn]').click();
        //     cy.get('#type_code-helper-text').contains('Type code is required');
        //     cy.get('#type_code-helper-text').contains('Type code is required');
        //     cy.get('#type_name-helper-text').contains('Type name is required');
        //     cy.get('#type_description-helper-text').contains('Type description is required');
        // });

        it('Creating new item', () => {
            cy.get('[data-selector="categoryDropdown"]').select("paintings", { force: true });
            cy.get('[data-selector="nameInput"]').clear().type("Test Painting Item Name");
            cy.get('[data-selector="priceInput"]').clear().type(555);
            cy.get('[data-selector="imtUrlInput"]').clear().type("http://via.placeholder.com/100x100");
            cy.get('[data-selector=submitBtn]').click();
            cy.wait(5000);
        });

        it('Verifying that we have same record we saved on table listing', () => {
            cy.get('[data-selector="manage-content-table-body"]')
                .find('tr')
                .first()
                .as('rows')
                .contains('td', 'Test Painting Item Name');

            cy.get('@rows').contains('td', '£555');
            cy.get('[data-selector="row-0"]')
                .find('img[data-selector="img"]')
                .should('have.attr', 'src', 'http://via.placeholder.com/100x100');

            cy.get('@rows').invoke('attr', 'data-id')
                .then(($documentID) => {
                    documentID = $documentID;
                    console.log('documentID ========>', documentID);
                });
        });
    });

    context('Delete Flow', () => {
        it('Finding delete button of specific record that we created and click delete', () => {
            cy.wait(5000);
            if (!documentID) {
                console.log('documentID ========>', documentID)
                return;
            }
            cy.get(`[data-id="${documentID}"]`).then(($row) => {
                cy.get($row).contains('td', 'Test Painting Item Name');
                cy.get($row).contains('td', '£555');
                cy.get($row).find('[data-selector="deleteBtn"]').click();
                // command yielded us
            });
        });

        it('Verifying that row is removed from the table', () => {
            cy.wait(5000);
            cy.get(`[data-id=${documentID}]`).should('not.exist');
            documentID = '';
        });
    });
});