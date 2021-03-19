import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import Dropdown from "../Dropdown";

import Sidebar from "../Sidebar";

import "./index.css";

const items = [
  {
    label: "Home",
    icon: "home",
    path: "/",
  },
  {
    label: "About Us",
    icon: "object group outline",
    path: "/gettoknowus",
  },
  {
    label: "Community",
    icon: "cubes",
    path: "/community",
  },
  {
    label: "Contact",
    icon: "address book",
    path: "# ",
  },
  {
    label: "Login",
    icon: "address card outline",
    path: "#",
  },
];

const itemsDropdownCommunity = [
  {
    label: "Get to Know Us",
    icon: "bullhorn",
    path: "/gettoknowus",
  },
  {
    label: "Carrer",
    icon: "briefcase",
    path: "/carrer",
  },
  {
    label: "Tips",
    icon: "comment outline",
    path: "/tips",
  },
  {
    label: "Buy & Sell",
    icon: "money bill alternate icon",
    path: "buyandsell",
  },
];

const Navbar = ({ children }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [toggle, setToggle] = useState(false);

  const menuRef = useRef();

  const onToggleMenu = () => {
    setToggle(!toggle);
  };

  const itemList = items.map(({ label, icon, path }) => {
    if (label === "Community") {
      return <Dropdown label={label} itemList={itemsDropdownCommunity} />;
    }

    return (
      <NavLink to={`${path}`} exact={path === "/"} key={icon}>
        <div className={`item`} key={label}>
          <i className={`${icon} icon`}></i> {label}
        </div>
      </NavLink>
    );
  });

  // use Effect to keep track of the browser window width:
  useEffect(() => {
    const handleWindowSize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowSize);

    return () => {
      window.removeEventListener("resize", handleWindowSize);
    };
  }, []);

  // use Effect to keep track of the mouse click outside vertical menu:
  useEffect(() => {
    const onBodyClick = (e) => {
      if (menuRef.current && menuRef.current.contains(e.target)) {
        return;
      }
      setToggle(false);
    };
    document.body.addEventListener("click", onBodyClick);
    return () => {
      document.removeEventListener("click", onBodyClick);
    };
  }, []);
  return (
    <>
      <div
        ref={width > 760 ? null : menuRef}
        className="ui top text attached menu"
      >
        <NavLink to="/" exact>
          <div className={`item `}>
            <i className="icon logo">
              <img src="/images/DSC_logo_color.png" alt="" />
            </i>
            {width > 760 ? (
              <span style={{ color: "white" }}>Developer Student Clubs</span>
            ) : null}
          </div>
        </NavLink>

        {width > 760 ? (
          <>
            <div className="right menu">{itemList}</div>
          </>
        ) : (
          <>
            <div
              className="item right floated link"
              onClick={() => {
                onToggleMenu();
              }}
            >
              <i className="bars large icon"></i>
            </div>
            <Sidebar toggle={toggle} itemList={itemList} />
          </>
        )}
      </div>
      {children}
    </>
  );
};

export default Navbar;
