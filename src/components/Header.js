import React from "react";
import Logo from "./Logo";

const Header = ({ userInput, setUserInput, setErrorLimit }) => {
  return (
    <header>
      <Logo />
      <h1>Github User Search</h1>
      <input
        type="search"
        id="user-search"
        name="user-search"
        value={userInput}
        onChange={(event) => {
          setUserInput(event.target.value);
          setErrorLimit(false);
        }}
      />
    </header>
  );
};

export default Header;
