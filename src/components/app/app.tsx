import React from 'react';
import './app.module.css';
import style from "./app.module.css"
import {
  BrowserRouter as Router,
} from "react-router-dom";
import {AppInner} from "../app-inner/app-inner";

const App: React.FC = () => {
  return (
    <main className={style.app}>
      <Router>
        <AppInner />
      </Router>
    </main>
  );
}

export default App;
