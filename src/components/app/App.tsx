import React from 'react';
import './App.css';
import Header from "../header/header";
import Main from "../main/main";
import ModalOverlay from "../modal-overlay/modal-overlay";

function App() {
  const [state, setState] = React.useState<any>([]);
  const [ingredientsDetails, setIngredientsDetails] = React.useState<object>({isIngredientModal: false});
  const [orderDetails, setOrderDetails] = React.useState<object>({isOrderModal: false});
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

    document.addEventListener("keyup", onKeyCloseModal)

    return (() => {
      document.removeEventListener("keyup", onKeyCloseModal)
    })
  }, []);

  function closeModal() {
    setModal(false);
    setIngredientsDetails({});
    setOrderDetails({});
  }

  function onKeyCloseModal() {
    document.addEventListener("keyup", (e) => {
      if(e.code === "Escape") {
        setModal(false);
        setIngredientsDetails({});
        setOrderDetails({});
      }
    })
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

  const handlers = {openOrder, openIngredient};

  return (
    <main className="app">
      <Header />
      <Main data={state} handlers={handlers}/>
      {isModal && <ModalOverlay onClose={closeModal} modalData={{ingredientsDetails, orderDetails}}/>}
    </main>
  );
}

export default App;
