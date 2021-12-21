import React from 'react';
import './App.css';
import data from "../../utils/data";
import Header from "../header/header";
import Main from "../main/main";

function App() {
  return (
    <main className="app">
      <Header />
      <Main data={data}/>
    </main>
  );
}

export default App;
