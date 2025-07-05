import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import App from './App'
import NotFound from './components/NotFound'

const AppWrapper = () => {
  const location = useLocation();
  return (
    <ErrorBoundary fallback={<NotFound />} resetKeys={[location.pathname]} >
      <App />
    </ErrorBoundary>
  )
}

export default AppWrapper
