// src/context/MenuContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface MenuContextProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}

const MenuContext = createContext<MenuContextProps | undefined>(undefined);

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};

interface MenuProviderProps {
  children: ReactNode;
}

export const MenuProvider: React.FC<MenuProviderProps> = ({ children }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
  };

  return (
    <MenuContext.Provider value={{ isMenuOpen, toggleMenu }}>
      {children}
    </MenuContext.Provider>
  );
};
