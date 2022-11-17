describe('vendor update test', () => {
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
  it('updates name', () => {
    cy.get('input[formcontrolname=name]').type(' Update');
  });
  it('clicks the save button', () => {
    cy.get('button').contains('Save').click();
  });
  it('confirms update', () => {
    cy.contains('updated!');
  });
});
