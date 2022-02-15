import style from "./ingredients-box.module.css"
import IngredientsItem from "../ingredients-item/ingredients-item";
import PropTypes from "prop-types";
import React, {useRef} from "react";
import ingredientType from "../../utils/types"
import Tabs from "../tabs/tabs";

function IngredientsBox({data}) {
  const bunData = React.useMemo(() => data.filter((item) => item.type === "bun"), [data]);
  const sauceData = React.useMemo(() =>data.filter((item) => item.type === "sauce"), [data]);
  const mainData = React.useMemo(() => data.filter((item) => item.type === "main"), [data]);
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
        />
    ),
    [mainData]
  );

  const [current, setCurrent] = React.useState('one');
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  const onScroll = (event) => {
    const wrapperClientY = event.target.getBoundingClientRect().y;
    const bunClientY = bunRef.current.getBoundingClientRect().y;
    const sauceClientY = sauceRef.current.getBoundingClientRect().y;
    const mainClientY = mainRef.current.getBoundingClientRect().y;

    if(bunClientY <= wrapperClientY) {
      setCurrent('one');
    }

    if(sauceClientY <= wrapperClientY) {
      setCurrent('two');
    }

    if(mainClientY <= wrapperClientY) {
      setCurrent('three');
    }
  };

  const scrollOnClick = (event) => {
    if (event === "one") {
      bunRef.current.scrollIntoView({block: "start", behavior: "smooth"});
      setCurrent('one');
    } else if(event === "two") {
      sauceRef.current.scrollIntoView({block: "start", behavior: "smooth"});
      setCurrent('two');
    } else {
      mainRef.current.scrollIntoView({block: "start", behavior: "smooth"});
      setCurrent('three');
    }
  }

  return (
    <>
      <div>
        <Tabs current={current} setCurrent={setCurrent} scrollOnClick={scrollOnClick}/>
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

IngredientsBox.propType = {
  data: PropTypes.arrayOf(PropTypes.shape(ingredientType))
}

export default IngredientsBox;
