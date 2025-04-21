import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { GiShoppingCart } from "react-icons/gi";
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
          <Link to="/App">
            <img src="/assets/images/laundry logo.jpg" alt="LaundryMate Logo" />
          </Link>
        </div>

        <div ref={menuRef} className={`navbar__menu ${menuOpen ? "open" : ""}`}>
          <ul>
            <li
              className="has-dropdown"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <span>SERVICES ▾</span>
              {servicesOpen && (
                <ul className="dropdown">
                  <li>
                    <Link to="/washfoldprices">WASH AND FOLD</Link>
                  </li>
                  <li>
                    <Link to="/washiron">WASH AND IRON</Link>
                  </li>
                  <li>
                    <Link to="/steamiron">STEAM IRON</Link>
                  </li>
                  <li>
                    <Link to="/dryclean">DRY CLEAN</Link>
                  </li>
                  <li>
                    <a href="#promotional">PROMOTIONAL BANNER</a>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <a href="#prices">Service Hours</a>
            </li>
            <li>
              <a href="#club">CLUB ULTIMATE</a>
            </li>
            <li>
              <Link to="/cart">
                <GiShoppingCart
                  style={{
                    cursor: "pointer",
                    color: "#000",
                    marginLeft: "260%",
                    fontSize: "180%",
                  }}
                />
              </Link>
            </li>
            <li style={{ position: "relative" }}>
              <NotificationsNoneIcon
                style={{
                  fontSize: "150%",
                  cursor: "pointer",
                  marginLeft: "400%",
                }}
              />
              {total > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "10%",
                    right: "1%",
                    background: "red",
                    color: "#fff",
                    padding: "0.2% 0.5%",
                    borderRadius: "50%",
                    fontSize: "1.2%",
                  }}
                >
                  ₹{total}
                </span>
              )}
            </li>

            <li className="mobile-only">
              <Link to="/signin" className="btn btn--outline">
                SIGN IN
              </Link>
            </li>
            <li className="mobile-only">
              <Link to="/signup" className="btn btn--filled">
                SIGN UP
              </Link>
            </li>
          </ul>
        </div>

        <div className="navbar__actions desktop-only">
          <Link to="/signin" className="btn btn--outline">
            LOG IN
          </Link>
          <Link to="/signup" className="btn btn--filled">
            SIGN UP
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
