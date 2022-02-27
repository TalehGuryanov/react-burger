import React from "react";
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./tabs.module.css"

type TTabsProps = {
  current: 'one' | 'two' | 'three'
  scrollOnClick: (event: string) => void
}

export const Tabs: React.FC<TTabsProps> = ({current, scrollOnClick}) => {
  return (
    <div className={style.wr}>
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
  );
};
