import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
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
            <img src="/assets/images/Wash-O-Matic.png" alt="LaundryMate Logo" />
          </Link>
        </div>

        <div ref={menuRef} className={`navbar__menu ${menuOpen ? "open" : ""}`}>
          <ul>
            <li>
              <Link to="/home">HOME</Link>
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
                    <Link to="/Promotional">PROMOTIONAL BANNER</Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <Link to="/Servicehours">SERVICE HOURS</Link>
            </li>
            <li>
              <Link to="/Subscriptions">CLUB ULTIMATE</Link>
            </li>
            
            <li>
              <Link to="/cart">
                <GiShoppingCart style={{ fontSize: "24px", color: "#000", marginLeft:"50%" }} />
              </Link>
            </li>
            <li style={{ position: "relative" }}>
              <Link to="/Offers">
                <NotificationsNoneIcon
                  style={{ fontSize: "24px", color: "#000" }}
                />
                {total > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "0",
                      right: "0",
                      background: "red",
                      color: "#fff",
                      padding: "2px 6px",
                      borderRadius: "50%",
                      fontSize: "12px",
                      marginRight:"200%"
                    }}
                  >
                    ₹{total}
                  </span>
                )}
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
