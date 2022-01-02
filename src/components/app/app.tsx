import React from 'react';
import './app.module.css';
import Header from "../header/header";
import Main from "../main/main";
import Modal from "../modal/modal";
import style from "./app.module.css"
import IngredientDetails from "../ingredient-details/ingredient-details";

function App() {
  const [state, setState] = React.useState<any>([]);
  const [ingredientsDetails, setIngredientsDetails] = React.useState<any>({isIngredientModal: false});
  const [isModal, setModal] = React.useState<boolean>(false);

  React.useEffect(() => {
    const url = "https://norma.nomoreparties.space/api/ingredients";

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

  return (
    <main className={style.app}>
      <Header />
      <Main data={state} setState={setState} openModalHandlers={{openIngredient}}/>
      {isModal &&
      (
        <Modal onCloseModal={onCloseModal}>
          <>
          {ingredientsDetails.isIngredientModal &&
            <IngredientDetails ingredientsDetails={ingredientsDetails.ingredientData} onCloseModal={onCloseModal}/>
          }
          </>
        </Modal>
      )
      }
    </main>
  );
}

export default App;
