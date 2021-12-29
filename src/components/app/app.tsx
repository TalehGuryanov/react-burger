import React from 'react';
import './app.module.css';
import Header from "../header/header";
import Main from "../main/main";
import Modal from "../modal/modal";
import style from "./app.module.css"
import IngredientDetails from "../ingredient-details/ingredient-details";
import OrderDetails from "../order-details/order-details";

function App() {
  const [state, setState] = React.useState<any>([]);
  const [ingredientsDetails, setIngredientsDetails] = React.useState<any>({isIngredientModal: false});
  const [orderDetails, setOrderDetails] = React.useState<any>({isOrderModal: false});
  const [isModal, setModal] = React.useState<boolean>(false);
  const url = "https://norma.nomoreparties.space/api/ingredients";

  React.useEffect(() => {

    fetch(url)
      .then((response) => {
        if(!response.ok) {
          throw new Error('Something went wrong');
        }
        return response.json()
      })
      .then((data) => setState(data.data))
      .catch((error) => console.log(error))
  }, []);

  function onCloseModal() {
    setModal(false);
    setIngredientsDetails({isIngredientModal: false});
    setOrderDetails({isOrderModal: false});
  }

  function openIngredient(event: any) {
    const id = event.currentTarget.getAttribute("id");
    const ingredientsArr = state.filter((burger: any) => burger._id === id);

    ingredientsArr.forEach((ingredientObj: any) => setIngredientsDetails({
      ingredientData: ingredientObj,
      isIngredientModal: true
    }));
    setModal(true);
  }

  function openOrder() {
    const orderData = {
      id: 34536,
      idText: "идентификатор заказа",
      notification: "Ваш заказ начали готовить",
      subTitle: "Дождитесь готовности на орбитальной станции",
    }
    setOrderDetails({
      orderData,
      isOrderModal: true
    });
    setModal(true);
  }

  return (
    <main className={style.app}>
      <Header />
      <Main data={state} openModalHandlers={{openOrder, openIngredient}}/>
      {isModal &&
      (
        <Modal onCloseModal={onCloseModal}>
          <>
          {ingredientsDetails.isIngredientModal &&
            <IngredientDetails ingredientsDetails={ingredientsDetails.ingredientData} onCloseModal={onCloseModal}/>
          }
          {orderDetails.isOrderModal && <OrderDetails orderDetails={orderDetails.orderData} onCloseModal={onCloseModal}/>}
          </>
        </Modal>
      )
      }
    </main>
  );
}

export default App;
