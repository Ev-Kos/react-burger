export const INGREDIENT_TYPES = {
	BUN: 'bun',
	SAUCE: 'sauce',
	MAIN: 'main',
};

export const INGREDIENTS_SCROLL_DELAY = 1000;
export const LOADING_DELAY = 600;
export const BASE_URL = 'https://norma.nomoreparties.space/api/';
export const WS_URL = 'wss://norma.nomoreparties.space/orders';

export enum WsStatus {
	CONNECTING = 'CONNECTING...',
	ONLINE = 'ONLINE',
	OFFLINE = 'OFFLINE',
}
