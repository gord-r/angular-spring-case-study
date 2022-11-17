describe('product add test', () => {
  it('visits the root', () => {
    cy.visit('/');
  });
  it('clicks the menu button products option', () => {
    cy.get('mat-icon').click();
    cy.contains('a', 'products').click();
  });
  it('clicks add icon', () => {
    cy.contains('control_point').click();
  });
  it('fills in fields', () => {
    cy.get('input[formcontrolname=id]').type('testid123');
    cy.get('mat-select[formcontrolname=vendorid').click();
    cy.get('mat-option').contains('Gordon').click();
    cy.get('input[formcontrolname=name]').type('Test Product');
    cy.get('input[formcontrolname=msrp]').type('24.99');
    cy.get('input[formcontrolname=costprice]').type('19.99');

    cy.contains('Inventory').click();
    cy.get('input[formcontrolname=rop]').type('1');
    cy.get('input[formcontrolname=eoq]').type('2');
    cy.get('input[formcontrolname=qoh]').type('3');
    cy.get('input[formcontrolname=qoo]').type('4');
  });
  it('clicks the save button', () => {
    cy.get('button').contains('Save').click();
    cy.wait(500);
  });
  it('confirms add', () => {
    cy.contains('updated!');
  });
});
