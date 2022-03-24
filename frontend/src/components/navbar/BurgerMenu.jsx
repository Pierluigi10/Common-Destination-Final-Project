import React from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "../../ThemeContext";
import icons from "../../functions/icons.js";

function BurgerMenu({handleBurgerMenuToggles,handleLogout,setValidationMenuToggle,}) {
  const { mediaQueries, currentUser } = useTheme();
  return (
    <ul
      className="burgerMenu"
      style={{
        width: mediaQueries.smallView ? "100vw" : "30vw",
        height: mediaQueries.smallView ? "100vh" : "70vh",
      }}
    >
      <li onClick={handleBurgerMenuToggles}>
        <NavLink to="/">
          <icons.FaHome className="reactIcons" /> HOME
        </NavLink>
      </li>

      <li
        onClick={() => {
          handleBurgerMenuToggles();
          currentUser.username !== "anonymousUser"
            ? handleLogout()
            : setValidationMenuToggle();
        }}
        style={{ cursor: "pointer" }}
      >
        <icons.SiGnuprivacyguard className="reactIcons" />
        {currentUser.username === "anonymousUser" ? "LOGIN" : "LOGOUT"}
      </li>

      <li onClick={handleBurgerMenuToggles}>
        <NavLink to="/account">
          <icons.MdManageAccounts className="reactIcons" />
          ACCOUNT
        </NavLink>
      </li>
      <li onClick={handleBurgerMenuToggles}>
        <NavLink to="/about">
          <icons.BsInfoSquareFill className="reactIcons" />
          ABOUT
        </NavLink>
      </li>
   
      <li onClick={handleBurgerMenuToggles}>
        <NavLink to="/contact">
          <icons.BsFillChatRightTextFill className="reactIcons" />
          CONTACT
        </NavLink>
      </li>
    </ul>
  );
}

export default BurgerMenu;
