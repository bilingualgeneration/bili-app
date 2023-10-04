
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

// ****************************
// Sign Up page tests
// ****************************

// Verifys navigation to the student dashboard page from the sign up page
describe('Sign up page workflow', () => {
    it('Visits the student dashboard page', () => {
	cy.visit('/sign-up');
	cy.get('[data-cy="sign_up_auth"]').click();
	cy.url().should('include', '/student-dashboard');
	
    })
})
