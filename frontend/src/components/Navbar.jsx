/* eslint-disable react/button-has-type */
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { useTheme } from "../ThemeContext";
import BurgerMenu from "./navbar/BurgerMenu";
import AccountMenu from "./navbar/AccountMenu";
import TopMenu from "./navbar/TopMenu";
import icons from "../functions/icons.js";

const Navbar = () => {
  const {
    burgerMenuToggle,
    setBurgerMenuToggle,
    validationMenuToggle,
    setValidationMenuToggle,
    setMenuAccountToggle,
    menuAccountToggle,
    handleLogout,
  } = useTheme();

  const handleBurgerMenuToggles = () => {
    !burgerMenuToggle ? setBurgerMenuToggle(true) : setBurgerMenuToggle(false);
    setValidationMenuToggle(false);
  };

  return (
    <div className="Navbar">
      {!burgerMenuToggle && (
        <TopMenu
          setMenuAccountToggle={() => setMenuAccountToggle(!menuAccountToggle)}
          setValidationMenuToggle={setValidationMenuToggle}
          handleBurgerMenuToggles={handleBurgerMenuToggles}
          handleLogout={handleLogout}
        />
      )}
      {menuAccountToggle && (
        <AccountMenu
          setMenuAccountToggle={setMenuAccountToggle}
          setValidationMenuToggle={setValidationMenuToggle}
          handleLogout={handleLogout}
        />
      )}
      {burgerMenuToggle && (
        <>
          <BurgerMenu
            handleBurgerMenuToggles={handleBurgerMenuToggles}
            setValidationMenuToggle={() =>
              setValidationMenuToggle(!validationMenuToggle)
            }
            handleLogout={handleLogout}
          />
          <icons.MdOutlineClose
            className="menuIconClosed"
            onClick={handleBurgerMenuToggles}
          />
        </>
      )}
    </div>
  );
};

export default Navbar;
