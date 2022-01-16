import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./constructor-box.module.css"
import PropTypes from "prop-types";
import {useDrag, useDrop} from "react-dnd";
import React, {useRef} from "react";

function ConstructorBox (props) {
  //DnD elements
  const ref = useRef(null);

  const [{handlerId}, drop] = useDrop({
    accept: "constructor",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = props.index;
      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      props.moveIngredients(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: "constructor",
    item: (item) => {
      return {...props.index};
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
      <div className={style.item} ref={ref} data-hendler-id={handlerId}>
        <div className={style.item_icon}>
          <DragIcon type="primary"/>
        </div>

        <ConstructorElement
          type={undefined}
          isLocked={false}
          text={props.name}
          price={props.price}
          thumbnail={props.image}
          handleClose={props.removeItem}
        />
    </div>
  )
}

ConstructorBox.propTypes = {
  name: PropTypes.string,
  price: PropTypes.number,
  image: PropTypes.string,
  removeItem: PropTypes.func,
  index: PropTypes.number,
  moveIngredients: PropTypes.func
}

export  default ConstructorBox;