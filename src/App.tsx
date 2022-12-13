import React, { useState, useReducer } from "react";
import Board from "./components/Board";
import ModalWindow from "./components/Modal";
import { Context } from "./reducer/reducer";
import { boardReducer } from "./reducer/reducer";
import { initialState } from "./reducer/reducer";

const App = () => {
  const [state, dispatch] = useReducer(boardReducer, initialState);
  const user = {
    name: localStorage.getItem("name"),
  };

  const [isShown, setIsShown] = useState(true);

  const StartPage = () => {
    return (
      user.name ? 
      <Board /> : 
      <ModalWindow
        isShown={isShown} 
        setIsShown={setIsShown}
      />
    )
  };

  return (
    <Context.Provider value={{ state, dispatch }}>
      <StartPage />
    </Context.Provider>
  );
};

export default App;
