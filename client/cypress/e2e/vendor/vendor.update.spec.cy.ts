describe('vendor update test', () => {
  it('visits the root', () => {
    cy.visit('/');
  });
  it('clicks the menu button vendors option', () => {
    cy.get('mat-icon').click();
    cy.contains('a', 'vendors').click();
  });
  it('selects Gordon Reaman Fish and Chip', () => {
    cy.contains('Gordon Reaman Fish and Chips').click();
  });
  it('updates Gordon Reaman Fish and Chips email', () => {
    cy.get("[type='email']").clear();
    cy.get("[type='email']").type('chippy@domain.com');
  });
  it('submits the update', () => {
    cy.get('form').submit();
  });
  it('confirms update', () => {
    cy.contains('updated!');
  });
});
