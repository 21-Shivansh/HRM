import React, { createContext, useState } from 'react';

export const NavbarContext = createContext();

export const NavbarProvider = ({ children }) => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpen);
  };

  return (
    <NavbarContext.Provider value={{ navbarOpen, toggleNavbar }}>
      {children}
    </NavbarContext.Provider>
  );
};