import React, { useState, useEffect } from "react";
import axios from "axios";
import "./menupage.css";
import logo from "../assets/logo.jpg";

function Menupage() {
  const [menus, setMenus] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showNav, setShowNav] = useState(false); // state for mobile nav toggle

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      const menuResponse = await axios.get("http://localhost:5001/api/menus");
      const menusData = menuResponse.data;

      const updatedMenus = [];
      for (const menu of menusData) {
        const itemResponse = await axios.get(
          `http://localhost:5001/api/items/${menu._id}`
        );
        updatedMenus.push({
          ...menu,
          items: itemResponse.data,
        });
      }
      setMenus(updatedMenus);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching menus:", error);
      setLoading(false);
    }
  };

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  const toggleNav = () => {
    setShowNav((prev) => !prev);
  };

  if (loading) {
    return <div className="loading">Loading menus...</div>;
  }

  const currentMenu =
    menus.length > 0
      ? menus[activeTab]
      : { name: "No Menu Found", description: "", items: [] };

  return (
    <div className="menu-page">
      {/* NAVBAR */}
      <header className="navbar">
        <div className="navbar-logo">
          <img src={logo} alt="Logo" className="logo-img" />
          <span className="logo-text">DEEP NET SOFT</span>
        </div>
        <button className="hamburger" onClick={toggleNav}>
          &#9776;
        </button>
        <nav className={showNav ? "show" : ""}>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/menu" className="active-link">Menu</a></li>
            <li><a href="/reservation">Make a Reservation</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <h1 className="hero-title">MENU</h1>
        <p className="hero-subtext">
          Please take a look at our menu featuring food, drinks, and brunch.
          If you'd like to place an order, simply click the 'Order Online' button below.
        </p>
      </section>

      {/* MENU TABS */}
      <div className="menu-tabs">
        {menus.length > 0 ? (
          menus.map((menu, index) => (
            <button
              key={menu._id}
              className={activeTab === index ? "active" : ""}
              onClick={() => handleTabChange(index)}
            >
              {menu.name}
            </button>
          ))
        ) : (
          <p style={{ padding: "1rem" }}>No menus found.</p>
        )}
      </div>

      {/* CURRENT MENU SECTION */}
      <section className="menu-items-section">
        <h2 className="section-title">{currentMenu.name}</h2>
        <p className="section-subtitle">{currentMenu.description}</p>
        <div className="menu-items-grid">
          {currentMenu.items && currentMenu.items.length > 0 ? (
            currentMenu.items.map((item) => (
              <div className="menu-item-card" key={item._id}>
                <div className="menu-item-header">
                  <h3>{item.name}</h3>
                  <span className="dots"></span>
                  <span className="item-price">${item.price}</span>
                </div>
                <p className="menu-item-desc">{item.description}</p>
              </div>
            ))
          ) : (
            <p className="no-items">No items in this menu yet.</p>
          )}
        </div>
      </section>

    
      <footer className="footer">
        <div className="footer-left">
          <img src={logo} alt="Deep Net Soft Logo" className="footer-logo" />
          <h3>DEEP NET SOFT</h3>
          <p>© 2025 Deepnetsoft Solutions. All rights reserved.</p>
        </div>
        <div className="footer-right">
          <h3>CONNECT WITH US</h3>
          <p>Phone: +91 9985543240</p>
          <p>Email: info@deepnetsoft.com</p>
          <p>Designed & Developed by: Deepnetsoft PVT. Hyderabad</p>
        </div>
      </footer>
    </div>
  );
}

export default Menupage;


