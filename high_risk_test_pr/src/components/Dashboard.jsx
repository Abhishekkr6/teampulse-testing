/**
 * Dashboard Component
 * Main dashboard layout with analytics and user management
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import Header from './Header';
import Sidebar from './Sidebar';
import Analytics from './Analytics';
import UserList from './UserList';
import LoadingSpinner from './LoadingSpinner';
import ErrorBoundary from './ErrorBoundary';

/**
 * Dashboard component with multiple sections
 * @component
 */
const Dashboard = ({ userId, onLogout }) => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [filterSettings, setFilterSettings] = useState({
    dateRange: 'last30days',
    sortBy: 'date',
    searchTerm: ''
  });

  // Fetch dashboard data
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['dashboard', userId, filterSettings],
    queryFn: async () => {
      const response = await fetch('/api/dashboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filterSettings)
      });
      if (!response.ok) throw new Error('Failed to fetch dashboard');
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000  // 10 minutes
  });

  // Auto-refresh analytics
  useEffect(() => {
    const interval = setInterval(() => refetch(), 30000);
    return () => clearInterval(interval);
  }, [refetch]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} onRetry={() => refetch()} />;

  return (
    <ErrorBoundary>
      <div className="dashboard-container">
        <Header user={data?.user} onLogout={onLogout} />
        
        <div className="dashboard-content">
          <Sidebar 
            activeTab={selectedTab}
            onTabChange={setSelectedTab}
            stats={data?.stats}
          />

          <main className="main-content">
            {selectedTab === 'overview' && (
              <section className="overview-section">
                <h1>Dashboard Overview</h1>
                <Analytics 
                  data={data?.analytics}
                  onFilterChange={setFilterSettings}
                  currentFilters={filterSettings}
                />
              </section>
            )}

            {selectedTab === 'users' && (
              <section className="users-section">
                <h1>User Management</h1>
                <UserList 
                  users={data?.users}
                  onRefresh={() => refetch()}
                  searchTerm={filterSettings.searchTerm}
                  onSearch={(term) => setFilterSettings(prev => ({
                    ...prev,
                    searchTerm: term
                  }))}
                />
              </section>
            )}

            {selectedTab === 'settings' && (
              <section className="settings-section">
                <h1>Dashboard Settings</h1>
                <SettingsPanel 
                  settings={data?.settings}
                  onSave={(newSettings) => {
                    setFilterSettings(newSettings);
                    refetch();
                  }}
                />
              </section>
            )}
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
};

/**
 * Error message component
 */
const ErrorMessage = ({ error, onRetry }) => (
  <div className="error-container">
    <p>Error: {error?.message}</p>
    <button onClick={onRetry}>Retry</button>
  </div>
);

/**
 * Settings panel component
 */
const SettingsPanel = ({ settings, onSave }) => {
  const [formData, setFormData] = useState(settings || {});

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Settings form fields */}
      <button type="submit">Save Settings</button>
    </form>
  );
};

Dashboard.propTypes = {
  userId: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired
};

export default Dashboard;
