import React, { useState } from "react";
import Board from "./components/Board";
import ModalWindow from "./components/Modal";

function App() {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [isShown, setIsShown] = useState(true);

  const handleUser = (name: string) => {
    localStorage.setItem("user", name);
    setUser(name);
    setIsShown(false);
  };

  return (
    user ? 
    <Board name={user}/> : 
    <ModalWindow isShown={isShown} handleUser={handleUser}/>
  );
}

export default App;
