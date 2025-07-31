/* eslint-disable @typescript-eslint/no-namespace */

import './commands';

declare global {
	namespace Cypress {
		interface Chainable {
			getElem(name: string): Chainable;
			mockUser(): void;
			mockIngredients(): void;
			createOrder(): void;
		}
	}
}

/* eslint-enable @typescript-eslint/no-namespace */
