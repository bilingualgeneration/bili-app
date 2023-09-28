// describe('Login Workflow', () => {
//     it('Visits the reset password page', () => {
// 	cy.visit('/login');
// 	cy.get('#reset-password-link').click();
// 	cy.url().should('include', '/reset-password');
// 	cy.get('ion-title').should('be.visible');
//     })
// })

// ****************************
// Splash page tests
// ****************************

// Verifys navigation to the sign-up page from the splash page
describe('Splash page workflow', () => {
    it('Visits the sign up page', () => {
	cy.visit('/splash');
	cy.get('[data-cy="sign_up"]').click();
	cy.url().should('include', '/sign-up');
	
    })
})

// Verifys navigation to the login page from the splash page
describe('Splash page workflow', () => {
    it('Visits the login page', () => {
	cy.visit('/splash');
	cy.get('[data-cy="sign_in"]').click();
	cy.url().should('include', '/login');
	
    })
})