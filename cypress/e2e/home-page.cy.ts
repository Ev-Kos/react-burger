describe('home-page', () => {
	beforeEach(() => {
		cy.viewport(1280, 800);
		cy.mockIngredients();
		cy.visit('/');
		cy.wait('@getIngredients');
	});

	it('should be ingredients', () => {
		cy.getElem('buns').should('have.length', 1);
		cy.getElem('mains').should('have.length', 1);
	});

	it('should open ingredient details modal on click to ingredient', () => {
		cy.getElem('buns')
			.find('[data-cy^="bun-"]')
			.eq(0)
			.as('bun')
			.find('[data-cy="ingredient-name"]')
			.invoke('text')
			.then((name) => {
				const ingName = name;
				cy.get('@bun').click();
				cy.getElem('ingredient-details')
					.should('exist')
					.find('[data-cy="ingredient-name"]')
					.invoke('text')
					.should('eq', ingName);

				cy.url().should('include', '/ingredients/');

				cy.getElem('close-modal').click();
				cy.getElem('ingredient-details').should('not.exist');
			});
	});

	it('should drag and drop different ingredient to constructor', () => {
		cy.contains('Перенесите сюда выбранные ингредиенты').should('exist');
		cy.getElem('mains')
			.find('[data-cy^="main-"]')
			.eq(0)
			.trigger('dragstart')
			.invoke('attr', 'data-cy')
			.then((el) => {
				const id = el.split('main-')[1];
				cy.getElem('constructor').trigger('drop');
				cy.getElem(`constructor-main-${id}`).should('exist');
				cy.contains('Добавьте булочку').should('exist');
			});
	});
	it('should drag and drop bun to constructor', () => {
		cy.contains('Перенесите сюда выбранные ингредиенты').should('exist');
		cy.getElem('buns').find('[data-cy^="bun-"]').eq(0).trigger('dragstart');
		cy.getElem('constructor').trigger('drop');
		cy.getElem('bun-top').should('exist').should('include.text', 'верх');
		cy.getElem('bun-bottom').should('exist').should('include.text', 'низ');
	});
	it('should drag and drop into constructor', () => {
		cy.getElem('mains').find('[data-cy^="main-"]').eq(0).trigger('dragstart');
		cy.getElem('constructor').trigger('drop');
		cy.getElem('sauces').find('[data-cy^="sauce-"]').eq(0).trigger('dragstart');
		cy.getElem('constructor')
			.trigger('drop')
			.find('[data-cy^="constructor-"]')
			.as('items');
		cy.get('@items')
			.eq(0)
			.invoke('attr', 'data-cy')
			.then((firstId) => {
				cy.get('@items')
					.eq(1)
					.invoke('attr', 'data-cy')
					.then((secondId) => {
						cy.get('@items').eq(0).trigger('dragstart');
						cy.get('@items').eq(1).trigger('drop');

						cy.getElem('constructor')
							.find('[data-cy^="constructor-"]')
							.as('newItems');
						cy.get('@newItems').eq(0).should('have.attr', 'data-cy', secondId);
						cy.get('@newItems').eq(1).should('have.attr', 'data-cy', firstId);
					});
			});
	});
	it('should be constructor is empty after click to Очистить', () => {
		cy.getElem('buns').find('[data-cy^="bun-"]').eq(0).trigger('dragstart');
		cy.getElem('constructor').trigger('drop');
		cy.getElem('reset').should('exist').click();
		cy.contains('Перенесите сюда выбранные ингредиенты').should('exist');
	});

	it('should open order details after click to Оформить заказ', () => {
		cy.getElem('buns').find('[data-cy^="bun-"]').eq(0).trigger('dragstart');
		cy.getElem('constructor').trigger('drop');
		cy.getElem('mains').find('[data-cy^="main-"]').eq(0).trigger('dragstart');
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
				.find('[data-cy="order-number"]')
				.invoke('text')
				.should('eq', String(orderNumber));
			cy.getElem('close-modal').click();
			cy.getElem('order-details').should('not.be.exist');
		});
	});
});
