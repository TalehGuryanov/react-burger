import React from 'react';
import './app.module.css';
import Header from "../header/header";
import Main from "../main/main";
import style from "./app.module.css"
import { URL } from "../../utils/constants";

function App() {
  // const [state, setState] = React.useState([]);
  //
  // React.useEffect(() => {
  //   fetch(`${URL}/ingredients`)
  //     .then((response) => {
  //       if(!response.ok) {
  //         throw new Error('Something went wrong');
  //       }
  //       return response.json()
  //     })
  //     .then((data) => setState(data.data))
  //     .catch((error) => console.log(error))
  // }, []);

  return (
    <main className={style.app}>
      <Header />
      <Main />
    </main>
  );
}

export default App;
