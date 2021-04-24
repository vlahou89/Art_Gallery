describe('Testing Insert, Update, Delete, List on Staff Details', () => {
    let employeeId;
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
        cy.get('[data-selector="staffDetails"]').click();
        cy.url().should('eq', `${Cypress.config("baseUrl")}staff`);

        cy.get('[data-selector="add-new-title"')
            .should('be.visible')
            .should('have.text', 'Add New Employee');
    });

    context('Create Flow', () => {
        // TODO: when I get time to implement validations I will implement its test cases
        // it('Checking validation', () => {
        //     cy.get('[data-selector=submitBtn]').click();
        //     cy.get('#type_code-helper-text').contains('Type code is required');
        //     cy.get('#type_code-helper-text').contains('Type code is required');
        //     cy.get('#type_name-helper-text').contains('Type name is required');
        //     cy.get('#type_description-helper-text').contains('Type description is required');
        // });

        it('Creating new item', () => {
            cy.get('[data-selector="name"]').clear().type("Test Full Name");
            cy.get('[data-selector="email"]').clear().type("test@test.com");
            cy.get('[data-selector="phone"]').clear().type(9876543210);
            cy.get('[data-selector="address"]').clear().type("This is test input, writing dummy address text.");
            cy.get('[data-selector=submitBtn]').click();
            cy.wait(5000);
        });

        it('Verifying that we have same record we saved on table listing', () => {
            cy.get('[data-selector="employee-details-table-body"]')
                .find('tr')
                .first()
                .as('rows')
                .contains('td', 'test@test.com');

            cy.get('@rows').contains('td', 'Test Full Name');
            cy.get('@rows').contains('td', '9876543210');
            cy.get('@rows').contains('td', 'This is test input, writing dummy address text.');

            cy.get('@rows').invoke('attr', 'data-id')
                .then(($employeeId) => {
                    employeeId = $employeeId;
                    console.log('employeeId ========>', employeeId);
                });
        });
    });

    context('Update Flow', () => {
        it('Opens update modal', () => {
            cy.get('[data-selector="employee-details-table-body"]')
                .find('tr')
                .first()
                .as('rows')
                .contains('td', 'test@test.com')
                .siblings()
                .find('[data-selector="editBtn"]')
                .click();
            cy.get('[data-selector="updateDialog"]').should('be.visible');
        });

        it('Checks inputs are prefill correctly', () => {
            cy.get('[name="updateName"]').should('have.value', 'Test Full Name');
            cy.get('[name="updateEmail"]').should('have.value', 'test@test.com');
            cy.get('[name="updatePhone"]').should('have.value', '9876543210');
            cy.get('[name="updateAddress"]').should('have.value', 'This is test input, writing dummy address text.');
        });

        it('updates and submit form', () => {
            cy.get('[name="updateName"]').clear().type('Test Full Name Updated');
            cy.get('[name="updateEmail"]').clear().type('test@updated.com');
            cy.get('[name="updatePhone"]').clear().type('1234567890');
            cy.get('[name="updateAddress"]').clear().type('This is test input, writing dummy address text. Updated.');
            cy.get('[data-selector="updateSubmit"]').click();
            cy.wait(5000);
        });


        it('Verifying', () => {
            cy.get('[data-selector="employee-details-table-body"]')
                .find('tr')
                .first()
                .as('rows');
            cy.get('@rows').contains('td', 'Test Full Name Updated');
            cy.get('@rows').contains('td', 'test@updated.com');
            cy.get('@rows').contains('td', '1234567890');
            cy.get('@rows').contains('td', 'This is test input, writing dummy address text. Updated.');
        });
    });

    context('Delete Flow', () => {
        it('Finding delete button of specific record that we created and click delete', () => {
            cy.wait(5000);
            expect(employeeId).to.not.be.undefined;
            cy.get(`[data-id="${employeeId}"]`).then(($row) => {
                cy.get($row).contains('td', 'Test Full Name Updated');
                cy.get($row).contains('td', 'test@updated.com');
                cy.get($row).contains('td', '1234567890');
                cy.get($row).contains('td', 'This is test input, writing dummy address text. Updated.');
                cy.get($row).find('[data-selector="deleteBtn"]').click();
            });
        });

        it('Verifying that row is removed from the table', () => {
            cy.wait(5000);
            cy.get(`[data-id=${employeeId}]`).should('not.exist');
            employeeId = '';
        });
    });
});