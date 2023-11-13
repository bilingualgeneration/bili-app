
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
// Explore page tests
// ****************************

describe('Explore Page', () => {
    it('should display the Explore page content', () => {
		cy.visit('/explore');
		cy.contains('Welcome to Explore Page').should('be.visible');
		// Add more assertions as needed for elements on journeys page
    });
  });

// ****************************
// Journey page tests
// ****************************

describe('Journeys Page', () => {
    it('should display the Journeys page content', () => {
      cy.visit('/journeys');
      cy.contains('Welcome to Journeys Page').should('be.visible');
      // Add more assertions as needed for elements on journeys page
    });
  });  


// ****************************
// Login page tests
// ****************************


  describe('Login Page', () => {
    it('should perform login successfully', () => {
      // Visit the login page
      cy.visit('/login'); // Adjust the route as needed
  
      // Fill in valid username and password
      cy.get('input[placeholder="Username"]').type('your-username');
      cy.get('input[placeholder="Password"]').type('your-password');
  
      // Click the login button
      cy.get('.login-button').click(); // Adjust the selector as needed
  
      // Assert that the user is redirected to the expected page after successful login
      cy.url().should('include', '/student-dashboard'); // Url can change in future
  
      // Check heading
      cy.contains('Welcome to Student Dashboard Page').should('be.visible'); // Adjust as needed in future
    });
  }); 


// ****************************
// Intruder page tests
// ****************************


describe('Intruder Page', () => {
    it('should display the Intruder page content', () => {
      cy.visit('/intruder');
      cy.contains('Welcome to Intruder Page').should('be.visible');
      // Add more assertions as needed for elements on Intruder page
    });
  }); 


// ****************************
// Memory page tests
// ****************************


describe('Memory Page', () => {
    it('should display the Memory page content', () => {
      cy.visit('/memory');
      cy.contains('Welcome to Memory Page').should('be.visible');
      // Add more assertions as needed for elements on Memory page
    });
  }); 


// ****************************
// Reset Password page tests
// ****************************


describe('Reset Password Page', () => {
	beforeEach(() => {
	  cy.visit('/reset-password');
	});
  
	it('displays the page title and form elements', () => {
	  cy.contains('Reset Password'); // Check for page title
	  cy.contains('Enter your email address to reset your password:'); // Check for the instruction
	  cy.get('ion-input[placeholder="Email"]').should('exist'); // Check for email input
	  cy.contains('Reset Password'); // Check for reset button text
	});
  
	// ** FUTURE TEST: simulates the process of sending a password reset email through Firebase Authentication **
	it('successfully requests password reset email', () => {
		// Firebase Authentication handles password reset requests directly, so we won't intercept HTTP requests
	
		// Enter an email address
		cy.get('ion-input[placeholder="Email"]').type('example@email.com');
	
		// Click the Reset Password button
		cy.get('ion-button').click();
	
		// Assert that the user sees a success message or is informed about the email sent
		cy.contains('Password reset email sent successfully'); // success message
	
		// can also assert that the URL remains the same or user is redirected to a login page
		// cy.url().should('eq', '/login'); // Redirect URL
	  });
	
	it('handles password reset request with invalid email', () => {
		// Firebase Authentication handles password reset requests directly, so we won't intercept HTTP requests
	
		// Enter an invalid email address
		cy.get('ion-input[placeholder="Email"]').type('invalid@email');
	
		// Click the Reset Password button
		cy.get('ion-button').click();
	
		// Assert that the user sees an error message
		cy.contains('Invalid email address');
	
		// Can also assert that the URL remains the same when user enters invalid form data
		// cy.url().should('eq', '/reset-password');
	});
  });
  
  
// ****************************
// Story Factory page tests
// ****************************


describe('Story Factory Page', () => {
    it('should display the Story Factory page content', () => {
      cy.visit('/story-factory');
      cy.contains('Welcome to Story Factory Page').should('be.visible');
      // Add more assertions as needed for elements on Story Factory page
    });
  }); 


// ****************************
// Stories page tests
// ****************************


// ** FUTURE TEST: testing for routes with dynamic parameters **
describe('Stories Page', () => {
	const uuidsToTest = ['story1', 'story2', 'story3']; // Define UUIDs to test
  
	// Loop through each UUID to test different scenarios
	uuidsToTest.forEach((uuid) => {
	  it(`displays story for UUID: ${uuid}`, () => {
		// Visit the page with the specific UUID
		cy.visit(`/stories/${uuid}`);
  
		// Assuming Stories component displays the UUID
		// Assert that the page displays the correct UUID
		cy.contains(`Story ID: ${uuid}`).should('exist');
  
		// Add more assertions specific to the content of the story if needed
	  });
	});
  });


// ****************************
// Student Dashboard page tests
// ****************************


describe('Student Dashboard Page', () => {
	beforeEach(() => {
	  cy.visit('/student-dashboard');
	});
  
	it('displays the page title', () => {
	  cy.contains('Welcome to Student Dashboard Page').should('exist');
	});
  
	it('navigates to the Journeys page', () => {
	  cy.get('[data-cy=journeys-button]').click();
	  // Add assertions specific to the Journeys page
	});
  
	it('navigates to the Explore page', () => {
	  cy.get('[data-cy=explore-button]').click();
	  // Add assertions specific to the Explore page
	});
  
	it('navigates to the Wellness Carousel page', () => {
	  cy.get('[data-cy=wellness-carousel-button]').click();
	  // Add assertions specific to the Wellness Carousel page
	});
  
	it('navigates to the Play Carousel page', () => {
	  cy.get('[data-cy=play-carousel-button]').click();
	  // Add assertions specific to the Play Carousel page
	});
  
	it('navigates to the Community Carousel page', () => {
	  cy.get('[data-cy=community-carousel-button]').click();
	  // Add assertions specific to the Community Carousel page
	});
  
	it('navigates to the Story Factory page', () => {
	  cy.get('[data-cy=story-factory-button]').click();
	  // Add assertions specific to the Story Factory page
	});
  
	it('navigates to the Memory page', () => {
	  cy.get('[data-cy=memory-button]').click();
	  // Add assertions specific to the Memory page
	});
  
	it('navigates to the Intruder page', () => {
	  cy.get('[data-cy=intruder-button]').click();
	  // Add assertions specific to the Intruder page
	});
  });

  
// ****************************
// Sign Up page tests
// ****************************

// Verifys sign-up slides navigation 

describe.only('RoleSelect Slide Tests', () => {
    beforeEach(() => {
      cy.visit('/sign-up'); 
    });
  
    it('should navigate to ParentAccountCredentials when Parent is selected', () => {
      cy.get('[data-testid="role-select-slide"]').first().within(() => {
        cy.contains('Parent').click({force: true}); 
      });
      cy.get('[data-testid="role-select-continue-button"]').click();
      cy.get('[data-testid="parent-account-credentials-slide"]').should('be.visible');
      
    });
  
    it('should navigate to TeacherAccountCredentials when Teacher is selected', () => {
      cy.get('[data-testid="role-select-slide"]').first().within(() => {
        cy.contains('Teacher').click({force: true}); 
      });
      cy.get('[data-testid="role-select-continue-button"]').click();
      cy.get('[data-testid="teacher-account-credentials-slide"]').should('be.visible');
      
    });
  });

