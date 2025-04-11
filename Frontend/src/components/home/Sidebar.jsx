import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';


function Sidebar() {
  const [ authUser,setAuthUser ] = useContext(AuthContext);
  console.log("auth User  ", authUser);
  
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const triggerRef = useRef(null);

  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen && 
        sidebarRef.current && 
        !sidebarRef.current.contains(event.target) &&
        triggerRef.current && 
        !triggerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Sidebar styles
  const sidebarStyle = {
    position: 'fixed',
    top: 0,
    left: isOpen ? '0' : '-250px',
    width: '250px',
    height: '100vh',
    backgroundColor: '#2c3e50',
    color: 'white',
    transition: 'all 0.3s ease-in-out',
    zIndex: 1000,
    boxShadow: isOpen ? '0 0 15px rgba(0, 0, 0, 0.2)' : 'none',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px 0',
    overflowY: 'auto'
  };

  // Trigger button styles
  const triggerStyle = {
    position: 'fixed',
    top: '50%',
    left: isOpen ? '250px' : '0',
    transform: 'translateY(-50%)',
    backgroundColor: '#2c3e50',
    color: 'white',
    border: 'none',
    borderRadius: '0 4px 4px 0',
    padding: '15px 10px',
    cursor: 'pointer',
    zIndex: 1001,
    transition: 'all 0.3s ease-in-out',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  // List item styles
  const listItemStyle = {
    padding: '12px 20px',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'background-color 0.2s ease'
  };

  // Link styles
  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    display: 'block',
    fontSize: '16px'
  };

  // Submenu styles
  const submenuStyle = {
    paddingLeft: '20px',
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  };

  // Arrow icon for the trigger button
  const ArrowIcon = () => (
    <svg 
      width="16" 
      height="16" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
    >
      <polyline points={isOpen ? "15 18 9 12 15 6" : "9 18 15 12 9 6"}></polyline>
    </svg>
  );

  return (
    <>
      {/* Trigger Button */}
      <button 
        ref={triggerRef}
        onClick={toggleSidebar} 
        style={triggerStyle}
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        <ArrowIcon />
      </button>

      {/* Sidebar */}
      <aside 
        ref={sidebarRef}
        className="sidebar" 
        style={sidebarStyle}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div style={{ padding: '0 20px 20px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <h2 style={{ margin: '0', fontSize: '20px', fontWeight: 'bold' }}>Menu</h2>
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li style={listItemStyle}>
            <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
          </li>
         { authUser?.role==='user' ? (<li style={listItemStyle}>
            <Link to="/add-to-cart" style={linkStyle}>Your 🛒🛒</Link>
          </li>) : (<li style={listItemStyle}>
            <Link to="/admin-cart" style={linkStyle}>Admin 🛒🛒🛒🛒</Link>
          </li>)}
          <li style={listItemStyle}>
            <Link to={`/login/profile/${authUser?.id}`} style={linkStyle}>Profile</Link>
          </li>
          { authUser?.role==="admin" &&( <li style={listItemStyle}>
            <Link to="/create-book" style={linkStyle}>❄️❄️☃️</Link>
          </li>
          )}
          
          {/* To-Do Menu with Sub-Items */}
          <li 
            onClick={toggleSubMenu} 
            style={{
              ...listItemStyle,
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span>To-Do</span>
            <span style={{ transition: 'transform 0.3s ease', transform: showSubMenu ? 'rotate(180deg)' : 'rotate(0deg)' }}>
              ▼
            </span>
          </li>
          {showSubMenu && (
            <ul className="submenu" style={{ ...submenuStyle, listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={listItemStyle}>
                <Link to="/bought-book" style={linkStyle}>Bought Already</Link>
              </li>
              <li style={listItemStyle}>
                <Link to="/all-projects" style={linkStyle}>Projects</Link>
              </li>
            </ul>
          )}
        </ul>
      </aside>
    </>
  );
}

export default Sidebar;