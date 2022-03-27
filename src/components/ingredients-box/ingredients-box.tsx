import style from "./ingredients-box.module.css"
import IngredientsItem from "../ingredients-item/ingredients-item";
import React, {useRef} from "react";
import {Tabs} from "../tabs/tabs";
import {TIngredient} from "../../services/types/ingredientsTypes";

type TIngredientsBoxProps = {
  data: Array<TIngredient>
}

const IngredientsBox: React.FC<TIngredientsBoxProps> = ({data}) => {
  const bunData = React.useMemo(() => data.filter((item: TIngredient) => item.type === "bun"), [data]);
  const sauceData = React.useMemo(() =>data.filter((item: TIngredient) => item.type === "sauce"), [data]);
  const mainData = React.useMemo(() => data.filter((item: TIngredient) => item.type === "main"), [data]);
  const bun = React.useMemo(
    () =>
      bunData.map((item) =>
        <IngredientsItem key={item._id}
                         id={item._id}
                         image={item.image}
                         name={item.name}
                         price={item.price}
                         type={item.type}
        />
      ),
    [bunData]
  );
  const sauce = React.useMemo(
    () =>
      sauceData.map((item) =>
        <IngredientsItem key={item._id}
                         id={item._id}
                         image={item.image}
                         name={item.name}
                         price={item.price}
                         type={item.type}
        />
      ),
    [sauceData]
  );
  const main = React.useMemo(
    () => mainData.map((item) =>
        <IngredientsItem key={item._id}
                         id={item._id}
                         image={item.image}
                         name={item.name}
                         price={item.price}
                         type={item.type}
        />
    ),
    [mainData]
  );

  const [current, setCurrent] = React.useState('one');
  const bunRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  const onScroll = (event: React.UIEvent) => {
    const wrapperClientY = event.currentTarget.getBoundingClientRect().y;
    const bunClientY = bunRef.current?.getBoundingClientRect().y;
    const sauceClientY = sauceRef.current?.getBoundingClientRect().y;
    const mainClientY = mainRef.current?.getBoundingClientRect().y;

    if(bunClientY && bunClientY <= wrapperClientY) {
      setCurrent('one');
    }

    if(sauceClientY && sauceClientY <= wrapperClientY) {
      setCurrent('two');
    }

    if(mainClientY && mainClientY <= wrapperClientY) {
      setCurrent('three');
    }
  };

  const scrollOnClick: (event: string) => void = (event) => {
    if (event === "one" && bunRef.current) {
      bunRef.current.scrollIntoView({block: "start", behavior: "smooth"});
      setCurrent('one');
    } else if(event === "two" && sauceRef.current) {
      sauceRef.current.scrollIntoView({block: "start", behavior: "smooth"});
      setCurrent('two');
    } else if(event === "three" && mainRef.current) {
      mainRef.current.scrollIntoView({block: "start", behavior: "smooth"});
      setCurrent('three');
    }
  }

  return (
    <>
      <div>
        <Tabs current={current} scrollOnClick={scrollOnClick}/>
      </div>

      <div className={style.content} onScroll={onScroll}>
        <div className={style.in} ref={bunRef}>
          <h3 className="text text_type_main-medium">
            Булки
          </h3>

          <ul className={style.list}>
            {bun}
          </ul>
        </div>

        <div className={style.in} ref={sauceRef}>
          <h3 className="text text_type_main-medium">
            Соусы
          </h3>

          <ul className={style.list}>
            {sauce}
          </ul>
        </div>

        <div className={style.in} ref={mainRef}>
          <h3 className="text text_type_main-medium">
            Начинки
          </h3>

          <ul className={style.list}>
            {main}
          </ul>
        </div>
      </div>
    </>
  )
}

export default IngredientsBox;
