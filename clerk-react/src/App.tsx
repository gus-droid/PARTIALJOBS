// App.js - Simplified version
import { Routes, Route } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import FormPage from './FormPage';
import ResultPage from './ResultPage';
import Header from './Header';


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const App = () => {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <Header />
      <Routes>
        {/* FormPage can/was changed */}
        <Route path="/sign-in" element={<FormPage />} />
        <Route path="/" element={
          <FormPage />
        } />
        <Route path="/result" element={
          <ResultPage />
        } />
      </Routes>
    </ClerkProvider>
  );
};

export default App;
