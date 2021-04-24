describe('Testing Insert, Update, Delete, List on Artists Details', () => {
    let artistId;
    before(() => {
        cy.adminLogin();
        cy.visit('/');
    });

    after(() => {
        cy.clearLocalStorageSnapshot();
        cy.clearLocalStorage();
    });

    it('Check if page has title and its on correct location', () => {
        cy.wait(5000);
        cy.get('[data-selector="artistDetails"]').click();
        cy.url().should('eq', `${Cypress.config("baseUrl")}artists`);

        cy.get('[data-selector="add-new-title"')
            .should('be.visible')
            .should('have.text', 'Add New Artist');
    });

    context('Create Flow', () => {
        // TODO: when get time to implement validations update few things and it should work
        // it('Checking validation', () => {
        //     cy.get('[data-selector=submitBtn]').click();
        //     cy.get('#type_code-helper-text').contains('Type code is required');
        //     cy.get('#type_code-helper-text').contains('Type code is required');
        //     cy.get('#type_name-helper-text').contains('Type name is required');
        //     cy.get('#type_description-helper-text').contains('Type description is required');
        // });

        it('Creating new item', () => {
            cy.get('[data-selector="name"]').clear().type("Test Artist Full Name");
            cy.get('[data-selector="email"]').clear().type("artist@test.com");
            cy.get('[data-selector="phone"]').clear().type(9876543210);
            cy.get('[data-selector="website"]').clear().type("www.test-artist.com");
            cy.get('[data-selector=submitBtn]').click();
            cy.wait(5000);
        });

        it('Verifying that we have same record we saved on table listing', () => {
            cy.get('[data-selector="artists-details-table-body"]')
                .find('tr')
                .first()
                .as('rows')
                .contains('td', 'artist@test.com');

            cy.get('@rows').contains('td', 'Test Artist Full Name');
            cy.get('@rows').contains('td', '9876543210');
            cy.get('@rows').contains('td', 'www.test-artist.com');

            cy.get('@rows').invoke('attr', 'data-id')
                .then(($artistId) => {
                    artistId = $artistId;
                    console.log('artistId ========>', artistId);
                });
        });
    });

    context('Update Flow', () => {
        it('Opens update modal', () => {
            cy.get('[data-selector="artists-details-table-body"]')
                .find('tr')
                .first()
                .as('rows')
                .contains('td', 'artist@test.com')
                .siblings()
                .find('[data-selector="editBtn"]')
                .click();
            cy.get('[data-selector="updateDialog"]').should('be.visible');
        });

        it('Checks inputs are prefill correctly', () => {
            cy.get('[name="updateName"]').should('have.value', 'Test Artist Full Name');
            cy.get('[name="updateEmail"]').should('have.value', 'artist@test.com');
            cy.get('[name="updatePhone"]').should('have.value', '9876543210');
            cy.get('[name="updateWebsite"]').should('have.value', 'www.test-artist.com');
        });

        it('updates and submit form', () => {
            cy.get('[name="updateName"]').clear().type('Test Artist Full Name Updated');
            cy.get('[name="updateEmail"]').clear().type('artist@updated.com');
            cy.get('[name="updatePhone"]').clear().type('1234567890');
            cy.get('[name="updateWebsite"]').clear().type('www.test-artist-updated.com');
            cy.get('[data-selector="updateSubmit"]').click();
            cy.wait(5000);
        });


        it('Verifying', () => {
            cy.get('[data-selector="artists-details-table-body"]')
                .find('tr')
                .first()
                .as('rows');
            cy.get('@rows').contains('td', 'Test Artist Full Name Updated');
            cy.get('@rows').contains('td', 'artist@updated.com');
            cy.get('@rows').contains('td', '1234567890');
            cy.get('@rows').contains('td', 'www.test-artist-updated.com');
        });
    });

    context('Delete Flow', () => {
        it('Finding delete button of specific record that we created and click delete', () => {
            cy.wait(5000);
            expect(artistId).to.not.be.undefined;
            cy.get(`[data-id="${artistId}"]`).then(($row) => {
                cy.get($row).contains('td', 'Test Artist Full Name Updated');
                cy.get($row).contains('td', '1234567890');
                cy.get($row).contains('td', 'www.test-artist-updated.com');
                cy.get($row).find('[data-selector="deleteBtn"]').click();
            });
        });

        it('Verifying that row is removed from the table', () => {
            cy.wait(5000);
            cy.get(`[data-id=${artistId}]`).should('not.exist');
            artistId = '';
        });
    });
});