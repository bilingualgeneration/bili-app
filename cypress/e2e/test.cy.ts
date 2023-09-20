describe('Login Workflow', () => {
    it('Visits the reset password page', () => {
	cy.visit('/login');
	cy.get('#reset-password-link').click();
	cy.url().should('include', '/reset-password');
	cy.get('ion-title').should('be.visible');
    })
})
