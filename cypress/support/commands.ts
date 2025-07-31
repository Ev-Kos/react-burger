/// <reference types="cypress" />

Cypress.Commands.add('getElem', (name) => cy.get(`[data-cy="${name}"]`));
Cypress.Commands.add('mockUser', () => {
	window.localStorage.setItem('accessToken', 'mocked-access-token');
	cy.intercept('GET', '**/auth/user', {
		statusCode: 200,
		body: {
			success: true,
			user: {
				name: 'Test',
				email: 'test@test.ru',
			},
		},
	}).as('getUser');
});

Cypress.Commands.add('mockIngredients', () => {
	cy.fixture('ingredients').then((ingredients) => {
		cy.intercept('GET', '**/ingredients', {
			statusCode: 200,
			body: {
				success: true,
				data: ingredients,
			},
		}).as('getIngredients');
	});
});

Cypress.Commands.add('createOrder', () => {
	cy.intercept('POST', '**/orders', {
		statusCode: 200,
		body: {
			success: true,
			order: {
				number: 156875,
			},
		},
	}).as('createOrder');
});

// Cypress.Commands.add('simulateDrag', (sourceSelector, targetSelector) => {
//   cy.get(sourceSelector)
//     .trigger('mousedown', { button: 0, force: true })
//     .trigger('dragstart', { force: true });

//   cy.get(targetSelector)
//     .trigger('dragenter', { force: true })
//     .trigger('dragover', { force: true })
//     .trigger('drop', { force: true });

//   cy.get(sourceSelector).trigger('dragend', { force: true });
// });
