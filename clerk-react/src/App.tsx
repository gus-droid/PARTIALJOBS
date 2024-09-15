// App.js - Simplified version
import { Routes, Route } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import FormPage from './FormPage';
import ResultPage from './ResultPage';
import Header from './Header';
import AboutUs from './AboutUs';
import MyDietPlan from './MyDietPlan';
import MyProgress from './MyProgress';


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
        <Route path="/about" element={<AboutUs />} />
        <Route path="/progress" element={<MyProgress />} />
        <Route path="/diet-plan" element={<MyDietPlan />} />
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
