/**
 * Home Page
 * Landing page of the application
 */

import React, { useEffect, useState } from 'react';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';
import Button from '../components/Button';
import Modal from '../components/Modal';
import Dashboard from '../components/Dashboard';

const HomePage: React.FC = () => {
  const { user, logout } = useUser();
  const { theme, setTheme, isDark } = useTheme();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    document.title = 'Home - Application';
  }, []);

  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const modalActions = [
    {
      id: 'confirm',
      label: 'Confirm',
      handler: () => console.log('Confirmed'),
      variant: 'primary' as const,
      closeOnClick: true,
    },
    {
      id: 'cancel',
      label: 'Cancel',
      handler: () => console.log('Cancelled'),
      variant: 'secondary' as const,
      closeOnClick: true,
    },
  ];

  return (
    <div className={`home-page ${isDark ? 'dark' : 'light'}`}>
      <header className="header">
        <h1>Welcome {user?.name || 'Guest'}</h1>
        <div className="header-actions">
          <Button variant="secondary" onClick={handleThemeToggle}>
            {isDark ? '☀️' : '🌙'}
          </Button>
          {user && (
            <Button variant="danger" onClick={logout}>
              Logout
            </Button>
          )}
        </div>
      </header>

      <main className="main-content">
        {user ? <Dashboard /> : <p>Please log in to continue</p>}
      </main>

      <Button onClick={() => setShowModal(true)}>Open Modal</Button>

      <Modal
        isOpen={showModal}
        title="Confirmation"
        onClose={() => setShowModal(false)}
        actions={modalActions}
      >
        <p>Are you sure you want to proceed?</p>
      </Modal>
    </div>
  );
};

export default HomePage;
