describe('purchase order generator test', () => {
  it('visits the root', () => {
    cy.visit('/');
  });
  it('clicks the menu button purchase orders option', () => {
    cy.get('mat-icon').click();
    cy.contains('a', 'purchase orders').click();
  });
  it('selects vendor', () => {
    cy.get('mat-select[formcontrolname=vendorid]').click();
    cy.get('mat-option').contains('Gordon Reaman').click();
  });
  it('selects product', () => {
    cy.get('mat-select[formcontrolname=productid]').click();
    cy.get('mat-option').contains('Makita Drill').click();
  });
  it('selects eoq quantity', () => {
    cy.get('mat-select[formcontrolname=selectedQty]').click();
    cy.get('mat-option').contains('EOQ').click();
  });
  it('clicks the save button', () => {
    cy.get('button').contains('Save').click();
    cy.wait(500);
  });
  it('confirms add', () => {
    cy.contains('added!');
  });
});
