import React from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import ingredientType from "../../utils/types";
import IngredientsBox from "../ingredients-box/ingredients-box";

function Tabs ({current, setCurrent, scrollOnClick}) {
  return (
    <div style={{ display: 'flex' }}>
      <Tab value="one" active={current === 'one'} onClick={scrollOnClick}>
        Булки
      </Tab>
      <Tab value="two" active={current === 'two'} onClick={scrollOnClick}>
        Соусы
      </Tab>
      <Tab value="three" active={current === 'three'} onClick={scrollOnClick}>
        Начинки
      </Tab>
    </div>
  )
}

Tabs.propType = {
  current: PropTypes.string,
  setCurrent: PropTypes.func,
  scrollOnClick: PropTypes.func
}

export default Tabs;

