import { TSelectedIngredient } from '@/utils/types';
import styles from './constructor-item.module.css';
import {
	DragIcon,
	ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { memo, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

type TConstructorItem = {
	item: TSelectedIngredient;
	index: number;
	onDelete: VoidFunction;
	onMove: (dragIndex: number, hoverIndex: number) => void;
};

export const ConstructorItem = memo(
	({ item, index, onDelete, onMove }: TConstructorItem) => {
		const ref = useRef<HTMLLIElement>(null);
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
			collect: (monitor) => ({
				handlerId: monitor.getHandlerId(),
			}),
			hover: (item: TSelectedIngredient) => {
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
	}
);
