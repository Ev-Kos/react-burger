import { useDrag, useDrop } from 'react-dnd';
import { memo, useRef } from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import constructorElementStyles from './burger-constructor-element.module.css';
import { TSelectedIngredient } from '../../services/types/data';

type TElem = {
  element: TSelectedIngredient; 
  id: string; 
  index: string | number; 
  onDelete: Function;
  onMove: Function;
}

export const BurgerConstructorElement = memo<TElem>(({ element, id, index, onDelete, onMove }) => {
  const {name, price, image_mobile} = element;
  const ref = useRef(null);

  const [{ isDragging }, dragRef] = useDrag({
    type: 'constructorElement',
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const [{ handlerId } , dropRef] = useDrop({
    accept: 'constructorElement',
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

  const handleClose = () => {
    onDelete(element)
  }

  return (
    <li
      className={`${constructorElementStyles.element} ${isDragging && constructorElementStyles.dragging}`}
      ref={ ref }
      data-handler-id={handlerId}
      draggable
    >
      <DragIcon type="primary" />
      <ConstructorElement
        isLocked={ false }
        text={ name }
        price={ price }
        thumbnail={ image_mobile }
        handleClose={ handleClose }
      />
    </li>
  );
});