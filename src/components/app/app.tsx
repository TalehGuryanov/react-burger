import React from 'react';
import './app.module.css';
import Header from "../header/header";
import Main from "../main/main";
import style from "./app.module.css"

function App() {
  const [state, setState] = React.useState<any>([]);

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

  return (
    <main className={style.app}>
      <Header />
      {state[0] && <Main data={state} setData={setState}/>}
    </main>
  );
}

export default App;
