export type TIngredient = {
	_id: string;
	name: string;
	type: string;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_large: string;
	image_mobile: string;
	__v: number;
};

export type TSelectedIngredient = TIngredient & {
	key: string;
	index: number;
};

export type TGetOrderNumber = {
	name: string;
	order: {
		number: number;
	};
	success: boolean;
};

export type TLoginData = {
	email: string;
	password: string;
};

export type TUserData = TLoginData & {
	name: string;
};

export type TGetUserResponse = {
	success: boolean;
	user: Omit<TUserData, 'password'>;
};

export type TLoginResponse = {
	success: boolean;
	accessToken: string;
	refreshToken: string;
	user: TUserData;
};

export type TInfoResponse = {
	success: boolean;
	message: string;
};

export type TGetIngredients = {
	data: TIngredient[];
	success: boolean;
};

export type FormField = 'name' | 'email' | 'password';
