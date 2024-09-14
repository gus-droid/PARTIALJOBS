import React from 'react';
import { Route, Routes } from 'react-router-dom';
import FormPage from './FormPage';
import ResultPage from './ResultPage';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </div>
  );
};

export default App;
