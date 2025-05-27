import { ingredientType } from '@/utils/types';
import styles from './constructor-item.module.css';
import {
	DragIcon,
	ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { func } from 'prop-types';

export const ConstructorItem = ({ item, onDelete }) => {
	return (
		<li className={`${styles.item} pr-2 pl-4`}>
			<DragIcon type='primary' />
			<ConstructorElement
				isLocked={false}
				text={item.name}
				price={item.price}
				thumbnail={item.image_mobile}
				handleClose={onDelete}
				extraClass={styles.item_hover}
			/>
		</li>
	);
};

ConstructorItem.propTypes = {
	item: ingredientType.isRequired,
	onDelete: func.isRequired,
};
