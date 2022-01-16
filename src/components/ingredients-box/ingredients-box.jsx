import style from "./ingredients-box.module.css"
import IngredientsItem from "../ingredients-item/ingredients-item";
import PropTypes from "prop-types";
import React from "react";
import ingredientType from "../../utils/types"

function IngredientsBox({data, showIngredientModal}) {
  const bunData = React.useMemo(() => data.filter((item) => item.type === "bun"), [data]);
  const sauceData = React.useMemo(() =>data.filter((item) => item.type === "sauce"), [data]);
  const mainData = React.useMemo(() => data.filter((item) => item.type === "main"), [data]);
  const bun = React.useMemo(
    () =>
      bunData.map((item) =>
        <IngredientsItem showIngredientModal={showIngredientModal}
                         key={item._id}
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
        <IngredientsItem showIngredientModal={showIngredientModal}
                         key={item._id}
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
        <IngredientsItem showIngredientModal={showIngredientModal}
                         key={item._id}
                         id={item._id}
                         image={item.image}
                         name={item.name}
                         price={item.price}
        />
    ),
    [mainData]
  );

  return (
    <div className={style.wr}>
      <div className={style.in}>
        <h3 className={`${"text text_type_main-medium"} ${style.title}`}>
          Булки
        </h3>

        <ul className={style.list}>
          {bun}
        </ul>
      </div>

      <div className={style.in}>
        <h3 className={`${"text text_type_main-medium"} ${style.title}`}>
          Соусы
        </h3>

        <ul className={style.list}>
          {sauce}
        </ul>
      </div>

      <div className={style.in}>
        <h3 className={`${"text text_type_main-medium"} ${style.title}`}>
          Начинки
        </h3>

        <ul className={style.list}>
          {main}
        </ul>
      </div>
    </div>
  )
}

IngredientsBox.propType = {
  data: PropTypes.arrayOf(PropTypes.shape(ingredientType)),
  showIngredientModal: PropTypes.func
}

export default IngredientsBox;