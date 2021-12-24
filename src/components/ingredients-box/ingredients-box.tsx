import style from "./ingredients-box.module.css"
import IngredientsItem from "../ingredients-item/ingredients-item";

function IngredientsBox(props: any) {
  const bunData = props.data.filter((item: { type: string; }) => item.type === "bun");
  const sauceData = props.data.filter((item: { type: string; }) => item.type === "sauce");
  const mainData = props.data.filter((item: { type: string; }) => item.type === "main");
  const bun = bunData.map((item: any) => <IngredientsItem key={item._id} image={item.image} name={item.name} price={item.price}/>);
  const sauce = sauceData.map((item: any) => <IngredientsItem key={item._id} image={item.image} name={item.name} price={item.price}/>);
  const main = mainData.map((item: any) => <IngredientsItem key={item._id} image={item.image} name={item.name} price={item.price}/>);

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

export default IngredientsBox;