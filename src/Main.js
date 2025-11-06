import React, { useEffect, useContext } from 'react';
import Navbar from './components/Navbar/Navbar';
import Notification from './components/Notification/Notification';
import { ThemeContext } from './context/ThemeContext';
import './App.css';

function Main({cartItems, notification, handleCloseNotification}) {
  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    const classTarget = document.documentElement;
    if (isDarkMode) {
      classTarget.classList.add('dark');
    } else {
      classTarget.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="flex flex-col bg-background text-foreground transition-colors duration-300">
        <Navbar cartItemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} />
        {notification && (
        <Notification
            message={notification.message}
            type={notification.type}
            onClose={handleCloseNotification}
        />
        )}
    </div>
  );
}

export default Main;
