import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./constructor-box.module.css"
import {useDrag, useDrop} from "react-dnd";
import React, {useRef} from "react";
import {TIngredient} from "../../services/types";

type TConstructorBoxProps = {
  name: string;
  price: number,
  image: string,
  removeItem: () => void;
  index: number | string,
  moveIngredients: (dragIndex: number | string | undefined, hoverIndex: number | string | undefined) => void
}

const ConstructorBox: React.FC<TConstructorBoxProps> = ({name, price, image, removeItem, index, moveIngredients}) => {
  //DnD elements
  const ref = useRef<HTMLDivElement>(null);

  const [{handlerId}, drop] = useDrop({
    accept: "constructor",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      };
    },
    hover: function (item: TIngredient, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset ? clientOffset.y - hoverBoundingRect.top : 0;

      if (dragIndex && dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex && dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveIngredients(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: "constructor",
    item: (item) => {
      return {index};
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
          text={name}
          price={price}
          thumbnail={image}
          handleClose={removeItem}
        />
    </div>
  )
}

export  default ConstructorBox;
