import { ingredientType } from '@/utils/types';
import styles from './constructor-item.module.css';
import {
	DragIcon,
	ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { func, number } from 'prop-types';
import { memo, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

export const ConstructorItem = memo(({ item, index, onDelete, onMove }) => {
	const ref = useRef(null);
	const { _id: id } = item;

	const [{ isDragging }, dragRef] = useDrag({
		type: 'constructorItem',
		item: { id, index },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const [{ handlerId }, dropRef] = useDrop({
		accept: 'constructorItem',
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
			};
		},
		hover(item) {
			if (!ref.current) {
				return;
			}

			const dragIndex = item.index;
			const hoverIndex = index;
			if (dragIndex === hoverIndex) {
				return;
			}

			onMove(dragIndex, hoverIndex);

			item.index = hoverIndex;
		},
	});

	dragRef(dropRef(ref));
	const opacity = isDragging ? 0 : 1;

	return (
		<li
			className={`${styles.item} pr-2 pl-4`}
			ref={ref}
			draggable
			data-handler-id={handlerId}
			style={{ opacity }}>
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
});

ConstructorItem.propTypes = {
	item: ingredientType.isRequired,
	onDelete: func.isRequired,
	onMove: func.isRequired,
	index: number.isRequired,
};
