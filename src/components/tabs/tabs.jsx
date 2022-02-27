import React from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import style from "./tabs.module.css"

function Tabs ({current, scrollOnClick}) {
  return (
    <div className={style.wr}>
      <Tab value="one" active={current === 'one'} onClick={scrollOnClick} className="rr">
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
  scrollOnClick: PropTypes.func
}

export default Tabs;

