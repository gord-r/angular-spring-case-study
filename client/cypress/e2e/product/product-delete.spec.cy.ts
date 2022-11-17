describe('product delete test', () => {
  it('visits the root', () => {
    cy.visit('/');
  });
  it('clicks the menu button products option', () => {
    cy.get('mat-icon').click();
    cy.contains('a', 'products').click();
  });
  it('selects the Test Product option', () => {
    cy.contains('Test Product').click();
  });
  it('clicks the delete button', () => {
    cy.get('button').contains('Delete').click();
  });
  it("clicks the confirmation dialog's Yes button", () => {
    cy.get('button').contains('Yes').click();
  });
  it('confirms delete', () => {
    cy.contains('deleted!');
  });
});
