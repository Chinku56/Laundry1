import React, { useState, useEffect, useRef, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { GiShoppingCart } from "react-icons/gi";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { CartContext } from "../components/CartContext";
import "./Navbar.scss";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const menuRef = useRef(null);
  const { total } = useContext(CartContext);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="navbar">
      <div className="navbar__container">
        <div className="navbar__logo">
          <Link to="/">
            <img src="/assets/images/Wash-O-Matic.png" alt="Wash-O-Matic Logo" />
          </Link>
        </div>

        <div ref={menuRef} className={`navbar__menu ${menuOpen ? "open" : ""}`}>
          <ul>
            <li>
              <NavLink
                to="/home"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                HOME
              </NavLink>
            </li>
            <li
              className="has-dropdown"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <span>SERVICES ▾</span>
              {servicesOpen && (
                <ul className="dropdown">
                  <li>
                    <NavLink
                      to="/washfoldprices"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      WASH AND FOLD
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/washiron"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      WASH AND IRON
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/steamiron"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      STEAM IRON
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dryclean"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      DRY CLEAN
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/Promotional"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      PROMOTIONAL BANNER
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <NavLink
                to="/Servicehours"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                SERVICE HOURS
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Subscriptions"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                CLUB ULTIMATE
              </NavLink>
            </li>

            <li style={{ position: "relative" }}>
              <Link
                to="/cart"
                style={{ position: "relative", display: "inline-block" }}
              >
                <GiShoppingCart style={{ fontSize: "24px", color: "#000" }} />
                {total > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-6px",
                      right: "-10px",
                      background: "red",
                      color: "#fff",
                      padding: "2px 6px",
                      borderRadius: "50%",
                      fontSize: "12px",
                    }}
                  >
                    ₹{total}
                  </span>
                )}
              </Link>
            </li>

            <li style={{ position: "relative" }}>
              <Link to="/Offers">
                <NotificationsNoneIcon
                  style={{ fontSize: "24px", color: "#000" }}
                />
              </Link>
            </li>

            <li style={{ position: "relative" }}>
              <Link to="/Accountpage">
                <AccountCircleIcon
                  style={{ fontSize: "24px", color: "#000" }}
                />
              </Link>
            </li>

            <li className="mobile-only">
              <Link to="" className="btn btn--filled"></Link>
            </li>
          </ul>
        </div>

        <div className="navbar__actions desktop-only">
          <Link to="/login" className="btn btn--filled">
            SIGN OUT
          </Link>
        </div>

        <div className="navbar__toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
