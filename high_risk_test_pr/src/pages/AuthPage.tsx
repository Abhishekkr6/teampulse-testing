/**
 * Auth Page
 * Login and signup page
 */

import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import Input from '../components/Input';
import Button from '../components/Button';
import './AuthPage.css';

type AuthMode = 'login' | 'signup';

const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { updateUser } = useUser();

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (mode === 'signup') {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      updateUser({
        email: formData.email,
        name: formData.name || 'User',
      });
    } catch (error) {
      setErrors({ submit: 'An error occurred' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>{mode === 'login' ? 'Login' : 'Sign Up'}</h1>

        <form onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <Input
              name="name"
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(val) => setFormData({ ...formData, name: val })}
              error={errors.name}
              required
            />
          )}

          <Input
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(val) => setFormData({ ...formData, email: val })}
            error={errors.email}
            required
          />

          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(val) => setFormData({ ...formData, password: val })}
            error={errors.password}
            required
          />

          {mode === 'signup' && (
            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(val) => setFormData({ ...formData, confirmPassword: val })}
              error={errors.confirmPassword}
              required
            />
          )}

          <Button type="submit" loading={isLoading} variant="primary">
            {mode === 'login' ? 'Login' : 'Sign Up'}
          </Button>
        </form>

        <p className="mode-toggle">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button type="button" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
            {mode === 'login' ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
