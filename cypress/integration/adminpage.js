describe("renders the admin page", () => {
  it("renders correctly", () => {
    cy.visit("/admin");
  });
  it("renders correctly", () => {
    cy.visit("/admin/staff");
  });
  it("renders correctly", () => {
    cy.visit("/artists");
  });

  it("allows the modal to pop up", () => {
    cy.visit("/artists");
    /* ==== Generated with Cypress Studio ==== */
    cy.get(".formInput #name").type("USER USER");
    cy.get("#email").type("example@example.com");
    cy.get("#phone").type("0123456");
    cy.get("#website").type("1235 Street");
    cy.get(".btn").click();
    /* ==== End Cypress Studio ==== */
  });
});
