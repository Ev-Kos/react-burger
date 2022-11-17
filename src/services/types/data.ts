export type TUserRegister = {
    accesToken: string;
    refreshTokn: string;
    success: boolean;
    user: { email: string; name: string; password: string };
}

export type TUserProfile = {
    name: string;
    email: string;
    password: string;
}

export type TUserForgotPassword = {
    success: boolean;
    message: string;
}

export type TUserResetPassword = {
    success: boolean;
    message: string;
}

export type TIngredient = {
    _id: string;
    id?: string;
    name: string;
    type: string;
    proteins: string | number;
    fat: string | number;
    calories: string | number;
    carbohydrates: string | number;
    price: number;
    image: string;
    image_large: string;
    image_mobile: string; 
    __v: number; 
}

export type TSelectedIngredient = {
    _id: string;
    id: string;
    name: string;
    type: string;
    count: number;
    index: string;
    key: string;
    price: number;
    image_mobile: string; 
}

export type TMoveIngredient = {
    dragIndex: number;
    hoverIndex: number;
}

export type TFeedItem = {
    createdAt: string | number;
    ingredients: string[];
    name: string;
    number: number;
    status: string;
    updateAt: string;
    _id: string;
    find: Function;
}

export type TFeedItemImage = {
    data: TIngredient;
    number?: any;
    lengthArray?: number;
    key: string;
}