import React from 'react';
import './App.css';
import Header from "../header/header";
import Main from "../main/main";

function App() {
  const [state, setState] = React.useState([]);
  const url = "https://norma.nomoreparties.space/api/ingredients";

  React.useEffect(() => {

    fetch(url)
      .then((response) => {
        if(!response.ok) {
          throw new Error('Something went wrong');
        }
        return response.json()
      })
      .then((data) => {
        setState(data.data)
      })
      .catch((error) => console.log(error))
  }, [])
  return (
    <main className="app">
      <Header />
      <Main data={state}/>
    </main>
  );
}

export default App;
