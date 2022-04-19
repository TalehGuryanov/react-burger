
describe("Constructor page", () => {
  before(function() {
    cy.visit('http://localhost:3000');
  });
  
  it('should drop ingredient to constructor dropzone', () => {
    cy.get('[data-test="ingredient-item"]')
      .contains('Краторная булка N-200i')
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
      .contains('Краторная булка N-200i');
  });
  
  it('should open ingredient modal on click ingredient item', () => {
    cy.get('[data-test="ingredient-item"]')
      .contains('Краторная булка N-200i')
      .as('ingredient');
  
    cy.get('@ingredient')
      .click();
    
    cy.get('[data-test="modal"]')
      .first()
      .should('contain', 'Краторная булка N-200i');
  })
  
  it('should close modal', () => {
    cy.get('[data-test="close-modal"]')
      .as('close-modal-btn');
    
    cy.get('@close-modal-btn')
      .click();
    
    cy.get('[data-test="modal"]')
      .should('not.exist');
  })
  
  it('should redirect to login', () => {
    cy.get('[name="order-button"]')
      .as('order-button');
    
    cy.get('@order-button')
      .click();
    
    cy.contains('Вход')
  });
  
  it('should login and then redirect to constructor page', () => {
    cy.get('input[name="email"]')
      .type('tw@t.com', {force: true});
    
    cy.get('input[name="password"]')
      .type('1111', {force: true});
    
    cy.get('button[type="submit"]')
      .click();
    
    cy.contains('Соберите бургер');
  });
  
  it('should open order modal', () => {
    cy.get('[name="order-button"]')
      .as('order-button');
    
    cy.get('@order-button')
      .click();
  
    cy.get('[data-test="modal"]')
      .should('exist')
      .contains('Ваш заказ начали готовить')
  })
})