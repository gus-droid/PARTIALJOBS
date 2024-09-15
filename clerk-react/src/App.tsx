// App.js - Simplified version
import { Routes, Route } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import SignInPage from './SignInPage';
import ProtectedRoute from './ProtectedRoute';
import FormPage from './FormPage';
import ResultPage from './ResultPage';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const App = () => {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <Routes>
        {/* FormPage can/was changed */}
        <Route path="/sign-in" element={<FormPage />} />
        <Route path="/" element={
          <ProtectedRoute>
            <FormPage />
          </ProtectedRoute>
        } />
        <Route path="/result" element={
          <ProtectedRoute>
            <ResultPage />
          </ProtectedRoute>
        } />
      </Routes>
    </ClerkProvider>
  );
};

export default App;
