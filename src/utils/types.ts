import { number, shape, string } from 'prop-types';

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

export const ingredientType = shape({
	_id: string.isRequired,
	name: string.isRequired,
	type: string.isRequired,
	proteins: number.isRequired,
	fat: number.isRequired,
	carbohydrates: number.isRequired,
	calories: number.isRequired,
	price: number.isRequired,
	image: string.isRequired,
	image_large: string.isRequired,
	image_mobile: string.isRequired,
	__v: number.isRequired,
});
