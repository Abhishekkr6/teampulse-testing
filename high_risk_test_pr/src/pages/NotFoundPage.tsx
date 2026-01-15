/**
 * NotFound Page (404)
 * Fallback page for undefined routes
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import './NotFoundPage.css';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <h1 className="error-code">404</h1>
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist or has been moved.</p>

        <div className="actions">
          <Button variant="primary" onClick={() => navigate('/')}>
            Go Home
          </Button>
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
