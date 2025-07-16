import { TFeed } from '@/utils/types';
import { createAction } from '@reduxjs/toolkit';

export const connect = createAction<string, 'connect'>('connect');
export const disconnect = createAction('disconnect');

export const onConnecting = createAction('onConnecting');
export const onOpen = createAction('onOpen');
export const onClose = createAction('onClose');
export const onError = createAction<string, 'onError'>('onError');
export const onMessage = createAction<TFeed | null, 'onMessage'>('onMessage');

export type WsActionTypes =
	| ReturnType<typeof connect>
	| ReturnType<typeof disconnect>
	| ReturnType<typeof onConnecting>
	| ReturnType<typeof onOpen>
	| ReturnType<typeof onClose>
	| ReturnType<typeof onError>
	| ReturnType<typeof onMessage>;
