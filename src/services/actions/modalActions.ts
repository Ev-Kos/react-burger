export const OPEN_INGREDIENT_MODAL: 'OPEN_INGREDIENT_MODAL' = 'OPEN_INGREDIENT_MODAL';
export const CLOSE_INGREDIENT_MODAL: 'CLOSE_INGREDIENT_MODAL' = 'CLOSE_INGREDIENT_MODAL';

export const OPEN_ORDER_MODAL: 'OPEN_ORDER_MODAL' = 'OPEN_ORDER_MODAL';
export const CLOSE_ORDER_MODAL: 'CLOSE_ORDER_MODAL' = 'CLOSE_ORDER_MODAL';

export interface IOpenIngredientModal {
    readonly type: typeof OPEN_INGREDIENT_MODAL;
}

export interface ICloseIngredientModal {
    readonly type: typeof CLOSE_INGREDIENT_MODAL;
}

export interface IOpenOrderModal {
    readonly type: typeof OPEN_ORDER_MODAL;
}

export interface ICloseOrderModal {
    readonly type: typeof CLOSE_ORDER_MODAL;
}


export type TModalActions =
  | IOpenIngredientModal
  | ICloseIngredientModal
  | IOpenOrderModal
  | ICloseOrderModal;

export const OpenIngredientModal = (): IOpenIngredientModal => ({
    type: OPEN_INGREDIENT_MODAL,
})

export const CloseIngredientModal = (): ICloseIngredientModal => ({
    type: CLOSE_INGREDIENT_MODAL,
})

export const OpenOrderModal = (): IOpenOrderModal => ({
    type: OPEN_ORDER_MODAL,
})

export const CloseOrderModal = (): ICloseOrderModal => ({
    type: CLOSE_ORDER_MODAL,
})

