import { ingredientType } from '@/utils/types';
import styles from './constructor-item.module.css';
import {
	DragIcon,
	ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';

export const ConstructorItem = ({ item }) => {
	return (
		<li className={`${styles.item} pr-2 pl-4`}>
			<DragIcon type='primary' />
			<ConstructorElement
				isLocked={false}
				text={item.name}
				price={item.price}
				thumbnail={item.image_mobile}
				handleClose={() => {}}
				extraClass={styles.item_hover}
			/>
		</li>
	);
};

ConstructorItem.propTypes = {
	item: ingredientType.isRequired,
};
