describe('home-page', () => {
	beforeEach(() => {
		cy.mockIngredients();
		cy.visit('/');
		cy.wait('@getIngredients');
	});

	it('should be ingredients', () => {
		cy.getElem('buns').should('have.length', 1);
		cy.getElem('mains').should('have.length', 1);
	});

	it('should open ingredient details modal on click to ingredient', () => {
		cy.getElem('buns').first().find('[data-cy^="bun-"]').as('bun');
		cy.get('@bun')
			.find('[data-cy="ingredient-name"]')
			.invoke('text')
			.then((name) => {
				const ingName = name;
				cy.get('@bun').click();
				cy.getElem('ingredient-details')
					.as('modal')
					.should('exist')
					.find('[data-cy="ingredient-name"]')
					.invoke('text')
					.should('eq', ingName);

				cy.url().should('include', '/ingredients/');

				cy.getElem('close-modal').click();
				cy.get('@modal').should('not.exist');
			});
	});

	it('should drag and drop main to constructor', () => {
		cy.contains('Перенесите сюда выбранные ингредиенты').should('exist');
		cy.getElem('mains')
			.first()
			.find('[data-cy^="main-"]')
			.as('main')
			.invoke('attr', 'data-cy')
			.then((el) => {
				const id = el!.split('main-')[1];
				cy.get('@main').trigger('dragstart');
				cy.getElem('constructor').trigger('drop');
				cy.getElem(`constructor-main-${id}`).should('exist');
				cy.contains('Добавьте булочку').should('exist');
			});
	});
	it('should drag and drop bun to constructor', () => {
		cy.contains('Перенесите сюда выбранные ингредиенты').should('exist');
		cy.getElem('buns').first().find('[data-cy^="bun-"]').trigger('dragstart');
		cy.getElem('constructor').trigger('drop');
		cy.getElem('bun-top').should('exist').should('include.text', 'верх');
		cy.getElem('bun-bottom').should('exist').should('include.text', 'низ');
	});
	it('should be constructor is empty after click to Очистить', () => {
		cy.getElem('constructor').as('constructor');
		cy.getElem('buns').first().find('[data-cy^="bun-"]').trigger('dragstart');
		cy.get('@constructor').trigger('drop');
		cy.getElem('reset').should('exist').click();
		cy.contains('Перенесите сюда выбранные ингредиенты').should('exist');
	});

	it('should open order details after click to Оформить заказ', () => {
		cy.getElem('constructor').as('constructor');
		cy.getElem('buns').first().find('[data-cy^="bun-"]').trigger('dragstart');
		cy.get('@constructor').trigger('drop');
		cy.getElem('mains').first().find('[data-cy^="main-"]').trigger('dragstart');
		cy.getElem('constructor').trigger('drop');

		cy.getElem('submit').should('not.be.disabled').click();
		cy.mockUser();
		cy.wait('@getUser');
		cy.getElem('submit').should('not.be.disabled').click();
		cy.createOrder();
		cy.wait('@createOrder').then((res) => {
			const orderNumber = res.response.body.order.number;
			cy.getElem('order-details')
				.should('exist')
				.as('modal')
				.find('[data-cy="order-number"]')
				.invoke('text')
				.should('eq', String(orderNumber));
			cy.getElem('close-modal').click();
			cy.get('@modal').should('not.be.exist');
		});
	});
});
