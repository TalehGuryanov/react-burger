
describe("Constructor page", () => {
  before(function() {
    cy.visit('http://localhost:3000');
  });
  
  it('should drop ingredient to constructor dropzone', () => {
    cy.get('[data-test="ingredient-item"]')
        .contains('Соус Spicy-X')
        .as('ingredient');
    
    cy.get('@ingredient')
        .trigger('dragstart')
        .trigger('dragstart')
    
    cy.get('[data-test="constructor-dropzone"]')
      .as('constructor-dropzone')
    
    cy.get('@constructor-dropzone')
      .trigger('drop')
  
    cy.get('@ingredient')
        .trigger('dragend');
    
    cy.get('@constructor-dropzone')
      .contains('Соус Spicy-X');
  });
})