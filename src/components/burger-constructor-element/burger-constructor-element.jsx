import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { memo, useRef } from 'react';
import PropTypes from 'prop-types';
import { ingredientType } from '../../utils/prop-types';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import constructorElementStyles from './burger-constructor-element.module.css';

const BurgerConstructorElement = memo(({ element, id, index, onDelete, onMove }) => {
  const {name, price, image} = element;
  const ref = useRef(null);

  const [{ isDragging }, dragRef] = useDrag({
    type: 'constructorElement',
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  });

  const [{ handlerId }, dropRef] = useDrop({
    accept: 'constructorElement',
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
        thumbnail={ image }
        handleClose={() => onDelete(element)}
      />
    </li>
  );
});

BurgerConstructorElement.propTypes = {
  element: PropTypes.oneOfType([PropTypes.object, ingredientType]).isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
};

export default BurgerConstructorElement;